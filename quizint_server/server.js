// *****************************************
// ********* Quizlet Clone Quizint *********
// *****************************************

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const fs = require("fs");
const cheerio = require("cheerio");

var prod = process.argv[2];

const readline = require("readline");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
(async () => {
  global.browser = await puppeteer.launch({
    headless: prod !== "true" ? false : true,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    args: [
      "--window-size=1400,900",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0", // You know what you're doing?
      "--disable-gpu",
      "--disable-features=IsolateOrigins,site-per-process",
      "--blink-settings=imagesEnabled=true",
    ],
  });
})();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 8080;

const slowDown = require('express-slow-down');
const limiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per windowMs, then...
  delayMs: 100, // begin adding 100ms of delay per request above 100:
  maxDelayMs: 1000 // maximum delay is 1000ms
});
app.use('/api', limiter);

app.post("/api/card-data", (req, res) => {
  try {
    const quizletId = req.body.quizletId; // Get the target website URL from the query parameters
    console.debug(`Getting quizlet id ${quizletId}`);

    if (!/^([0-9]{9})$/.test(quizletId.slice(0, 9))) {
      console.debug("Not a valid quizlet id");
      res.sendStatus(500); // stop trying to break my system
      return;
    }

    // check if quizletId-cards.json exists in ./data and if it does return that instead
    const fileExists = fs.existsSync(`./data/${quizletId}-cards.json`);
    if (fileExists) {
      console.debug("Data file found. Returning JSON instead.");
      res.sendFile(__dirname + `/data/${quizletId}-cards.json`);
      return;
    }

    // use puppeteer to go to a website and scrape some data with cheerio
    (async () => {
      const page = await browser.newPage();

      await page.goto(`https://quizlet.com/${quizletId}`);

      const content = await page.content();
      const $ = cheerio.load(content);

      const titleText = $("title").text().split("|")[0];
      if (titleText === "Page Unavailable") {
        await page.close();

        console.error("Quizlet page not found. Exiting...");
        res.sendStatus(404);
        return;
      }

      const cardList = [{ title: titleText }];

      // Get the target page and scrape the following data:
      // * term
      // * definition
      // * image url
      const cardElements = $(".SetPageTerm-content");
      cardElements.each((index, element) => {
        const term = $(".SetPageTerm-wordText", element);
        const definition = $(".SetPageTerm-definitionText", element);
        const image = $(".SetPageTerm-image", element);

        // add term and definition to cardList
        cardList.push({
          term: cheerio.load(term.html().replace(/<br>/g, "\n")).text(),
          definition: cheerio
            .load(definition.html().replace(/<br>/g, "\n"))
            .text(),
          image: image.attr("src"),
        });
      });

      // close the browser tab
      await page.close();

      // export cardList as json to file with fs
      fs.writeFileSync(
        `./data/${quizletId}-cards.json`,
        JSON.stringify(cardList)
      );
      console.debug(`Cards exported to ./data/${quizletId}-cards.json`);

      // send cardList to the client
      res.send(cardList);
    })();
  } catch (error) {
    console.debug(
      "There was an issue, but we're going to ignore it to keep the server up",
      error
    );
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Proxy server listening on port ${port}`));
