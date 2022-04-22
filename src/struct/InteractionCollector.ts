"use strict";

import { Collector, CollectorOptions } from "./Collector";
import type { TextableChannel, Guild, Constants, Message, Client, GuildTextableChannel, ThreadChannel } from "eris";
import { incrementMaxListeners, decrementMaxListeners } from "../util";
import { type ComponentTypes } from "./BaseComponent";

export type InteractionTypes = typeof Constants.InteractionTypes;

/**
 * @extends {CollectorOptions}
 * @property {TextableChannel} [channel] The channel to listen to interactions from
 * @property {ComponentTypes} [componentType] The type of component to listen for
 * @property {Guild} [guild] The guild to listen to interactions from
 * @property {InteractionTypes} [interactionType] The type of interaction to listen for
 * @property {Number} [max] The maximum total amount of interactions to collect
 * @property {Number} [maxComponents] The maximum number of components to collect
 * @property {Number} [maxUsers] The maximum number of users to interact
 * @property {Message} [message] The message to listen to interactions from
 */

interface InteractionCollectorOptions extends CollectorOptions {
	channel?: TextableChannel;
	componentType?: ComponentTypes;
	guild?: Guild;
	interactionType?: InteractionTypes;
	max?: number;
	maxComponents?: number;
	maxUsers?: number;
	message?: Message;
}

/**
 * Collects interactions.
 * Will automatically stop if the message ({@link Client#event:messageDelete messageDelete} or
 * {@link Client#event:messageDeleteBulk messageDeleteBulk}),
 * channel ({@link Client#event:channelDelete channelDelete}), or
 * guild ({@link Client#event:guildDelete guildDelete}) is deleted.
 * <info>Interaction collectors that do not specify `time` or `idle` may be prone to always running.
 * Ensure your interaction collectors end via either of these options or manual cancellation.</info>
 * @extends {Collector}
 */

class InteractionCollector<T> extends Collector<T> {
    public channelID: string;
    public messageInteractionID: string;
    public componentType: ComponentTypes;


	/**
	 * @param {Client} client The client on which to collect interactions
	 * @param {InteractionCollectorOptions} [options={}] The options to apply to this collector
	 */
    
	constructor(client: Client, options: InteractionCollectorOptions = {}) {
		super(client, options);

		/**
		 * The message from which to collect interactions, if provided
		 * @type {?Snowflake}
		 */
		this.messageID = options.message?.id ?? null;

		/**
		 * The message interaction id from which to collect interactions, if provided
		 * @type {?Snowflake}
		 */
		this.messageInteractionID = options.interactionResponse?.id ?? null;

		/**
		 * The channel from which to collect interactions, if provided
		 * @type {?Snowflake}
		 */
		this.channelID =
			options.interactionResponse?.interaction.channelID ??
			options.message?.channelID ??
			options.message?.channel_id ??
			this.client.channels.resolveID(options.channel);

		/**
		 * The guild from which to collect interactions, if provided
		 * @type {?Snowflake}
		 */
		this.guildID = options.guild?.id ?? null;

		/**
		 * The type of interaction to collect
		 * @type {?InteractionType}
		 */
		this.interactionType = options.interactionType ?? null;

		/**
		 * The type of component to collect
		 * @type {?ComponentType}
		 */
		this.componentType = options.componentType ?? null;

		/**
		 * The users that have interacted with this collector
		 * @type {Collection<Snowflake, User>}
		 */
		this.users = new Collection();

		/**
		 * The total number of interactions collected
		 * @type {number}
		 */
		this.total = 0;

		incrementMaxListeners(this.client);

		const bulkDeleteListener = (messages) => {
			if (messages.has(this.messageID)) this.stop("messageDelete");
		};

		if (this.messageID || this.messageInteractionID) {
			this._handleMessageDeletion =
				this._handleMessageDeletion.bind(this);
			this.client.on("messageDelete", this._handleMessageDeletion);
			this.client.on("messageDeleteBulk", bulkDeleteListener);
		}

		if (this.channelID) {
			this._handleChannelDeletion =
				this._handleChannelDeletion.bind(this);
			this._handleThreadDeletion = this._handleThreadDeletion.bind(this);
			this.client.on("channelDelete", this._handleChannelDeletion);
			this.client.on("threadDelete", this._handleThreadDeletion);
		}

		if (this.guildID) {
			this._handleGuildDeletion = this._handleGuildDeletion.bind(this);
			this.client.on("guildDelete", this._handleGuildDeletion);
		}

		this.client.on("interactionCreate", this.handleCollect);

		this.once("end", () => {
			this.client.removeListener(
				"interactionCreate",
				this.handleCollect,
			);
			this.client.removeListener(
				"messageDelete",
				this._handleMessageDeletion,
			);
			this.client.removeListener(
				"messageDeleteBulk",
				bulkDeleteListener,
			);
			this.client.removeListener(
				"channelDelete",
				this._handleChannelDeletion,
			);
			this.client.removeListener(
				"threadDelete",
				this._handleThreadDeletion,
			);
			this.client.removeListener(
				"guildDelete",
				this._handleGuildDeletion,
			);
			decrementMaxListeners(this.client);
		});

		this.on("collect", (interaction) => {
			this.total++;
			this.users.set(interaction.user.id, interaction.user);
		});
	}

