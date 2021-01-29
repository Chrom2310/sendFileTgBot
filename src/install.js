require('dotenv').config();
const TOKEN = process.env.TOKEN;

const TelegramBot = require("node-telegram-bot-api");
const {setStore} = require('./helpers');
const bot = new TelegramBot(TOKEN, { polling: true });


async function close(store = {}){
    console.log(store,'store');
    try{
        await setStore(store);
        await bot.sendMessage(store.user.id,'успех');
        process.exit(1);
    } catch(err){
        await bot.sendMessage(store.user.id,`ошибка\n${err}`);
    }
  
}

async function install(){
    const store = {};
    const myBot = await bot.getMe();
    store['bot'] = myBot;
    bot.on('message', async (msg) => {
        console.log(msg,'msg.chat');
        const user = {
            id: msg.chat.id,
            first_name: msg.from.first_name,
            last_name: msg.from.last_name,
            username: msg.from.username,
        }
        if (msg.text.toLocaleLowerCase() === 'registration=1'){
            store['user'] = user;
            close(store);
        }
    });
}

install();