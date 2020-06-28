const { base } = require('../config/config.json');
const { fetch } = require(`quick.db`)
async function updateChan(client) {
    var id
    var chan
    var mem
    let check = client.guilds.cache
    check.forEach(g => {
        id = fetch(`mcount.${g.id}`);
        chan = client.channels.cache.get(id);
        if (!chan) return;
        if (chan) {
            mem = chan.guild.memberCount;
            chan.setName(`Discord Members: ${mem}`).catch(e => {
                console.log(`Failed to update discord count for ${g.name}, maybe a programming error?`)
            })
        }
    })
}

exports.updateChan = updateChan