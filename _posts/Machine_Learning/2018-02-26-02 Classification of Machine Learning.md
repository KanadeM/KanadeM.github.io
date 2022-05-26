---
layout:     post   				    # 使用的布局（不需要改）
title:      Classification of Maching Learning Algorithm  	# 标题 
subtitle:   Classification of Maching Learning Algorithm #副标题
date:       2018-02-26 				# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner-ai2.jpg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Machine Learning
    - AI
---
# Basic classification

## Supervised learning

Supervised learning refers to the machine learning problem of learning predictive models from labelled data. Annotated data represents the corresponding relationship between input and output, and the prediction model produces the corresponding output for a given input. ==The essence of supervised learning is to learn the statistical law of the mapping from input to output ==. Because there are manually labelled training data sets, it is called supervised learning.

==**The prediction problem in which the input and output variables are both continuous variables is called regression problem; the prediction problem in which the output variable is a limited number of discrete variables is called classification problem; the prediction problem in which the input and output variables are both variable sequences is called labeling problem .**==

##  Unsupervised learning

Unsupervised learning refers to the machine learning problem of learning predictive models from unlabeled data. Unlabeled data is naturally obtained data, and the predictive model represents the category, conversion or probability of the data. == The essence of unsupervised learning is to learn statistical laws or potential structures in the data. ==

## Reinforcement learning

Reinforcement learning refers to a machine learning problem in which intelligent systems learn optimal behavior strategies in continuous interaction with the environment. Assuming that the interaction between the intelligent system and the environment is based on the Markov decision process, what the intelligent system can observe is the data sequence obtained by interacting with the environment. ==The essence of reinforcement learning is to learn the optimal sequential decision==


## Semi-supervised learning and active learning

==Semi-supervised learning refers to a machine learning problem that uses labelled data and unlabeled data to learn predictive models.== Usually there is a small amount of labelled data and a large amount of unlabeled data because the construction of labelled data often requires labour and high cost, and the collection of unlabeled data does not require much cost. Semi-supervised learning aims to use the information in unlabeled data to assist in labelling data, perform supervised learning, and achieve better learning results at a lower cost

==Active learning refers to the machine learning problem in which the machine continuously gives examples for teachers to label, and then uses the labelled data to learn the predictive model.== Usually supervised learning uses given labelled data, which is often obtained randomly, which can be regarded as "passive learning". The goal of active learning is to find the most helpful examples for learning for teachers to label, with smaller Mark the cost to achieve better learning results. Semi-supervised learning and active learning are closer to supervised learning.

# Classification by model

## Probabilistic and non-probabilistic models

==Statistical learning models can be divided into probabilistic models (probabilistic models) and non-probabilistic models (non probabilistic models) or deterministic models (deterministic models).== In supervised learning, the probability model takes the conditional probability distribution form P(y), and the non-probabilistic model takes the function form y=f(x), where x is the input and y is the output. In unsupervised learning, the probability model takes the form of conditional probability distribution P(z|x) or P(x|z), and the non-probabilistic model takes the form of function z=g(x), where x is the input and the output. <font style="color:red;font-weight:bold">In supervised learning, probabilistic models are generative models, and non-probabilistic models are discriminant models. </font>

Probabilistic model:

- Decision tree
- Naive Bayes
- Hidden Markov Model
- Conditional random field
- Probabilistic latent semantic analysis
- Latent Dirichlet allocation
- Gaussian mixture model

Non-probabilistic model

- Perceptron
- Support Vector Machines
- k nearest neighbors
- Adabboost
- k-means
- Latent semantic analysis
- Neural Networks

==Logistic regression can be regarded as both a probabilistic model and a non-probabilistic model.==

### 2.2.2 Linear model and nonlinear model

==Statistical learning models, especially non-probabilistic models, can be divided into linear models and non-linear models.== If the function y=f(x) or x=g(x) is a linear function, then the model is called a linear model, otherwise the model is called a nonlinear model.
Linear model:

- Perceptron
- Linear Support Vector Machine
- k nearest neighbors
- k-means
- Latent semantic analysis

Non-linear model

- Kernel function support vector machine
- Adaboost
- Neural network is a nonlinear model Deep learning (deep learning) is actually the learning of a complex neural network, that is, the learning of a complex nonlinear model.



## Parametric model and non-parametric model

==Statistical learning models can be divided into parametric models and non-parametric models.== The parametric model assumes the <font style="color:red">dimensional fixed</font> of the model parameters, and the model can be completely described by the finite-dimensional parameters; the non-parametric model assumes the <font style="color: red">The dimension is not fixed or infinite</font>, it keeps increasing as the amount of training data increases

#### Parametric Model

- Perceptron
- Naive Bayes
- Logistic regression
- k-means
- Gaussian mixture model

#### Non-parametric model

- Decision tree
- Support Vector Machines
- Adaboost
- k nearest neighbors
- Latent semantic analysis
- Probabilistic latent semantic analysis
- Latent Dirichlet allocation

# Classification by algorithm

## Online learning

==Online learning refers to machine learning that accepts a sample each time, makes predictions, then learns the model, and repeats the operation continuously.== <font style="color:red">Some practical application scenarios require learning must be online. For example, the data cannot be stored in sequence, and the system needs to be processed in time. Or the data size is too large to be processed at one time. Or the data pattern changes over time and the algorithm needs to quickly adapt to the new pattern</font>

Online learning can be supervised learning or unsupervised learning. Reinforcement learning itself has the characteristics of online learning. Only online supervised learning is considered below.
Learning and prediction are in a system, each time you accept an input t, use the existing model to give a prediction f(x), and then get the corresponding feedback, that is, the output y+ corresponding to the input; the system uses the loss function to calculate the difference between the two, Update the model; and repeat the above operations continuously. See picture



The perceptron learning algorithm using stochastic gradient descent is an online learning algorithm.
Online learning is usually more difficult than batch learning, and it is difficult to learn a model with higher prediction accuracy, because the available data is limited in each model update.

##  Batch learning

Batch learning accepts all data at once, learns the model, and then makes predictions.

# Classified by skill

##  Bayesian learning

In the learning and reasoning of the probability model, Bayes'' theorem is used to calculate the conditional probability of the model under the given data condition, that is, the posterior probability, and this principle is used to estimate the model and predict the data. The model, unobserved elements and their parameters are represented by variables, and the prior distribution of the model is the characteristic of Bayesian learning.

- Naive Bayes

- Latent Dirichlet allocation

##  Nuclear method

==Kernel method (kernel method) is a machine learning method that uses kernel functions to represent and learn nonlinear models. It can be used for supervised and unsupervised learning.== There are some learning methods of linear models based on similarity calculation, more specifically, vector inner product calculation. Kernel methods can extend them to the learning of non-linear models, making their applications wider.

- Support Vector Machines
- Kernel K mean
