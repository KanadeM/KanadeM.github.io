---
layout:     post   				    # 使用的布局（不需要改）
title:      Algorithm and Data Structure - Array 01 Two Pointers   	# 标题 
subtitle:   Algorithm and Data Structure - Array 01 Two Pointers #副标题
date:       2020-6-01			# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-algorithm.png 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Algorithm
    - Data Structure
    - Linked List
---

# Fast and slow pointer

[26. Remove Duplicates from Sorted Array 删除排序数组中的重复项](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

<p style="background:yellow; font-weight:bold">
Solution: We can use fast and slow pointer technique. Slow pointer matains a subarray which contains non-dupicated array. And fast pointer is used to find duplicated elements.
</p>

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int slow = 0, fast = 0;
        int res = 0;
        while(fast < nums.length){
            // When we find a new element, move forward the slow pointer.
            if(nums[slow] != nums[fast]) slow++;
            // Let nums[slow] = nums[fast]
            nums[slow] =  nums[fast];
            fast++;
        }
        
        return slow+1;
    }
}
```
[283. Move Zeroes 移动零](https://leetcode.com/problems/move-zeroes/)


<p style="background:yellow; font-weight:bold">
Solution: Dividing the problem into two parts will make it easier. On first stage, like the previous problem, we move all non-zero element to the front of the array. And then, we set all of element of the rest of the array to zero.
</p>

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int slow = 0, fast = 0;
        while(fast < nums.length){
            if(nums[fast] == 0){
                fast++;
            } else {
                nums[slow] = nums[fast];
                slow++;
                fast++;
            }
        }
        
        
        while(slow < nums.length){
            nums[slow] = 0;
            slow++;
        }
        
        return;
    }
}
```