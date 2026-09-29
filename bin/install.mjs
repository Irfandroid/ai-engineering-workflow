#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillName = "ai-engineering-workflow";
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(packageRoot, "skills", skillName, "SKILL.md");

function printHelp() {
  console.log(`AI Engineering Workflow installer

Usage:
  npx qalbu-ai-engineering-workflow [options]
  npx github:Irfandroid/ai-engineering-workflow [options]

Options:
  --target <targets>  codex, claude, or all (default: all)
  --force             overwrite an existing skill
  --dry-run           show destinations without writing files
  --help              show this help

Examples:
  npx qalbu-ai-engineering-workflow
  npx qalbu-ai-engineering-workflow --target codex
  npx qalbu-ai-engineering-workflow --target claude --force
`);
}

function parseArgs(args) {
  const options = { target: "all", force: false, dryRun: false };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--force" || arg === "-f") {
      options.force = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--target" || arg === "-t") {
      options.target = args[index + 1] ?? "";
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

function destinations(target) {
  const home = os.homedir();
  const targets = target === "all" ? ["codex", "claude"] : target.split(",");
  const paths = [];
  for (const name of targets) {
    if (name === "codex") paths.push(path.join(home, ".codex", "skills", skillName));
    else if (name === "claude") paths.push(path.join(home, ".claude", "skills", skillName));
    else throw new Error(`Unknown target: ${name}. Use codex, claude, or all.`);
  }
  return [...new Set(paths)];
}

async function install(destination, { force, dryRun }) {
  const targetFile = path.join(destination, "SKILL.md");
  if (!dryRun) {
    await mkdir(destination, { recursive: true });
    try {
      const existing = await readFile(targetFile, "utf8");
      const incoming = await readFile(source, "utf8");
      if (existing === incoming) return "already installed";
      if (!force) throw new Error(`${targetFile} already exists; use --force to replace it`);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
    await writeFile(targetFile, await readFile(source), "utf8");
    return "installed";
  }
  return "would install";
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    process.exit(0);
  }
  await access(source);
  for (const destination of destinations(options.target)) {
    const result = await install(destination, options);
    console.log(`${result}: ${destination}`);
  }
  console.log("\nUse $ai-engineering-workflow in Codex or Claude Code.");
} catch (error) {
  console.error(`Install failed: ${error.message}`);
  process.exit(1);
}
