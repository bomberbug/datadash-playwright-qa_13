const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const urls = [
    "PUT_SEED_42_LINK_HERE",
    "PUT_SEED_43_LINK_HERE",
    "PUT_SEED_44_LINK_HERE",
    "PUT_SEED_45_LINK_HERE",
    "PUT_SEED_46_LINK_HERE",
    "PUT_SEED_47_LINK_HERE",
    "PUT_SEED_48_LINK_HERE",
    "PUT_SEED_49_LINK_HERE",
    "PUT_SEED_50_LINK_HERE",
    "PUT_SEED_51_LINK_HERE"
  ];

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageSum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