	/**
	 * Handles an incoming interaction for possible collection.
	 * @param {Interaction} interaction The interaction to possibly collect
	 * @returns {?Snowflake}
	 * @private
	 */
	collect(interaction) {
		/**
		 * Emitted whenever an interaction is collected.
		 * @event InteractionCollector#collect
		 * @param {Interaction} interaction The interaction that was collected
		 */
		if (this.interactionType && interaction.type !== this.interactionType)
			return null;
		if (
			this.componentType &&
			interaction.componentType !== this.componentType
		)
			return null;
		if (this.messageID && interaction.message?.id !== this.messageID)
			return null;
		if (
			this.messageInteractionID &&
			interaction.message?.interaction?.id !== this.messageInteractionID
		)
			return null;
		if (this.channelID && interaction.channelID !== this.channelID)
			return null;
		if (this.guildID && interaction.guildID !== this.guildID) return null;

		return interaction.id;
	}

	/**
	 * Handles an interaction for possible disposal.
	 * @param {Interaction} interaction The interaction that could be disposed of
	 * @returns {?Snowflake}
	 */
	dispose(interaction) {
		/**
		 * Emitted whenever an interaction is disposed of.
		 * @event InteractionCollector#dispose
		 * @param {Interaction} interaction The interaction that was disposed of
		 */
		if (this.type && interaction.type !== this.type) return null;
		if (
			this.componentType &&
			interaction.componentType !== this.componentType
		)
			return null;
		if (this.messageID && interaction.message?.id !== this.messageID)
			return null;
		if (
			this.messageInteractionID &&
			interaction.message?.interaction?.id !== this.messageInteractionID
		)
			return null;
		if (this.channelID && interaction.channelID !== this.channelID)
			return null;
		if (this.guildID && interaction.guildID !== this.guildID) return null;

		return interaction.id;
	}

	/**
	 * Empties this interaction collector.
	 */
	empty() {
		this.total = 0;
		this.collected.clear();
		this.users.clear();
		this.checkEnd();
	}

	/**
	 * The reason this collector has ended with, or null if it hasn't ended yet
	 * @type {?string}
	 * @readonly
	 */
	get endReason() {
		if (this.options.max && this.total >= this.options.max) return "limit";
		if (
			this.options.maxComponents &&
			this.collected.size >= this.options.maxComponents
		)
			return "componentLimit";
		if (this.options.maxUsers && this.users.size >= this.options.maxUsers)
			return "userLimit";
		return null;
	}

    /**
	 * Handles checking if the message has been deleted, and if so, stops the collector with the reason 'messageDelete'.
	 * @private
	 * @param {Message} message The message that was deleted
	 * @returns {void}
	 */

	private _handleMessageDeletion(message: Message): void {
		if (message.id === this.messageID) {
			this.stop("messageDelete");
		}

		if (message.interaction?.id === this.messageInteractionID) {
			this.stop("messageDelete");
		}
	}

	/**
	 * Handles checking if the channel has been deleted, and if so, stops the collector with the reason 'channelDelete'.
	 * @private
	 * @param {GuildChannel} channel The channel that was deleted
	 * @returns {void}
	 */
	private _handleChannelDeletion(channel: GuildTextableChannel): void {
		if (
			channel.id === this.channelID ||
			channel.threads?.cache.has(this.channelID)
		) {
			this.stop("channelDelete");
		}
	}

	/**
	 * Handles checking if the thread has been deleted, and if so, stops the collector with the reason 'threadDelete'.
	 * @private
	 * @param {ThreadChannel} thread The thread that was deleted
	 * @returns {void}
	 */
	private _handleThreadDeletion(thread: ThreadChannel): void {
		if (thread.id === this.channelID) {
			this.stop("threadDelete");
		}
	}

	/**
	 * Handles checking if the guild has been deleted, and if so, stops the collector with the reason 'guildDelete'.
	 * @private
	 * @param {Guild} guild The guild that was deleted
	 * @returns {void}
	 */
	private _handleGuildDeletion(guild: Guild): void {
		if (guild.id === this.guildID) {
			this.stop("guildDelete");
		}
	}
}

module.exports = InteractionCollector;
