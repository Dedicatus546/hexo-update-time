#!/usr/bin/env node

import { program } from "commander";
import dayjs from "dayjs";
import { readFile, writeFile } from "../src/file.js";
import { isFirstAdd } from "../src/git.js";
import { parseMetaRecord, replaceMetaRecord } from "../src/parser.js";

program.parse();

program.args.forEach(async (filepath) => {
  try {
    const data = await readFile(filepath);
    const metaRecord = parseMetaRecord(data);
    const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (await isFirstAdd(filepath)) {
      metaRecord.date = currentDate;
    }
    metaRecord.updated = currentDate;
    await writeFile(filepath, replaceMetaRecord(data, metaRecord));
    console.log(`file: ${filepath} update success.`);
  } catch (e) {
    console.error(`file: ${filepath} update failure. reason: ${e}.`);
  }
});
