const { MessageEmbed } = require(`discord.js`);
const {set, fetch } = require(`quick.db`);
exports.run = async(client, message, args, base, year, date) => {
    await message.delete();
    if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.reply(base.no).then(w => { setTimeout(() => { w.delete() }, 5000) });
    const filter = response => {
        return response.author.id === message.author.id
    };
    message.channel.send(`What is the name/title of the product you wish to post?`).then(() => {
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
        }).then(collected => {
            var name = collected.first().content;
            message.channel.send(`What is the description of the product? Please include a price!`).then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(collected => {
                    var price = collected.first().content;
                    message.channel.send(`Image link for embed if anything`).then(() => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(collected => {
                            var image = collected.first().content;
                            var ecolor = fetch(`ecolor.${message.guild.id}`)
                            if (!ecolor) ecolor = `00ccff`
                            let embed = new MessageEmbed()
                                .setColor(ecolor)
                                .setTitle(name)
                                .setDescription(price)
                                .setAuthor(`Notification From ${message.author.username}`, message.author.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 }))
                                .setFooter(`© ${year} ${message.guild.name} | Made by Braxton#1000`)
                                .setTimestamp()
                            if (image) embed.setImage(image)
                            message.channel.send(embed);
                        })
                    })
                })
            })
        })
    })
}
exports.info = {
    name: "post",
    category: "Post Commands",
    description: "Creates a new product embed.",
    usage: `post`,
    permission: `ADMINISTRATOR`
}