# maklovicz

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
