---
layout:     post   				    # 使用的布局（不需要改）
title:      Algorithm and Data Structure - Array 01 Two Pointers   	# 标题 
subtitle:   Algorithm and Data Structure - Array 01 Two Pointers #副标题
date:       2020-5-22			# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-algorithm.png 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Algorithm
    - Data Structure
    - Linked List
---

# Using loop to traverse through linked list

[206. Reverse Linked List 反转链表](https://leetcode.com/problems/reverse-linked-list/)

<p style="background:yellow; font-weight:bold">
Solution: Use loop to traverse through the linked list and make the successor node pointing to its fater node.
</p>

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        if(head == null) return null;
        ListNode p = head;
        ListNode pSuccessor = null;
        while(head.next != null){
            pSuccessor = head.next;
            head.next = head.next.next;
            pSuccessor.next = p;
            p = pSuccessor;
        }
        
        return p;
    }
}

```

# Recursion and Linked List

Iterating a Linked List is super easy. But how to visit node by recursion?


A recursion function has 3 significant points: 
1.  Base case: One critical requirement of recursive functions is the termination point or base case. Every recursive program must have a base case to make sure that the function will terminate. Missing base case results in unexpected behavior.
2. How to change its state? How to move toward to the base case?
3. Intial State. The beginning of the recursion function.

## Reverse Linked List
[206. Reverse Linked List 反转链表](https://leetcode.com/problems/reverse-linked-list/)


   ```java
   class Solution {
       public ListNode reverseList(ListNode head) {
           // This is the base case.
           if(head == null || head.next == null){
               return head;
           }
           
           ListNode last = reverseList(head.next);
           
           // How to move towards to the base case?
           head.next.next = head;
           head.next = null;
           return last;
       }
   }
   ```


## Reverse first K nodes by recursion

<p style="background:yellow; font-weight:bold">
Solution: <br>
This time, the base case is: meeting the nth node. When we meet the nth node, we should record the next node and return current node.
</p>

```java
class Solution{
    ListNode successor = null; // The k+1th node


    ListNode reverseN(ListNode head, int n) {
        if (n == 1) {
            // Find the k+1th node
            successor = head.next;
            return head;
        }
        // Reverse first k nodes
        ListNode last = reverseN(head.next, n - 1);

        head.next.next = head;
        // Connect the head to successor
        head.next = successor;
        return last;
    }

}

```

## Reverse node between given left and right


<p style="background:yellow; font-weight:bold">
Solution：We can use the pervious function. When we reach the left node and then reverse before right.
</p>


```java
class Solution {
    ListNode successor = null;
    
    public ListNode reverseBetween(ListNode head, int left, int right) {
        // base case
        if (left == 1) {
            return reverseBeforeN(head, right);
        }
        // 前进到反转的起点触发 base case
        head.next = reverseBetween(head.next, left - 1, right - 1);
        return head;
    }
    
    private ListNode reverseBeforeN(ListNode node, int n){
        if(n == 1){
            successor = node.next;
            return node;
        }
        
        ListNode last = reverseBeforeN(node.next, n - 1);
        
        node.next.next = node;
        node.next = successor;
        
        return last;
    }
}
```

## Reverse Nodes in k-Group

[25. Reverse Nodes in k-Group K个一组反转链表](https://leetcode.com/problems/reverse-nodes-in-k-group/)

解题思路：这道题是一道Hard的题。首先我们要写一个辅助函数，翻转a和b之间的节点。这个问题不难。

<p style="background:yellow; font-weight:bold">
Solution: We can also use the pervious function. 
</p>

```java
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        if (head == null) return null;
        // Record node a and node b
        ListNode a, b;
        a = b = head;
        for (int i = 0; i < k; i++) {
            // Base case
            if (b == null) return head;
            b = b.next;
        }
        // 反转前 k 个元素
        ListNode newHead = reverse(a, b);
        // 递归反转后续链表并连接起来
        a.next = reverseKGroup(b, k);
        return newHead; 
    }
    
    
    public ListNode reverse(ListNode head, ListNode end){
        ListNode pre = null;
        ListNode curr = head;
        ListNode next = head;
        while(curr != end){
            next = curr.next;
            curr.next = pre;
            pre = curr;
            curr = next;

        }

        return pre;
    }
}
```

## 