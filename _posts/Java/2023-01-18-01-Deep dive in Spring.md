---
layout:     post   				    # 使用的布局（不需要改）
title:      Introduction to Spring   	# 标题 
subtitle:   Dive into Spring 01 Introduction to Spring #副标题
date:       2019-03-01 				# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-spring-logo.jpeg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Java
    - Source Code
    - IOC
    - Beans
    - AOP
    - Spring
---

# Table of Contents
1. [What is Spring Framework?](#what-is-spring-framework)
2. [Why Spring?](#why-spring)
3. [IoC(Inversion of Control)](#iocinversion-of-control)


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

# Aspect-Oriented Programming (AOP) in Spring

Aspect-Oriented Programming (AOP) is a powerful programming technique that allows developers to modularize cross-cutting concerns. Cross-cutting concerns are aspects of a program that affect other parts of the application. Examples of cross-cutting concerns include logging, transaction management, data validation, and security. These operations are often scattered throughout an application, and AOP provides a way to modularize and separate them.

## Understanding AOP Concepts

Before we dive into how Spring supports AOP, let's understand some fundamental AOP concepts:

1. **Aspect**: An aspect is a modularization of a concern that cuts across multiple classes. It encapsulates behaviors affecting multiple classes into reusable modules.

2. **Join point**: A join point is a point in the execution of the program, such as method execution, exception handling, and field assignment. In Spring AOP, a join point always represents a method execution.

3. **Advice**: Advice is the action taken by an aspect at a particular join point. Different types of advice include "around," "before," and "after" advice.

4. **Pointcut**: A pointcut is a predicate that matches join points. Advice is associated with a pointcut expression and runs at any join point matched by the pointcut.

5. **Target Object**: The object being advised by one or more aspects. Also referred to as the advised object.

6. **Weaving**: The process of linking aspects with other application types or objects to create an advised object.

## AOP in Spring

Spring AOP integrates aspect-oriented functionality directly into the Spring framework, through its configuration management feature. It uses the Spring IoC container to configure aspects, advices, and advised objects, which allows us to use standard Spring features such as dependency injection and transaction management along with aspects.

The Spring Framework uses the AOP Alliance interfaces and provides two types of AOP:

1. **Schema-based AOP**: This approach uses XML configuration to define aspects, join points, and advice.

2. **@AspectJ-based AOP**: This approach uses the `@AspectJ` annotation style to define aspects, join points, and advice. This is the preferred method because it's easier to understand and manage.

Here's a simple example of a logging aspect defined using @AspectJ annotation:

```java
@Aspect
public class LoggingAspect {

    @Before("execution(* com.example.MyClass.myMethod(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Executing method: " + joinPoint.getSignature().getName());
    }
}
```

In the above code, `@Aspect` defines the class as an Aspect. `@Before` annotation represents an advice which will be executed before the method `myMethod()` of `MyClass` is invoked. The `execution` expression is a pointcut expression that matches the method execution join points.

In conclusion, Spring's AOP support is a powerful feature that promotes better code organization and modularity, allowing for a clean separation of cross-cutting concerns from the core business logic.



# Source Code

Spring framework wersion: v3.2.6

Source code address: [spring framework source code](https://github.com/spring-projects/spring-framework)

