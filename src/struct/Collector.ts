import EventEmitter from "events";
import { Client } from "eris";

/**
 * Abstract class for defining a new collector.
 * @abstract
 */

export abstract class Collector<V> extends EventEmitter {
	private _timeout: NodeJS.Timeout | null;
	private _idleTimeout: NodeJS.Timeout | null;

	public readonly client!: Client;
	public collected: V[];
	public ended: boolean;
	public filter: CollectorFilter<V[]>;
	public options: CollectorOptions<V[]>;

	constructor(client: Client, options: CollectorOptions = {}) {
		super();

		/**
		 * The client that instantiated this Collector
		 * @name Collector#client
		 * @type {Client}
		 * @readonly
		 */

		Object.defineProperty(this, "client", { value: client });

		/**
		 * The filter applied to this collector
		 * @type {CollectorFilter}
		 * @returns {boolean|Promise<boolean>}
		 */

		this.filter = options.filter ?? (() => true);

		/**
		 * The options of this collector
		 * @type {CollectorOptions}
		 */

		this.options = options;

		/**
		 * The items collected by this collector
		 * @type {Collection}
		 */

		this.collected = [];

		/**
		 * Whether this collector has finished collecting
		 * @type {boolean}
		 */

		this.ended = false;

		/**
		 * Timeout for cleanup
		 * @type {?NodeJS.Timeout}
		 * @private
		 */

		this._timeout = null;

		/**
		 * Timeout for cleanup due to inactivity
		 * @type {?NodeJS.Timeout}
		 * @private
		 */

		this._idleTimeout = null;

		if (typeof this.filter !== "function")
			throw new TypeError(
				"[INVALID_TYPE] Expected options.filter to be of type function.",
			);

		this.handleCollect = this.handleCollect.bind(this);

		if (options.time)
			this._timeout = setTimeout(
				() => this.stop("time"),
				options.time,
			).unref();
		if (options.idle)
			this._idleTimeout = setTimeout(
				() => this.stop("idle"),
				options.idle,
			).unref();
	}

	/**
	 * Call this to handle an event as a collectable element. Accepts any event data as parameters.
	 * @param {...*} args The arguments emitted by the listener
	 * @returns {Promise<void>}
	 * @emits Collector#collect
	 */

	public async handleCollect(...args: unknown[]): Promise<void> {
		// Silence typescript with eval.
		const collect = await eval("this.collect(...args)");

		if (collect && (await this.filter(...args, this.collected))) {
			this.collected.push(args[0]);

			/**
			 * Emitted whenever an element is collected.
			 * @event Collector#collect
			 * @param {...*} args The arguments emitted by the listener
			 */
			this.emit("collect", ...args);

			if (this._idleTimeout) {
				clearTimeout(this._idleTimeout);
				this._idleTimeout = setTimeout(
					() => this.stop("idle"),
					this.options.idle,
				).unref();
			}
		}
		this.checkEnd();
	}

	/**
	 * Returns a promise that resolves with the next collected element;
	 * rejects with collected elements if the collector finishes without receiving a next element
	 * @type {Promise}
	 * @readonly
	 */

	public get next(): Promise<V> {
		return new Promise((resolve, reject) => {
			if (this.ended) {
				reject(this.collected);
				return;
			}

			const cleanup = () => {
				this.removeListener("collect", onCollect);
				this.removeListener("end", onEnd);
			};

			const onCollect = (item: V) => {
				cleanup();
				resolve(item);
			};

			const onEnd = () => {
				cleanup();
				reject(this.collected); // eslint-disable-line prefer-promise-reject-errors
			};

			this.on("collect", onCollect);
			this.on("end", onEnd);
		});
	}

	/**
	 * Stops this collector and emits the `end` event.
	 * @param {string} [reason='user'] The reason this collector is ending
	 * @emits Collector#end
	 */

	public stop(reason: string = "user"): void {
		if (this.ended) return;

		if (this._timeout) {
			clearTimeout(this._timeout);
			this._timeout = null;
		}
		if (this._idleTimeout) {
			clearTimeout(this._idleTimeout);
			this._idleTimeout = null;
		}
		this.ended = true;

		/**
		 * Emitted when the collector is finished collecting.
		 * @event Collector#end
		 * @param {Collection} collected The elements collected by the collector
		 * @param {string} reason The reason the collector ended
		 */
		this.emit("end", this.collected, reason);
	}

	/**
	 * Resets the collector's timeout and idle timer.
	 * @param {CollectorResetTimerOptions} [options] Options for resetting
	 */
	public resetTimer({ time, idle }: CollectorResetTimerOptions = {}): void {
		if (this._timeout) {
			clearTimeout(this._timeout);
			this._timeout = setTimeout(
				() => this.stop("time"),
				time ?? this.options.time,
			).unref();
		}
		if (this._idleTimeout) {
			clearTimeout(this._idleTimeout);
			this._idleTimeout = setTimeout(
				() => this.stop("idle"),
				idle ?? this.options.idle,
			).unref();
		}
	}

	/**
	 * Checks whether the collector should end, and if so, ends it.
	 * @returns {boolean} Whether the collector ended or not
	 */
	public checkEnd(): boolean {
		const reason = this.endReason as any;
		if (reason) this.stop(reason);
		return Boolean(reason);
	}

	/**
	 * Allows collectors to be consumed with for-await-of loops
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of}
	 */

	async *[Symbol.asyncIterator](): AsyncIterableIterator<V> {
		const queue: V[] = [];
		const onCollect = (...item: V[]) => queue.push(<V>(<any>item));
		this.on("collect", onCollect);

		try {
			while (queue.length || !this.ended) {
				if (queue.length) {
					yield queue.shift()!;
				} else {
					// eslint-disable-next-line no-await-in-loop
					await new Promise<void>((resolve) => {
						const tick = () => {
							this.removeListener("collect", tick);
							this.removeListener("end", tick);
							return resolve();
						};
						this.on("collect", tick);
						this.on("end", tick);
					});
				}
			}
		} finally {
			this.removeListener("collect", onCollect);
		}
	}

	/**
	 * The reason this collector has ended with, or null if it hasn't ended yet
	 * @type {?string}
	 * @readonly
	 * @abstract
	 */
	// @ts-ignore
	public abstract get endReason(): string | null {}

	/**
	 * Handles incoming events from the `handleCollect` function. Returns null if the event should not
	 * be collected, or returns an object describing the data that should be stored.
	 * @see Collector#handleCollect
	 * @param {...*} args Any args the event listener emits
	 * @returns {?(*|Promise<?*>)} Data to insert into collection, if any
	 * @abstract
	 */

	collect() {}
}

/**
 * Filter to be applied to the collector.
 * @type {(...args: Array<*>) => Promise<boolean> | boolean}
 */

export type CollectorFilter<T extends unknown[]> = (...args: T[]) => Promise<boolean> | boolean;

/**
 * Options to be applied to the collector.
 * @type {Object}
 * @property {CollectorFilter} [filter] The filter applied to this collector
 * @property {Number} [time] How long to run the collector for in milliseconds
 * @property {Number} [idle] How long to stop the collector after inactivity in milliseconds
 */

export interface CollectorOptions<T extends unknown[]> {
	filter?: CollectorFilter<T>;
	time?: number;
	idle?: number;
}

/**
 * Options used to reset the timeout and idle timer of a {@link Collector}.
 * @type {Object}
 * @property {Number} [time] How long to run the collector for (in milliseconds)
 * @property {Number} [idle] How long to wait to stop the collector after inactivity (in milliseconds)
 */

interface CollectorResetTimerOptions {
	time?: number;
	idle?: number;
}
