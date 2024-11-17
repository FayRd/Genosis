const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Get the assistant\'s uptime!'),
	async execute(interaction) {
		const primaryEmbed = new EmbedBuilder()
			.setColor("#deeb34")
			.setTitle('Wait.. hold on!')
			.setDescription('Gimme a second...')
			.setTimestamp()
			.setFooter({ text: 'Powered by RΞSSIФИ\'s love', iconURL: 'https://imgur.com/E2apyia.png' });
		let circles = {
			clock: '<:Clock:1307667207358255104>',
		};
		// Defer reply
		await interaction.deferReply();
		// Edit its contents
		const uptime = await interaction.editReply({ embeds: [primaryEmbed] });

		// Uptime
		let days = Math.floor(interaction.client.uptime / 86400000);
		let hours = Math.floor((interaction.client.uptime % 86400000) / 3600000) % 24;
		let minutes = Math.floor((interaction.client.uptime % 3600000) / 60000) % 60;
		let seconds = Math.floor((interaction.client.uptime % 60000) / 1000) % 60;

		// Update Embed
		const uptimeEmbed = EmbedBuilder.from(primaryEmbed)
			.setColor("#e6a7b2")
			.setTitle('Here it is!')
			.setDescription(' ')
			.setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
			.addFields(
				{
					name: `I\'ve been alive for:`,
					value: `${circles.clock} \`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds!\``
				},
			);
		// Result
		await uptime.edit({ embeds: [uptimeEmbed] });
	},
};