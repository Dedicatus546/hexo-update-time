import { parseMetaRecord } from "./parser.js";

console.log(
  parseMetaRecord(
    `---
title: lint-staged 原理浅析
date: 2022-08-24 10:40:14
updated: 2022-08-28 12:00:00
tags:
- lint-staged
categories:
- 编程
---
`
  )
);
