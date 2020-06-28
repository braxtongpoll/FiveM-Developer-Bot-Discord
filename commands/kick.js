const { fetch } = require(`quick.db`);
exports.run = async(client, message, args, base, year, date) => {
    await message.delete()
    if (!message.member.hasPermission(`KICK_MEMBERS`)) return message.reply(base.no).then(w => { setTimeout(() => { w.delete() }, 5000) })
    let use = message.mentions.members.first()
    const mem = message.guild.members.cache.find(c => c.id === use.id)
    const reason = args.slice(1).join(` `) || `No reason supplied!`
    if (mem.id == message.author.id) return message.reply(`You cannot kick yourself!`).then(w => { setTimeout(() => { w.delete() }, 5000) })
    const mtosend = `🚫 ${date} ${mem}(${mem.user.tag}) kicked by ${message.author.tag} for reason: ${reason}`
    let id = fetch(`log.${message.guild.id}`)
    let chan = message.guild.channels.cache.find(c => c.id === id)
    await mem.send(mtosend).catch(() => { message.channel.send(`Could not DM the user a reason for the kick. Kick success.`) })
    mem.kick(`${reason}`)
    if (!chan) return message.channel.send(mtosend)
    if (chan) return chan.send(mtosend)
}
exports.info = {
    name: "kick",
    category: "Moderation Commands",
    description: "Kicks a user.",
    usage: `kick @user <reason>`,
    permission: `KICK_MEMBERS`
}