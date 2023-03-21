const {Client,Collection,GatewayIntentBits,Partials,EmbedBuilder,SelectMenuBuilder,ActivityType} = require('discord.js');
const ms = require('ms')
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
const {Command, reloadCommands} = require('./functions');
const fs = require('fs');
const settings = require('./settings');
const config = require('./config');
bot.commands = new Collection();
bot.on('ready', () => {
    console.log("Bot is ready!");
});
let cmdlist = [];
const folders = fs.readdirSync('./commands/');
for(const folder of folders) {
    const cmdFolder = fs.readdirSync('./commands/'+folder+'/');
    for(const cmd of cmdFolder) {
        const command = require(`./commands/${folder}/${cmd}`);
        cmdlist.push(command);
    }
}
reloadCommands(cmdlist, bot);
bot.on('messageCreate', async (message) => {
    if(message.author.bot || message.content.startsWith(settings.prefix)) return;
    const rancmd = message.content.split(" ")[0].replace(settings.prefix);
    const actualcmd = bot.commands.find(c => c.name === rancmd || c.aliases.includes(rancmd));
    if(!actualcmd) return;
    await actualcmd.run(message, bot);
})

bot.login(config.token);