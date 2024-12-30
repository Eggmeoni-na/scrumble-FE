# 스크럼블 - 스쿼드 단위 데일리 스크럼

**개요:** https://github.com/Eggmeoni-na

**기간:** 2024.09 ~ 2024.11 (3개월)

**참여**: FE 1명 / BE 1명

**패키지매니저:** pnpm

---

**사용 기술**

React, TypeScript, Emotion, Zustand, React Query, React-Router-Dom, date-fns, Vite

---

# 기술 선택 이유

## Zustand
**선택 이유**    
  1. Firebase는 로그인/로그아웃 API를 제공했지만, 이번에는 프로젝트 요구사항에 맞게 직접 구현이 필요했습니다. 이를 위해 상태를 중앙에서 효율적으로 관리하며, 상태 변경 로직을 간단히 처리할 수 있는 도구가 필요했습니다.
  2. 이전 프로젝트에서 Toast UI를 Context API로 관리했으나, 생각보다 사용하는 컴포넌트가 많았습니다. Toast UI는 모달과 달리 복잡한 UI 커스텀 요구 사항이 적었기에, 보다 단순한 상태 관리 도구가 적합하다고 판단했습니다.
  
Context API는 Provider를 통해 상태를 특정 범위에 제한할 수 있다는 장점이 있지만, 프로젝트에서는 상태를 국소적으로 관리할 필요가 없어 이 구조가 불필요했습니다. Jotai는 상태 간 의존성을 명시적으로 관리해야 하는 점에서 코드 복잡도가 증가했습니다. 반면, Zustand는 단일 스토어에서 상태를 공유하며 여러 액션을 수행할 수 있습니다.
    
## Emotion
    
**선택 이유**

  1. 기존 전역 모달의 개선 필요성을 느끼고, 확장성을 고려하여 `classNames` 라이브러리 의존성을 줄이고자 했습니다. props 기반의 조건부 스타일링으로 프로젝트에서 필요한 UI 상태를 자유롭게 제어하고자 선택했습니다.

**아쉬운 점**

- **스타일 코드의 가독성 저하**
  - 모든 스타일 코드를 컴포넌트 파일 내에 작성하여, 스타일 변수를 외부에서 찾지 않아도 되는 장점이 있었으나, 파일 내 코드의 복잡도가 높아져 가독성이 떨어졌습니다.
- **재사용 시 비효율성**
  - 스타일을 재사용 할 때, 특정 컴포넌트에서 export한 스타일 변수를 다른 컴포넌트에서 사용하는 방식이 많아졌습니다. 이는 컴포넌트 간 의존성을 증가시켜 유지보수에 부담을 줄 수 있습니다.

## date-fns
    
**선택 이유**

- **타입스크립트와의 호환성**
  - 함수별로 타입이 잘 정의되어 있어 타입스크립트와의 호환성이 뛰어나다는 장점이 있습니다.
- **함수형 프로그래밍 방식**
  - Date 객체를 함수형으로 처리하는 방식이 간결하고 직관적이었습니다. 또한, 기존 프로젝트의 코드 스타일과 더 잘 맞았습니다.

**비교**

`dayjs`와 기능도 비슷하고 번들 사이즈도 유사했으나, 위 두 가지 이유로 `date-fns` 가 프로젝트 요구사항에 더 적합하다고 판단했습니다.

---

## 네트워크 통신 최적화

