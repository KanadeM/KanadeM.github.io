---
layout:     post   				    # 使用的布局（不需要改）
title:      How to Prevent Duplicate Orders # 标题  
subtitle:   Strategies and Workflows   	#副标题
date:       2023-02-18			# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-spring-logo.jpeg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Java
    - Spring
    - Submission
---

# How to Prevent Duplicate Orders: Strategies and Workflows

## Table of Contents

1. [Introduction](#introduction)
2. [User Workflow for Placing an Order](#user-workflow-for-placing-an-order)
3. [Technical Strategies to Prevent Duplicate Orders](#technical-strategies-to-prevent-duplicate-orders)
    - [Understanding Idempotency and Deduplication](#understanding-idempotency-and-deduplication)
    - [Implementation Strategies](#implementation-strategies)
        - [Database Level Idempotency](#database-level-idempotency)
        - [Redis for Deduplication](#redis-for-deduplication)
4. [Workflow Diagram](#workflow-diagram)

---

## Introduction

Preventing duplicate orders is crucial in e-commerce platforms and other systems where a user can place an order.

---

## User Workflow for Placing an Order

The initial phase of order placement includes:

1. **Browsing Products**: Users browse through products and view details.
2. **Add to Cart or Checkout**: Users either add items to their shopping cart or proceed directly to checkout.
3. **Confirm and Submit Order**: After checkout, users are taken to an order confirmation page. Upon submitting, a unique order ID is generated.

---

## Technical Strategies to Prevent Duplicate Orders

Duplicate orders usually occur due to:

1. Users resubmitting or double-clicking the submit button.
2. Network glitches causing retries.

### Understanding Idempotency and Deduplication

- **Idempotency**: Multiple identical requests yield the same result.
- **Deduplication**: Prevents multiple identical requests from being processed.

### Implementation Strategies

#### Database Level Idempotency

You can add a `requestId` field in the order table and set it as a unique index.

```java
PlaceOrderResVO placeOrder(PlaceOrderReqVO reqVO) {
  try {
    // Place order logic
    // Generate order ID
    String oid = generateOid();
    // Insert into DB
    Order order = orderMapper.saveOrder(orderDO);
    resVO.setOid(order.getOid());
    return resVO;
  } catch (UniqueKeyViolationException e) {
    // Duplicate request exception caught
    Order order = getOrderByRequestId(reqVO.getRequestId());
    resVO.setOid(order.getOid());
    return resVO;
  }
}
```

#### Redis for Deduplication

Use Redis distributed locks to prevent concurrent duplicate requests.

```java
PlaceOrderResVO placeOrder(PlaceOrderReqVO reqVO) {
  RLock orderLock = redissonClient.getLock("ORDER_LOCK_" + reqVO.getRequestId());
  if (orderLock.isLocked()) {
    throw new OrderRepeatException();
  }
  orderLock.lock();
  try {
    // Check if the order exists in Redis
    if (redissonClient.getBucket("ORDER_" + reqVO.getRequestId()).isExists()) {
      return redissonClient.getBucket("ORDER_" + reqVO.getRequestId()).get();
    }
    // Place order logic
    // Insert into DB
    Order order = orderMapper.saveOrder(orderDO);
    // Cache result in Redis
    redissonClient.getBucket("ORDER_" + reqVO.getRequestId()).set(order);
    return resVO;
  } finally {
    orderLock.unlock();
  }
}
```

---

## Workflow Diagram

Here's a simplified workflow diagram that includes both the user's actions and the subsequent system operations:



This wraps up our article. Understanding the user workflow and implementing robust server-side strategies can help in preventing duplicate orders effectively.