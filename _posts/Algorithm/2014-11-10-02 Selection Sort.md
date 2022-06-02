---
layout:     post   				    # 使用的布局（不需要改）
title:      Selection Sort   	# 标题 
subtitle:   Code and Principle of Selection Sort #副标题
date:       2014-11-10 				# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-sorting.jpeg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Algorithm
    - Sorting
    - Selection Sort
---

# Introduction

Similar to bubble sort. The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. 

# How Bubble Sort Works?

![bubble-sort](https://www.menglingjun.com/img/in-post/selection-sort.gif)

Lets consider the following array as an example: arr[] = {64, 25, 12, 22, 11}

1. First Pass: For the first position in the sorted array, the whole array is traversed from index 0 to 4 sequentially. The first position where 64 is stored presently, after traversing whole array it is clear that 11 is the lowest value.

    (   64   	   25   	   12   	   22   	   11   )
    
    Thus, replace 64 with 11. After one iteration 11, which happens to be the least value in the array, tends to appear in the first position of the sorted list.

    (   11   	   25   	   12   	   22   	   64   )


2. Second Pass: For the second position, where 25 is present, again traverse the rest of the array in a sequential manner.

    ( 11   	   25   	   12   	   22   	   64    ) 
    
    After traversing, we found that 12 is the second lowest value in the array and it should appear at the second place in the array, thus swap these values.
    
    (    11   	   12   	   25   	   22   	   64    ) 

3. Third Pass: Now, for third place, where 25 is present again traverse the rest of the array and find the third least value present in the array.

    ( 11   	   12   	   25   	   22   	   64   ) 

    While traversing, 22 came out to be the third least value and it should appear at the third place in the array, thus swap 22 with element present at third position.

    ( 11   	   12   	   22   	   25   	   64   )

4. Fourth pass: Similarly, for fourth position traverse the rest of the array and find the fourth least element in the array 
    
    As 25 is the 4th lowest value hence, it will place at the fourth position.

    (11   	   12   	   22   	   25   	   64   )

4. Fifth pass: At last the largest value present in the array automatically get placed at the last position in the array. The resulted array is the sorted array.

    (   11   	   12   	   22   	   25   	   64   )

# Selection Sort in Java

```java
public class SelectionSort {
    private static int[] selectionSort(int[] arr){
        for(int i = 0; i < arr.length; i++){
            int minIdx = i;
            int min = arr[i];
            for(int j = i + 1; j < arr.length; j++){
                if(arr[j] < min){
                    min = arr[j];
                    minIdx = j;
                }
            }
            int tmp = arr[i];
            arr[i] = min;
            arr[minIdx] = tmp;
        }
        return arr;
    }

    public static void main(String[] args) {
        int[] arr = {-1,0, 1, 9, 8, 7, 6, 5, 4, 3, 2, 0, -21, 32, 12, 4, 6, 8, 23,23};
        arr = selectionSort(arr);
        for(int i = 0; i < arr.length; i++){
            System.out.println(arr[i]);
        }
    }
}


```

# Complexity Analysis
- Time Complexity: $O(n^2)$
- Space Complexity: $O(1)$