### 투두 생성/수정/삭제의 불필요한 API 호출
<table>
  <tr>
    <th width="120px">항목</th>
    <th width="1080px">내용</th>
  </tr>
  <tr>
    <td>문제 상황</td>
    <td>
      무한 스크롤을 적용한 투두리스트에서 생성, 수정, 삭제 시 불필요한 API 호출이 발생하여 성능 저하
    </td>
  </tr>
  <tr>
    <td>원인 분석</td>
    <td>
      <code>mutate</code> 함수 호출 후 성공 시 전체 쿼리를 초기화하여 재조회 로직 실행
    </td>
  </tr>
  <tr>
    <td>해결 방법</td>
    <td>
      <ol>
        <li><strong>낙관적 업데이트 적용</strong>
          <ul>
            <li><strong>수정 및 삭제</strong>: 클라이언트에서 요청 데이터를 활용하여 <code>onMutate</code> 단계에서 적용</li>
            <li><strong>생성</strong>: 서버에서 응답받은 데이터를 <code>onSuccess</code> 단계에서 적용</li>
          </ul>
        </li>
        <li><strong>캐싱 및 쿼리 설정 최적화</strong>
          <ul>
            <li><code>staleTime: 3분</code>으로 설정하여 데이터의 신선도를 일정 시간 보장</li>
          </ul>
        </li>
        <li><strong>유틸리티 함수 분리</strong>
          <ul>
            <li>업데이트 로직을 유틸 함수로 추상화</li>
          </ul>
        </li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>결과</td>
    <td>
      <ol>
        <li><strong>사용성 개선</strong>: 투두 생성, 수정, 삭제 시 리페치 없이 변경된 데이터를 즉시 반영하여 사용자 경험 향상</li>
        <li><strong>API 호출 최소화</strong>: 날짜별 데이터를 캐싱하여 동일 날짜에 대한 API 재호출 방지</li>
        <li>업데이트 로직을 유틸 함수로 분리하여 <strong>가독성과 유지보수성</strong> 향상</li>
      </ol>
    </td>
  </tr>
  <tr>
  <td>관련 포스팅</td>
  <td>
    <a href="https://heeheehoho.tistory.com/entry/%EB%82%99%EA%B4%80%EC%A0%81-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%A2%8B%EC%95%84%EC%9A%94-%EB%A7%90%EA%B3%A0-%EC%96%B4%EB%94%94%EC%97%90-%EC%93%B8%EA%B9%8C">
      낙관적 업데이트, 좋아요 말고 어디에 쓸까?
    </a>
  </td>
</tr>
</table>

<br/>

## 트러블 슈팅

### 예외의 관점에서 바라보는 React Query 캐싱
<table >
  <tr>
    <th width="120px">항목</th>
    <th width="1080px">내용</th>
  </tr>
  <tr>
    <td>문제 상황</td>
    <td>
      1. GET 요청에 대해 <strong>서버에서 세션 유효 여부 확인</strong><br />
      2. 한 번 데이터를 조회한 뒤 쿠키에서 세션을 임의로 삭제하면 현재 화면에서는 바로 인증 여부를 감지하지 못함<br />
      3. 뒤로 가기 했다가 다시 페이지로 돌아와도 인증 에러가 발생하지 않음<br />
      4. 새로 고침 시 인증 에러 발생
    </td>
  </tr>
  <tr>
    <td>원인 분석</td>
    <td>
      1. <strong>React Query의 cacheTime 유지</strong>: 캐시 데이터로 UI를 먼저 렌더링하므로 Suspense가 트리거 되지 않음<br />
      2. <strong>staleTime 만료 후 백그라운드 리페치</strong>: 콘솔에 401 에러는 출력되지만, UI에는 영향을 미치지 않음<br />
      3. <strong>브라우저 새로고침</strong>: 상태와 캐시가 초기화되면서, 캐시 데이터가 없어 리페치된 데이터를 사용해 UI를 렌더링하며 ErrorBoundary가 감지함
    </td>
  </tr>
  <tr>
    <td>결과</td>
    <td>
      캐시 데이터를 렌더링함으로써 사용자가 보던 화면이 사라지는 문제와 화면 깜빡임을 방지하는 것이 사용자 경험에 더 좋다고 판단하여 기존의 <code>useSuspenseQuery</code>를 유지하면서 별도의 에러 처리는 하지 않음
    </td>
  </tr>
  <tr>
    <td>관련 포스팅</td>
    <td>
      <a href="https://heeheehoho.tistory.com/entry/%EC%A2%8B%EC%9D%80-UX%EB%A5%BC-%EC%9C%84%ED%95%9C-%EB%B3%B4%EC%9D%B4%EC%A7%80-%EC%95%8A%EB%8A%94-%EC%97%90%EB%9F%AC-%EB%8B%A4%EB%A3%A8%EA%B8%B0">
        좋은 UX를 위한 보이지 않는 에러 다루기
      </a>
    </td>
  </tr>
