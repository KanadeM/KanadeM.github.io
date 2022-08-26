---
layout:     post   				    # 使用的布局（不需要改）
title:      Algorithm and Data Structure - Linked List 01   	# 标题 
subtitle:   Algorithm and Data Structure - Linked List 01 #副标题
date:       2020-05-14 				# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-algorithm.png 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Algorithm
    - Data Structure
    - Linked List
---

# What is Linked List?

> A linked list is the most sought-after data structure when it comes to handling dynamic data elements. A linked list consists of a data element known as a node. And each node consists of two fields: one field has data, and in the second field, the node has an address that keeps a reference to the next node.
Cite from https://www.simplilearn.com/tutorials/data-structure-tutorial/linked-list-in-data-structure#:~:text=A%20linked%20list%20is%20the,reference%20to%20the%20next%20node.



<p style="background: yellow; font-weight: bold">From computer's perspective, there are only two data structures: array and linked list. Other data structures are wrappers around arrays and linked lists.</p>

Linked lists do not support random access, and singly linked lists cannot search backwards for nodes. So when you see a linked list, the first algorithmic trick to use is pointers. And a double pointer is often required.

#  Double Pointers
## Merge/Partition List

[86. Partition List 分解两个链表](https://leetcode.com/problems/partition-list/)

<p style="background: yellow; font-weight: bold">Solution: Create two linked lists, one for storing values less than x and one for storing values greater than x. Then merge together</p>

<p style="font-weight:bold;color:red">Note: After splitting the linked list, disconnect the nodes of the previous linked list. </p>

```java
class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode dummy1 = new ListNode(-1);
        ListNode dummy2 = new ListNode(-1);
        
        ListNode p1 = dummy1;
        ListNode p2 = dummy2;
        ListNode p = head;
        while (p != null) {
            if (p.val >= x) {
                p2.next = p;
                p2 = p2.next;
            } else {
                p1.next = p;
                p1 = p1.next;
            }
            // 断开原链表中的每个节点的 next 指针
            ListNode temp = p.next;
            p.next = null;
            p = temp;
        }
        
        p1.next = dummy2.next;
        
        return dummy1.next;
    }
}
```


```java

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
    if (lists.length == 0) return null;
    // Dummy Head
    ListNode dummy = new ListNode(-1);
    ListNode p = dummy;
    // PriorityQueue
    PriorityQueue<ListNode> pq = new PriorityQueue<>(
        lists.length, (a, b)->(a.val - b.val));
    // Add all heads of k linked list to PQ
    for (ListNode head : lists) {
        if (head != null)
            pq.add(head);
    }

    while (!pq.isEmpty()) {
        // Get the least node
        ListNode node = pq.poll();
        p.next = node;
        if (node.next != null) {
            pq.add(node.next);
        }
        
        p = p.next;
    }
    return dummy.next;
    }
}

```

## Find the last kth node


<p style="background: yellow; font-weight: bold">Problem-solving idea: This problem is relatively simple, using fast and slow pointers, first let the fast pointer take k steps, and then let the slow pointer start to walk, so that when the fast pointer reaches the end, the slow pointer is the kth node. </p>

<p style="font-weight:bold;color:red">Note:<br>
   This algorithm is not difficult, but can be a basic operation for many finding nodes from the end of a linked list.
</p>


```java
ListNode findFromEnd(ListNode head, int k) {
    ListNode p1 = head;
    // p1 先走 k 步
    for (int i = 0; i < k; i++) {
        p1 = p1.next;
    }
    ListNode p2 = head;
    // p1 和 p2 同时走 n - k 步
    while (p1 != null) {
        p2 = p2.next;
        p1 = p1.next;
    }
    // p2 现在指向第 n - k + 1 个节点，即倒数第 k 个节点
    return p2;
}
```


[19. Remove Nth Node From End of List 删除链表倒数第n个节点](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)


<p style="background: yellow; font-weight: bold">ideas: First, we can find the n+1th node from the bottom, and then delete the following nodes. </p>
<p style="font-weight:bold;color:red">Note:<br>
   If we want to delete the first node, the algorithm will report an error because we cannot find the last n+1 node. At this time, dummyhead can be introduced as the 0 node before the first node.
</p>


```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        if(head == null) return null;
        
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
    // Find last k + 1 th node
        ListNode lastNPlus1 = findLastNthFromEnd(dummy, n + 1);
        lastNPlus1.next =  lastNPlus1.next.next;
        
        return dummy.next;
    }
    
    private ListNode findLastNthFromEnd(ListNode node, int k){
        ListNode fast = node, slow = node;
        
        for(int i = 0; i < k; i++){
            fast = fast.next;
        }
        
        while(fast != null){
            fast = fast.next;
            slow = slow.next;
        }
        
        return slow;
    }
}
```

#### (3) Linked List Cycle 

[141 Linked List Cycle 判断链表中有没有环](https://leetcode.com/problems/linked-list-cycle/)

<p style="background: yellow; font-weight: bold">idea: fast and slow pointers. If the fast pointer points the same node as slow pointer, there will be a cycle.</p>

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if(head == null) return false;
        if(head.next == null) return false;
        
        ListNode slow = head, fast = head;
        
        
        while(fast != null && fast.next != null){
            
            slow = slow.next;
            fast = fast.next.next;
            if(fast == slow) return true;
        }
        
        return false;
    }
}
```


[142 Linked List Cycle II 如果链表中有环，如何计算起点](https://leetcode.com/problems/linked-list-cycle-ii)

<p style="background: yellow; font-weight: bold">ideas: First, determine whether there is a ring. If there is a ring, assuming that the slow pointer has taken k steps at this time, the fast pointer must have taken 2k steps. k must be an integer multiple of the size of the ring. At this point, let the slow pointer re-point to the head node. As can be seen from the figure below, assuming that the distance from the meeting point to the starting point of the ring is m, then the fast pointer and the slow pointer will meet again at the starting point of the ring when they take k-m steps. </p>

![img](https://labuladong.github.io/algo/images/%e5%8f%8c%e6%8c%87%e9%92%88/2.jpeg)


```java
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode fast, slow;
        fast = slow = head;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow) break;
        }
        // 上面的代码类似 hasCycle 函数
        if (fast == null || fast.next == null) {
            // fast 遇到空指针说明没有环
            return null;
        }

        // 重新指向头结点
        slow = head;
        // 快慢指针同步前进，相交点就是环起点
        while (slow != fast) {
            fast = fast.next;
            slow = slow.next;
        }
        return slow;
    }
}
```


[160. Intersection of Two Linked Lists 两个链表是否相交](https://leetcode.com/problems/intersection-of-two-linked-lists/)

<img src="https://assets.leetcode.com/uploads/2021/03/05/160_statement.png" alt="img" style="zoom:50%;" />


<p style="background: yellow; font-weight: bold">idea: Use the pointer to traverse the first linked list, and then connect to the next linked list. The other linked list does the same, so that the two linked lists can be logically linked.</p>

<p style="background: yellow; font-weight: bold">Prove: Let a1 to c1 need m steps, b1 to c1 need n steps, c1 to c3 need k steps. Then m + k + n = n + k + m. For the case of no intersection, when p1 == p2, there is only one possibility, that is, the two pointers reach the null node at the end of the linked list at the same time. </p>

<p style="font-weight:bold;color:red">Note:<br>
   It is indeed a good idea to splicing two linked lists of different lengths in this way.
</p>


```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode p1 = headA, p2 = headB;
        while (p1 != p2) {
            // p1 走一步，如果走到 A 链表末尾，转到 B 链表
            if (p1 == null) p1 = headB;
            else            p1 = p1.next;
            // p2 走一步，如果走到 B 链表末尾，转到 A 链表
            if (p2 == null) p2 = headA;
            else            p2 = p2.next;
        }
        return p1;
    }
}
```

