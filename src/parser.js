const META_REGEX = /---(?<frontMatter>(\S|\s)*?)---/;
/**
 * @param {string} data
 * @returns {{[x: string]: string}}
 */
export const parseMetaRecord = (data) => {
  if (!META_REGEX.test(data)) {
    return {};
  }
  const frontMatter = data.match(META_REGEX).groups.frontMatter;
  const lines = frontMatter.split(/\r|\n|\r\n/);
  const record = {};
  lines
    .filter(Boolean)
    .map((line) => {
      if (line.includes(":")) {
        const index = line.indexOf(":");
        return [
          line.substring(0, index).trim(),
          line.substring(index + 1).trim(),
        ];
      }
      return [line, ""];
    })
    .forEach(([key, value]) => {
      record[key] = value;
    });
  return record;
};

/**
 *
 * @param {string} data
 * @param {Record<string, string>} record
 */
export const replaceMetaRecord = (data, record) => {
  const originRecord = parseMetaRecord(data);
  record = Object.assign({}, originRecord, record);
  const str = Object.entries(record)
    .map(([key, value]) => {
      return `${key}: ${value}`;
    })
    .join("\r\n");
  return data.replace(META_REGEX, `---\r\n${str}\r\n---\r\n`);
};
