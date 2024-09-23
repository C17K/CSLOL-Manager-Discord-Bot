const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlanguage')
        .setDescription('Select the language.')
        .addStringOption(option =>
            option.setName('language')
                .setDescription('Choose a language.')
                .addChoices(
                    { name: 'English', value: 'en' },
                    { name: 'Türkçe', value: 'tr' },
                    { name: 'Español', value: 'es' },
                    { name: 'Français', value: 'fr' },
                    { name: 'Deutsch', value: 'de' },
                    { name: 'Italiano', value: 'it' },
                    { name: 'Português', value: 'pt' },
                    { name: 'Русский', value: 'ru' },
                    { name: '中文', value: 'zh' },
                    { name: '日本語', value: 'ja' },
                    { name: '한국어', value: 'ko' }
                )
                .setRequired(true)),
    async execute(interaction, languageData) {
        const language = languageData[interaction.guild.id] || 'en';

        const messages = {
            noPermission: {
                en: 'You do not have permission to use this command.',
                tr: 'Bu komutu kullanmak için yetkiniz yok.',
                es: 'No tienes permiso para usar este comando.',
                fr: 'Vous n\'avez pas la permission d\'utiliser cette commande.',
                de: 'Sie haben nicht die Berechtigung, diesen Befehl zu verwenden.',
                it: 'Non hai il permesso di usare questo comando.',
                pt: 'Você não tem permissão para usar este comando.',
                ru: 'У вас нет разрешения использовать эту команду.',
                zh: '您没有权限使用此命令。',
                ja: 'このコマンドを使用する権限がありません。',
                ko: '이 명령을 사용할 권한이 없습니다.'
            }
        };

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return await interaction.reply({ content: messages.noPermission[language], ephemeral: true });
        }

        const selectedLanguage = interaction.options.getString('language');
        languageData[interaction.guild.id] = selectedLanguage;

        const languageDataPath = path.join(__dirname, '../languageData.json');
        fs.writeFileSync(languageDataPath, JSON.stringify(languageData, null, 2));

        const successMessages = {
            en: `Language successfully set to: **${selectedLanguage}**`,
            tr: `Dil başarıyla ayarlandı: **${selectedLanguage}**`,
            es: `Idioma configurado correctamente en: **${selectedLanguage}**`,
            fr: `Langue définie sur : **${selectedLanguage}**`,
            de: `Sprache erfolgreich auf: **${selectedLanguage}** eingestellt`,
            it: `Lingua impostata su: **${selectedLanguage}**`,
            pt: `Idioma definido como: **${selectedLanguage}**`,
            ru: `Язык успешно установлен на: **${selectedLanguage}**`,
            zh: `语言成功设置为：**${selectedLanguage}**`,
            ja: `言語が正常に設定されました: **${selectedLanguage}**`,
            ko: `언어가 성공적으로 설정되었습니다: **${selectedLanguage}**`
        };

        const responseMessage = successMessages[selectedLanguage] || successMessages.en;

        await interaction.reply({ content: responseMessage, ephemeral: true });
    },
};
