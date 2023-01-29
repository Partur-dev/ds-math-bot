import { config } from "dotenv";
import { evaluate } from "mathjs";
import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
  ],
});

const quote = (text) => "```" + text + "```";

client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith("m") && !msg.content.startsWith("ь")) return;

  const content = msg.content.slice(1).trim();

  try {
    const result = evaluate(content);

    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setDescription(quote(content))
      .addFields([
        {
          name: "Dec",
          value: quote(result.toString()),
          inline: true,
        },
        {
          name: "Hex",
          value: quote(result.toString(16)),
          inline: true,
        },
        {
          name: "Bin",
          value: quote(result.toString(2)),
          inline: true,
        },
      ]);

    msg.reply({
      embeds: [embed],
      allowedMentions: {
        repliedUser: false,
      },
    });
  } catch (_) {}
});

client.login();
