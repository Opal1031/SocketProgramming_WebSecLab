# STEP1: 기초

## 활동 내용
- HTML/CSS/JS로 간단한 채팅 UI 구현
- innerHTML을 사용하여 메시지 출력

## 핵심 보안/학습 포인트
- DOM 조작 및 `innerHTML` 취약점 분석
- 입력값이 검증 없이 innerHTML로 렌더링될 때, 악의적 코드가 실행될 수 있음
- `<b>`, `<img onerror>`, `<script>` 등 다양한 페이로드로 취약점 실습 가능
- 브라우저 최신 보안 정책에 따라 script 태그는 막히지만, 이벤트 기반 XSS는 동작할 수 있음

## 실습 예시
- `<b>굵은글씨</b>` 입력 시 굵은 글씨로 표시됨
- `<img src=x onerror="alert('XSS!')">` 입력 시 팝업 발생 가능

---

- 실습 후 보안 패치(escape 처리 등) 필요성을 인식하는 것이 중요
