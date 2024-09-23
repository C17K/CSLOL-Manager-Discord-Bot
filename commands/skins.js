const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const championsPath = path.join(__dirname, '../champions.json');
let championsData;

try {
    championsData = JSON.parse(fs.readFileSync(championsPath));
} catch (error) {
    console.error('JSON dosyası yüklenemedi:', error);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skins')
        .setDescription('Select a champion and get their information.')
        .addStringOption(option =>
            option.setName('champion')
                .setDescription('Choose a champion')
                .addChoices(
                    ...championsData.champion.map(champion => ({ name: champion.name, value: champion.name }))
                )
                .setRequired(true)
        ),
    async execute(interaction, languageData) {
        const selectedChampionName = interaction.options.getString('champion');
        const selectedChampion = championsData.champion.find(champion => champion.name === selectedChampionName);

        if (!selectedChampion) {
            return await interaction.reply({ content: 'Champion not found.', ephemeral: true });
        }

        const button = new ButtonBuilder()
            .setLabel('Download')
            .setStyle('Link')
            .setURL(selectedChampion.url);

        const row = new ActionRowBuilder().addComponents(button);

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(selectedChampion.name)
            .setImage(selectedChampion.image);

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
};
