---
layout:     post   				    # 使用的布局（不需要改）
title:      Java JWT  	# 标题 
subtitle:   Java JWT #副标题
date:       2022-01-29  				# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-spring-logo.jpeg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - Java
    - JWT
    - Spring
---
# Understanding Java JWT: A Deep Dive 

JWT, or JSON Web Token, is a compact, URL-safe means of representing claims to be transferred between two parties. In the context of Java, this standard is commonly used to create access tokens for secure application services. Let's take a deep dive into Java JWT, its structure, its usage, and its benefits.

## Structure of JWT

A JWT typically consists of three parts: the header, the payload, and the signature.

1. **Header**: This section primarily declares the type of the token and the signing algorithm being used. It's base64Url encoded.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

2. **Payload**: Also known as the JWT Claims, this is where the actual data (like user information) is stored. It is also base64Url encoded.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

3. **Signature**: The signature is used to verify the message wasn't changed along the way. It's created by encoding the header and payload, then concatenating them with a period, and finally applying the specified algorithm.

```java
//$secret is a string that contains the secret key
String signature = HMACSHA512(base64UrlEncode(header) + "." +base64UrlEncode(payload), secret)

```


When combined, these sections form a complete JWT, which looks like: `header.payload.signature`

## An example of JWT
This is a JWT string:
```java
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

![dive-into-java-jwt1](https://www.menglingjun.com/img/in-post/dive-into-java-jwt1.png)
## JWT workflow
![dive-into-java-jwt2](https://www.menglingjun.com/img/in-post/dive-into-java-jwt2.png)

# Usage in Java

Java has a variety of libraries available to handle JWT creation and validation. For this example, we'll use the popular library JJWT.

1. **Import dependency in pom.xml**: 

```java
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.0</version>
</dependency>
```

2. **Create JWTUtils Class**:

```java
package org.mengsoft.adminbackend.common;

import io.jsonwebtoken.*;
import org.bouncycastle.util.encoders.Base64;
import org.mengsoft.adminbackend.constant.JwtConstant;
import org.mengsoft.adminbackend.entity.CheckResult;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;

public class JwtUtils {

    public static String createJWT(String id, String subject, long ttlMillis) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        SecretKey secretKey = generalKey();
        JwtBuilder builder = Jwts.builder()
                .setId(id)
                .setSubject(subject)   // Subject
                .setIssuer("Java1234")     // Issuer
                .setIssuedAt(now)      // Issued time
                .signWith(signatureAlgorithm, secretKey); // Signature Algorithm and Secret Key
        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date expDate = new Date(expMillis);
            builder.setExpiration(expDate); // Expiration time
        }
        return builder.compact();
    }

    public static SecretKey generalKey() {
        byte[] encodedKey = Base64.decode(JwtConstant.JWT_SECERT);
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        return key;
    }

    /**
     * Check JWT
     * @param jwtStr
     * @return
     */
    public static CheckResult validateJWT(String jwtStr) {
        CheckResult checkResult = new CheckResult();
        Claims claims = null;
        try {
            claims = parseJWT(jwtStr);
            checkResult.setSuccess(true);
            checkResult.setClaims(claims);
        } catch (ExpiredJwtException e) {
            checkResult.setErrCode(JwtConstant.JWT_ERRCODE_EXPIRE);
            checkResult.setSuccess(false);
        } catch (SignatureException e) {
            checkResult.setErrCode(JwtConstant.JWT_ERRCODE_FAIL);
            checkResult.setSuccess(false);
        } catch (Exception e) {
            checkResult.setErrCode(JwtConstant.JWT_ERRCODE_FAIL);
            checkResult.setSuccess(false);
        }
        return checkResult;
    }


    /**
     * Parse JWT
     * @param jwt
     * @return
     * @throws Exception
     */
    public static Claims parseJWT(String jwt) {
        SecretKey secretKey = generalKey();
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt)
                .getBody();
    }
}

```

In these examples, `"secret"` is the secret key used to sign the JWT. For production use, remember to store this key securely and not hardcode it into your application.

## Benefits of JWT

JWTs offer a number of benefits that make them ideal for usage in secure applications:

1. **Self-contained**: A JWT is a self-contained token that has all the information needed within itself. This makes it extremely easy to transmit data between parties.

2. **Compact**: Since JWTs are compact and URL safe, they can be sent through an URL, POST parameter, or inside an HTTP header.

3. **Versatile**: JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

4. **Secure**: JWT ensures information integrity, meaning that the data contained in it cannot be easily tampered with.

## Summary

Java JWT is a powerful standard that brings security and convenience to Java applications. Its compact and self-contained nature make it a go-to choice for secure data transfer in today's digital world. While there are some considerations to keep in mind, such as securely storing the secret key and ensuring secure transmission of the tokens, the benefits it brings are well worth it.

As always, it's crucial to understand the needs of your specific application before implementing any new technology or standard. If JWT seems like a fit for your needs, the next step is to dive in and start experimenting with creating and validating