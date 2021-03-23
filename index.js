const express = require("express");
const app = express();
app.listen(() => console.log("our youtube channel https://www.youtube.com/channel/UC7QtAaqlUhBmMojJISSLJkg"));
app.use('/ping', (req, res) => {
  res.send(new Date());
});
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "USER", "REACTION"] });
client.on('ready', () => {
  console.log(`[${client.user.tag}] Is Ready`);
})
const enmap = require('enmap');
const prefix = '#'
client.login("").catch(err => {
  console.log('[ DISCORD API ] INVIELD TOKEN')
})

const settings = new enmap({
  name: "settings",
  autoFetch: true,
  cloneLevel: "deep",
  fetchAll: true
});

client.on('message', async (message) => {
  if (!message.guild || message.author.bot) return false;
  if (message.content == prefix + 'ping') {
    const msg = await message.channel.send("PING BONG RONG BY NIRO😂😂");
    msg.delete();
    message.channel.send(`\`\`\`javascript\nDiscord API: ${Math.round(client.ping)}ms\nTime taken: ${msg.createdTimestamp - message.createdTimestamp}\n\`\`\` `)
  }
})

client.on('message', async message => {
  if (message.content.indexOf(prefix) !== 0) return;
  if (message.content.startsWith(prefix + "ticket-setup")) {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('❌' + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(`**Error** I Don\'t have MANAGE_CHANNELS Permission to do this`)
      );
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed().setDescription('❌' + " **You Need `MANAGE_CHANNELS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send(new Discord.MessageEmbed().setAuthor('The use is wrong!').setDescription(`**
        the use : ${prefix}ticket-setup #channel
        **`).setColor("BLUE"));

    let sent = await channel.send(new Discord.MessageEmbed()
      .setTitle("**Ticket Bot**")
      .setDescription("**React With 📩 To Create a Ticket**")
      .setFooter("made by @ニロ#3892")
      .setColor("BLUE")
    );

    sent.react('📩');
    settings.set(`${message.guild.id}-ticket`, sent.id);

    message.channel.send("**Ticket System Setup Done :>**")
  }

  if (message.content.startsWith(prefix + "close")) {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('❌' + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(`**Error** I Don\'t have MANAGE_CHANNELS Permission to do this`)
      );
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed().setDescription('❌' + " **You Need `MANAGE_CHANNELS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
    if (!message.channel.name.includes("ticket-")) return message.channel.send(new Discord.MessageEmbed().setTitle("❌ **You cannot use that here!**"))
    message.channel.send(new Discord.MessageEmbed().setAuthor("✅ Channel Well Deleted in 5 seconds")).then(m => {
      setTimeout(() => {
        m.delete()
        message.channel.delete();
      }, 6000)
    })
  }
  if (message.content.startsWith(prefix + "add")) {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('❌' + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(`**Error** I Don\'t have MANAGE_CHANNELS Permission to do this`)
      );
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send(new Discord.MessageEmbed().setTitle("❌ **You cannot use that here!**"))
    let member = message.mentions.members.first();
    if (!member) return message.channel.send(new Discord.MessageEmbed().setTitle("❌ **Please Mention Same One!**"));
    if (
      message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    )
      return message.channel.send(`WTF ? `);
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    });
    message.channel.send(
      new Discord.MessageEmbed().setDescription(`✅ **<@${member.user.id}> Successfully added to the ticket**`)
    );
  }
  if (message.content == prefix + `remove`) {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('❌' + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(`**Error** I Don\'t have MANAGE_CHANNELS Permission to do this`)
      );
    if (!message.channel.name.startsWith("ticket-")) {
      return message.channel.send(new Discord.MessageEmbed().setTitle("❌ **You cannot use that here!**"))
    }
    let member = message.mentions.members.first();
    if (!member) return message.channel.send(new Discord.MessageEmbed().setTitle("❌ **Please Mention Same One!**"));

    if (
      !message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    ) {
      return message.channel.send(
        `WTF ? `
      );
    }
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false
    });
    message.channel.send(
      `✅ **${member.user.tag} Successfully removed from the ticket**`
    );
  }
  let tchannels = [];
  let current = 0;
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  if (args[0].toLowerCase() === `${prefix}new`) {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
`**bot don't have MANAGE-CHANNELS permission**`
      );
    console.log(current);
    let openReason = "";
    current++;
    message.guild.channels.create(`ticket-${message.author.username}`, {
      permissionOverwrites: [
        {
          id: message.author.id,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
        },
        {
          id: message.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"]
        }
      ],
      type: 'text'
    }).then(c => {
      c.send(new Discord.MessageEmbed().setDescription("**White For Admin Response!**").setColor("BLUE"))
      tchannels.push(c.id);
      message.channel.send(new Discord.MessageEmbed().setDescription(`✅ **You Ticket Has Ben Created! <#${c.id}>**`));
      if (args[1])
        openReason = `\nReason: [ **__${args.slice(1).join(" ")}__** ]`;
    });
  }
}).on('messageReactionAdd', async (reaction, user) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();

  if (user.bot) return;

  let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

  if (!ticketid) return;

  if (reaction.message.id == ticketid && reaction.emoji.name == '📩') {
    reaction.users.remove(user);
    var x = user.username
    reaction.message.guild.channels.create(`ticket-${x}`, {
      permissionOverwrites: [
        {
          id: user.id,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
        },
        {
          id: reaction.message.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"]
        }
      ],
      type: 'text'
    }).then(async channel => {
      channel.send(`<@${user.id}> Welcome`, new Discord.MessageEmbed().setDescription("**White For Admin Response!**").setColor("BLUE"))
    })
  }
});
