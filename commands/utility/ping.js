const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the assistant\'s ping!'),
	async execute(interaction) {
		const ping = new ButtonBuilder()
			.setCustomId('Ping!')
			.setLabel('Ping again!')
			.setStyle(ButtonStyle.Primary);
		const row = new ActionRowBuilder().addComponents(ping);
		const primaryEmbed = new EmbedBuilder()
			.setColor("#deeb34")
			.setTitle('Wait.. hold on!')
			.setDescription('Gimme a second...')
			.setTimestamp()
			.setFooter({ text: 'Powered by RΞSSIФИ\'s love', iconURL: 'https://imgur.com/E2apyia.png' });
		let circles = {
			good: '<:High:1307619015945879572>',
			okay: '<:Mid:1307619003681865819> ',
			bad: '<:Low:1307618980944416768>',
		};
		// Defer reply
		await interaction.deferReply();
		// Edit its contents
		const pinging = await interaction.editReply({ embeds: [primaryEmbed] });

		// Ping
		const ws = interaction.client.ws.ping;
		const msgEdit = Date.now() - pinging.createdTimestamp;

		// Emoji
		const wsEmoji = ws <= 100 ? circles.good : ws <= 200 ? circles.okay : circles.bad;
		const msgEmoji = msgEdit <= 200 ? circles.good : circles.bad;

		// Update Embed
		const pingEmbed = EmbedBuilder.from(primaryEmbed)
			.setColor("#e6a7b2")
			.setTitle('Here it is!')
			.setDescription(' ')
			.setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
			.addFields(
				{ name: 'Websocket Latency', value: `${wsEmoji} \`${ws}ms\`` },
				{ name: 'API Latency', value: `${msgEmoji} \`${msgEdit}ms\`` }
			);
		// Result
		await pinging.edit({ embeds: [pingEmbed], components: [row] });
	},
};