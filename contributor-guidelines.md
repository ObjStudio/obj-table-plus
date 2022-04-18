开源项目可以提供给潜在贡献者的最重要资源之一就是贡献者指南。 当渴望新的贡献者赶赴您的项目进行首次开源贡献时，他们将依靠您的贡献者指南作为指导手。 这意味着贡献者指南应该易于阅读，透彻且友好。

您可以在下面找到特定git工作流程的贡献者指南模板。 如果您有兴趣开发自己的，这里有一些提示和技巧：

1. 阅读您的贡献者指南的大多数人从未为您的项目做出过贡献。 因此， **您的指南应针对新的贡献者** 。
2. 认识到读者将为开放源代码项目做出贡献这一事实，这可不是一件容易的事。 **让读者知道，项目的维护者，其他贡献者和用户对此表示赞赏。** 这可以作为新贡献者的动力。
3. **确保您的贡献者准则很完整。** 不要害怕重复您认为多余的信息。 是的，在线上有很多资源可以解释如何克隆存储库或如何提交拉取请求，但是新的贡献者可能不知道这一点。 确保您的贡献者指南是有关如何与项目进行交互的权威资源。
4. 在贡献者准则中**保持轻松友好的语气** 。 开个玩笑。 包括一些双关语。 新的贡献者对为项目做出贡献感到不安，而您的贡献准则中的活泼基调可以帮助减轻这种负担。
5. 对于维护者来说， **标记和标记问题**可能是一个繁琐的过程，但是对于项目的新贡献者和用户而言，这确实是一个奇迹。 表示特定问题所属类别的标签（设计，文档，前端，后端等），与特定问题相关的工作量级别以及与特定问题相关的优先级。

## **贡献者准则模板**

### **我需要知道什么来帮助您？**

如果您希望帮助进行代码贡献，那么我们的项目将使用[插入项目所使用的编程语言，框架或工具列表] 。 如果您还不愿意贡献代码，那就没问题了！ 您还可以签出文档问题[链接到问题跟踪器上的docs标签或标签]或我们拥有的设计问题[如果项目跟踪设计问题，则链接到问题跟踪器上的设计标签或标签] 。

如果您有兴趣贡献代码，并想了解更多有关我们使用的技术的信息，请查看下面的列表。

- 包括项目符号列表
- 新贡献者的资源（教程，视频，书籍）
- 可以用来学习他们需要为项目做出贡献的知识

### **我该如何捐款？**

从来没有做过开源贡献？ 想知道贡献在我们的项目中如何工作？ 这是一个快速的总结！

1. 查找您有兴趣解决的问题或要添加的功能。
2. 将与问题关联的存储库分支到您的本地GitHub组织。 这意味着您将在**your-GitHub-username / repository-name**下拥有该存储库的副本。
3. 使用**git clone https://github.com/github-username/repository-name.git**将存储**库克隆**到本地计算机。
4. 使用**git checkout -b branch-name-here**为您的修订创建一个新分支。
5. 对您要解决的问题或要添加的功能进行适当的更改。
6. 使用**git add insert-paths-of-changed-files-在此处**将已更改文件的文件内容添加到“快照”中，git用于管理项目的状态，也称为索引。
7. 使用**git commit -m“在此处插入所做更改的简短消息”**来存储带有描述性消息的索引内容。
8. 使用**git push origin branch-name-here**将更改推送到远程存储库。
9. 向上游存储库提交拉取请求。
10. 用简短描述更改的标题以及与更改相关的问题或错误号为请求请求添加标题。 例如，您可以为这样的问题加上标题，例如“添加了更多日志输出来解决＃4352”。
11. 在拉取请求的描述中，解释您所做的更改，您认为与拉取请求有关的任何问题以及对维护者的任何疑问。 如果您的请求请求不完美（没有请求请求），也可以，审阅者将能够帮助您解决任何问题并加以改进！
12. 等待拉取请求被维护者审查。
13. 如果审核维护者推荐，请对拉取请求进行更改。
14. 合并您的请求请求后，庆祝您的成功！

### **我在哪里可以寻求帮助？**

如果需要帮助，可以在我们的邮件列表，IRC聊天或[列出您项目使用的任何其他通信平台]上提问。

### **行为准则对我意味着什么？**

