const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'download',
        description: 'Download a file with a button!',
    },
    async execute(interaction, languageData) {
        const language = languageData[interaction.guild.id] || 'en';

        const messages = {
            en: {
                title: 'CSLOL',
                footer: 'Download the latest version of CSLOL Manager.',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: 'How to Use?',
            },
            tr: {
                title: 'CSLOL',
                footer: 'CSLOL Manager’ın en son sürümünü indirin.',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: 'Nasıl kullanırım?',
            },
            es: {
                title: 'CSLOL',
                footer: 'Descargue la última versión de CSLOL Manager.',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: '¿Cómo usar?',
            },
            fr: {
                title: 'CSLOL',
                footer: 'Téléchargez la dernière version de CSLOL Manager.',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: 'Comment utiliser?',
            },
            de: {
                title: 'CSLOL',
                footer: 'Laden Sie die neueste Version von CSLOL Manager herunter.',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: 'Wie benutzt man?',
            },
            it: {
                title: 'CSLOL',
                footer: 'Scarica l\'ultima versione di CSLOL Manager.',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: 'Come si usa?',
            },
            pt: {
                title: 'CSLOL',
                footer: 'Baixe a versão mais recente do CSLOL Manager.',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: 'Como usar?',
            },
            ru: {
                title: 'CSLOL',
                footer: 'Скачайте последнюю версию CSLOL Manager.',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: 'Как пользоваться?',
            },
            zh: {
                title: 'CSLOL',
                footer: '下载最新版本的 CSLOL Manager。',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: '如何使用？',
            },
            ja: {
                title: 'CSLOL',
                footer: '最新バージョンの CSLOL Manager をダウンロードしてください。',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: '使い方は？',
            },
            ko: {
                title: 'CSLOL',
                footer: 'CSLOL Manager의 최신 버전을 다운로드하세요.',
                windows: 'Windows',
                macos: 'macOS',
                howToUse: '사용 방법은?',
            },
        };

        const message = messages[language];

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(message.title)
            .setThumbnail('https://lcsmanager.com/wp-content/uploads/2022/01/LCSManagerLogo.png')
            .setFooter({ text: message.footer });

        const windows = 'https://github.com/LeagueToolkit/cslol-manager/releases';
        const macos = 'https://github.com/LeagueToolkit/cslol-manager/releases';
        const howToUseLink = 'https://lcsmanager.com/how-to-use/';

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(windows)
                    .setLabel(message.windows)
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL(macos)
                    .setLabel(message.macos)
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL(howToUseLink)
                    .setLabel(message.howToUse)
                    .setStyle(ButtonStyle.Link),
            );

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true,
        });
    },
};
