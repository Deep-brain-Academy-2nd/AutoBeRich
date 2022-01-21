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
| 409  | 실패 | 이미 가입한 유저                |

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
| 204  | 성공   |                        |
| 400 | 실패   | 헤딩 이메일 주소 없음, 비밀번호 불일치 |

Returns:
```
{
    status: 'failure',
    code: 401,
    msg: 'password incorrect',
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