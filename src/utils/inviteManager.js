module.exports = {
  initializeInviteCache(client) {
    client.invites = {};

    client.guilds.cache.forEach((guild) => {
      guild.invites
        .fetch()
        .then((guildInvites) => {
          guildInvites.forEach((invite) => {
            client.invites[invite.code] = invite.uses;
          });
        })
        .catch(console.error);
    });
  },

  updateInviteCache(client, invite) {
    client.invites[invite.code] = invite.uses;
  },

  findInviter(client, fetchedInvites) {
    let inviter;
    fetchedInvites.forEach((invite) => {
      if (invite.uses > (client.invites[invite.code] || 0)) {
        inviter = invite.inviter;
        client.invites[invite.code] = invite.uses; // Update stored invite uses
      }
    });
    return inviter;
  },
};
