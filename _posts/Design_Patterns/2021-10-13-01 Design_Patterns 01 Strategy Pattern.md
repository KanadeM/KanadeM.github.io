---
layout:     post                    # 使用的布局（不需要改）
title:      Strategy Pattern        # 标题 
subtitle:   Design_Patterns 01 Strategy Pattern #副标题
date:       2021-10-13              # 时间
author:     Leonard Meng                        # 作者
header-img: img/post-banner/java-development.jpeg   #这篇文章标题背景图片
catalog: true                       # 是否归档
mathjax: true                       # 是否启用 MathJax
tags:                               #标签
    - Java
    - Strategy Pattern 
    - Design Pattern
---

# Start from a game

There is a game - simulation ducks. In this game, the player can simulate red duck and green duck. Both kinds of ducks can swim and quack. The only difference is the color.

# Design the game from object-oriented view

Bob takes responsibility for this project. From oo perspective, Duck should be a superclass. Green duck and red duck will extend the superclass. So, the code should be like this:

```java
public abstract class Duck {

    public Duck() {
    }

    public void Quack() {
        System.out.println("~~gaga~~");
    }

    public abstract void display();

    public void swim() {
        System.out.println("~~im swim~~");
    }

}

public class RedDuck extends Duck(){
    @Override
    public void display(){
        System.out.println("I'm red duck.");
    }
}


public class GreenDuck extends Duck(){
    @Override
    public void display(){
        System.out.println("I'm green duck.");
    }
}
```

The project is done. It looks well, isn't it?

But let's go further.

# The problems of oo

There is a new requirement: <span style="background:yellow"> both red duck and green duck can fly.</span> This example is easy since Bob just needs to add a new function to superclass:

```java
public void Fly() {System.out.println("~~im fly~~");}
```

However, what about there is a duck cannot fly? For example, a new duck need to be added to the system - cannot fly duck. Bob can override the fly function in CannotFlyDuck class.

```java
public class CannotFlyDuck extends Duck(){
    @Override
    public void display(){
        System.out.println("I'm can not fly duck.");
    }

    @Override
    public void fly(){
        System.out.println("I can not fly.");
    }
}
```

<span style="background: yellow">This is just a basic example since we just have three kinds of ducks. Let's picture a big system with 100 kinds of ducks. Some cannot fly, whereas some can fly. Some cannot swim, while some can swim. In this case, Bob has to override the function in every class. </span>

# What caused the problem?

<span style="color:red">One behavior of ducks is various. However, some kinds of ducks have the same behaviour. Therefore, if Bob implements a behaviour in the superclass, subclasses need to override it.</span> It makes the extension and maintenance of the project difficult. We are aiming at Time complexity $O(N)$ of extension of the project.

# Strategy Pattern

## Analyse the project

Before coding, we need to analyse the project: which parts always changing and which parts is stable?

1. <span style="color:red">The display of a duck will not change.</span>
2. <span style="color:red">The behavior of a duck will change.</span>

Flying behavior, quacking behavior and swimming behavior are various. In addition, they can be combined at will. <span style="background: yellow">Therefore, if one kind of behaviors is put into a cluster, the project will be easier. </span>

## What is Strategy Pattern?

<span style="background: yellow">Encapsulate the behavior interface respectively, implement the algorithm cluster, put the behavior interface object in the superclass, and set the behavior object in the subclass. The principle is: to separate the changing parts, encapsulate the interface, and program various functions based on the interface. This mode allows behavioural changes to the algorithm to be independent of the user of the algorithm.</span>

## Code the project from strategy pattern view

Fly behavior:

```java

public interface Fly {
    void fly();
}
public class CanNotFly implements Fly{
    @Override
    public void fly() {
        System.out.println("I cannot fly~~~~~");
    }
}
public class CanFly implements Fly{
    @Override
    public void fly() {
        System.out.println("I can fly~~~~~");
    }
}

```

Quack behavior:

```java

public interface Quack {
    void quack();
}
public class GegeQuack implements Quack{
    @Override
    public void quack() {
        System.out.println("Gege~~~~ Gege~~~~");
    }
}

public class GagaQuack implements Quack{
    @Override
    public void quack() {
        System.out.println("Gaga~~~~ Gaga~~~~");
    }
}
```

Duck:

```java
public abstract class Duck {

    Fly fly;
    Quack quack;

    public Duck() {

    }

    public void Fly() {
        fly.fly();
    }

    public void Quack() {
        quack.quack();
    }

    public abstract void display();

    public void SetQuackBehavoir(Quack qb) {
        quack = qb;
    }

    public void SetFlyBehavoir(Fly fb) {
        fly = fb;
    }

    public void swim() {
        System.out.println("~~im swim~~");
    }
}

public class GreenDuck extends Duck{
    @Override
    public void display() {
        System.out.println("I am green duck");
    }

    public GreenDuck() {
        fly = new CanNotFly();
        quack = new GagaQuack();
    }
}
public class RedDuck extends Duck{
    @Override
    public void display() {
        System.out.println("I am red duck~~~~");
    }

    public RedDuck() {
        fly = new CanFly();
        quack = new GegeQuack();
    }
}

```

# Object Oriented and Strategy Pattern

The problem of extends:

1. <span style="color:red"> The function in superclass will influence subclass.</span>
2. <span style="color:red">The fucntion in subclass is not reuseful.<span>

The key points of Strategy:

1. <span style="color:red">Analyze the changed and unchanged parts of the project. <span>
2. <span style="color:red">Use more combination and less inheritance; use behavior class combination instead of behavior inheritance. more flexible<span>