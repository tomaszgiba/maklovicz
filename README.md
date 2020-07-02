# maklovicz

Pull Menu from http://www.bistrowarcheturze.pl/ and post to #random chanel on Slack 
 
## install
script requires .env file, with correct tokens from Slack APP panel:
```
SLACK_BOT_TOKEN= # Basic Information > App Credentials > Signing Secret
SLACK_SIGNING_SECRET= # OAuth & Permissions > Tokens for Your Workspace > Bot User OAuth Access Token
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
