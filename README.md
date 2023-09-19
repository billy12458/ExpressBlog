# [ExpressBlog](https://api.expressjsblog.com.cn)
### A backend blog server developed with `Nodejs` and `Expressjs`  
---
[**中文版**](README.zh_CN.md) [**English version**](README..md)   
This is a backend server developed with `Nodejs` and `Expressjs`. It comprises of several sections:  
> **1.** Basic **login, logout, register** functions  
**2.** Basic **user-related APIs**, such as managing user sessions, updating user information and expiring an existing account.  
**3.** Basic **CRUD of blogs**(after content cencor), such as retrieving blogs with [`pagination`](https://www.npmjs.com/package/mongoose-paginate).   
**4.** **Suggestion APIs**—— allow you to raise and manage your suggestions to the website.  
**5** **A liking system**—— enables you to like and dislike a particular blog/article, and more.  
**6.** **Status APIs**——  shows your last login and logout time, as well as other useful information.  
**7.** **Other utility methods**, including encryption&decryption and IP info.

**Relevant frameworks** of this backend server:   
**1.** [`mongoose`](https://mongoosejs.com/)  
**2.** [`sequelize`](https://www.sequelize.cn/)  
**3.** [`ioredis`](https://www.npmjs.com/package/ioredis)

Our development has <u>nearly come to an end</u>, and in order to learn more about our project, 
* You can give it a shot at [ExpressBlog API Website](https://api.expressjsblog.com.cn)  
* The documentation website is under construction, visit [ExpressBlog Documentation](https://www.expressjsblog.com.cn) for more information.
* Should you have any relevant questions, please commit an issue on github.

**Current version:** ***0.8.0-Beta***  
**Current status:** coding completed, documentation in progress, development testing: 80%, production testing 25%, <u> online deployment completed</u>.  
> **Tips:**  
> ① This release is **non-production/pre-release**, don't use it in any serious occasions!  
> ② The configuration file(`.env`) contains **private configurations**, so in current releases, we <u>not only deleted it, but also changed relevant keys and tokens. </u>Sorry for any inconvenience!  
> ③ This README.md may **BE REPLACED** in the near future, once the documentation part has finished.  
> ④ Please go through the documentation part carefully so that you can gain a better understanding of our project!  

