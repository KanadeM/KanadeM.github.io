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
## Remove Duplicates from Sorted Array
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
## Move Zeroes
[283. Move Zeroes 移动零](https://leetcode.com/problems/move-zeroes/)


<p style="background:yellow; font-weight:bold">
Solution: Dividing the problem into two parts will make it easier. On first stage, like the previous problem, we move all non-zero element to the front of the array. And then, we set all of element of the rest of the array to zero.
</p>

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int slow = 0, fast = 0;
        // Move non-zero elements
        while(fast < nums.length){
            if(nums[fast] == 0){
                fast++;
            } else {
                nums[slow] = nums[fast];
                slow++;
                fast++;
            }
        }
        
        // Set the rest of the array to zero
        while(slow < nums.length){
            nums[slow] = 0;
            slow++;
        }
        
        return;
    }
}
```

# Left and right pointer

## Binary Search
One of the common appilcations of left and right pointer is binary search. Take [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) as an example.

In this problme, we need to find two elements from a sorted array where the sum of these two elements is the given number.

<p style="background:yellow; font-weight:bold">
Solution: This is a binary search problem. We can set left pointer pointing to array[0], and right pointer pointing to array[length - 1]. When the sum is less than target, we move the left pointer forward to make the sum larger. When the sum is bigger than target, we move the right pointer backword to make the sum smaller.
</p>

```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                // 题目要求的索引是从 1 开始的
                return new int[]{left + 1, right + 1};
            } else if (sum < target) {
                left++; // 让 sum 大一点
            } else if (sum > target) {
                right--; // 让 sum 小一点
            }
        }
        return new int[]{-1, -1};
    }
    
}
```

## Reverse String
[344. Reverse String](https://leetcode.com/problems/reverse-string/)

An easy problem, let go through the code directly.

```java
class Solution{
    void reverseString(char[] s) {
        // Two pointers walk towards each other.
        int left = 0, right = s.length - 1;
        while (left < right) {
            // Swap s[left] and s[right]
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}

```