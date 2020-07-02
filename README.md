# maklovicz

script requires .env file, with correct tokens:
```
SLACK_BOT_TOKEN= # Basic Information > App Credentials > Signing Secret
SLACK_SIGNING_SECRET= # OAuth & Permissions > Tokens for Your Workspace
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
