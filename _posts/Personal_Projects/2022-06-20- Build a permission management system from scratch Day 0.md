---
layout:     post                    # 使用的布局（不需要改）
title:      Build a permission management system from scratch Day 0        # 标题 
subtitle:   Build a permission management system from scratch Day 0 #副标题
date:       2022-06-20            # 时间
author:     Leonard Meng                        # 作者
header-img: img/post-banner/java-development.jpeg   #这篇文章标题背景图片
catalog: true                       # 是否归档
mathjax: true                       # 是否启用 MathJax
tags:                               #标签
    - Java
    - VUE
    - Personal Projects
    - Permission Management System
---

# Introduction

This sort of posts is source code of online course: 权限系统实战课程(springboot2+springsecurity+vue3+element plus. The url is: https://www.bilibili.com/video/BV1GU4y1r7UV

I have made some changes to make the project better. For example, I encapsulate the Response Class so that the code like "response.OK($some data)" is no need anymore. What's more, the error response is also be encapsulated, which means raw server code will not be sent to clients.


# Development Environment

- Java 11
- VUE 2.x
- Spring boot 2.3.2-RELEASE
- Mysql 7.6
- Redis
