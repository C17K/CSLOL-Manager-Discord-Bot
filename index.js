const { Client, GatewayIntentBits, REST, Routes, ActivityType } = require('discord.js');
const { token, clientId } = require('./config.json');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

const languageDataPath = path.join(__dirname, 'languageData.json');
let languageData = {};

if (fs.existsSync(languageDataPath)) {
    languageData = JSON.parse(fs.readFileSync(languageDataPath));
}

const commands = [];
client.commands = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (!command.data || typeof command.execute !== 'function') {
        console.error(`Komut dosyası eksik veya hatalı: ${file}`);
        continue;
    }
    commands.push(command.data);
    client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });
        console.log('Komutlar başarıyla kaydedildi!');
    } catch (error) {
        console.error('Komut kaydetme hatası:', error);
    }
})();

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (command) {
            await command.execute(interaction, languageData);
        }
    }
});

client.once('ready', () => {
    console.log('Giriş yapıldı!');
    client.user.setActivity('/skins', { type: ActivityType.Listening });
    client.user.setStatus('dnd');
});

client.login(token);
