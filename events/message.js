const { base, Developer } = require('../config/config.json');
const { error, success, info } = require('log-symbols');


module.exports = (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const currentdate = new Date();
    const year = currentdate.getFullYear();
    const date = currentdate.getDate() + `/` + currentdate.getMonth() + `/` + currentdate.getFullYear()
    const args = message.content.slice(base.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase()
    const cmd = client.commands.get(command);
    if (message.content.startsWith(base.prefix)) {
        if (cmd) {
            try {
                cmd.run(client, message, args, base, year, date)
            } catch (e) {
                message.delete()
                message.channel.send(`I failed to run that command, please try again.`).then(a => a.delete(5000))
                return console.log(error, `[NON-FATAL]: ${e}`)
            }
        } else {
            if (!cmd && base.unknownResponses == true) {
                return;
            } else {
                return;
            }
        }
    }
}