</table>

### 개발 환경과 배포 환경에서의 CORS 에러
<table >
  <tr>
    <th width="120px">항목</th>
    <th width="1080px">내용</th>
  </tr>
  <tr>
    <td>문제 상황</td>
    <td>
      1. <strong>보안 문제</strong>: Vite 프록시 설정에서 서버 URL 노출<br />
      2. <strong>개발 환경</strong>: XMLHttpRequest 에러<br />
      3. <strong>배포 환경</strong>: Mixed-Content 에러
    </td>
  </tr>
  <tr>
    <td>원인 분석</td>
    <td>
      - 서버 URL을 <code>.env</code> 파일로 관리했지만, <code>vite.config.js</code> 파일에서 이를 반영하지 않음<br />
      - 개발 환경에서 클라이언트와 서버의 도메인 불일치<br />
      - <strong>HTTPS와 HTTP 간 통신 불일치</strong>: 배포 환경에서 HTTPS와 HTTP 간의 통신 차단
    </td>
  </tr>
  <tr>
    <td>해결</td>
    <td>
            <ol>
        <li><strong>Vite 프록시 설정</strong>
          <ul>
            <li><code>defineConfig</code>를 활용하여 <code>.env</code> 파일에 있는 서버 URL을 안전하게 Vite 설정에 반영</li>
            <li>proxy target 설정으로 도메인 불일치 해결</li>
          </ul>
        </li>
        <li><strong>배포 환경 문제 대응</strong>
          <ul>
            <li>도메인을 구매하지 않은 상태에서는 HTTPS 서버 구축이 어려워 <strong>ngrok</strong> 서비스를 사용하여 임시 URL 발급</li>
            <li>SSE 연결 테스트에서는 ngrok가 제한적이므로 <strong>포트 포워딩</strong>을 통해 백엔드 개발자와 실시간 협업</li>
          </ul>
        </li>
      </ol>
    </td>
  </tr>
  <tr>
  <td>관련 포스팅</td>
  <td>
    <a href="https://heeheehoho.tistory.com/entry/%EA%B1%B0%EC%A0%88%EC%9D%B4-%EC%B7%A8%EB%AF%B8%EC%9D%B8-CORS-%EC%9D%B4%EC%9C%A0%EA%B0%80-%EC%9E%88%EA%B2%A0%EC%A7%80">
      거절이 취미인 CORS, 이유가 있겠지
    </a>
  </td>
</tr>
</table>

---

# 구현 사항
## 01. 웹 접근성과 웹 표준

