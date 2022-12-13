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

![springboot1](https://www.menglingjun.com/img/in-post/springboot-adimn1.jpeg)

Step 2: Choose dependences. You can also change dependences later, so skipping is OK.

![springboot2](https://www.menglingjun.com/img/in-post/springboot-adimn2.png)

Step 3: Check the pom.xml. An example is here: https://github.com/KanadeM/Java-VUE-Admin-System/blob/main/Admin-Java/pom.xml Add necessary dependences if you need.

## Create a schema in database

Step 1: Execute following commands in Mysql console.

```sql
create database db_admin;

use db_admin;

CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(100) DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `avatar` varchar(255) DEFAULT 'default.jpg' COMMENT '用户头像',
  `email` varchar(100) DEFAULT '' COMMENT '用户邮箱',
  `phonenumber` varchar(11) DEFAULT '' COMMENT '手机号码',
  `login_date` datetime DEFAULT NULL COMMENT '最后登录时间',
  `status` char(1) DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

/*Data for the table `sys_user` */

insert  into `sys_user`(`id`,`username`,`password`,`avatar`,`email`,`phonenumber`,`login_date`,`status`,`create_time`,`update_time`,`remark`) values (1,'java1234','$2a$10$Kib4zuVhTzg3I1CoqJfd0unuY9G9ysI7cfbhyT3fi7k7Z/4pr3bGW','20220727112556000000325.jpg','caofeng4017@126.com','18862857417','2022-08-29 22:10:52','0','2022-06-09 08:47:52','2022-06-22 08:47:54','备注'),(2,'common','$2a$10$tiArwm0GxChyEP5k0JGzsOuzyY15IKA.ZTl8S2aj3haYlKAfpwfl.','222.jpg','','','2022-08-22 21:34:39','0',NULL,NULL,NULL),(3,'test','$2a$10$tiArwm0GxChyEP5k0JGzsOuzyY15IKA.ZTl8S2aj3haYlKAfpwfl.','333.jpg','','','2022-07-24 17:36:07','0',NULL,NULL,NULL),(4,'1','$2a$10$lD0Fx7oMsFFmX9hVkmYy7eJteH8pBaXXro1X9DEMP5sbM.Z6Co55m','default.jpg','','',NULL,'1',NULL,NULL,NULL),(5,'2',NULL,'default.jpg','','',NULL,'1',NULL,NULL,NULL),(15,'fdsfs','$2a$10$AQVcp4hQ7REc5o7ztVnI7eX.sJdcYy3d1x2jm5CfrcCoMZMPacfpi','default.jpg','fdfa4@qq.com','18862851414','2022-08-02 02:22:45','1','2022-08-02 02:21:24','2022-08-01 18:23:16','fdfds4'),(28,'sdfss2','$2a$10$7aNJxwVmefI0XAk64vrzYuOqeeImYJUQnoBrtKP9pLTGTWO2CXQ/y','default.jpg','dfds3@qq.com','18862857413',NULL,'1','2022-08-07 00:42:46','2022-08-06 16:43:04','ddd33'),(29,'ccc','$2a$10$7cbWeVwDWO9Hh3qbJrvTHOn0E/DLYXxnIZpxZei0jY4ChfQbJuhi.','20220829080150000000341.jpg','3242@qq.com','18862584120','2022-08-29 19:52:27','0','2022-08-29 17:04:58',NULL,'xxx'),(30,'ccc666','$2a$10$Tmw5VCM/K2vb837AZDYHQOqE3gPiRZKevxLsh/ozndpTSjdwABqaK','20220829100454000000771.jpg','fdafds@qq.com','18865259845','2022-08-29 22:05:18','0','2022-08-29 22:00:39',NULL,'ccc');


--  Above code is cited from https://www.bilibili.com/video/BV1GU4y1r7UV


```

## Create Mapper and Service by MybatisX

Step 1: Install MybatisX if it's not installed

![springboot3](https://www.menglingjun.com/img/in-post/springboot-adimn3.png)