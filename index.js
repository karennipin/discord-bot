require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const {
  initializeInviteCache,
  updateInviteCache,
} = require("./src/utils/inviteManager");
const { handleMemberJoin } = require("./src/commands/welcome");
const { handleMemberLeave } = require("./src/commands/leave");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildInvites,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  initializeInviteCache(client);
});

client.on("inviteCreate", (invite) => {
  updateInviteCache(client, invite);
});

client.on("guildMemberAdd", (member) => {
  handleMemberJoin(member);
});

client.on("guildMemberRemove", (member) => {
  handleMemberLeave(member);
});

client.login(process.env.DISCORD_TOKEN);
