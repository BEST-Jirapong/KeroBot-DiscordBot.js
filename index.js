const { Client, GatewayIntentBits, SlashCommandBuilder,ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, Permissions } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds], });
const  dotenv = require('dotenv');
dotenv.config();
const fs = require("fs");
const Database = require("./config/Database");
const db = new Database();
const MongoClient = require('mongodb').MongoClient;
client.commands = new Collection();

const eventFiles = fs
	.readdirSync("./events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}

db.connect();

// MongoClient.connect(process.env.MONGO_URL, function(err, db){
//     if (err) throw err;

//     const dbo = db.db("Kero-BOT");
//     const myobj = { name: "Company Inc", address: "Highway 37" };

//     dbo.collection("User").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping'){
    await interaction.reply({ content: 'pong' });
  }

  if (interaction.commandName === 'game-list') {
    await interaction.reply('Axie_Orgin  /  Genopets  /  Walken /  Castle_Crush /  GalaxyFight /  WinGoal');
  }

  if (interaction.commandName === 'website-list') {
    const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('🌐 YGGSEA.IO')
                .setStyle(ButtonStyle.Link)
                .setURL('https://yggsea.io/'),

            new ButtonBuilder()
                .setLabel('📅 ตารางกิจกรรม เดือนธันวาคม')
                .setStyle(ButtonStyle.Link)
                .setURL('https://media.discordapp.net/attachments/905464826464190464/1049972360394063872/Calendar_Dec.jpg?width=848&height=671'),

            new ButtonBuilder()
                .setLabel('📝 ลงทะเบียน : 🌜GAME NIGHT')
                .setStyle(ButtonStyle.Link)
                .setURL('https://docs.google.com/forms/d/e/1FAIpQLSdo5rkAGK2Rv9-Ej-ZK2AwBECLkUfLAsns1MxCVVD3nRWF87g/viewform'),

            new ButtonBuilder()
                .setLabel('💰 YGGSEA - Bounty Hunter')
                .setStyle(ButtonStyle.Link)
                .setURL('https://yggsea.io/bounty/bounty?ref=aFHhQk'),

            new ButtonBuilder()
                .setLabel('📢 FB: YGG SEA TH')
                .setStyle(ButtonStyle.Link)
                .setURL('https://www.facebook.com/YGGThailand'),
   
        );

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('🟢 GENOPETS')
                .setStyle(ButtonStyle.Link)
                .setURL('https://mainframe.genopets.me/'),

            new ButtonBuilder()
                .setLabel('🦸🏼 Wonder_Hero')
                .setStyle(ButtonStyle.Link)
                .setURL('https://app.wonderhero.io/'),

            new ButtonBuilder()
                .setLabel('🐲 Dracoo_Master')
                .setStyle(ButtonStyle.Link)
                .setURL('https://marketplace.dracoomaster.com/center'),

            new ButtonBuilder()
                .setLabel('⚽️ WinGoal')
                .setStyle(ButtonStyle.Link)
                .setURL('https://marketplace.wingoal.io/property/account'),

            new ButtonBuilder()
                .setLabel('🐟🪆 Axie Doll')
                .setStyle(ButtonStyle.Link)
                .setURL('https://doll.tioland.com/')
        );

    const row3 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('🏛 CASTLE_CRUSH + ผูกกระเป๋า')
                .setStyle(ButtonStyle.Link)
                .setURL('https://marketplace.castlecrushgame.com/'),

            new ButtonBuilder()
                .setLabel('🏛 CASTLE_CRUSH + เช่าตัว NFT')
                .setStyle(ButtonStyle.Link)
                .setURL('https://v2.renft.io/collections/castle-crush')
        );

    const row4 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('👩🏻‍🌾🧑🏻‍🌾 TEST: THEHARVEST')
                .setStyle(ButtonStyle.Link)
                .setURL('https://theharvestgame.typeform.com/to/oNcw0qi7'),

            new ButtonBuilder()
                .setLabel('🐻 TEST: Buddy_beater')
                .setStyle(ButtonStyle.Link)
                .setURL('http://d2hqk6f0yotdbr.cloudfront.net/'),

            new ButtonBuilder()
                .setLabel('🏆Grand Battle : Superpower Squad')
                .setStyle(ButtonStyle.Link)
                .setURL('https://docs.google.com/forms/d/e/1FAIpQLSfOtrnjCHk4UG7CfUbYIjK3w-jITZ4-FwgWQ_IOBKA7Pkua3Q/viewform'),

        );

    const row5 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Pancake Swap (BSC)')
                .setStyle(ButtonStyle.Link)
                .setURL('https://pancakeswap.finance/'),

            new ButtonBuilder()
                .setLabel('Dex.Guru (POLYGON & MATIC)')
                .setStyle(ButtonStyle.Link)
                .setURL('https://dex.guru/'),

            new ButtonBuilder()
                .setLabel('TraderJoe (Avalanche)')
                .setStyle(ButtonStyle.Link)
                .setURL('https://traderjoexyz.com/trade#/')
        );

    await interaction.reply({ content: 'โปรดเลือกเว็บไซค์ที่ต้องการ', components: [row1,row2,row3,row4,row5] });
    }
});



client.login(process.env.TOKEN);