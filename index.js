const { Client, Collection, MessageEmbed, MessageReaction, Message } = require('discord.js');
const { Developer, base } = require('./config/config.json')
const { success, error, warning, info } = require('log-symbols');
const moment = require('moment')
const { readdirSync, existsSync } = require('fs')
const { fetch, set } = require(`quick.db`)

const path = './license.md' && `./package.json`

try {
    if (!existsSync(path)) {
        return console.log(`Missing required files! Bot start fail.`)
    }
} catch (err) {
    console.error(err)
}
if (process.version.slice(1).split('.') < 13) throw new Error(`Please use Node 13 or higher.`)

const client = new Client()

client.commands = new Collection()
global.author = require('./package.json').author
global.version = require('./package.json').version;
if (Developer.debug == true) {
    client.on('debug', d => console.log(warning, `[${moment().format('YYY-MM-DD HH:mm:ss')}]: ${d}`))
}

const init = async function() {
    const cmds = await readdirSync(`./commands/`)
    global.totalCmds = cmds.length;
    console.log(info, `Loading ${global.totalCmds} commands...`)
    cmds.forEach(f => {
        try {
            const p = require(`./commands/${f}`)
            client.commands.set(p.info.name, p)
            console.log(success, `[${p.info.category}] ${p.info.name} loaded.`)
        } catch (e) {
            console.warn(error, `Failed to load a command [${e}]`)
        }
    })
    if (global.totalCmds == 0) console.log(info, `No command files loaded.`)
    console.log(info, `All commands loaded [${global.totalCmds}]`)

    const events = await readdirSync(`./events/`)
    console.log(info, `Loading ${events.length} events.`)
    events.forEach(f => {
        const name = f.split('.')[0];
        console.log(success, `Loading ${name}`)
        const event = require(`./events/${f}`)
        client.on(name, event.bind(null, client))
        delete require.cache[require.resolve(`./events/${f}`)]
    })
    if (events.length == 0) console.log(info, `No event files loaded.`)
    console.log(info, `All events loaded [${events.length}]`)
    client.login(base.token).catch(e => console.log(error, `Failed to login [${e}]`))
}

client.on(`guildMemberAdd`, function(member) {
    let check = fetch(`wlog.${member.guild.id}`);
    let chan = client.channels.cache.get(check);
    if (!chan) return;
    chan.send(`${member}(${member.user.tag}) **Joined**`)
})
client.on(`guildMemberRemove`, function(member) {
    let check = fetch(`wlog.${member.guild.id}`);
    let chan = client.channels.cache.get(check);
    if (!chan) return;
    chan.send(`${member}(${member.user.tag}) **Left**`)
})

init()