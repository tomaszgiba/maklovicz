# maklovicz

script requires .env file, with correct tokens:
```
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
```

create script `food_bot.sh`:
```
cd ~/food_bot/ && yarn start
```

open crontab:
```
crontab -e
```

add script exec.
```
35 11 * * 1-5 sh food_bot.sh
```
