# Hexo-update-time

配合 `lint-staged`, `husky` 插件自动在提交前自动更新 `date` 和 `updated` 字段

安装依赖

```text
npm install hexo-update-time lint-staged husky
```

执行

```
npx husky install
```

确保 `git` 钩子生效

执行

```
npx husky add .husky/pre-commit "npm run lint-staged"
```

添加 pre-commit 钩子

`package.json` 中添加 `lint-staged` 的 `script` 和相应配置

```json
{
  // ...
  "script": {
    // ...
    "lint-staged": "lint-staged"
  },
  "lint-staged": {
    "source/_posts/*.md": "hexo-update-time"
  }
}
```

如果为第一次提交，那么 `date` 和 `updated` 会统一更新到当前时间

否则只有 `updated` 会更新到当前时间