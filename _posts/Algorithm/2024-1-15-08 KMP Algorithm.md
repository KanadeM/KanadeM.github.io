---
layout:     post   				    # 使用的布局（不需要改）
title:      KMP Algorithm   	# 标题 
subtitle:   KMP Algorithm #副标题
date:       2024-1-15			# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-algorithm.png 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Algorithm
    - Data Structure
    - Array
---
# PerFace
The key of the hard problem in the leetcode weekly contest this week is KMP algorithm. I have learned this algorithm before, but I still need to review it. So I write this blog to review this algorithm.

# Introduction
String matching algorithms are used to find a pattern in a string. The simplest string matching algorithm is the Brute-Force algorithm. It is also known as the Naive String Matching algorithm. It is the simplest algorithm and is easy to understand and implement. But it is not the most efficient algorithm. It is not suitable for large texts. The time complexity of the Brute-Force algorithm is O(m*n), where m is the length of the pattern and n is the length of the text.The following figure shows the working of the Brute-Force algorithm.

![kmp1](https://www.menglingjun.com/img/algorithm-kmp1.gif)

# KMP Algorithm
KMP algorithm is an efficient string matching algorithm. It is based on the observation that when a mismatch occurs, the pattern itself contains enough information to determine where the next match could begin, thus bypassing re-examination of previously matched characters. The time complexity of the KMP algorithm is O(m+n), where m is the length of the pattern and n is the length of the text. The following figure shows the working of the KMP algorithm.

# How to build the next array

# Referencxe List
[1] https://iq.opengenus.org/prefix-sum-array/