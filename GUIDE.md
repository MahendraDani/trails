# DATA ACCESS LAYER

1. In each database query, input validations will occur where the function is being used.
2. In case of error, directly throw the errors
3. Each query function will either throw and error or return `data`.
   NOTE : Zod validations will not be made in the query function

## Error API response schema

```json
{
  "code": "string",
  "message": "string",
  "statusCode": "string"
}
```

Example

```json
{
  "code": "bad_request",
  "message": "Invalid or incorrect request body",
  "statusCode": 400
}
```
