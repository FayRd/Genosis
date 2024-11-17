const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Receive a randomised number!')
        .addIntegerOption(option =>
            option.setName('min_value')
                .setDescription('The minimum value (inclusive)')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('max_value')
                .setDescription('The maximum value (inclusive)')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')),
    async execute(interaction) {
        const minValue = interaction.options.getInteger('min_value');
        const maxValue = interaction.options.getInteger('max_value');
        const randomEphemeral = interaction.options.getBoolean('ephemeral');
        let result = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

        const primaryEmbed = new EmbedBuilder()
            .setColor("#e6a7b2")
            .setTitle('I picked a random number!')
            .setDescription('_Press :arrow_up_small: to randomise again!_')
            .setFields(
                { name: `You said from \`${minValue}\` to \`${maxValue}\`, right?`, value: `\`${result}\`` }
            )
            .setTimestamp()
            .setFooter({ text: 'Powered by RΞSSIФИ\'s love', iconURL: 'https://imgur.com/E2apyia.png' });
        await interaction.reply({ embeds: [primaryEmbed], ephemeral: randomEphemeral });
    }
};