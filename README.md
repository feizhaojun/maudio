# maudio

HTML5音频播放器

支持 IE9+、Edge、Firefox20+、Chrome、Opera、Safari4+

示例：[https://feizhaojun.com/sample/maudio/example.html](https://feizhaojun.com/sample/maudio/example.html)

# 主要功能

基本的音频播放控制
支持一个页面添加多个音频

# 使用方法

HTML 标签加载完成之后，使用 maudio() 初始化播放器

maudio() 目前支持两个配置项：

    maudio({
        obj:'audio', // 需要初始化的audio标签，可以使用jQuery选择器，默认值 'audio'，即所有的auido标签
        fastStep:10 // 快进、快退每次跳跃的秒数，默认值 10
    });

# Bug

重复初始化问题