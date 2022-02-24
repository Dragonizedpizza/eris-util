# eris-util - Utilities for the Discord API library eris.

## Installation

Install eris-util by running `npm i --save eris-util`.

## Usage

```js
// ESM
import { Embed, Button } from "eris-util";
// commonjs
const { Embed, Button } = require("eris-util");
// Dynamic import
const { Embed, Button } = await import("eris-util");
```

## API

The eris-util API is similar to that of discord.js's.

### Embeds

```js
const embed = new Embed();

embed.setTitle("Title").setDescription("Hello.");

// It also accepts objects in the constructor,
const embed = new Embed({
	title: "Title",
	description: "Hello.",
});

embed
	.setImage("https://example.com/image.png")
	.setThumbnail("https://example.com/thumbnail.png");

// Send the embed.
bot.createMessage(msg.channel.id, {
	embeds: [embed],
});
```

### Components

#### Action Rows

```js
const row = new ActionRow();

row.addComponents(
	new Button()
		.setCustomID("button_one")
		.setStyle("SECONDARY")
		.setLabel("Button 1"),
	new Button()
		.setStyle("LINK")
		.setURL("https://example.com")
);

row.addComponent(
	new Button()
		.setCustomID("button_2")
		.setStyle("DANGER")
		.setLabel("Button 2"),
);
```

#### Buttons

```js
const button = new Button();

button
	.setStyle("PRIMARY")
	.setCustomID("my_cool_button")
	.setLabel("My cool button");

// Send the button.
bot.createMessage(msg.channel.id, {
	components: [new ActionRow().addComponent(button)],
});
```

#### Select Menus
```js
const menu = new SelectMenu();

menu
	.setCustomId("select_menu")
	.addOption({
		label: "Option 1",
		value: "option_one",
		description: "Option 1!"
	});
```

Refer to the types/jsdoc comments for more information.