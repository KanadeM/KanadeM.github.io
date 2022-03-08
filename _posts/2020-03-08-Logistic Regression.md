---
layout:     post   				    # 使用的布局（不需要改）
title:      Logistic Regression   	# 标题 
subtitle:   Unimelb COMP90049 Notes #副标题
date:       2020-03-08 				# 时间
author:     Lingjun Meng 						# 作者
header-img: img/post-bg-unimelb.jpg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Machine Learing
    - COMP90049
    - 课程笔记
    - Math
    - Logistic Regression
---


# Chapter 0 Recall Naive Bayes

$$
P(x, y)=P(y) P(x \mid y)=\prod_{i=1}^{N} P\left(y^{i}\right) \prod_{m=1}^{M} P\left(x_{m}^{i} \mid y^{i}\right)
$$

- A probabilistic generative model of the joint probability P(x, y) 
- Optimized to maximize the likelihood of the observed data
- Naive due to unrealistic feature indepencence assumptions

For prediction, we apply Bayes Rule to obtain the conditional distribution
$$
\begin{aligned}
&P(x, y)=P(y) P(x \mid y)=P(y \mid x) P(x) \\
&P(y \mid x) =\frac{P(y) P(x \mid y)}{P(x)} \\
&\hat{y}=\underset{y}{\operatorname{argmax}} P(y \mid x) \approx P(y) P(x \mid y)
\end{aligned}
$$
**How about we model P(y|x) directly? → Logistic Regression**

# Chapter 1 Logistic Regression-Binary Classification Problem

**Logistic Regression**

- Is a binary **classification model**(Classification!!!! not Regression)
- Is a probabilistic discriminative model because it optimizes P(y\|x) directly
- Learns to optimally **discriminate between inputs which belong to different classes**
- No model of P(x\|y) → no conditional feature independence assumption

## 1.1 Aside: Linear Regression

**linear regression is the simples regression model** 

Real-valued $\hat{y}$ is predicted as a linear combination of weighted feature values
$$
\begin{aligned}
\hat{y} &=\theta_{0}+\theta_{1} x_{1}+\theta_{2} x_{2}+\ldots \\
&=\theta_{0}+\sum_{i} \theta_{i} x_{i}
\end{aligned}
$$
The weights $\theta_0,\theta_1 ...$ are model parameters, and need to be optimized during training

Loss (error) is the sum of squared errors (SSE): $L=\sum_{I=1}^{N}(\hat{y}^i-y^i)^2$

## 1.2 Logistic Regression: Derivation

Now tidy up our resources and problems.

- Let’s assume a binary classification task, y is true (1) or false (0).
- We model probabilites P(y = 1\|x; θ) = p(x) as a function of observations x under parameters θ.
- We want to use a **regression** approach

Linear regression problem: the boundary is -inf to +inf, and the boundary of probability is 0-1.

To solve this problem, we introduce the sigmoid function.
$$
f(x)=\frac {1}{1+e^{-x}}=\frac {e^{x}}{e^{x}+1}=1-S(-x)
$$

<img src="./static/img/image-20210629075702138.png" alt="image-20210629075702138" style="zoom:50%;" />

Now we use the sigmoid function to derive logistic regression.

$$
P(x) = \frac{1}{1+e^{-(\theta_{0}+\sum_{i} \theta_{i} x_{i})}}\\
\frac{1}{P(x)}=1+e^{-(\theta_{0}+\sum_{i} \theta_{i} x_{i})}\\
e^{-(\theta_{0}+\sum_{i} \theta_{i} x_{i})}=\frac{1-P(x)}{P(x)}\\
-(\theta_{0}+\sum_{i} \theta_{i} x_{i})=\ln{\frac{1-P(x)}{P(x)}}\\
\theta_{0}+\sum_{i} \theta_{i} x_{i}=\ln{\frac{P(x)}{1-P(x)}}
$$

The above formula is logistic regression function.
$$
\log \frac{P(x)}{1-P(x)}=\theta_{0}+\theta_{1} x_{1}+\ldots \theta_{F} x_{F}
$$
For binary classification problem, labels are either 0 or 1.
$$
\begin{aligned}
&\left(\theta_{0} + \sum_{f=1}^{F} \theta_{f} x_{f}\right)>0 \text { means } y=1\\
&\left(\theta_{0} + \sum_{f=1}^{F} \theta_{f} x_{f}\right) \approx 0 \text { means most }\\
&\text { uncertainty }\\
&\left(\theta_{0} +  \sum_{f=1}^{F} \theta_{f} x_{f}\right)<0 \text { means } y=0
\end{aligned}
$$

## 1.3 Logistic Regression: Prediction

