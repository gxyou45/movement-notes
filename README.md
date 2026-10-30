# Movement Notes

面向家长的 Movement Lesson 中英双语学习指南。静态网页，无需安装依赖；直接打开 `index.html` 即可使用。

## 发布到 GitHub Pages

将本目录上传到 GitHub 仓库，在仓库 Settings → Pages → Build and deployment 选择 Deploy from a branch，选择包含文件的分支及 `/ (root)` 并保存。发布后使用 Pages 设置中显示的网址访问。

内容依据官网公开介绍编写，非官方教材；出处链接见各模块。

## 本地翻译

原文页使用 Argos Translate 生成的机器译文；专业术语需结合原文核对。使用 Python 3.12 的虚拟环境安装 `argostranslate` 和 `numpy<2`，将英文到中文模型安装在项目的 `.local-data` 下后，可执行：

```sh
XDG_DATA_HOME="$PWD/.local-data" XDG_CACHE_HOME="$PWD/.local-data/cache" ARGOS_CHUNK_TYPE=MINISBD OMP_NUM_THREADS=1 .venv/bin/python scripts/translate_local.py
```

脚本逐页保存译文，已完成的段落会跳过。模型和虚拟环境不提交到仓库。
