---
layout:     post   				    # 使用的布局（不需要改）
title:      朴素贝叶斯   	# 标题 
subtitle:   墨尔本大学 COMP90049 课程笔记 #副标题
date:       2018-03-01 				# 时间
author:     Lingjun Meng 						# 作者
header-img: img/post-bg-unimelb.png 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Machine Learing
    - COMP90049
    - 课程笔记
    - Math
    - Naive Bayes
---




# 概率论基础

## 概率论基本公式

$$
\begin{gathered}
P(X\cap y)=P(X)*P(y)\\
P(X|y)P(y)=P(y|X)P(X)\\
P(y|X)=\frac{P(y)P(X|y)}{P(X)}\\
\end{gathered}
$$

# 朴素贝叶斯

## 朴素贝叶斯的原理

我们都是到，朴素贝叶斯是一个常见的分类模型，并且是一个概率模型。那么朴素贝叶斯是要做什么呢？
首先我们要考虑，我们要做的事情是预测当某一条特征发生时，y应该是什么。从上面的概率论公式我们可以看出，$P(X), P(y), P(X|y)$都是可以很容易得到的。所以$P(y|X)$可以通过简单地计算得出。那么这个y应该是什么呢？这个y其实就是计算各种y的取值的时候，$P(y|X)$的概率，找到概率最大的那个。换句话说，这就是经常提到的用先验概率计算后验概率。即:
$$
\begin{aligned}
\hat{y} &=\text{argmax}_{y \in Y}P(y|x) \\
&=\text{argmax}_{y \in Y}\frac{P(x|y)P(y)}{P(x)}\\
&=\text{argmax}_{y \in Y}P(x|y)P(y)\\
&=\text{argmax}_{y \in Y}P(x_1,x_2,x_3...,x_M|y)P(y)
\end{aligned}
$$
上式其实并不容易计算，但是我们可以做一个假设：X之间条件独立，这样上式就可以改写为如下形式：

$$
\begin{aligned}
P\left(x_{1}, x_{2}, \ldots, x_{M} \mid y\right) P(y) & \approx P\left(x_{1} \mid y\right) P\left(x_{2} \mid y\right) \ldots P\left(x_{M} \mid y\right) P(y) \\
&=P(y) \prod_{m=1}^{M} P\left(x_{m} \mid y\right)
\end{aligned}
$$
这样，我们就得到了可以计算的公式。是不是还是有一些不明白？没关系接下来我将举一个例题来验证这个过程。

## 一个朴素贝叶斯的计算实例

### 假设我们有如下训练数据

| Headache | Sore   | Temperature | Cough | Diagnosis |
| -------- | ------ | ----------- | ----- | --------- |
| severe   | mild   | high        | yes   | Flu       |
| no       | severe | normal      | yes   | Cold      |
| mild     | mild   | normal      | yes   | Flu       |
| mild     | no     | normal      | no    | Cold      |
| severe   | severe | normal      | yes   | Flu       |

以上数据集描述了各种症状出现时，患流感还是感冒的情况。我将以头疼一列为例，剩下部分将直接给出计算结果。我们可以看到，得流感的情况一共占3种，所以$P(Flu) = \frac{3}{5}$，而在得流感的3种情况中，头疼严重的情况占了2种，$P(Headache = servere|Flu) = \frac{2}{3}$,头疼中等的情况占了1种，所以$P(Headache = mild|Flu) = \frac{1}{3}$，而没有头疼的情况占了0种，所以$P(Headache = no|Flu) = 0$。以下直接给出所有的概率
$$
\begin{gathered}
P(Flu) = 3/5 \quad P(Cold) = 2/5 \\
P(Headache = severe|Flu) = 2/3 \quad P(Headache = severe|Cold) = 0/2 \\
P(Headache = mild|Flu) = 1/3 \quad P(Headache = mild|Cold) = 1/2 \\
P(Headache = no|Flu) = 0/3 \quad P(Headache = no|Cold) = 1/2 \\
P(Sore = severe|Flu) = 1/3 \quad P(Sore = severe|Cold) = 1/2 \\
P(Sore = mild|Flu) = 2/3 \quad P(Sore = mild|Cold) = 0/2 \\
P(Sore = no|Flu) = 0/3 \quad P(Sore = no|Cold) = 1/2 \\
P(Temp = high|Flu) = 1/3 \quad P(Temp = high|Cold) = 0/2 \\
P(Temp = normal|Flu) = 2/3 \quad P(Temp = normal|Cold) = 2/2 \\
P(Cough = yes|Flu) = 3/3 \quad P(Cough = yes|Cold) = 1/2 \\
P(Cough = no|Flu) = 0/3 \quad P(Cough = no|Cold) = 1/2
\end{gathered}
$$
现在我们来计算一个概率，假设一个人中度头疼，重度嗓子疼，正常的体温没有咳嗽，那么这个人得感冒还是流感的概率更高？
首先假定这个人得了流感，那么计算在以上特征下，流感的概率。
$$
\begin{gathered}
P(\text{Flu})\times P(H=m \mid Flu) P(S=s \mid Flu) P(T=n \mid Flu) P(C=n \mid Flu) \\
 = \frac{3}{5} \times\left(\frac{1}{3}\right)\left(\frac{1}{3}\right)\left(\frac{2}{3}\right)\left(\frac{0}{3}\right)=0
\end{gathered}
$$

