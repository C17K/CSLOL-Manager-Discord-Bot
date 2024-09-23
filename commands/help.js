const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of available commands and their descriptions.'),
    async execute(interaction) {
        const translations = {
            title: 'Bot Commands',
            description: 'Here is a list of available commands:',
            commands: [
                { name: '/download', value: 'Download the latest version of CSLOL Manager.' },
                { name: '/skins', value: 'Select a champion and get their information.' },
                { name: '/safety', value: 'Get information about the safety of custom skins.' },
            ],
            languages: 'You can choose from the following languages:',
        };

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(translations.title)
            .setDescription(translations.description);

        translations.commands.forEach(command => {
            embed.addFields({ name: command.name, value: command.value });
        });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
