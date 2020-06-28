const { MessageEmbed } = require(`discord.js`);
const {set, fetch } = require(`quick.db`);
exports.run = async(client, message, args, base, year, date) => {
    await message.delete();
    if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.reply(base.no).then(w => { setTimeout(() => { w.delete() }, 5000) })
    const filter = response => {
        return response.author.id === message.author.id
    };
    message.channel.send(`Image link for embed if anything`).then(() => {
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
        }).then(collected => {
            var image = collected.first().content;
            message.channel.send(`Image link for embed if anything`).then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(collected => {
                    var image = collected.first().content;
                    message.channel.send(`Image link for embed if anything`).then(() => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(collected => {
                            var image = collected.first().content;

                        })
                    })
                })
            })
        })
    })
}
exports.info = {
    name: "embed",
    category: "Base Commands",
    description: "Creates a neat embed",
    usage: `embed`,
    permission: `ADMINISTRATOR`
}