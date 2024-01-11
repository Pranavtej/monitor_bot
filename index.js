const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const botToken = process.env.BOT_TOKEN;
const botToken1 = process.env.BOT_TOKEN_1;
const chatId = process.env.CHAT_ID;
const chatId1 = process.env.CHAT_ID_1;

const bot = new TelegramBot(botToken, { polling: true });
const bot2 = new TelegramBot(botToken1, { polling: true });

const sendMessage = (message) => {
    bot.sendMessage(chatId, `*${message}*`, { parse_mode: 'MarkdownV2' }).catch((error) => {
        console.log(`API failed with exception: ${error}`);
    });
    bot2.sendMessage(chatId1, `*${message}*` ,{parse_mode : 'MarkdownV2'}).catch((error) => {
        console.log(`API failed with exception: ${error}`);
    });
};



const monitorAPI = async () => {
    const apiEndpoint =process.env.URL;

    try {
        const response = await axios.get(apiEndpoint);
        let errorMessage = `⚠️Warning Desecndants ➡️ ${response.data.data.descendants}`;
        if(response.data.data.descendants >= 21 ){
            errorMessage = `❌Desecndants ➡️ ${response.data.data.descendants}❌`;
        }
        sendMessage(errorMessage);  
        
        // if (response.data.data.descendants >13 && response.data.data.descendants < 18) {
           
        //     const errorMessage = `⚠️⚠️Warning Desecndants: ${response.data.data.descendants}`;
        //     sendMessage(errorMessage);
        // }
        // else if  (response.data.data.descendants >= 18) {
        //     const errorMessage = ` Broo !!!❌❌❌ ${response.data.data.descendants}`;
        //     sendMessage(errorMessage);
        // }
    } catch (error) {
        sendMessage(`API failed with exception: ${error}`);
    }
};

setInterval(monitorAPI, 5000);

monitorAPI();
