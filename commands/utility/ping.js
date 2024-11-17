const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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
		await interaction.reply({
			content: 'Pong!',
			components: [row],
		});
	},
};