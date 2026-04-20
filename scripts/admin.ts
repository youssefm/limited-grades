import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import ADMIN_ACTIONS from "lib/admin";

const formatLine = (line: any): string =>
  typeof line === "string" ? line : JSON.stringify(line, null, 2);

const actionNames = Object.keys(ADMIN_ACTIONS);

async function main(): Promise<void> {
  const actionName = process.argv[2];

  if (!actionName || actionName === "--list") {
    console.log("Available admin actions:\n");
    for (const name of actionNames) {
      console.log(`  ${name}`);
    }
    console.log(`\nUsage: npm run admin <action-name>`);
    process.exit(0);
  }

  const action = ADMIN_ACTIONS[actionName];
  if (!action) {
    console.error(`Unknown action: ${actionName}`);
    console.error(`Run "npm run admin --list" to see available actions.`);
    process.exit(1);
  }

  console.log(`Running "${actionName}"...\n`);
  const output: any[] = [];
  try {
    await action(output);
    for (const line of output) {
      console.log(formatLine(line));
    }
  } catch (error: any) {
    for (const line of output) {
      console.log(formatLine(line));
    }
    console.error(`\nERROR: ${error.message}`);
    process.exit(1);
  }
}

main();
