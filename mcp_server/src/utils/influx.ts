// src/utils/influx.ts
import { InfluxDB, Point } from "@influxdata/influxdb-client";

// Read these from environment variables
const url = process.env.INFLUX_URL || "http://influxdb:8086";
const token = process.env.INFLUX_TOKEN || "Svd97rkAn5omIhsdVa5l4fNIfhavUw237rqzwvxOIy_HuGQWW7keHf8Y6hLZKgvu13a7tWKQo9JQ1hQCcQicxg==";
const org = process.env.INFLUX_ORG || "my-org";
const bucket = process.env.INFLUX_BUCKET || "web_metrics";

if (!token || !org || !bucket) {
  console.warn("⚠️  InfluxDB environment variables are not fully set!");
}

const client = new InfluxDB({ url, token });
const writeApi = client.getWriteApi(org, bucket, "ms");

// Function to write a single metric
export async function writeMetric(measurement: string, fields: Record<string, number>) {
  const point = new Point(measurement);
  for (const [key, value] of Object.entries(fields)) {
    point.floatField(key, value);
  }
  writeApi.writePoint(point);
}

// Function to flush pending metrics
export async function flushMetrics() {
  try {
    await writeApi.flush();
    console.log(`[${new Date().toISOString()}] ✅ Flushed metrics to Influx`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ Error flushing metrics:`, err);
  }
}