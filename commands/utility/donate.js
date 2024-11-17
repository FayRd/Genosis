const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('donate')
        .setDescription('Donate to support me!'),
    async execute(interaction) {
        const select = new StringSelectMenuBuilder()
            .setCustomId('Select')
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
        const cancel = new ButtonBuilder()
            .setCustomId('Cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Danger);
        const row = new ActionRowBuilder().addComponents(select);
        const primaryEmbed = new EmbedBuilder()
            .setColor("#e6a7b2")
            .setTitle('Donate me!')
            //.setURL('https://discord.js.org/')
            .setAuthor({ name: 'Ression', iconURL: 'https://imgur.com/l3IN61a.png', url: 'https://github.com/FayRd/Genosis-Discord-Bot' })
            .setDescription('Kindly support me through donations!')
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