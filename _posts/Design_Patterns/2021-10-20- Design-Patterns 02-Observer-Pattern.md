---
layout:     post                    # 使用的布局（不需要改）
title:      Observer Pattern        # 标题 
subtitle:   Design_Patterns 02 Observer Pattern #副标题
date:       2021-10-20            # 时间
author:     Leonard Meng                        # 作者
header-img: img/post-banner/java-development.jpeg   #这篇文章标题背景图片
catalog: true                       # 是否归档
mathjax: true                       # 是否启用 MathJax
tags:                               #标签
    - Java
    - Observer Pattern 
    - Design Pattern
---

# Start from a Weather Observation Station

There is a weather observation station which takes the responsility of observe the weather condition. A TV station will get the data from weather station and show the weather condition to the public.

# Design the system from object-oriented view

Obviously, there should be two classes: TV Station and Weather Observation Station. Therefore, Bob design the system like this:

TV Station
```java
public class TVStation {
	
	private float mTemperature;
	private float mPressure;
	private float mHumidity;
	
	public void update(float mTemperature,float mPressure,float mHumidity)
	{
		this.mTemperature=mTemperature;
		this.mPressure=mPressure;
		this.mHumidity=mHumidity;
		display();
	}
	
	public void display()
	{
		System.out.println("***Today mTemperature: "+mTemperature+"***");
		System.out.println("***Today mPressure: "+mPressure+"***");
		System.out.println("***Today mHumidity: "+mHumidity+"***");
	}
}


```

Weather Observation Station
```java
public class WeatherStation {
	
	private float mTemperatrue;
	private float mPressure;
	private float mHumidity;
	private TVStation tvStation;
	public WeatherStation(TVStation tvStation)
	{
	this. tvStation= tvStation;
	}
	
	public void dataChange()
	{
		tvStation.update(getTemperature(), getPressure(), getHumidity());
		}
	
	public void setData(float mTemperature,float mPressure,float mHumidity)
	{
		this.mTemperatrue=mTemperature;
		this.mPressure=mPressure;
		this.mHumidity=mHumidity;
		dataChange();
	}
	
}

```

The project is done. It looks well, isn't it?

But let's go further.

# The problems of oo

There is a new requirement: <span style="background:yellow"> another TV station wants to get the weather condition from Weather station.</span> In order to finish the requirement, a new TV station object is must added to Weather Station Class. That's the problem: <span style="color:red;font-weight:bold">For each additional observer, the weather station needs to add an object.</span>

# What caused the problem?

<span style="color:red">Directly passing in the instantiated object prevents the entire system from dynamically adding new objects.</span> 

# Observer Pattern

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