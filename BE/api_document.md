# AutoBeRich API Documentation

## /users/signup (POST)

회원가입

### Request parameters
| Parameter  | Type | Description |
|------------|------|-------------|
| name       | string | 유저 이름       |
| email      | string | 유저 이메일      |
| password   | string | 패스워드        |
| secret_key | string | upbit 비밀키   |
| access_key | string | upbit 접근키   |
| strategy | string | 매매전략        |

### Response

| Code | Type | Description              |
|------|------|--------------------------|
| 200  | 성공   |                          |
| 400  | 실패   | 이름, 패스워드 등 validation 실패 |
| 401  | 실패 | 이미 가입한 유저                |

Returns:
```
{
        status: 'failure',
        code: 401,
        msg: 'This ID is already in use.',
}
```

validation 조건

| filed  | 조건                      | msg                                                |
|-------|-------------------------|----------------------------------------------------|
| name | not empty      | Name is required            |
| email | valid email     | Please include a valid email       |
| password | least 6 more characters | Please enter a password with 6 or more characters  |
|  secretKey    | not empty        |      secret key is required          |
|      accessKey  |        not empty     |       access key is required    |

## /users/login (GET)

로그인

### Request parameters
| Parameter | Type | Description |
|-----------|------|----|
| email     | string | 유저 이메일|
| password | string | 패스워드 |

### Response
| Feild | Type | Description |
|-------|------|------------|
| token | string | jwt 토큰     |

| Code | Type | Description            |
|------|------|------------------------|
| 200  | 성공   |                        |
| 400  | 실패   | 헤딩 이메일 주소 없음, 비밀번호 불일치 |

Returns:
```
//실패
{
    status: 'failure',
    code: 401,
    msg: 'password incorrect',
}

//성공
{
    "status":"success",
    "code":200,
    "msg":"Login successful.",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZUB0ZXN0LmNvbSIsImlhdCI6MTY0Mjc2NzQ1MywiZXhwIjoxNjQyODAzNDUzfQ._Q1QaQ1hF8Xv4IGP2-1sFE_w_9OST-G-fbwALfygfNI",
    "email":"qwe@test.com",
    "name":"qwe"
 }
```

### Seesion
| Feild      | Type | Description    |
|------------|------|----------------|
| secret_key | string | upbit 비밀키(암호화) |
| access_key | string | upbit 접근키(암호화) |


## /users/verifyToken(GET)

토큰 검증

### Request parameters
| Parameter              | Type | Description |
|------------------------|------|-------------|
| x-access-token(Header) | string | 토큰          |


### Response

| Code | Type | Description |
|------|------|-------------|
| 204  | 성공   |             |
| 401  | 실패   | 인증 실패       |
| 403  | 실패   | 액세스 거부      |

Returns:
```
{
    status: 'failure',
    code: 401,
    msg: 'unauthorized',
}
```

## /users/account/info(GET)

나의 업비트 계좌정보 가져오기

### Request parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| email     | string | 이메일주소       |

### Response

| Code | Type | Description   |
|------|------|---------------|
| 200  | 성공   |               |
| 417  | 실패   | 업비트 URL 요청 실패 |

Returns:
```
{
    "upbit_accounts": [
        {
            "currency": "KRW",
            "balance": "5000.0",
            "locked": "0.0",
            "avg_buy_price": "0",
            "avg_buy_price_modified": true,
            "unit_currency": "KRW"
        }
    ],
    "strategy": "Changing_Trading",
    "status": "success",
    "code": 200,
    "msg": "Get Upbit account information successfully."
}

```

## /users/strategy (PUT)

매매전략수정

### Request parameters
| Parameter | Type | Description                                      |
|-----------|------|--------------------------------------------------|
| email | 이메일 주소 | 이메일 주소 |
| strategy  | string | 매매전략 (Changing_Trading: 변동성매매, RSI_Trading: RSI) |

### Response
| Code | Type | Description   |
|------|------|---------------|
| 200  | 성공   |               |

```
{
      status: 'success',
      code: 200,
      msg: 'Update traiding strategy successful.',
}
```

## /users/status (PUT)

매매상태수정

### Request parameters
| Parameter    | Type      | Description |
|--------------|-----------|-------------|
| email | string    | 이메일 주소 |
| status | boolean   | 매매시작상태      |

### Response
| Code | Type | Description   |
|------|------|---------------|
| 200  | 성공   |               |

```
{
      status: 'success',
      code: 200,
      msg: 'Update traiding status successful.',
}
```












