---
title: 莘野起始页
description: 一个极简的起始页。
date:
    update_at: 2023-04-20 19:19
    create_at: 2023-04-20 19:19
---

在见到花样繁多的起始页后，可能你会需要一个极简的版本。

这是莘野起始页的使用文档，同时也是我的一篇博客。

![Start Page Cover](/assets/img/@start-page.png)

-   起始页地址：[start.zhaojiakun.com](https://start.zhaojiakun.com)
-   项目源码：[jiakun-zhao/start-page](https://github.com/jiakun-zhao/start-page)
<!-- -   视频说明：[BiliBili](https://www.bilibili.com/video/BV1ZK411x7Zp) -->

<br>

### 我认为的起始页应该是这样

花里胡哨的功能不是我想要的，小组件应当在我更容易看到的地方，而不是出现在再我打开浏览器之后。另一点是我不希望一个起始页为了实现这些功能，还需要安装浏览器插件。那么以下是我的理解：

-   **可自定义、可切换的搜索引擎**

    _我不能在同一个引擎搜索到所有的内容，所以搜索引擎应该是可以自定义的。我会用快捷键打开浏览器，并输入我要搜索的内容，所以我拒绝鼠标点击的切换方式，因为我正在使用键盘。_

-   **快捷打开网站的按钮**

    _只需要几个我常用的，因为我会用浏览器的书签来管理更多的网站。任何起始页网站的稳定性都不能对我的收藏负责，所以书签的管理应当有更合理稳定的方案，比如浏览器自带。莘野起始页的快捷按钮被限制在 **8** 个以内。_

-   **一张壁纸**

    _对世界的窗口加入一点点我的风格。_

### 使用

-   打开起始页，输入搜索内容，回车。
-   打开起始页，输入搜索引擎别名，输入空格，输入搜索内容，回车。
-   点击快捷按钮直达。

_使用上下按钮切换候选词，默认第一项（会有搜索引擎名称提示）。_

### 自定义配置

在自定义配置之前，这是默认的配置：

```json
{
    "engines": [
        {
            "name": "百度",
            "alias": "bd",
            "url": "https://www.baidu.com/s?wd={query}"
        },
        {
            "name": "谷歌",
            "alias": "gg",
            "url": "https://www.google.com/search?q={query}"
        },
        {
            "name": "必应",
            "alias": "bing",
            "url": "https://cn.bing.com/search?q={query}"
        },
        {
            "name": "GitHub",
            "alias": "gh",
            "url": "https://github.com/search?q={query}"
        }
    ],
    "bookmarks": [
        {
            "name": "Author",
            "icon": "https://start.zhaojiakun.com/favicon.svg",
            "url": "https://zhaojiakun.com"
        },
        {
            "name": "Source Code",
            "icon": "https://start.zhaojiakun.com/github-dark.svg",
            "url": "https://github.com/jiakun-zhao/start-page"
        }
    ],
    "wallpaper": "https://static.zhaojiakun.com/start-page/e6b22bc7b42a9dc733dddbcd793744c7.jpg"
}
```

自定义配置：

-   创建一个 GitHub 仓库，在根目录创建 `.start-page.json` 文件，拷贝默认配置，修改后提交。
-   在浏览器地址栏输入 `https://start.zhaojiakun.com/user/repo@version` （替换`user`、`repo` 和 `version` 字段，其中 `version` 字段可参考 [jsDelivr](https://www.jsdelivr.com/documentation#id-github) 的说明）。

临时替换配置：

-   在链接上追加 `engine=name` 参数以修改默认搜索引擎，例如：

    `https://start.zhaojiakun.com?engine=必应`

-   在链接上追加 `wallpaper=url` 参数以修改默认壁纸，例如：

    `https://start.zhaojiakun.com?wallpaper=https://example.com/example.jpg`

-   同时修改：`https://start.zhaojiakun.com?engine=name&wallpaper=url`

### 域名地址较长

通常起始页地址会被写入浏览器设置，所以长短其实并不是很要紧（我的域名改不了啦...）。如果你需要经常的多处使用，为了方便性可以考虑使用短链接服务或使用自己域名地址来跳转到你配置好的起始页地址。

### 其他

事实上这个项目的代码在打包后的 html + js + css 只有 6KB 不到，但因为我使用的是 Vercel 的服务，在国内访问可能并不理想。如果你喜欢这个起始页又有速度有追求，可以考虑自己部署。或者克隆项目本地打包后，在浏览器以本地文件路径的方式设置。

有疑问的话欢迎在 GitHub 上提 issue、在下面留言或者发送邮件给我。
