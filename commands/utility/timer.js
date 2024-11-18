const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('timer')
        .setDescription('Will alert you when the time is up!')
        .addIntegerOption(option =>
            option.setName('minutes')
                .setDescription('Timer in minutes'))
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('Timer in seconds'))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to alert in'))
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the alert should be ephemeral')),
    async execute(interaction) {
        let circles = {
            clock: '<:Clock:1307667207358255104>',
        };
        // Button definitions
        const check = new ButtonBuilder()
            .setCustomId('check')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⏲️');
        const pause = new ButtonBuilder()
            .setCustomId('pause')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⏸️');
        const resume = new ButtonBuilder()
            .setCustomId('resume')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('▶️');
        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('⏹️');

        // Row definitions
        const playedRow = new ActionRowBuilder().addComponents(check, pause, cancel);
        const pausedRow = new ActionRowBuilder().addComponents(check, resume, cancel);

        // Process start
        let timerIsEnded = false;
        if (!interaction.options.getInteger('minutes') && !interaction.options.getInteger('seconds')) {
            await interaction.reply({ content: 'Uh... for how long?', ephemeral: true });
            return;
        };
        const minutes = interaction.options.getInteger('minutes') || 0;
        const seconds = interaction.options.getInteger('seconds') || 0;
        const ephemeral = interaction.options.getBoolean('ephemeral');

        // Confirmation Embed (Stage 1)
        const confirmationEmbed = new EmbedBuilder()
            .setColor("#e6a7b2")
            .setTitle('Timer Started')
            .setDescription('I will alert you, so don\'t get startled!')
            .setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
            .addFields(
                { name: 'Time set:', value: `${circles.clock} \`${minutes}\` minutes : \`${seconds}\` seconds` },
            )
            .setTimestamp()
            .setFooter({ text: 'Powered by RΞSSIФИ\'s love', iconURL: 'https://imgur.com/E2apyia.png' });

        await interaction.reply({ embeds: [confirmationEmbed], components: [playedRow], ephemeral: ephemeral });

        // Process in-progress
        const finalEmbed = new EmbedBuilder()
        .setColor("#e6a7b2")
        .setTitle('Timer Ended')
        .setDescription('Hey, time is up!')
        .setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
        .addFields(
            { name: 'Time set:', value: `${circles.clock} \`0\` minutes : \`0\` seconds` },
        )
        .setTimestamp()
        .setFooter({ text: 'Powered by RΞSSIФИ\'s love', iconURL: 'https://imgur.com/E2apyia.png' });

        const totalSeconds = minutes * 60 + seconds;
        const totalMiliseconds = totalSeconds * 1000;
        setTimeout(async () => {
            await interaction.editReply({ embeds: [finalEmbed], ephemeral: ephemeral });
            timerIsEnded = true;
        }, totalMiliseconds);
    }
};