- 관련된 ESLint 규칙을 활성화 하고, **jsx-a11y** 플러그인을 추가 설치하여 규칙을 강화하였습니다.
  1. **정적 요소에 인터랙션 핸들러 할당**
      
      ```tsx
      <div
        css={[searchResultStyle(theme, isSelected)]}
        onClick={() => setIsSelected(!isSelected)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsSelected(!isSelected);
          }
        }}
        tabIndex={0}
        role="button"
      >
      ```
      
      사용자 경험을 향상시키기 위해 Wrapper 역할의 div 태그에 클릭 이벤트를 적용하여 사용자가 더 쉽게 상호작용할 수 있도록 클릭 가능한 영역을 확장했습니다.
      
      - `role` 속성을 추가(ex: `role="button"`)하여 역할을 표현했습니다.
      - 정적 요소는 기본적으로 포커스를 받을 수 없으므로 `tabIndex="0"`을 적용했습니다.
      - `onKeyDown`키보드 이벤트 핸들러를 추가했습니다.
        - 해당 로직이 반본적으로 사용되어 해당 로직을 유틸 함수로 분리하여 재사용 했습니다.
          
  2. **role=”presentation”**
      
      ```tsx
      <div
        css={actionStyle}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >"
      ```
      
      Wrapper 자체에 클릭 이벤트가 필요하지 않은 상황에서도, 이벤트 버블링을 제어하기 위해 핸들러를 적용하여 명확한 동작을 보장했습니다. 또한, Wrapper가 단순히 시각적 레이아웃을 위한 역할만 수행하며, 의미 있는 콘텐츠나 상호작용 요소가 아니기 때문에 <code>role="presentation"</code>을 지정했습니다.
       
  3. **`li`는 비상호작용(non-interactive) 요소**로, 상호작용(interactive) 역할을 부여하면 접근성 규칙에 어긋납니다.
      
      ```jsx
      'jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        {
          li: ['button'],
        },
      ],
      ```
      
      투두리스트는 목록형으로 `ul - li` 구조로 설계하였고, 각 `li` 태그는 투두아이템으로 클릭 이벤트가 적용됩니다. 이때 `role="button”` 을 적용하지 않으면 에러가 발생합니다.
      
      상호작용 요소로 변경하는 것은 스타일 구성이나 구조상 적합하지 않아 eslint 설정을 통해 `button` 역할 부여를 허용하도록 했습니다.
      
  4. **Compound Component Pattern**
      
      ```
      Calendar.Item.displayName = 'CalendarItem'; 
      ```
      
      `forwardRef`를 사용한 컴포넌트의 경우 컴포넌트 이름이 **React.ForwardRef**나 **Anonymous**로 표시될 수 있어 `displayName`으로 명확히 지정합니다.
            
- 시맨틱 태그를 적극 활용했습니다.
- `section` 태그에 heading 태그가 필요하지 않는 경우에 IR 기법 중 `sr-only` 속성을 전역 클래스로 선언하여 사용했습니다.
- `aria-label` 속성을 적용해 의미가 명확하지 않은 UI 요소에 대한 정보를 제공했습니다.

<br/>

## 02. SVG 에셋 컴포넌트화

- **아이콘용으로 사용할 svg 파일을 정적 자산이 아닌 컴포넌트로 관리했습니다.**
    - 정적 파일보다 무거워질 수 있지만, 경로를 전달하는 것보다 컴포넌트를 이용하여 선언적으로 사용하는 것이 더 낫다고 판단했습니다.
    - Vite의 **svgr 플러그인**을 이용했습니다.

  아이콘 활용이 대부분 동일한 스타일과 핸들러를 공유하면서 중복 코드가 발생했습니다. 이를 해결하기 위해, SVG 컴포넌트를 children으로 받는 IconWrapper 컴포넌트를 구현하여 공통 속성을 부여할 수 있도록 했습니다.
 <table>
  <tr>
    <th width="120px">항목</th>
    <th width="1080px">내용</th>
  </tr>
  <tr>
    <td>문제 상황</td>
    <td>
      <ol>
        <li><strong>태그 선택의 일관성 부족</strong>
          <ul>
            <li>앱 내 아이콘은 주로 클릭 시 이동하는 상호작용을 포함하므로 button 태그를 기본으로 사용했습니다. 하지만 단순 UI 요소로 사용할 때 button 태그는 적합하지 않습니다.</li>
          </ul>
        </li>
        <li><strong>aria-label과 태그에서의 중복 문제</strong>
          <ul>
            <li>웹 접근성을 위해 aria-labe을 name으로 전달했지만, 태그에서 이미 사용되는 기본 name 속성과 중복되었습니다.</li>
          </ul>
        </li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>해결</td>
    <td>
      클릭 가능 여부에 따라 동적으로 태그를 설정하여, 상호작용이 필요한 경우에는 button 태그를, 단순 UI 요소인 경우에는 div 태그를 사용했습니다. 또한, <code>HTMLAttribute</code>와 <code>rest 파라미터</code>를 활용해 웹 접근성 속성을 동적으로 처리할 수 있도록 구현하여 확장성을 개선했습니다.
    </td>
  </tr>
   <tr>
  <td>배움</td>
  <td>
    <ol>
      <li>
        네비게이션 역할을 하는 아이콘의 경우, 최상위 태그에 올바른 접근성 속성을 지정해야 중복과 혼란을 방지할 수 있습니다.
      </li>
      <li><code>Reat-Router-Dom</code> 의 Link는 다른 페이지로 이동하는 역할로 이미 button 태그를 사용하고 있어 icon에 다른 속성을 부여할 필요 없이 Link 태그에 직접 지정 해줄 수 있습니다. 
        <ul>
          <li><code>aria-label</code>은 Link 태그에만 설정하여 접근성 속성이 중복되지 않도록 처리합니다.</li>
        </ul>
      </li>
    </ol>
  </td>
  </tr>
