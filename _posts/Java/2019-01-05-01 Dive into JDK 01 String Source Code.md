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

What is Immutable object? An object is considered immutable if its state cannot change after it is constructed. In general, if a class is declared by final key word, it is an immutable object.

