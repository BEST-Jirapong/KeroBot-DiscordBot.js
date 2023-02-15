const { REST, Routes } = require('discord.js');
const  dotenv = require('dotenv');

dotenv.config();

const commands = [

  {
     name: 'ping',
    description: 'ping',
  },

  {
    name: 'website-list',
    description: 'Website-list',
  },

];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();