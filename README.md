# sendFileTgBot 
Требования: \
https://github.com/tdlib/td#building \

# запуск 
1. создать бота через `@BotFather` \
2. `npm install` \
3. добавить в чат бота \
4. написать в чат с аккаунта, с которого будет отправляться файл `registration=1` \

# отправка файла 
файл должен лежать в папке tpm \
запускать с помощью `npm run sendFile FILE='Zaraisk_sleeproom.max'` \
FILE= - путь к файлу \


# ENV client
получить api_id и api_hash https://core.telegram.org/api/obtaining_api_id \
CLIENT_ID = api_id \
CLIENT_HASH = api_hash \

# ENV bot
токин получаем при создание бота \
TOKEN = token \