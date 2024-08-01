import os from "node:os";

const META_REGEX = /---(?<frontMatter>(\S|\s)*?)---/;
/**
 * @param {string} data
 * @returns {Array<string>}
 */
export const parseMeta = (data) => {
  if (!META_REGEX.test(data)) {
    return [];
  }
  const frontMatter = data.match(META_REGEX).groups.frontMatter;
  const lines = frontMatter.split(/\r?\n/);
  return lines.filter(Boolean);
};

/**
 *
 * @param {string} data
 * @param {Array<string>} lines
 */
export const replaceMeta = (data, lines) => {
  const eol = os.EOL;
  return data.replace(META_REGEX, `---${eol}${lines.join(eol)}${eol}---${eol}`);
};
