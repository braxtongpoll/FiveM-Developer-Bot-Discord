const { fetch } = require(`quick.db`)
async function cc(client) {
    var id
    var chan
    var mem
    var rid
    let check = client.guilds.cache
    check.forEach(g => {
        id = fetch(`ccount.${g.id}`);
        rid = fetch(`crole.${g.id}`)
        chan = client.channels.cache.get(id);
        if (!chan) return;
        if (chan) {
            let role = chan.guild.roles.cache.find(c => c.id === rid)
            if (!role) return;
            let use = chan.guild.members.cache
            var tot = 0
            use.forEach(w => {
                if (w.roles.cache.has(role.id)) {
                    tot = tot + 1
                }
            })
            chan.setName(`Clients: ${tot}`).catch(e => {
                console.log(`Failed to update discord count, maybe a programming error?`)
            })
        }
    })
}

exports.cc = cc