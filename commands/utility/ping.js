const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const ping = new ButtonBuilder()
			.setCustomId('Ping!')
			.setLabel('Ping!')
			.setStyle(ButtonStyle.Primary);
		const stop = new ButtonBuilder()
			.setCustomId('Stop!')
			.setLabel('Stop!')
			.setStyle(ButtonStyle.Danger);
		const row = new ActionRowBuilder().addComponents(ping, stop);
		const primaryEmbed = new EmbedBuilder()
		.setColor("#e6a7b2")
		.setTitle('I am replying!')
		//.setURL('https://discord.js.org/')
		.setAuthor({ name: 'Ression', iconURL: 'https://imgur.com/l3IN61a.png', url: 'https://github.com/FayRd/Genosis-Discord-Bot' })
		.setDescription('Pong!')
		//.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		// .addFields(
		// 	{ name: 'Regular field title', value: 'Some value here' },
		// 	{ name: '\u200B', value: '\u200B' },
		// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
		// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
		// )
		//.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
		//.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Powered by RΞSSIФИ\'s love', iconURL: 'https://imgur.com/E2apyia.png' });
		await interaction.reply({embeds: [primaryEmbed], components: [row]});
	},
};