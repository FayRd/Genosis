const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('donate')
        .setDescription('Donate to support me!'),
    async execute(interaction) {
        const select = new StringSelectMenuBuilder()
            .setCustomId('selectDonation')
            .setPlaceholder('Choose donation amount!')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('S$3.00')
                    .setDescription('Buy me a chicken wrap!')
                    .setValue('S$3.00'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('S$5.00')
                    .setDescription('Buy me a mac & cheese!')
                    .setValue('S$5.00'),
            );
        const row = new ActionRowBuilder().addComponents(select);
        const primaryEmbed = new EmbedBuilder()
            .setColor("#e6a7b2")
            .setTitle('Donate me!')
            .setDescription('Kindly support me through donations!')
            .setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
            .setTimestamp()
            .setFooter({ text: 'Powered by RΞSSIФИ\'s love', iconURL: 'https://imgur.com/E2apyia.png' });
        await interaction.reply({embeds: [primaryEmbed], components: [row]});
    },
};