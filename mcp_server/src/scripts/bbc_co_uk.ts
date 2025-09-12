import { chromium } from "playwright";
import { writeMetric, flushMetrics } from "../utils/influx";

export async function runBBC() {
  const site = "https://www.bbc.co.uk";
  console.log(`[${new Date().toISOString()}] 🚀 Starting BBC.co.uk performance test...`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const start = Date.now();
    await page.goto(site, { waitUntil: "networkidle" });
    const tti = Date.now() - start;
    const fullLoad = tti + 500; // placeholder calculation

    console.log(`[${new Date().toISOString()}] Writing metrics to InfluxDB...`);
    await writeMetric(site, { time_to_interactive: tti / 1000 });
    await writeMetric(site, { time_to_full_load: fullLoad / 1000 });
    await flushMetrics();

    console.log(`[${new Date().toISOString()}] ✅ BBC metrics recorded`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ BBC test failed:`, err);
  } finally {
    await browser.close();
  }
}