We define a **decision boundary**, e.g., predict y = 1 if P(y = 1\|x1, x2, ..., xF; θ) > 0.5 and y = 0 otherwise

<img src="./static/img/image-20210629082233689.png" alt="image-20210629082233689" style="zoom:50%;" />

## 1.4 Logistic Regression: Example



# Chapter 2 Parameter Estimation

**What are the steps we would follow in finding the optimal parameters?**

## 2.1 Objective Function

### 2.1.1 Negative conditional log likelihood



Mimimize the Negative conditional log likelihood
$$
\mathcal{L}(\theta)=-P(Y \mid X ; \theta)=-\prod_{i=1}^{N} P\left(y^{i} \mid x^{i} ; \theta\right)
$$
note that
$$
\begin{aligned}
&P(y=1 \mid x ; \theta)=\sigma\left(\theta^{\top} x\right) \\
&P(y=0 \mid x ; \theta)=1-\sigma\left(\theta^{T} x\right)
\end{aligned}\\
\sigma(x)=\frac{1}{1+e^{-x}}
$$
so, using likelihood:
$$
\begin{aligned}
\mathcal{L}(\theta)=-P(Y \mid X ; \theta) &=-\prod_{i=1}^{N} P\left(y^{i} \mid x^{i} ; \theta\right) \\
&=-\prod_{i=1}^{N}\left(\sigma\left(\theta^{T} x^{i}\right)\right)^{y^{i}} *\left(1-\sigma\left(\theta^{T} x^{i}\right)\right)^{1-y^{i}}
\end{aligned}
$$
take the log of this function
$$
\log \mathcal{L}(\theta)=-\sum_{i=1}^{N} [y^{i} \log \sigma\left(\theta^{T} x^{i}\right)+\left(1-y^{i}\right) \log \left(1-\sigma\left(\theta^{T} x^{i}\right)\right)]
$$

### 2.1.2 Why should we use negative conditional log likelihood?

The following is an image of the negative log likelihood function.

Since the probability is between 0-1, the x of the logarithmic function is between 0-1.

<img src="./static/img/image-20210701214700529.png" alt="image-20210701214700529" style="zoom:50%;" />

Why use logarithms?
Using the logarithmic function here can help us transform the product into addition operations.

Why take a negative number?
Taking a negative number can help us turn the maximum problem into a minimum problem. And in line with our expectations, that is, the greater the probability value, the smaller the loss.

## 2.2 Take 1st Derivative of the Objective Function

**Preliminaries**

- The derivative of the logistic (**sigmoid**) function is $\frac{\partial \sigma(z)}{\partial z}=\sigma(z)[1-\sigma(z)]$

- The chain rule tells us that $\frac{\partial A}{\partial D}=\frac{\partial A}{\partial B} \times \frac{\partial B}{\partial C} \times \frac{\partial C}{\partial D}$


