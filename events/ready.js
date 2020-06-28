const { error, success, info } = require('log-symbols');
const { base } = require('../config/config.json');
const { updateChan } = require(`../function/memcount.js`)
const { cc } = require(`../function/clientcount.js`)
module.exports = async client => {
    setTimeout(() => {
        console.log(success, `Logged in as ${client.user.tag}`)
        if (base.type !== `PLAYING` || base.type !== `WATCHING`) base.type = `PLAYING`
        if (base.status !== `dnd` || base.status !== `away`) base.status = `online`
        client.user.setPresence({
            activity: {
                name: base.name,
                type: base.type
            },
            status: base.status
        })
        setInterval(() => {
            updateChan(client)
            cc(client)
        }, 5000)
        console.log(info, `This is the invite for your bot! https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8%60`)
        console.log(info, `Made by Xen Development | Updates are posted in GitHub @ https://github.com/braxtongpoll/FiveM-Developer-Bot-Discord`)
    }, 2000)
}