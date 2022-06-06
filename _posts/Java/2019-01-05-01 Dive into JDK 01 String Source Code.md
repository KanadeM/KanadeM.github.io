---
layout:     post   				    # 使用的布局（不需要改）
title:      String Source Code   	# 标题 
subtitle:   Dive into JDK 01 String Source Code #副标题
date:       2019-01-05 				# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/java-development.jpeg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Java
    - Source Code
    - String
---

# Declaration of String

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {

    /**
     * The value is used for character storage.
     *
     * @implNote This field is trusted by the VM, and is a subject to
     * constant folding if String instance is constant. Overwriting this
     * field after construction will cause problems.
     *
     * Additionally, it is marked with {@link Stable} to trust the contents
     * of the array. No other facility in JDK provides this functionality (yet).
     * {@link Stable} is safe here, because value is never null.
     */
    @Stable
    private final byte[] value;
    private final byte coder;
    // Some methods
}
```

According to the Java source code, String is a byte arrary in fact. In addtion, the coder field stores the char set, which is used to store strings in different char set.

# Immutable object in Java

What is Immutable object? An object is considered immutable if its state cannot change after it is constructed. Which means, once a String is decalared, it cannot be changed anymore. In general, if a class is declared by final key word, it is an immutable object.

We can look back to the String source code. The String class is declared as "public final String".

# Why are the String objects immutable?

> I would use an immutable whenever I can. <br>
> ---- James Gosling(One of Java's Creators)

Considering the above answer, the question can be answered in three aspects.

## Cache

String is one of the most common data structures in Java. Creating and destorying a string is considerable time consuming. Therefore, Strings are cached in JVM  in order to save memory.

A string pool is remained in JVM to store string objects.

![string-pool](http://www.menglingjun.com/img/in-post/java-string-01.png)

With the string pool, two string variables with the same content can point to the same string object in the pool, thus saving memory.

```java
String s = "abcd";
String s2 = s;
```

For example, both s and s2 represent "abcd", so they will point to the same string object in the string pool:

However, this is possible mainly because of the immutability of strings. Just imagine, if the string is mutable, once we modify the content of s, it will inevitably lead to the passive change of the content of s2, which is obviously not what we want to see.

## Safety 

Strings are widely used in Java applications to store sensitive information such as usernames, passwords, connection urls, network connections, etc. It is also used extensively by the JVM class loader when loading classes.

Therefore, securing the String class is essential to improve the security of the entire application.

When we pass a string in the program, if the content of the string is immutable, then we can trust the content of the string.

However, if it is mutable, then the string content may be modified at any time. Then the content of this string is completely credible. In this way, the entire system has no security at all.

## Thread safety

Immutability automatically makes strings thread-safe because they won't be changed when accessed from multiple threads.

So in general immutable objects can be shared between multiple threads running at the same time. They are also thread-safe because if a thread changes the value, a new string will be created in the string pool instead of modifying the same value. So strings are safe for multithreading.

## Hashcode cache

Since string objects are widely used as data structures, they are also widely used in hash implementations such as HashMap, HashTable, HashSet, etc. When operating on these hash implementations, the hashCode() method is often called.

Immutability guarantees that the value of a string will not change. Therefore, the hashCode() method is overridden in the String class to facilitate caching so that the hash is computed and cached during the first hashCode() call and returns the same value from then on.

In the String class, there is the following code:

```java
private int hash;//this is used to cache hash code.
```

## Performance

The string pool, hashcode cache, etc. mentioned above are all improvements to improve performance.

Because strings are immutable, string pool caching can be used, which can greatly save heap memory. And it can also cache the hashcode in advance, which is more efficient

Since strings are the most widely used data structure, improving the performance of strings has a considerable impact on improving the overall performance of the entire application.

# Summarize

From this article, we can conclude that strings are immutable, so their references can be treated as normal variables, and they can be passed between methods and threads without worrying about the actual character it points to Whether the string object will change.

We also saw other reasons that motivated the Java language designers to make this class immutable. The main considerations are cache, security, thread safety and performance, etc.