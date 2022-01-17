# AutoBeRich API Documentation

## /users/signup (POST)

---
회원가입

### Request parameters
| Parameter  | Type | Description |
|------------|------|----|
| name       | string | 유저 이름    |
| email      | string | 유저 이메일   |
| password   | string | 패스워드     |
| secret_key | string | upbit 비밀키 |
| access_key | string | upbit 접근키 |

### Response
없음

## /users/login (GET)

---
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

### Seesion
| Feild | Type | Description |
|-------|------|------------|
| access_key | string | upbit 비밀키  |
| access_key | string | upbit 접근키  |


