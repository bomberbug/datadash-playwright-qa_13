const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const urls = [
    "https://sanand0.github.io/tdsdata/js_table/?seed=42",
    "https://sanand0.github.io/tdsdata/js_table/?seed=43",
    "https://sanand0.github.io/tdsdata/js_table/?seed=44",
    "https://sanand0.github.io/tdsdata/js_table/?seed=45",
    "https://sanand0.github.io/tdsdata/js_table/?seed=46",
    "https://sanand0.github.io/tdsdata/js_table/?seed=47",
    "https://sanand0.github.io/tdsdata/js_table/?seed=48",
    "https://sanand0.github.io/tdsdata/js_table/?seed=49",
    "https://sanand0.github.io/tdsdata/js_table/?seed=50",
    "https://sanand0.github.io/tdsdata/js_table/?seed=51"
  ];

  let grandTotal = 0;

  for (const url of urls) {
    try {
      console.log(`Visiting: ${url}`);

      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

      // Wait for tables to appear (if dynamically generated)
      await page.waitForSelector("table", { timeout: 15000 });

      // Extract all numbers from all table cells
      const numbers = await page.$$eval("table td, table th", cells =>
        cells
          .map(cell => {
            const cleaned = cell.innerText
              .replace(/,/g, '')        // remove commas
              .replace(/[^\d.-]/g, ''); // remove non-numeric chars
            return parseFloat(cleaned);
          })
          .filter(n => !isNaN(n))
      );

      const pageSum = numbers.reduce((sum, value) => sum + value, 0);

      console.log(`Page Sum: ${pageSum}`);
      grandTotal += pageSum;

    } catch (error) {
      console.error(`Error processing ${url}`);
      console.error(error.message);
    }
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
