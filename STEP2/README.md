# STEP2: 프론트엔드

## 활동 내용
- React 환경 구축 및 컴포넌트화
- dangerouslySetInnerHTML을 사용하여 XSS/HTML 인젝션 취약점 실습

## 핵심 보안/학습 포인트
- React의 기본 보안 메커니즘 이해
- dangerouslySetInnerHTML 실습
- React는 기본적으로 입력값을 escape 처리하여 XSS를 방지함
- dangerouslySetInnerHTML 사용 시 escape가 무시되어 취약점 발생
- `<b>`, `<img onerror>` 등 다양한 페이로드로 실습 가능

## 실습 예시
- `<b>굵은글씨</b>` 입력 시 굵은 글씨로 표시됨
- `<img src=x onerror="alert('XSS!')">` 입력 시 팝업 발생 가능

## 실행 방법
1. 의존성 설치(최초 1회)
	```
	npm install
	```
2. 개발 서버 실행
	```
	npm run dev
	```

---

- 실습 후 보안 패치(escape 처리, DOMPurify 등) 적용 필요성 인식
