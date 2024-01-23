---
layout:     post   				    # 使用的布局（不需要改）
title:      Understanding COUNT(*) vs. COUNT(1) in MySQL 	# 标题 
subtitle:   A Detailed Analysis #副标题
date:       2023-04-20			# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/mysqlBanner.jpg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Database
    - MySQL
---
# Perface
When working with MySQL, one common operation is counting rows in a table. This can be achieved using COUNT(*) or COUNT(1). While they may seem similar, there are nuances in how they operate, especially concerning MySQL's different storage engines. Let's delve into these differences and understand their implications.

# COUNT(expr) vs. COUNT(*)
In MySQL, COUNT(expr) computes the number of non-NULL values of expr in the rows returned by a SELECT statement. The result is a BIGINT value. This means if you use COUNT(column_name), only rows where column_name is not NULL will be counted.

On the other hand, COUNT(*) is distinct in that it counts all rows, regardless of NULL values. It's the go-to method when you need the total number of rows in a table.

> InnoDB handles SELECT COUNT(*) and SELECT COUNT(1) operations in the same way. There is no performance difference. from https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html

# Storage Engine Differences
MySQL's behavior when executing COUNT(*) can vary depending on the storage engine.

## InnoDB Engine
For transactional storage engines like InnoDB, an exact row count is not stored internally due to concurrent transactions. Consequently, SELECT COUNT(*) in InnoDB counts rows visible to the current transaction, making it a bit more resource-intensive.

## MyISAM Engine
In contrast, MyISAM tables optimize COUNT(*) significantly. If a query involves retrieving only from a single MyISAM table, without additional columns or a WHERE clause, the response is almost instantaneous. This is because MyISAM stores an exact row count.

However, for COUNT(1) to be optimized in the same way, the first column of the table must be defined as NOT NULL.

# InnoDB's Preference for Secondary Indexes
InnoDB prefers using secondary indexes over primary key indexes for SELECT COUNT(*) queries. This is because secondary indexes usually take up less space, making the operation faster.

## Why Secondary Indexes Are Smaller
Secondary indexes are generally smaller because they only store the indexed column and a reference to the primary key, as opposed to storing all column data like clustered (primary key) indexes.

# Reference List
[MySQL Reference Manual: MySQL Documentation on Aggregate Functions](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)

# Conclusion
Understanding the difference between COUNT(*) and COUNT(1) and how they behave with different MySQL storage engines is crucial for writing efficient queries. Remember, COUNT(*) is generally what you need for a total row count, but be mindful of the storage engine's specifics to optimize your queries. InnoDB's transactional nature and MyISAM's stored row count feature are key considerations in these operations.