$$
\begin{gathered}
P(\text{Cold})\times P(H=m |Cold) P(S=s |Cold) P(T=n|Cold) P(C=n|Cold) \\
= \frac{2}{5} \times\left(\frac{1}{2}\right)\left(\frac{1}{2}\right)\left(\frac{2}{2}\right)\left(\frac{1}{2}\right)=0.05 \\

\end{gathered}
$$

从概率的计算结果我们可以预测出，此人得了感冒。

## 朴素贝叶斯的平滑

现在我们考虑如下一种情况，假设一个人有重度头痛，中度嗓子痛，高烧，不咳嗽，那么我们的计算结果是什么样的？

Cold:
$$
\begin{aligned}
P(\mathrm{Co}) & \times P(H=s \mid C o) P(S=m \mid C o) P(T=h \mid C o) P(C=n \mid C o) \\
\frac{2}{5} & \times\left(\frac{0}{2}\right)\left(\frac{0}{2}\right)\left(\frac{0}{2}\right)\left(\frac{1}{2}\right)=0
\end{aligned}
$$
Flu:
$$
\begin{aligned}
P(F I) & \times P(H=s \mid Flu) P(S=m \mid Flu) P(T=h \mid Flu) P(C=n \mid Flu) \\
\frac{3}{5} & \times\left(\frac{2}{3}\right)\left(\frac{2}{3}\right)\left(\frac{1}{3}\right)\left(\frac{0}{3}\right)=0
\end{aligned}
$$
在这种情况下，两种类别的概率都为0.这是为什么呢？这是因为我们的计算方法决策边界过于陡峭，在非0与0之间的变化是突变的。平滑就是为了解决这个问题。下面介绍两种平滑


### Epsilon平滑

Epsilon平滑非常容易理解，就是讲所有为0的概率变成$\epsilon$，(一个无穷小量)。这样我们可以得到如下结果：
Cold:
$$
\begin{aligned}
P(C o) & \times P(H=s \mid C o) P(S=m \mid C o) P(T=h \mid C o) P(C=n \mid C o) \\
\frac{2}{5} & \times(\epsilon)(\epsilon)(\epsilon)\left(\frac{1}{2}\right)=\frac{\epsilon^{3}}{5}
\end{aligned}
$$
Flu:
$$
\begin{aligned}
P(F I) & \times P(H=s \mid F I) P(S=m \mid F I) P(T=h \mid F I) P(C=n \mid F l) \\
\frac{3}{5} & \times\left(\frac{2}{3}\right)\left(\frac{2}{3}\right)\left(\frac{1}{3}\right)(\epsilon)=\frac{12 \epsilon}{135}=\frac{4 \epsilon}{45}
\end{aligned}
$$
这样我们就可以比较epsilon的幂，幂越高概率越低。所以我们可以得到，这个人被预测为流感。

#### Epsilon平滑的优缺点

##### 优点

简单，我们可以看到这个的计算过程非常简单，只是把为0的概率替换成了epsilon。

##### 缺点

1. Epsilon平滑有一个致命的缺点，那就是我们凭空增加了概率的总量，因为0变成了一个大于0的数。
2. 我们在计算中可以使用$\epsilon$，但是在实现这个算法的过程中呢？这个epsilon的取值又是一个关键点。

### Laplace平滑

拉普拉斯的平滑思路也非常简单，在每一次计算先验概率的时候，给分子加上$\alpha$($\alpha$ 是一个任意的数，通常为了方便计算取1)，给分子加上当前特征的类别数乘以$\alpha$。以下是公式：
$$
P(x_{m}=j| y=k)=\frac{\alpha+\text{count}\left(y=k, x_{m}=j\right)}{M \alpha+\text{count}(y=k)}
$$
以下是使用拉普拉斯平滑后的概率：
$$
\begin{array}{lcc} 
& \text { original estimate } & \text { smoothed estimate }(\alpha=1) \\
P(\text { Headache }=\text { severe }|F| u) & 2 / 3 & (2+1) /(3+3)=3 / 6 \\
P(\text { Headache }=\text { mild } \mid \text { Flu }) & 1 / 3 & (1+1) /(3+3)=2 / 6 \\
P(\text { Headache }=n o \mid F l u) & 0 / 3 & (0+1) /(3+3)=1 / 6 \\
P(\text { Cough }=\text { yes }|F| u) & 3 / 3 & (3+1) /(3+2)=4 / 5 \\
P(\text { Cough }=n o \mid F l u) & 0 / 3 & (0+1) /(3+2)=1 / 5
\end{array}
$$

#### Laplace平滑的优缺点

##### 优点

1. 拉普拉斯平滑之后的概率仍为1
2. 减少数据方差。所有数据向中心移动，分布更加集中

##### 缺点

1. 小数据集无法使用，因为它大幅改变了概率分布
2. 大数据集可以使用，但是会增加偏差
3. 还是一样的问题这个$\alpha$如何取值？

### 其他平滑

Good-Turing, Kneser- Ney, Regression

# 朴素贝叶斯的优缺点

## 优点

1. 逻辑简单，容易实现
2. 分类过程中资源消耗小

## 缺点

即朴素贝叶斯为什么是朴素的

朴素贝叶斯(Naive Bayes)，这个Naive的意思是天真的，回顾我们的推导过程，我们在推导的时候做了一个假设，所有特征条件独立。但是这个假设在现实中几乎不可能实现。所以朴素贝叶斯被称为朴素的。