我们的行为准则意味着您有责任尊重和礼貌对待项目中的每个人，无论其身份如何。 如果您是我们的《行为准则》中所述的任何不当行为或评论的受害者，我们将在这里为您服务，并将竭尽全力确保根据我们的《行为准则》适当谴责施虐者。



project can provide to potential contributors is contributor guidelines. When eager new contributors rush over to your project to make their first open source contribution, they rely on your contributor guidelines to be their guiding hand. That means that contributor guidelines should be easy to read, thorough, and friendly.

You'll find a template for contributor guidelines for a particular git workflow below. In case you are interested in developing your own, here are some tips and tricks:

1. The majority of people who are reading your contributor guidelines have never contributed to your project. As such, **your guidelines should be targeted at new contributors**.
2. Recognize the fact that the reader is about to make a contribution to an open source project, which is no small feat. **Let the reader know that the maintainers, other contributors, and users of the project appreciate this effort.** This can serve as motivation for the new contributor.
3. **Make sure that your contributor guidelines are thorough.** Don't be afraid to repeat information that you might think is redundant. Yes, there are plenty of resources online that explain how to clone a repository or how to submit a pull request, but a new contributor might not be aware of this. Make sure that your contributor guidelines are the authoritative resource on how to interact with the project.
4. **Keep a light and friendly tone** in your contributor guidelines. Make a few jokes. Include a few puns. New contributors are nervous about contributing to a project, and a jovial tone in your contributing guidelines can help alleviate that.
5. **Tagging and labeling issues** might be a cumbersome process for maintainers, but it does wonders for new contributors and users of the project. Labels that denote the category a particular issue falls in (design, documentation, front-end, back-end, etc), the effort level associated with a particular issue, and the priority associated with a particular issue.

## Contributor guidelines template

### What do I need to know to help?

If you are looking to help to with a code contribution our project uses [insert list of programming languages, frameworks, or tools that your project uses]. If you don't feel ready to make a code contribution yet, no problem! You can also check out the documentation issues [link to the docs label or tag on your issue tracker] or the design issues that we have [link to design label or tag on issue tracker if your project tracks design issues].

If you are interested in making a code contribution and would like to learn more about the technologies that we use, check out the list below.

- Include bulleted list of
- resources (tutorials, videos, books) that new contributors
- can use to learn what they need to know to contribute to your project

### How do I make a contribution?

Never made an open source contribution before? Wondering how contributions work in the in our project? Here's a quick rundown!

1. Find an issue that you are interested in addressing or a feature that you would like to add.
2. Fork the repository associated with the issue to your local GitHub organization. This means that you will have a copy of the repository under **your-GitHub-username/repository-name**.
3. Clone the repository to your local machine using **git clone https://github.com/github-username/repository-name.git**.
4. Create a new branch for your fix using **git checkout -b branch-name-here**.
5. Make the appropriate changes for the issue you are trying to address or the feature that you want to add.
6. Use **git add insert-paths-of-changed-files-here** to add the file contents of the changed files to the "snapshot" git uses to manage the state of the project, also known as the index.
7. Use **git commit -m "Insert a short message of the changes made here"** to store the contents of the index with a descriptive message.
8. Push the changes to the remote repository using **git push origin branch-name-here**.
9. Submit a pull request to the upstream repository.
10. Title the pull request with a short description of the changes made and the issue or bug number associated with your change. For example, you can title an issue like so "Added more log outputting to resolve #4352".
11. In the description of the pull request, explain the changes that you made, any issues you think exist with the pull request you made, and any questions you have for the maintainer. It's OK if your pull request is not perfect (no pull request is), the reviewer will be able to help you fix any problems and improve it!
12. Wait for the pull request to be reviewed by a maintainer.
13. Make changes to the pull request if the reviewing maintainer recommends them.
14. Celebrate your success after your pull request is merged!

### Where can I go for help?

If you need help, you can ask questions on our mailing list, IRC chat, or [list any other communication platforms that your project uses].

### What does the Code of Conduct mean for me?

Our Code of Conduct means that you are responsible for treating everyone on the project with respect and courtesy regardless of their identity. If you are the victim of any inappropriate behavior or comments as described in our Code of Conduct, we are here for you and will do the best to ensure that the abuser is reprimanded appropriately, per our code.