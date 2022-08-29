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
  const lines = frontMatter.split(/\r|\n|\r\n/);
  return lines.filter(Boolean);
};

/**
 *
 * @param {string} data
 * @param {Array<string>} lines
 */
export const replaceMeta = (data, lines) => {
  return data.replace(META_REGEX, `---\r\n${lines.join("\r\n")}\r\n---\r\n`);
};
