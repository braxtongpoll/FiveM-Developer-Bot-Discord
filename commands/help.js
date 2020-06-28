const { MessageEmbed, Permissions } = require(`discord.js`)
const { fetch } = require(`quick.db`)
exports.run = async(client, message, args, base, year, date) => {
    await message.delete()
    let ecolor = fetch(`ecolor.${message.guild.id}`)
    if (!ecolor) ecolor = `00ccff`
    let embed = new MessageEmbed()
        .setFooter(`© ${year} ${message.guild.name} | Made by Braxton#1000`)
        .setThumbnail(client.user.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 }))
        .setColor(ecolor)
        .setAuthor(`Bot Commands`)
        .addFields({
            name: `announce`,
            value: `Announces a message in that channel.`,
            inline: true
        }, {
            name: `embed`,
            value: `Creates an embed in that channel.`,
            inline: true
        }, {
            name: `settings`,
            value: `Settings for your guild.`,
            inline: true
        }, {
            name: `userinfo`,
            value: `Checks the info of a user.`,
            inline: true
        }, {
            name: `kick/ban`,
            value: `Kicks/Bans a user.`,
            inline: true
        }, {
            name: `say`,
            value: `Has the bot say something.`,
            inline: true
        })
    message.channel.send(embed)
}

exports.info = {
    name: "help",
    category: "Base Commands",
    description: "Checks information of a user"
}