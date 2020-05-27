require('dotenv').config()

const fs = require('fs');
const crypto = require('crypto');
const request = require('request');
const cheerio = require('cheerio');
const { App } = require("@slack/bolt");

const checksumFile = "last.checksum"

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});


const checksum = (str) => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const saveChecksum = (checksum) => fs.writeFileSync(checksumFile, checksum, { flag: 'wx' });

const readChecksum = () => fs.readFileSync(checksumFile);

const compose = (date, positions) => {
  msg = `*Archetura (${date})*:\n`
  for (p of positions) {
    msg += `- ${p.price} ${p.desc}`
    msg += `\n`
  }

  return msg
}

const parse = (html) => {
  const $ = cheerio.load(html);

  const date = $('#date_jad').text()
  const positions = []

  $('ul#jadlospis li').each((i, element) => {
    const desc = $(".desc", element).text()
    const px = $(".price", element).text()
    if (desc != "" && px != "" && px != "0.00 zł") {
      positions.push({ desc: desc, price: px })
    }
  });

  return [date, positions]
}

const send = (text) => {
  app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: "random",
    text: text
  }).then(() => {
    console.log("Sent.")
  })
}

try {
  console.log("Requesting URL...")
  request('http://www.bistrowarcheturze.pl/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const [date, positions] = parse(html)
      const text = compose(date, positions)

      const lastChecksum = readChecksum()
      const sum = checksum(text)
      if (sum == lastChecksum) {
        console.log("Menu not changed.")
        return
      }
      saveChecksum(sum)

      console.log("Composed text:")
      console.log(text)

      console.log("Sending text...")
      // send(text)
    }
  });
}
catch (error) {
  console.error(error);
}
