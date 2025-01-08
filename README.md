## 猜猜犇

立即体验：https://ccb.earthmessenger.xyz/

根据犇犇猜测作者名字颜色。

灵感来源：[Guess the true rating of these users!](https://codeforces.com/blog/entry/137983)。

---

没有什么反作弊机制，所有数据都被发送到了前端，判断打分逻辑也是在前端执行的。

使用洛谷官方 api 获取犇犇，随机最近 $2\times 10^5$ 条犇犇中的一条。洛谷官方 api 很慢，目前的获取策略是预存两条犇犇备用，如果做题过快可能会需要等待加载。

Markdown 使用 unified 渲染，暂不支持洛谷的 bilibili 视频。