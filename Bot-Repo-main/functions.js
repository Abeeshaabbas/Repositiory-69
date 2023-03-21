function Command(name, description, code, aliases, ownerOnly){
        this.name = name;
        this.description = description;
        this.aliases = aliases;
        this.ownerOnly = ownerOnly;
        this.code = code;
    
}

async function reloadCommands(commands, bot) {
    for(let i=0;i<commands.length;i++) {
        if(!commands[i].name || !commands[i].run) {
            console.log("One of the command file doesn't have named!");
            continue;
        }
        bot.commands.sweep(() => true);
        bot.commands.set(commands[i].name, commands[i]);
        return console.log("Successfully reloaded command: "+commands[i].name)
    }
}