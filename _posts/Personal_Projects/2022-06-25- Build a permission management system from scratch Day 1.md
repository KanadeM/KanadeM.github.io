---
layout:     post                    # 使用的布局（不需要改）
title:      Build a permission management system from scratch Day 1        # 标题 
subtitle:   Project structure of backend #副标题
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

Github address: https://github.com/KanadeM/Java-VUE-Admin-System

# Dependences of the backend

Spring Boot 2.3.2-RELEASE is chosen as the backend framework because of the following reasons: 1. Easy to use 2. A lot of dependences 3. Easy to deploy

Mysql 7.6: an open source database.

Lombok: a java library tool that is used to minimize/remove the boilerplate code and save the precious time of developers during development by just using some annotations.



# Development Environment

- Java 11
- VUE 2.x
- Spring boot 2.3.2-RELEASE
- Mysql 7.6
- Redis

# Steps
## Create a new Spring Boot project

Step 1: Choose Spring Initializr as project generator

![springboot1](https://www.menglingjun.com/img/in-post/springboot1.jpeg)

Step 2: Choose dependences. You can also change depend packages later so skipping is OK.

![springboot1](https://www.menglingjun.com/img/in-post/springboot2.png)