require('dotenv').config();
const TOKEN = process.env.TOKEN;
const {CLIENT_ID, CLIENT_HASH} = process.env;

const TelegramBot = require("node-telegram-bot-api");
const { Client } = require("tdl");
const { TDLib } = require("tdl-tdlib-addon");
const {getStore, checkFile} = require('./helpers');
const bot = new TelegramBot(TOKEN, { polling: true });
const client = new Client(new TDLib(), {
    apiId: CLIENT_ID, // Your api_id
    apiHash: CLIENT_HASH, // Your api_hash
});

function getPath(){
    const config = JSON.parse(process.env.npm_config_argv);
    return String(config.remain[0]).replace('FILE=','');
}

async function sendFile(){
    const path = getPath();
    const store = await getStore();
    let countSend = 0;
    try{
        const check = await checkFile(path);
        if (check){

            bot.on('message', async (msg) => {
                if (msg.from.username === store.user.username && msg.document && countSend == 0){
                  countSend= countSend+1;
                  await bot.sendDocument(store.user.id, msg.document.file_id);
                  await client.close();
                  process.exit(1)
                }
            });
            await client.connectAndLogin();
            client.setLogFatalErrorCallback(errorMessage => {
              console.error('Fatal error:', errorMessage)
            }) 
            await client.invoke({
              _: 'sendMessage',
              chat_id: store.bot.id,
              input_message_content: {
                _: 'inputMessageDocument',
                document: {
                  _: 'inputFileLocal',
                  path: `./tmp/${path}`,
                },
              }
            });  
        }else {
            await bot.sendMessage(store.user.id, `файл отсутствует ${path}`);
            process.exit(1);
        }
    } catch(err) {
        await bot.sendMessage(store.user.id, `ошибка\n${JSON.stringify(err)}`);
        process.exit(1);
    }
}
sendFile();