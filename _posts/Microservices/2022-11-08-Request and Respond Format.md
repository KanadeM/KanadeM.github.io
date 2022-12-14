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

When we meet an exception, we can create a new bussiness exception with above response code. Users are able to understand error messages.

# Handle all responses

Frist of all, we need to create a global response format.

```java
public class Response <T> {
    @SuppressWarnings("unused")
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(Response.class);

    private static final long serialVersionUID = -1802122468331526708L;
    private int statusCode = -1;
    private String message = "待处理";
    private T data;
}
```

An example of above response class is:

```json
{
    "statusCode":200,
    "message":"Success",
    "data": "Hello World"
}
```

With above response class, when we want to return responses to front-end, we can just put data in response.data field.

However, coding response.data looks so stupid. So, we need a global handler to process all responses.

```java

/*
 * This is base package, please replace with yours.
 */
@ControllerAdvice(basePackages = "org.mengsoft.admin")
public class ResponseHandler implements ResponseBodyAdvice<Object> {


    @Override
    public boolean supports(MethodParameter methodParameter, Class<? extends HttpMessageConverter<?>> aClass) {
        return true;
    }

    // Handle responsebody writer before responsebody is generated.
    @Override
    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType,
                                  Class<? extends HttpMessageConverter<?>> aClass, ServerHttpRequest serverHttpRequest,
                                  ServerHttpResponse serverHttpResponse) {
        if (o instanceof ErrorResponse) {
            ErrorResponse errorResponse = (ErrorResponse) o;
            return Response.fail(errorResponse.getStatusCode(), errorResponse.getMessage());
        } else if (o instanceof String) {
            return JsonUtil.object2Json(Response.success(o));
        }

        return Response.success(o);
    }
}

```

In this class, we implement ResponseBodyAdvice interface, which is used to custom ResponseBody before a default one is generated. In beforeBodyWrite function, we check the response whether is an error and then generate different responseBody.

# Replace try/catch by annotation

Some errors are offen happended, such as, phone number, wrong parameters. Using try catch block again and again makes your boss unhappy. In this situation, custom annotation is a good choice.

```java
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
//指定注解的实现类
@Constraint(validatedBy = PhoneValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Phone {
    String message() default "Please enter correct phone number.";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    @Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface list {
        Phone[] value();
    }
}

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PhoneValidator implements ConstraintValidator<Phone, String> {
    private static final Pattern phonePattern = Pattern.compile(
            "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,5-9]))\\\\d{8}$");


    @Override
    public void initialize(Phone constraintAnnotation){

    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context){
        if (value == null || value.length() == 0) {
            return true;
        }
        Matcher m = phonePattern.matcher(value);
        return m.matches();
    }
}

```


This is an annotation of phone number verification. By adding this annotation on parameters, we can reduce code repetition rate.