$$
\begin{aligned}
\frac{\partial \log \mathcal{L}(\theta)}{\partial \theta_{j}}=\frac{\partial \log \mathcal{L}(\theta)}{\partial p} \times \frac{\partial p}{\partial z} \times \frac{\partial z}{\partial \theta_{j}} \quad \\
\text { where } p=\sigma\left(\theta^{T} x\right) \text { and } z=\theta^{T} x \\
\text { Since } \mathcal{L}(\theta)=-[y \log p+(1-y) \log (1-p)\\

\frac{\partial \log \mathcal{L}(\theta)}{\partial p}=-\left(\frac{y}{p}-\frac{1-y}{1-p}\right) \\
\frac{\partial \hat{p}}{\partial z}=\frac{\partial \sigma(z)}{\partial z}=\sigma(z)[1-\sigma(z)]\\
\frac{\partial z}{\partial \theta_{j}}=\frac{\partial \theta^{\top} x}{\partial z}=x_{j}
\end{aligned}
$$
Therefore
$$
\begin{aligned}
\frac{\partial \log \mathcal{L}(\theta)}{\partial \theta_{j}} &=\frac{\partial \log \mathcal{L}(\theta)}{\partial p} \times \frac{\partial p}{\partial z} \times \frac{\partial z}{\partial \theta_{j}} \\
&=-\left[\frac{y}{p}-\frac{1-y}{1-p}\right] \times \sigma(z)[1-\sigma(z)] \times x_{j}\\

&=-\left[\frac{y}{p}-\frac{1-y}{1-p}\right] \times p[1-p] \times x_{j}\\
&=-\left[\frac{y(1-p)}{p(1-p)}-\frac{p(1-y)}{p(1-p)}\right] \times p[1-p] \times x_{j} \\
&=-[y(1-p)-p(1-y)] \times x_{j}\\
&=-[y-y p-p+y p] \times x_{j} \\
&=-[y-p] \times x_{j} \\
&=[p-y] \times x_{j}\\
&=\left[\sigma\left(\theta^{\top} x\right)-y\right] \times x_{j}
\end{aligned}
$$

## 2.3 Solve for θ

Unfortunately, that’s not straightforward here (as for Naive Bayes)。 Instead, we will use an iterative method: **Gradient Descent**
$$
\begin{aligned}
&\theta_{j}^{(n e w)} \leftarrow \theta_{j}^{(\text {old })}-\eta \frac{\partial \log \mathcal{L}(\theta)}{\partial \theta_{j}} \\
&\theta_{j}^{(n e w)} \leftarrow \theta_{j}^{(\text {(old })}-\eta \sum_{i=1}^{N}\left(\sigma\left(\theta^{T} \boldsymbol{x}^{i}\right)-\boldsymbol{y}^{i}\right) \boldsymbol{x}_{j}^{i}
\end{aligned}
$$

# Chapter 3 Multinomial Logistic Regression

## 3.1 Multinomial Logistic Regression

We predict the probability of each class $c$ by passing the input representation through the softmax function, a generalization of the sigmoid
$$
p(y=c \mid x ; \theta)=\frac{\exp \left(\theta_{c} x\right)}{\sum_{k} \exp \left(\theta_{k} x\right)}
$$
**We learn a parameter vector $\theta_{c}$ for each class $c$**

## 3.2 Example! Multi-class with 1-hot features

**(Small) Test Data set** 

| Outlook | Temp | Humidity | Class          |
| ------- | ---- | -------- | -------------- |
| rainy   | cool | normal   | 0 (don’t play) |
| sunny   | cool | normal   | 1 (maybe play) |
| sunny   | hot  | high     | 2 (play)       |



Feature Function 
$$
\begin{array}{ll}
x_{0}=1 \text { (bias term) } 
& x_{0}=1 \text { (bias term) } 
\\ 
x_{1}=
\left\{
	\begin{array}{l}
		1 \text { if outlook=sunny } \\ 
		2 \text { if outlook=overcast } \\ 
    3 \text { if outlook=rainy }
  \end{array}
\right.

& x_{1}=
\left\{
	\begin{array}{l}
		[100] \text { if outlook=sunny } \\ 
		[010] \text { if outlook=overcast } \\ 
		[001] \text { if outlook=rainy }
	\end{array}
	\right.
\\
x_{2}=
\left\{
	\begin{array}{l}
		1 \text { if if temp=hot } \\ 
		2 \text { if temp = mild } \\ 
    3 \text { if temp = cool }
  \end{array}
\right.

& x_{2}=
\left\{
	\begin{array}{l}
		[100] \text { if temp }=\text { hot } \\ 
		[010] \text { if temp }=\text { mild }\\ 
		[001] \text { if temp= cool}
	\end{array}
\right.
\\

x_{3}=
\left\{
	\begin{array}{l}
		1 \text { if humidity=normal } \\ 
		2 \text { if humidity=high }
	\end{array}
\right.
& x_{3}=\left\{\begin{array}{l}{[10] \text { if humidity=normal }} \\ {[01] \text { if humidity=high }}\end{array}\right.
\end{array}\\
$$
**(Small) Test Data set (One Hot) ** 

| Outlook | Temp | Humidity | Class          |
| ------- | ---- | -------- | -------------- |
| 001     | 001  | 10       | 0 (don’t play) |
| 100     | 001  | 10       | 1 (maybe play) |
| 100     | 100  | 01       | 2 (play)       |

**Model parameters**
$$
\begin{aligned}
&\theta_{c 0} = [0.1,0.7,0.2,-3.5,-3.5,-3.5,0.7,2.1]\\
&\theta_{c 1} = [0.6,0.1,0.9,2.5,2.5,2.5,2.7,-2.1]\\
&\theta_{c 2} = [3.1,3.4,4.1,1.5,1.5,1.5,0.7,3.6]
\end{aligned}
$$
When logistic regression is applied to multiple classification problems. Each category will have a corresponding parameter. Then use the above parameters for each instance one by one on the test set to get the probability of the category, and take the highest.

# Chapter 4 Logistic Regression: Final Thoughts

**Pros** 

- Probabilistic interpretation
- No restrictive assumptions on features
- Often outperforms Naive Bayes
- Particularly suited to frequency-based features (so, popular in NLP) 

**Cons**

- Can only learn linear feature-data relationships
- Some feature scaling issues
- Often needs a lot of data to work well
- Regularisation a nuisance, but important since overfitting can be a big problem


