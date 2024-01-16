---
layout:     post   				    # 使用的布局（不需要改）
title:      KMP Algorithm   	# 标题 
subtitle:   KMP Algorithm #副标题
date:       2024-1-15			# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-algorithm.png 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Algorithm
    - KMP
---
# PerFace
The key of the hard problem in the leetcode weekly contest this week is KMP algorithm. I have learned this algorithm before, but I still need to review it. So I write this blog to review this algorithm.

# Introduction
String matching algorithms are used to find a pattern in a string. The simplest string matching algorithm is the Brute-Force algorithm. It is also known as the Naive String Matching algorithm. It is the simplest algorithm and is easy to understand and implement. But it is not the most efficient algorithm. It is not suitable for large texts. The time complexity of the Brute-Force algorithm is O(m*n), where m is the length of the pattern and n is the length of the text.The following figure shows the working of the Brute-Force algorithm.

![kmp1](https://www.menglingjun.com/img/algorithm-kmp1.gif)

# KMP Algorithm
KMP algorithm is an efficient string matching algorithm. It is based on the next array that when a mismatch occurs, the pattern itself contains enough information to determine where the next match could begin, thus bypassing re-examination of previously matched characters. The time complexity of the KMP algorithm is O(m+n), where m is the length of the pattern and n is the length of the text. The following figure shows the working of the KMP algorithm.

![kmp1](https://www.menglingjun.com/img/algorithm-kmp2.gif)

Given i is the pointer of the text, j is the pointer of the pattern. <span style="background:yellow;color:red; font-weight:bold">To briefly describe the idea of KMP algorithm, we want to reduce the time of pointer j callback to 0.</span> And the pointer i will not go back. The steps of j pointer callback are stored in the next array. The next array is the key of KMP algorithm. The next array is the longest prefix and suffix array of the pattern. The following figure shows the next array of the pattern "ABACABAB".

# How to build the next array

Let's take a look at the next aray of the pattern "ABACABAB". According to KMP algorithm, the next array is the longest prefix and suffix array of the pattern <span style="background:yellow;color:red; font-weight:bold">(We want to match string from beginning, so that common prefix and suffix means the substring in text scaned by pointer i (this is suffix) have already matched the pattern prefix).</span> Following is the next array generation process.

![kmp1](https://www.menglingjun.com/img/algorithm-kmp3.gif)

The process begins with initializing a pointer 'j', which also represents the length of the current common prefix and suffix. Initially, the algorithm checks if pat.charAt(0) == pat.charAt(j). If they are equal, 'j' is incremented, and next[j] is set to 'j'. If pat.charAt(0) != pat.charAt(j)', the algorithm looks for a shorter common prefix and suffix. This is done by referring back to the 'next' array. For example, if the pointer 'j' is at position 6, we need to check if PAT[3]equalsPAT[7]. If this comparison fails, the algorithm continues to search for a shorter matching prefix and suffix using the 'next' array, checking if PAT[PAT[3]] == PAT[7], and so on, until it finds PAT[X] == PAT[7]orPAT[X] == 0`. This process repeats until the 'next' array is completely built.

# Implementation
```java
public class KMPSearching {

    public static List<Integer> KMPSearch(String s, String sub) {
        List<Integer> result = new ArrayList<>();

        int[] next = buildNext(sub);
        int i = 0;
        int j = 0;

        while(i < s.length()) {
            if(s.charAt(i) == sub.charAt(j)) {
                i++;
                j++;
            } else if (j > 0){
                j = next[j - 1];
            } else {
                i++;
            }

            if(j == sub.length()) {
                result.add(i - j);
                j = next[j - 1];
            }
        }

        return result;
    }

    // Function to compute the longest prefix suffix array
    public static int[] buildNext(String sub) {
        int[] next = new int[sub.length()];
        int commonFixLength = 0;
        int i = 1;
        while(i < sub.length()) {
            if(sub.charAt(i) == sub.charAt(commonFixLength)) {
                commonFixLength++;
                next[i] = commonFixLength;
                i++;
            } else {
                if(commonFixLength != 0) {
                    commonFixLength = next[commonFixLength - 1];
                } else {
                    next[i] = 0;
                    i++;
                }
            }
        }

        return next;
    }


    public static void main(String args[]) {
        String s = "ABABDABACDABABCABABCABAB";
        String sub = "ABABCABAB";
        List<Integer> matchedIndices = KMPSearch(s, sub);

        System.out.println("Pattern found at indices: " + matchedIndices);
    }

}

```

# Referencxe List
[1] https://www.bilibili.com/video/BV1AY4y157yL