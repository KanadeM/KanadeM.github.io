---
layout:     post   				    # 使用的布局（不需要改）
title:      Algorithm and Data Structure - Linked List   	# 标题 
subtitle:   Algorithm and Data Structure - Linked List #副标题
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

# Introduction

QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways. 

- Always pick first element as pivot.
- Always pick last element as pivot (implemented below)
- Pick a random element as pivot.
- Pick median as pivot.


# How Selection Sort Works?

![quick-sort](https://www.menglingjun.com/img/in-post/quick-sort.gif)

## Partition Algorithm: 

![quick-sort-2](https://www.menglingjun.com/img/in-post/quick-sort2.png)

There can be many ways to do partition, following pseudo code adopts the method given in CLRS book. The logic is simple, we start from the leftmost element and keep track of index of smaller (or equal to) elements as i. While traversing, if we find a smaller element, we swap current element with arr[i]. Otherwise we ignore current element. 

### Pseudo Code for recursive QuickSort function:

```java
/* low  –> Starting index,  high  –> Ending index */

quickSort(arr[], low, high) {

    if (low < high) {

        /* pi is partitioning index, arr[pi] is now at right place */

        pi = partition(arr, low, high);

        quickSort(arr, low, pi – 1);  // Before pi

        quickSort(arr, pi + 1, high); // After pi

    }

}
```

### Pseudo code for partition()

```java
/* This function takes last element as pivot, places the pivot element at its correct position in sorted array, and places all smaller (smaller than pivot) to left of pivot and all greater elements to right of pivot */

partition (arr[], low, high)

{

    // pivot (Element to be placed at right position)
pivot = arr[high];  

 i = (low – 1)  // Index of smaller element and indicates the 
// right position of pivot found so far

for (j = low; j <= high- 1; j++){

 // If current element is smaller than the pivot
if (arr[j] < pivot){
i++;    // increment index of smaller element
 swap arr[i] and arr[j]
     }
 }

    swap arr[i + 1] and arr[high])
return (i + 1)
}
```

### Illustration of partition()

#### 1 Consider: arr[] = {10, 80, 30, 90, 40, 50, 70}

- Indexes:  0   1   2   3   4   5   6 
- low = 0, high =  6, pivot = arr[h] = 70
- Initialize index of smaller element, i = -1
![quick-sort-3](https://www.menglingjun.com/img/in-post/quick-sort3.jpeg)

#### 2

- Traverse elements from j = low to high-1
    - j = 0: Since arr[j] <= pivot, do i++ and swap(arr[i], arr[j])
    - i = 0 
- arr[] = {10, 80, 30, 90, 40, 50, 70} // No change 
- j = 1: Since arr[j] > pivot, do nothing
![quick-sort-4](https://www.menglingjun.com/img/in-post/quick-sort4.jpeg)

#### 3

- j = 2 : Since arr[j] <= pivot, do i++ and swap(arr[i], arr[j])
- i = 1
- arr[] = {10, 30, 80, 90, 40, 50, 70} // We swap 80 and 30 
![quick-sort-5](https://www.menglingjun.com/img/in-post/quick-sort5.jpeg)

#### 4

- j = 3 : Since arr[j] > pivot, do nothing // No change in i and arr[]
- j = 4 : Since arr[j] <= pivot, do i++ and swap(arr[i], arr[j])
- i = 2
- arr[] = {10, 30, 40, 90, 80, 50, 70} // 80 and 40 Swapped
![quick-sort-6](https://www.menglingjun.com/img/in-post/quick-sort6.jpeg)

#### 5

- j = 5 : Since arr[j] <= pivot, do i++ and swap arr[i] with arr[j] 
- i = 3 
- arr[] = {10, 30, 40, 50, 80, 90, 70} // 90 and 50 Swapped 
![quick-sort-8](https://www.menglingjun.com/img/in-post/quick-sort8.jpeg)


#### 6
- We come out of loop because j is now equal to high-1.
- Finally we place pivot at correct position by swapping arr[i+1] and arr[high] (or pivot) 
- arr[] = {10, 30, 40, 50, 70, 90, 80} // 80 and 70 Swapped 
![quick-sort-7](https://www.menglingjun.com/img/in-post/quick-sort7.jpeg)

#### 7
- Now 70 is at its correct place. All elements smaller than 70 are before it and all elements greater than 70 are after it.
- Since quick sort is a recursive function, we call the partition function again at left and right partitions
![quick-sort-9](https://www.menglingjun.com/img/in-post/quick-sort9.jpeg)


#### 8
- Again call function at right part and swap 80 and 90
![quick-sort-10](https://www.menglingjun.com/img/in-post/quick-sort10.jpeg)

# Implementation

```java
package sorting;

public class QuickSort {

    private static int[] swap(int[] arr, int i, int j) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        return arr;
    }

    private static int partition(int[] arr, int low, int high) {

        // pivot
        int pivot = arr[high];

        // Index of smaller element and
        // indicates the right position
        // of pivot found so far
        int i = (low - 1);

        for (int j = low; j <= high - 1; j++) {

            // If current element is smaller
            // than the pivot
            if (arr[j] < pivot) {

                // Increment index of
                // smaller element
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return (i + 1);
    }


    private static int[] quickSort(int[] arr, int low, int high) {
        if (low < high)
        {

            // pi is partitioning index, arr[p]
            // is now at right place
            int pi = partition(arr, low, high);

            // Separately sort elements before
            // partition and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
        return arr;
    }

    public static void main(String[] args) {
        int[] arr = {-1, 0, 1, 9, 8, 7, 6, 5, 4, 3, 2, 0, -21, 32, 12, 4, 6, 8, 23, 23};
        arr = quickSort(arr, 0, arr.length - 1);
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
    }
}



```

# Reference

\[1\] [QuickSort GeeksforGeeks](https://www.geeksforgeeks.org/quick-sort/)