---
layout:     post   				    # 使用的布局（不需要改）
title:      An Interesting UnderLine Animation in CSS  	# 标题 
subtitle:   An Interesting UnderLine Animation in CSS #副标题
date:       2024-01-20			# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-algorithm.png 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - CSS
    - HTML
---


<style>
span{
    background: linear-gradient(to right, #ec695c, #61c454) no-repeat right bottom;
    background-size: 0 2px;
    transition: background-size 1300ms;
}
span:hover{
    background-position-x: left;
    background-size: 100% 2px;
}
</style>

<span>
This is an interesting title animation in CSS. Please hover on me to see the effect.
</span>

# Source Code
```css
span {
    /* Sets a linear gradient as the background. The gradient moves from left to right, starting with #ec695c color and transitioning to #61c454 color. */
    background: linear-gradient(to right, #ec695c, #61c454) no-repeat right bottom;

    /* Initially sets the size of the background (gradient) to 0 width and 2px height, effectively hiding it initially. */
    background-size: 0 2px;

    /* Applies a transition effect to the background-size property, so changes in background-size will occur over 1300 milliseconds. */
    transition: background-size 1300ms;
}

span:hover {
    /* On hover, changes the starting position of the background (gradient) to the left. */
    background-position-x: left;

    /* On hover, changes the size of the background to 100% width and 2px height, making the gradient line visible under the span element. */
    background-size: 100% 2px;
}


```