</table>

<br/>

## 03. 컴포넌트를 매개변수로 받는 전역 모달에 props 추가 및 스타일 확장성 보완

- **ModuleCSS와 classNames 조합으로 설계했던 기존 모달의 라이브러리 의존성을 제거합니다.**
  - Emotion을 사용중인 프로젝트에서도 호환되도록 전역 클래스를 활용하여 스타일을 적용했습니다.
    
- **resolve와 reject로 porps가 고정된 컴포넌트의 확장성을 개선했습니다.**
    
    ```tsx
    const res = await openModal(SquadForm);
    ```
    
    `SquadForm` 컴포넌트는 다른 값을 전달 받을 수 없습니다. 예를 들어, 스쿼드 생성과 스쿼드명 수정 모달의 레이아웃이 동일한데 이를 위해 2가지의 컴포넌트를 만드는 것은 비효율적입니다.
    
    ### 해결
    
    openModal의 매개변수에 Record 타입의 props를 옵셔널로 추가하고, 상태에 저장할 모달 객체에 전달 받은 props 객체를 함께 저장했습니다.
    
    ```tsx
    const res = await openModal(SquadForm, { isEdit: true });
    ```
    
    `SquadForm` 은 isEdit을 props로 받아 내부적으로 조건부 렌더링이 가능합니다.
    
    ### 단점
    
    모달 콘텐츠 컴포넌트에 전달되는 추가 props는 옵셔널 속성입니다. 하지만 이는 `openModal` 함수에 타입을 지정한 것이므로, 모달 컴포넌트는 props를 상세히 추론하지 못합니다. 이로 인해 콘텐츠 컴포넌트에서 필요한 props가 누락되더라도 컴파일 단계에서 확인되지 않아, 개발자가 이를 실수로 놓칠 가능성이 있습니다.
    
    **보완**
    
    ```tsx
    // 01.
    props?: Record<string, unknown>,
    
    // 02.
    props?: Omit<P, 'onSubmit' | 'onAbort'> | undefined,
    ```
    
<br/>

## 04. SSE(Server Sent Event)

- **스쿼드 초대 알림 구현 필요성**
    
    스쿼드는 멤버 초대를 통해서만 참여할 수 있으며, 사용자가 초대를 누락하지 않도록 초대 알림 송/수신 기능을 구현했습니다. 이 알림 기능의 기술 선택 시 다음과 같은 요구 사항을 고려했습니다
    
    - **실시간 확인**: 온라인 상태에서 발생한 알림을 즉시 확인
    - **오프라인 상태 보장**: 오프라인 중 수신된 알림을 온라인 상태에서 확인
