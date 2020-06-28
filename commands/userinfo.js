const { MessageEmbed, Permissions } = require(`discord.js`)
const { fetch } = require(`quick.db`)
exports.run = async(client, message, args, base, year, date) => {
    await message.delete()
    let user = await message.mentions.members.first() || args.slice(0).join(` `)
    let mem = await message.guild.members.cache.find(c => c.id === user.id)
    if (!mem) return message.reply(`Member not found.`)
    let stat = await mem.presence.status.toUpperCase()
    let roles = await user.roles.cache.map(r => `${r}`)
    let tag = await `**Name:** ${mem.user.username}\n**Tag:** ${mem.user.tag}\n**ID:** ${mem.id}`
    let ecolor = await fetch(`${message.guild.id}.eColor`)
    if (ecolor == undefined || null) ecolor = `00ccff`
    var joinDiscord = await mem.user.createdAt
    var joinServer = await mem.joinedAt
    var d = joinDiscord,
        dformat = [d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()
        ].join('/') + ' ' + [d.getHours(),
            d.getMinutes(),
            d.getSeconds()
        ].join(':');
    var f = joinServer,
        fformat = [f.getMonth() + 1,
            f.getDate(),
            f.getFullYear()
        ].join('/') + ' ' + [f.getHours(),
            f.getMinutes(),
            f.getSeconds()
        ].join(':');
    const arr = message.guild.members.cache.array();
    arr.sort((a, b) => a.joinedAt - b.joinedAt);
    var tt
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === user.id) tt = i + 1;
    }
    let parr = mem.permissions
    console.log(parr)
    let image = await user.user.displayAvatarURL({ format: `png`, dynamic: true, size: 2048 })
    let embed = new MessageEmbed()
        .setFooter(`Request by: ${message.author.tag} | © ${year} ${message.guild.name} | Made by Braxton#1000`)
        .setTimestamp()
        .setAuthor(`User Info`)
        .setThumbnail(image)
        .setColor(ecolor)
        .addFields({ name: `Created Date`, value: dformat, inline: true }, { name: `Joined Date`, value: `${fformat}`, inline: true }, { name: `Status`, value: stat, inline: true }, { name: `Roles`, value: roles, inline: true }, { name: `User Info`, value: tag, inline: true }, { name: `Other Info`, value: `Tag: ${mem.user}\nJoin Position: ${tt}\nPermission Level: ${parr.bitfield}`, inline: true })
    let waiter = new MessageEmbed()
        .setColor(ecolor)
        .setDescription(`Rendering ${mem.user.username}'s Profile 3 seconds remaining..`)
    let e1 = new MessageEmbed()
        .setColor(ecolor)
        .setDescription(`Rendering ${mem.user.username}'s Profile 2 seconds remaining..`)
    let e2 = new MessageEmbed()
        .setColor(ecolor)
        .setDescription(`Rendering ${mem.user.username}'s Profile  1 seconds remaining..`)
    message.channel.send(waiter).then((w) => {
        setTimeout(() => {
            w.edit(e1);
        }, 1500)
        setTimeout(() => {
            w.edit(e2);
        }, 1500)
        setTimeout(() => {
            w.edit(embed);
        }, 1500)
    })
}


exports.info = {
    name: "userinfo",
    category: "Base Commands",
    description: "Checks information of a user"
}