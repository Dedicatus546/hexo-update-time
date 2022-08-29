#!/usr/bin/env node

import { program } from "commander";
import dayjs from "dayjs";
import { readFile, writeFile } from "../src/file.js";
import { isFirstAdd, isUnTracked } from "../src/git.js";
import { parseMeta, replaceMeta } from "../src/parser.js";

program.parse();

/**
 *
 * @param {Array<string>} lines
 * @param {string} property
 * @param {string} value
 */
const updateMetaLines = (lines, property, value) => {
  const index = lines.findIndex((line) => {
    line = line.trim();
    return line.startsWith(property);
  });
  if (index === -1) {
    return;
  }
  const line = lines[index];
  const splitIndex = line.indexOf(":");
  const name = line.substring(0, splitIndex);
  if (name.trim() !== property) {
    return;
  }
  lines[index] = `${property}: ${value}`;
};

program.args.forEach(async (filepath) => {
  try {
    const data = await readFile(filepath);
    const metaLines = parseMeta(data);
    const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if ((await isUnTracked(filepath)) || (await isFirstAdd(filepath))) {
      updateMetaLines(metaLines, "date", currentDate);
    }
    updateMetaLines(metaLines, "updated", currentDate);
    await writeFile(filepath, replaceMeta(data, metaLines));
    console.log(`file: ${filepath} update success.`);
  } catch (e) {
    console.error(`file: ${filepath} update failure. reason: ${e}.`);
  }
});
