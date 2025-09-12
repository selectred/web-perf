import { spawn } from "child_process";

const scripts = ["bbc_co_uk.ts", "google_co_uk.ts", "sky_co_uk.ts"];

export async function runAll() {
  for (const script of scripts) {
    console.log(`▶ Running ${script}...`);

    await new Promise<void>((resolve, reject) => {
      const child = spawn("npx", ["ts-node", `src/scripts/${script}`], {
        stdio: "inherit", // show logs in same terminal
      });

      child.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`${script} exited with code ${code}`));
      });
    });
  }

  console.log("✅ All scripts finished.");
}

if (require.main === module) {
  runAll().catch(console.error);
}

