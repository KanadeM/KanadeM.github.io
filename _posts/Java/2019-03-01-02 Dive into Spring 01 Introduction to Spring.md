---
layout:     post   				    # 使用的布局（不需要改）
title:      Introduction to Spring   	# 标题 
subtitle:   Dive into Spring 01 Introduction to Spring #副标题
date:       2019-03-01 				# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/java-development.jpeg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Java
    - Source Code
    - Spring
---

# What is Spring Framework?

According to official website [spring.io](https://spring.io/projects/spring-framework#overview)

> The Spring Framework provides a comprehensive programming and configuration model for modern Java-based enterprise applications - on any kind of deployment platform.<br>A key element of Spring is infrastructural support at the application level: Spring focuses on the "plumbing" of enterprise applications so that teams can focus on application-level business logic, without unnecessary ties to specific deployment environments.

# Why Spring?
Spring makes the programming Java quicker, easier, and safer for everybody by the following ways:

1. Lightweight and non-invasive programming based on POJOs.
2. Reduce coupling through dependency injection and interface orientation
3. Declarative programming based on aspects and 
4. Reduce boilerplate code with aspects and templates

# IoC(Inversion of Control)

This chapter covers the Spring Framework implementation of the Inversion of Control (IoC)principle. IoC is also known as dependency injection (DI). It is a process whereby objects define their dependencies, that is, the other objects they work with, only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method. The container then injects those dependencies when it creates the bean. This process is fundamentally the inverse, hence the name Inversion of Control (IoC), of the bean itself controlling the instantiation or location of its dependencies by using direct construction of classes, or a mechanism such as the Service Locator pattern.


```java
class A{
    int a;
    int b;

    public void method1(){

    }
}

// Java without spring
// Manual initialization
A a = new A()

// Java with spring
// Automatically initialization
@Autowired
A a;
```

<span style="color: red">If we code without java, we need to instant a object through new statement.</span>


# Bean Oriented Programming

In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application. 

# Source Code

Spring framework wersion: v3.2.6

Source code address: [spring framework source code](https://github.com/spring-projects/spring-framework)

