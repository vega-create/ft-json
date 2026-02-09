---
title: "HTTP Status Codes: Best Practices for API Design"
description: "How to use HTTP status codes correctly in RESTful APIs."
publishDate: "2026-02-02"
category: "Technical"
tags: ["http", "api", "rest"]
---

HTTP status codes communicate the result of a request. Using them correctly makes APIs intuitive and consistent.

## Success Codes (2xx)

200 OK is the standard success response. 201 Created should be returned when a new resource is created (POST requests). 204 No Content is appropriate for successful DELETE requests or updates that return no body.

## Client Error Codes (4xx)

400 Bad Request means the request was malformed. Include details about what was wrong. 401 Unauthorized means authentication is required. 403 Forbidden means the user is authenticated but lacks permission. 404 Not Found means the resource does not exist. 409 Conflict is useful when a request conflicts with current state. 422 Unprocessable Entity is good for validation errors. 429 Too Many Requests indicates rate limiting.

## Server Error Codes (5xx)

500 Internal Server Error is a generic server failure. 502 Bad Gateway means an upstream service failed. 503 Service Unavailable is appropriate during maintenance. 504 Gateway Timeout means an upstream service was too slow.

## Common Mistakes

Returning 200 with an error in the body is confusing. Using 404 when you mean 403 leaks information about resource existence. Returning 500 for all errors hides the real problem from clients.

## Best Practices

Use the most specific status code available. Always include a response body with error details for 4xx and 5xx codes. Be consistent across your entire API. Document which status codes each endpoint can return.