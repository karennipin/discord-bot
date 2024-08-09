const { EmbedBuilder } = require("discord.js");
const { findInviter } = require("../utils/inviteManager");

module.exports = {
  async handleMemberJoin(member) {
    try {
      const channel =
        member.guild.channels.cache.find((ch) => ch.name === "welcome") ||
        member.guild.channels.cache.find((ch) => ch.name === "general");

      if (!channel) return;

      const fetchedInvites = await member.guild.invites.fetch();
      const inviter = findInviter(member.client, fetchedInvites);

      const embed = new EmbedBuilder()
        .setTitle("Welcome to the Server!")
        .setDescription(
          `Hello **${member.user.tag}**, welcome to **${member.guild.name}**! 🎉`
        )
        .addFields({
          name: "Invited by",
          value: inviter ? `**${inviter.tag}**` : "Unknown",
        })
        .setColor("#00FF00")
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: "Enjoy your stay!" });

      channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Failed to handle member join:", error);
    }
  },
};
