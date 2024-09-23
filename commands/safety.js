const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('safety')
        .setDescription('Information about the safety of using custom skins.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff') 
            .setTitle('Safety of Custom Skins')
            .setDescription(`
Are custom skins safe to be used and can you get banned for using them? Riot Games has made a statement about using custom skins where it says that it’s allowed, as long as they meet a few conditions.

**In summary:**
- “Custom models and artwork sit firmly in the “use-at-your-own-risk” category.”
- “Riot Games reserves the right to take action against applications that allow the use of our assets for free (often referred to as skin hacks).”
            `)
            .addFields(
                { name: 'Read the full article:', value: '[Riot Games Support](https://support-leagueoflegends.riotgames.com/hc/en-us/articles/225266848-Third-Party-Applications)' }
            )
            .setFooter({ text: 'Use at your own risk!' })
            .setTimestamp();
            
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
