const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const botToken = process.env.BOT_TOKEN;

const chatId = process.env.CHAT_ID;

const bot = new TelegramBot(botToken, { polling: true });


const sendMessage = (message) => {
    bot.sendMessage(chatId, message);
};


const monitorAPI = async () => {
    const apiEndpoint =process.env.URL;

    try {
        const response = await axios.get(apiEndpoint);
        
        if (response.data.data.descendants > 13) {
           
            const errorMessage = `⚠️⚠️Warning Desecndants: ${response.data.data.descendants}`;
            sendMessage(errorMessage);
        }
        else if  (response.data.data.descendants >= 18) {
            const errorMessage = ` Broo !!!❌❌❌ ${response.data.data.descendants}`;
            sendMessage(errorMessage);
        }
    } catch (error) {
        sendMessage(`API failed with exception: ${error}`);
    }
};

setInterval(monitorAPI, 5000);

monitorAPI();