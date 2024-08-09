const { EmbedBuilder } = require("discord.js");

module.exports = {
  async handleMemberLeave(member) {
    try {
      const channel =
        member.guild.channels.cache.find((ch) => ch.name === "welcome") ||
        member.guild.channels.cache.find((ch) => ch.name === "general");

      if (!channel) return;

      const embed = new EmbedBuilder()
        .setTitle("Farewell!")
        .setDescription(`**${member.user.tag}** has left the server. 😢`)
        .setColor("#FF0000")
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: "We're sad to see you go!" });

      channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Failed to handle member leave:", error);
    }
  },
};
