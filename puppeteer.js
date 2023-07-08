const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // go to addUser.html and click addUser
    await page.goto("http://localhost:8080/addUser.html");
    await page.click("#addUser");

    // go to data.html and click showAllData
    await page.goto("http://localhost:8080/data.html");
    await page.click("#showAllData");

    // wait for data to populate status div
    await page.waitForSelector("#status:not(:empty)");

    // read status data
    let status = await page.$("#status");
    console.log(await status.evaluate((node) => node.innerHTML));

    // go to allUsers, take screenshot
    await page.goto("http://localhost:8080/allUsers.html");
    await page.click("#showAllData");
    await page.waitForSelector("#status:not(:empty)");
    await page.screenshot({ path: "screen.png" });
  } catch (e) {
    console.log(e);
  }
})();
