![Nodejs图片](https://i1.hdslb.com/bfs/archive/43522aed95e85f89f5ced9f7ba82381bdfc7676d.jpg@480w_270h_1c)
# [ExpressBlog](https://api.expressjsblog.com.cn) 

### 使用`Nodejs`和`Expressjs`开发的后端博客服务器
---
这是一个使用`Nodejs`和`Expressjs`开发的后端服务器。它由几个部分组成：
>**1.**基本**登录、注销、注册**功能  
**2.**基本**与用户相关的API**，例如管理用户会话、更新用户信息和注销现有帐户。  
**3.**博客的基本**CRUD**（在内容审核后），例如使用[`pagination`](https://www.npmjs.com/package/mongoose-paginate)检索博客。  
**4.** **建议API**----允许您向网站提出并管理您的建议。  
**5.** **点赞系统**----可以让你为某个特定的博客/文章点赞/取消点赞，以及其他功能。  
**6.** **状态API**----显示您上次登录和注销的时间，以及其他有用信息。  
**7.** **其他实用工具**，包括加密解密和IP信息。

本项目涉及到的技术栈主要有——  
**1.** [`mongoose`](https://mongoosejs.com/)  
**2.** [`sequelize`](https://www.sequelize.cn/)  
**3.** [`ioredis`](https://www.npmjs.com/package/ioredis)

我们的开发<u>已经接近尾声</u>，为了了解更多关于我们项目的信息，
* 您可以在[ExpressBlog API网站](https://api.expressjsblog.com.cn)上尝试一下。
* 如果你对本项目的接口不够熟悉（一般都是这样的），我们使用ApiPost进行协作，并且已经将项目分享至网上。所以你只需要访问[Apipost-基于协作,不止于API文档、调试、Mock、自动化测试](https://console-docs.apipost.cn/passwordPage/30bad7c674aabf61?pathname=/preview/cb00dda5060d2a49/30bad7c674aabf61&&target_id=null&&name=blogs)，输入密码：**611492611492** 后就可以开始在线调试了！
* 文档网站正在建设中，请访问[ExpressBlog文档](https://www.expressjsblog.com.cn)了解更多信息。
* 如果您有任何相关问题，请在github上提交一个问题。
  
**当前版本：** ***0.8.0-Beta***  
**当前状态：** 编码已完成，文档正在开发中。开发环境测试完成，生成环境测试完成了80%，<u>联机部署已完成</u>。
>**提示：**
>①本次发布以及本项目所有代码为**非生产/预发布**，请勿在任何正式场合使用！  
>②配置文件中（`.env`）包含**隐私配置**。因此在当前版本中，我们不仅删除了它，还更改了相关的密钥和令牌</u>。 很抱歉给您带来不便！  
>③一旦文档部分完成，本README.md可能**在不久的将来**被替换。  
>④ 我们的某些接口有使用限制，请认真阅读文档来进一步了解。  
>⑤请仔细阅读文档部分，以便您更好地了解我们的项目！
