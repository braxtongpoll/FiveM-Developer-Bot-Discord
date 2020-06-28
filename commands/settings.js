const { MessageEmbed } = require(`discord.js`);
const {set, fetch } = require(`quick.db`);
exports.run = async(client, message, args, base, year, date) => {
    await message.delete()
    if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.reply(base.no).then(w => { setTimeout(() => { w.delete() }, 5000) })
    let ecolor = fetch(`ecolor.${message.guild.id}`)
    if (!ecolor) ecolor = `00ccff`
    let ww = fetch(`wlog.${message.guild.id}`)
    let wlog = message.guild.channels.cache.get(ww)
    if (!wlog) wlog = `**Not Set**`
    let memcount = fetch(`mcount.${message.guild.id}`);
    let mcount = message.guild.channels.cache.get(memcount)
    if (!mcount) mcount = `**Not Set**`
    let clientcount = fetch(`ccount.${message.guild.id}`);
    let ccount = message.guild.channels.cache.get(clientcount)
    if (!ccount) ccount = `**Not Set**`
    let cc = fetch(`crole.${message.guild.id}`)
    let crole = message.guild.roles.cache.find(c => c.id === cc)
    if (!crole) crole = `**Not Set**`
    let sug = fetch(`suggestion.${message.guild.id}`)
    let schan = message.guild.channels.cache.find(c => c.id === sug)
    if (!schan) schan = `**Not Set**`
    let suglog = fetch(`suglog.${message.guild.id}`)
    let schanlog = message.guild.channels.cache.find(c => c.id === sug)
    if (!schanlog) schanlog = `**Not Set**`
    let embed = new MessageEmbed()
        .setFooter(`© ${year} ${message.guild.name} | Made by Braxton#1000`)
        .setAuthor(`${message.guild.name} Settings`)
        .addFields({
            name: `Welcome Leave Logs`,
            value: `**wlog** - The logging channel for users joining/leaving the guild.\nCurrently set to: ${wlog}`,
            inline: true
        }, {
            name: `Discord Member Counter`,
            value: `**memcount** - The channel to live update the number of users in the guild.\nCurrently set to: ${mcount}`,
            inline: true
        }, {
            name: `Client Counter`,
            value: `**clientcount** - The channel to live update the number of clients in the guild.\nChannel currently set to: ${ccount}\nRole currently set to: ${crole}`,
            inline: true
        }, {
            name: `Suggestion Module`,
            value: `**suggest** - This sets the channel for suggestions to be logged.\nCurrently set to: ${schan}\n**suggestlog** - This sets the channel for accepted, denied, suggestions to be logged to.\nCurrently set to: ${schanlog}`,
            inline: true
        })
        .setColor(ecolor)
        .setDescription(`To set these guild settings simply run the command **settings <setting>** example .settings wlog\nIf you are having any troubles you can join our support discord [here](https://discord.gg/3zkj2z2)`)
    if (!args[0]) message.channel.send(embed)
    if (args[0]) {
        if (args[0] == `wlog`) {
            const { set } = require(`quick.db`)
            const filter = response => {
                return response.author.id === message.author.id
            };
            message.channel.send(`Please type the **ID** of the channel you wish to send welcome/leave logs to.`).then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(collected => {
                    let slog = collected.first().content;
                    let find = message.guild.channels.cache.find(r => r.id === slog)
                    if (!find) return message.reply(`That doesn't seem to be a **valid** channel. Please try again.`)
                    set(`wlog.${message.guild.id}`, slog)
                    message.reply(`The welcome/leave log channel was set to ${find}`)
                    message.channel.bulkDelete(2)
                }).catch((e) => {
                    message.channel.send(`Im sorry, you didnt send a message within the 60 second time limit `)
                })
            })
        } else if (args[0] == `memcount`) {
            const { set } = require(`quick.db`)
            const filter = response => {
                return response.author.id === message.author.id
            };
            message.channel.send(`Please type the **ID** of the channel you wish to display the live count of discord members to.`).then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(collected => {
                    let slog = collected.first().content;
                    let find = message.guild.channels.cache.find(r => r.id === slog)
                    if (!find) return message.reply(`That doesn't seem to be a **valid** channel. Please try again.`)
                    set(`mcount.${message.guild.id}`, slog)
                    message.reply(`The member counter channel was set to ${find}. Keep in mind this can take up to a minute to update.`)
                    message.channel.bulkDelete(2)
                }).catch((e) => {
                    message.channel.send(`Im sorry, you didnt send a message within the 60 second time limit `)
                })
            })
        } else if (args[0] == `clientcount`) {
            const { set } = require(`quick.db`)
            const filter = response => {
                return response.author.id === message.author.id
            };
            message.channel.send(`Please type the **ID** of the channel you wish to display the live count of clients/customers to.`).then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(collected => {
                    let slog = collected.first().content;
                    message.channel.send(`Please type the **ID** of the role for the client/customer.`).then(() => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(collected => {
                            let crole = collected.first().content;
                            let find = message.guild.channels.cache.find(r => r.id === slog)
                            let rfind = message.guild.roles.cache.find(c => c.id === crole)
                            if (!find) return message.reply(`That doesn't seem to be a **valid** channel. Please try again.`)
                            if (!rfind) return message.reply(`That doesn't seem to be a **valid** role. Please try again.`)
                            set(`ccount.${message.guild.id}`, slog)
                            set(`crole.${message.guild.id}`, crole)
                            message.reply(`The client/customer counter channel was set to ${find}. Keep in mind this can take up to a minute to update.`)
                            message.channel.bulkDelete(2)
                        }).catch((e) => {
                            message.channel.send(`Im sorry, you didnt send a message within the 60 second time limit `)
                        })
                    })
                })
            })
        }
    }
}
exports.info = {
    name: "settings",
    category: "Guild Commands",
    description: "Settings for the guild",
    usage: `settings <setting>`,
    permission: `ADMINISTRATOR`
}