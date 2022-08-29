import fs from "node:fs/promises";

export const readFile = async (filepath) => {
  const data = await fs.readFile(filepath, {
    encoding: "utf-8",
  });
  return data;
};

export const writeFile = async (filepath, data) => {
  await fs.writeFile(filepath, data);
};
