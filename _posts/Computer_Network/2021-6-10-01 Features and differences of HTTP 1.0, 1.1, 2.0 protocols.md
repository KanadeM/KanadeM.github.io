---
layout:     post   				    # 使用的布局（不需要改）
title:      Features and differences of HTTP 1.0, 1.1, 2.0 protocols  	# 标题 
subtitle:   Features and differences of HTTP 1.0, 1.1, 2.0 protocols #副标题
date:       2021-6-10			# 时间
author:     Leonard Meng						# 作者
header-img: img/post-banner/post-banner-network.jpg 	#这篇文章标题背景图片
catalog: true 						# 是否归档
mathjax: true                       # 是否启用 MathJax
tags:								#标签
    - HTTP

---

# HTTP 1.0
## Features of HTTP 1.0
- Stateless: The server does not keep track and record the requested state.
- Connectionless: A new tcp connection is necessary for each request.

HTTP/1.0 stipulates that browsers and servers maintain short-lived connections. Each request of the browser needs to establish a TCP connection with the server, and the server disconnects the TCP connection immediately after processing (no connection), the server does not track each client and does not record past requests (stateless)

The problems caused by statelessness can be solved by means of the cookie/session mechanism for authentication and state recording.

However, the connectionless nature will lead to the following performance drawbacks:

## Drawbacks of Http 1.0
- Unable to reuse connection. Every time a request is sent, a TCP connection needs to be made, and the TCP connection release process is more troublesome. This connectionless nature results in very low utilization of the network.
- Head of line blocking. Since HTTP/1.0 stipulates that the next request must be sent before the response of the previous request arrives. Assuming that a request response has not arrived, then the next request will not be sent, which will cause the subsequent request to be blocked.

In order to solve these problems, the http 1.1 appeared.

# Http 1.1

- Persistent connection. HTTP/1.1 adds a Connection field. By setting Keep-alive (set by default), the connection can be kept from being disconnected, which avoids the need to repeatedly establish and release the TCP connection every time the client and the server request, and improves the utilization of the network. If the client wants to close the HTTP connection, it can carry Connection:false in the request header to tell the server to close the request
- Pipelining. Persistent connections based on HTTP/1.1 make request pipelining possible. Pipelining enables requests to be transmitted "concurrently". For example, if the body of the response is an html page and the page contains a lot of img, keep-alive plays a big role at this time, and can send multiple requests "concurrently".
- New fields such as cache-control, support for breakpoint transfers, and the addition of the Host field (which enables a server to be used to create multiple Web sites).

## Concurrently in Http 1.1

<p style="background:yellow; font-weight:bold">
Although http 1.1 supports pipelining and parallelization, in practice, the server still needs to reply to responses one by one. The browser uses the method of opening multiple TCP connections to load in parallel. And pipelining is not actually turned on.
</p>
