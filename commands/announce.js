const { MessageEmbed } = require(`discord.js`);
const {set, fetch } = require(`quick.db`);
exports.run = async(client, message, args, base, year, date) => {
    await message.delete();
    if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.reply(base.no).then(w => { setTimeout(() => { w.delete() }, 5000) });
    let ad = args.slice(0).join(` `);
    if (!ad) return message.reply(`You cannot announce nothing!`).then(w => { setTimeout(() => { w.delete() }, 5000) })
    let ecolor = fetch(`ecolor.${message.guild.id}`)
    if (!ecolor) ecolor = `00ccff`
    let embed = new MessageEmbed()
        .setColor(ecolor)
        .setDescription(ad)
        .setAuthor(`Notification From ${message.author.username}`, message.author.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 }))
        .setFooter(`© ${year} ${message.guild.name} | Made by Braxton#1000`)
        .setTimestamp()
    message.channel.send(embed);
}
exports.info = {
    name: "announce",
    category: "System Commands",
    description: "Creates an announcement embed.",
    usage: `announce <announcement>`,
    permission: `ADMINISTRATOR`
}