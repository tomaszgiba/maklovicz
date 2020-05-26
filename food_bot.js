require('dotenv').config()

var request = require('request');
var cheerio = require('cheerio');
const { App } = require("@slack/bolt");


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

let compose = (date, positions) => {
  msg = `*Archetura (${date})*:\n`
  for (p of positions) {
    msg += `- ${p.price} ${p.desc}`
    msg += `\n`
  }

  return msg
}
1
try {
  request('http://www.bistrowarcheturze.pl/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      let date = $('#date_jad').text()
      let positions = []

      $('ul#jadlospis li').each(function (i, element) {
        let desc = $(".desc", this).text()
        let px = $(".price", this).text()
        if (desc != "" && px != "" && px != "0.00 zł") {
          positions.push({ desc: desc, price: px })
        }
      });

      text = compose(date, positions)

      console.log("Composed text:")
      console.log(text)

      console.log("Sending text...")
      app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: "random",
        text: text
      })

      console.log("Done!")
    }
  });
}
catch (error) {
  console.error(error);
}
