import express from "express";
import bodyParser from "body-parser";
import { writeMetric, flushMetrics } from "./utils/influx";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Example route to record metrics
app.post("/record-metrics", async (req, res) => {
  try {
    const { site, tti, fullLoad, passed } = req.body;

    if (!site) {
      return res.status(400).json({ error: "Missing site" });
    }

    // Write metrics only if numeric values exist
    if (tti != null) {
      await writeMetric(site, { time_to_interactive: Number(tti) || 0 });
    }
    if (fullLoad != null) {
      await writeMetric(site, { time_to_full_load: Number(fullLoad) || 0 });
    }

    // Optional: record pass/fail result as a metric
    if (passed != null) {
      await writeMetric(site, { passed: passed ? 1 : 0 });
    }

    await flushMetrics();

    console.log(
      `[${new Date().toISOString()}] ✅ Metrics recorded for site: ${site}`
    );
    return res.status(200).json({ status: "ok" });
  } catch (err: unknown) {
    console.error(
      `[${new Date().toISOString()}] ❌ Error recording metrics:`,
      err
    );
    return res.status(500).json({ error: "Failed to record metrics" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