- **기술 선택 및 검토**
    1. **폴링(Polling)**
        - **장점**: 구현이 간단하며 HTTP 기반으로 어디서나 사용 가능
        - **단점**: 주기적으로 서버에 요청을 보내 불필요한 트래픽이 발생하여 서버 부하 증가
    2. **롱폴링(Long Polling)**
        - **장점**: 폴링 단점을 보완하여 서버에서 응답 시까지 연결을 유지해 불필요한 요청 감소
        - **단점**: 서버에서 응답을 보낸 후 연결이 종료되어 새로운 데이터가 필요하면 재연결 필요
    3. **웹소켓(WebSocket)**
        - **장점**: 실시간 양방향 데이터 전송 가능
        - **단점**: 지속적인 연결 유지로 서버 리소스 부담 및 단순 단방향 통신에 비해 복잡성 증가
    4. **FCM(Firebase Cloud Messaging)**
        - **장점**: 모바일 기기 대상 푸시 알림에 적합
        - **단점**: 웹 서비스에서의 기기별 알림 동기화 문제
    5. **SSE(Server-Sent Events)**
        - **장점**: 서버에서 클라이언트로 단방향 실시간 이벤트 스트림 제공, HTTP 기반으로 단순하고 효율적
        - **단점**: 양방향 통신에는 적합하지 않음
### SSE 선택 이유
    
  SSE는 폴링 및 롱폴링에 비해 **불필요한 요청을 줄이고 지속적인 연결**을 유지하여 네트워크 비용을 절감할 수 있습니다. 웹소켓의 복잡한 연결 관리가 불필요하고, FCM의 플랫폼 제한 문제를 피할 수 있습니다.
  
  알림은 **서버에서 클라이언트로 정보를 전달**하는 데이터로 사용자 행동(ex. 초대 수락, 거절)은 별도의 HTTP 요청이나 이벤트 핸들러를 통해 처리할 수 있기 때문에, 알림 자체에는 클라이언트에서 서버로의 즉각적인 데이터 전송이 필요하지 않습니다. 이에 **클라이언트에서 서버로의 연결 유지**는 필수적이지 않으며, 단방향 통신으로 충분하다고 판단하여 **효율성과 구현 용이성**을 충족하는 SSE를 도입하였습니다.

<br/>

---

# 실행화면

투두의 생성, 수정, 삭제 작업은 낙관적 업데이트 방식을 적용하여 네트워크 중복 호출이 발생하지 않습니다.

<table>
  <tr>
    <th>투두 생성</th>
  </tr>
  <tr>
    <td>
    <img src="https://github.com/user-attachments/assets/f9393be8-513e-4935-9977-1eefd4ef3058" alt="투두 생성">
    </td>
  </tr>
</table>

<table>
  <tr>
    <th>투두 수정</th>
  </tr>
  <tr>
    <td>
    <img src="https://github.com/user-attachments/assets/2a267c36-9aca-457b-9748-68e1f54f5cd0" alt="투두 수정">
    </td>
  </tr>
</table>

<table>
  <tr>
    <th>투두 삭제</th>
  </tr>
  <tr>
    <td>
    <img src="https://github.com/user-attachments/assets/4399d1e0-e8e0-4c0a-a4a2-eee4a8511adc" alt="투두 삭제">
    </td>
  </tr>
</table>

<table>
  <tr>
    <th width="360px">멤버별 투두 조회</th>
    <th width="360px">멤버 초대</th>
    <th width="360px">멤버 강퇴</th>
    <th width="360px">리더 변경</th>
  </tr>
  <tr>
        <td>
    <img src="https://github.com/user-attachments/assets/1929de92-ac50-44ed-a6b5-2a3012303548" alt="스쿼드 멤버별 투두 조회" >
    </td>
    <td>
    <img src="https://github.com/user-attachments/assets/780d45e4-3019-45ab-9071-c2b001b474a7" alt="멤버 초대">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/ff4c8f17-951a-49f1-967e-e91500138a2e" alt="멤버 강퇴">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/9637dd50-c992-45dd-862e-c59772af8c25" alt="리더 변경">
    </td>
  </tr>
</table>
