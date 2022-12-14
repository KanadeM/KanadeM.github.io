---
layout:     post   				    # 使用的布局（不需要改）
title:      A Beautiful Restful Request and Respond Format   	# 标题 
subtitle:   A Beautiful Restful Request and Respond Format #副标题
date:       2022-11-08 				# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-sorting.jpeg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Restful API
    - Java
    - Spring Boot
---

# Description

I have read lots of articles about building a web service from scratch. I found serval problems. 

First of all, the exception. The response code of exception is always 500, which is not specific enough. The backend developers have to check the logs to located problems. 

Secondly, repeated code. Let's see the following code:
```java
@GET
@Path("/ok")
public Response getOkResponse() {

    String message = "This is a text response";

    return Response
      .status(Response.Status.OK)
      .entity(message)
      .build();
}

// Above code is cited from https://www.baeldung.com/jax-rs-response
```

It looks good, doesn't it? However, if we repeat this code block in every api, does it look good again? Obviously, setting response code and body everytime is not a good choice.

Finally, try-catch-exception block. Checking parameters is common and difficult in programming since clients will never behave as you except. Fortunately, spring boot provides a lot of annotations. But, for example, how to check phone numbers? Writing a regular and catching exception? Repeating happends!

In the following sections, I will introduce several ways to solve above mentioned problems.


# Custom Exception

Exception handling is an essential part of Java programming language. Unfortunately, some new bees aren't focus on it. But if you are working in companies, you have to consider it. Returning the error code 500 to users will confuse them. Because of these reasons, customing exception by yourself is a good choice.

We can create an enum to record all possible exceptions. The following code shows this idea.

```java

public enum ResponseCode {

    SUCCESS(200, "Success"),
    EMAIL_HAS_EXSITED(20001, "Email is already exsited!"),
    PARAM_IS_INVALID(20002, "Param is invalid."),
    SYSTEM_ERROR(10000, "System Error, Please Contact Admin.");


    private Integer code;
    private String message;

    ResponseCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}

```

Users are able to understand error messages.

# Handle all responses

