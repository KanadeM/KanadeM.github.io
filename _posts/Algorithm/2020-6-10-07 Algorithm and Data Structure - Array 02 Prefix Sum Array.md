---
layout:     post   				    # 使用的布局（不需要改）
title:      Algorithm and Data Structure - Array 02 Prefix Sum Array   	# 标题 
subtitle:   Algorithm and Data Structure - Array 02 Prefix Sum Array #副标题
date:       2020-6-10			# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-algorithm.png 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Algorithm
    - Data Structure
    - Array
---

# What is prefix sum array?
<p style="background:yellow; font-weight:bold">
Prefix Sum array is a data structure design which helps us to answer several queries such as sum in a given range in constant time which would otherwise take linear time. It requires a linear time preprocessing and is widely used due to its simplicity and effectiveness. $^{[1]}$
</p>

# The application of prefix sum array
## Range Sum Query
For example, [303. Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/), in this problem, without prefix array we have to sum the array every time when we call sumRange function.

# Referencxe List
[1] https://iq.opengenus.org/prefix-sum-array/