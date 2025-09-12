import cron from "node-cron";
import { runBBC } from "./bbc_co_uk";
import { runGoogle } from "./google_co_uk";
import { runSky } from "./sky_com";

// Helper to run a test and log errors
async function runTest(name: string, fn: () => Promise<void>) {
  const startTime = new Date().toISOString();
  console.log(`[${startTime}] 🚀 Starting ${name} performance test...`);
  try {
    await fn();
    console.log(`[${new Date().toISOString()}] ✅ ${name} metrics recorded`);
  } catch (err: unknown) {
    console.error(
      `[${new Date().toISOString()}] ❌ ${name} test failed:`,
      err
    );
  }
}

// Run all tests immediately at startup
(async () => {
  console.log(`[${new Date().toISOString()}] ⏰ Running synthetic monitoring jobs at startup`);
  await runTest("BBC.co.uk", runBBC);
  await runTest("Google.co.uk", runGoogle);
  await runTest("Sky.com", runSky);
})();

// Schedule all tests every 30 minutes
cron.schedule("*/15 * * * *", async () => {
  console.log(`[${new Date().toISOString()}] ⏰ Running scheduled synthetic monitoring jobs...`);
  await runTest("BBC.co.uk", runBBC);
  await runTest("Google.co.uk", runGoogle);
  await runTest("Sky.com", runSky);
});
