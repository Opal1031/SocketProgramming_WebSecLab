# STEP4 보안 실습 보고서

## 1. 실습 개요
- 목적: 실제 취약점(XSS, IDOR, 세션 조작 등) 공격 및 보안 패치 실습
- 환경: React(프론트), Flask+SocketIO(백엔드), 3단계 최종 코드 기반

---

## 2. 공격 시나리오 및 결과

### 2.1 XSS (크로스사이트 스크립팅)
- **공격 페이로드:**
  ```html
  <img src=x onerror="alert('XSS!')">
  ```
- **공격 방법:**
  1. 채팅 입력창에 위 페이로드 입력 후 전송
  2. 본인 및 다른 브라우저/계정에서 팝업 발생 확인
- **코드 관련:**
  ```jsx
  // App.jsx (문제 코드)
  <div dangerouslySetInnerHTML={{ __html: msg }} />
  ```
- **결과:**
  - 모든 사용자에게 악성 스크립트가 전파됨

---

### 2.2 IDOR (수직/수평 권한 상승)
- **공격 방법:**
  - (예시) 메시지 삭제/수정 API가 있다면, 다른 사용자의 메시지 ID로 요청
  - 개발자 도구/프록시로 API 파라미터 조작
- **코드 관련:**
  ```python
  # app.py (문제 예시)
  @app.route('/api/delete', methods=['POST'])
  def delete_msg():
      msg_id = request.json['id']
      # 인증/권한 체크 없이 삭제 수행 (취약)
  ```
- **결과:**
  - 권한 없는 데이터에 접근/조작 가능

---

### 2.3 세션 조작
- **공격 방법:**
  - 개발자 도구에서 쿠키/세션 값을 임의로 변경
  - 인증 우회, 다른 사용자로 가장 시도
- **코드 관련:**
  ```python
  # app.py (문제 예시)
  session['user'] = request.form['user']  # 검증 없이 세션 설정
  ```
- **결과:**
  - 인증 우회, 세션 탈취 가능

---

## 3. 취약점 분석
- 입력값 검증, 인증/권한 체크, 세션 관리 미흡으로 인해 서비스 전체가 위험해짐
- 한 명의 공격자가 전체 사용자에게 영향을 줄 수 있음

---

## 4. 보안 패치 방법 및 코드

### 4.1 XSS 방지
- **프론트엔드:**
  ```jsx
  // DOMPurify 적용 예시
  import DOMPurify from 'dompurify';
  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg) }} />
  ```
- **백엔드:**
  ```python
  # 입력값 escape 처리 예시
  import html
  safe_msg = html.escape(msg)
  ```

### 4.2 IDOR 방지
- **백엔드:**
  ```python
  # 인증/권한 체크 추가
  if msg.owner != session['user']:
      return jsonify({'error': '권한 없음'}), 403
  ```

### 4.3 세션 보안 강화
- **세션 쿠키 옵션:**
  ```python
  app.config['SESSION_COOKIE_HTTPONLY'] = True
  app.config['SESSION_COOKIE_SECURE'] = True
  ```
- **세션 값 검증:**
  ```python
  # 세션에 저장 전 사용자 검증
  if valid_user(user):
      session['user'] = user
  ```

---

## 5. 개선점 및 느낀점
- 실습을 통해 보안 취약점의 실제 영향과 패치의 중요성을 체감함
- 입력값 검증, 인증/권한 관리, 세션 보안 등 기본 보안 원칙의 필요성 확인
- 실서비스 개발 시 반드시 보안 코딩을 습관화해야 함
