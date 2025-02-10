# 스크럼블 - 스쿼드 단위 데일리 스크럼 공유 서비스

**개요:** https://github.com/Eggmeoni-na 

**기간:** 2024.09 ~ 2024.11 (3개월)

**참여:** FE 1명 / BE 1명

**패키지매니저:** pnpm

---

**사용 기술**

React, TypeScript, Emotion, Zustand, React Query, React-Router-Dom, date-fns, Vite, Vercel, AWS, S3, CloudFront

---

<br/>

# 기술 선택 이유

## Zustand

<table>
  <tr>
    <th width=120px><strong>Zustand</strong></th>
    <td>
      <ol>
            <li>Firebase는 로그인/로그아웃 API를 제공했지만, 이번에는 프로젝트 요구사항에 맞게 직접 구현 필요</li>
            <li>상태를 중앙에서 효율적으로 관리하며, 상태 변경 로직을 간단히 처리할 수 있는 도구가 적합함</li>
        <li>이전 프로젝트에서 Toast UI를 Context API로 관리했으나, 생각보다 사용하는 컴포넌트가 많음
          <ul>
            <li>Toast UI는 모달과 달리 복잡한 UI 커스텀 요구 사항이 적었기에, 보다 단순한 상태 관리 도구가 적합함</li>
          </ul>
        </li>
          <li>단일 스토어에서 상태를 공유하며 여러 액션을 수행 가능
        </li>
      </ol>
    </td>
  </tr>
  <tr>
    <th width=120px><strong>Jotai</strong></th>
    <td>
      상태 간 의존성을 명시적으로 관리해야 하는 점에서 코드 복잡도 증가
    </td>
  </tr>
  <tr>
    <th width=120px><strong>Context API</strong></th>
    <td>
      Provider를 통해 상태를 특정 범위에 제한할 수 있다는 장점이 있지만, 프로젝트에서는 상태를 국소적으로 관리할 필요가 없어 이 구조가 필요하지 않음
    </td>
  </tr>
</table>
    
## Emotion

<table>
  <tr >
    <th width=120px><strong>선택 이유</strong></th>
    <td>
      <ol>
        <li>기존 전역 모달의 개선 필요성을 느끼고, 확장성을 고려하여 <code>classNames</code> 라이브러리 의존성을 낮춤</li>
        <li>props 기반의 조건부 스타일링으로 프로젝트에서 필요한 UI 상태의 자유롭게 제어</li>
      </ol>
    </td>
  </tr>
  <tr>
    <th width=120px><strong>아쉬운 점</strong></th>
    <td>
      <ol>
        <li><strong>스타일 코드의 가독성 저하</strong>
          <ul>
            <li>모든 스타일 코드를 컴포넌트 파일 내에 작성하여, 스타일 변수를 외부에서 찾지 않아도 되는 장점이 있었으나, 파일 내 코드의 복잡도가 높아져 가독성이 좋지 않습니다.</li>
          </ul>
        </li>
        <li><strong>재사용 시 비효율성</strong>
          <ul>
            <li>스타일을 재사용 할 때, 특정 컴포넌트에서 export한 스타일 변수를 다른 컴포넌트에서 사용하는 방식이 많아졌습니다. 이는 컴포넌트 간 의존성을 증가시켜 유지보수에 부담을 줄 수 있습니다.</li>
          </ul>
        </li>
      </ol>
    </td>
  </tr>
</table>

## date-fns

<table>
    <tr>
    <th width=120px><strong>선택 이유</strong></th>
    <td>
      <ol>
        <li><strong>타입스크립트와의 호환성</strong>
          <ul>
            <li>함수별로 타입이 잘 정의되어 있어 타입스크립트와의 호환성이 뛰어나다는 장점이 있습니다.</li>
          </ul>
        </li>
        <li><strong>함수형 프로그래밍 방식</strong>
          <ul>
            <li>Date 객체를 함수형으로 처리하는 방식이 간결하고 직관적이며, 기존 프로젝트의 코드 스타일과 더 잘 맞습니다.</li>
          </ul>
        </li>
      </ol>
    </td>
  </tr>
  <tr >
    <th width=120px><strong>dayjs</strong></th>
    <td>
기능도 비슷하고 번들 사이즈도 유사했으나, 위 두 가지 이유로 <code>date-fns</code> 가 프로젝트 요구사항에 더 적합함
    </td>
  </tr>
</table>

---

<br/>

# 주요 이슈

### 투두 생성/수정/삭제 시 API 호출 최소 50% 감소

<table>
  <tr>
    <th width="120px">항목</th>
    <th width="1080px">내용</th>
  </tr>
  <tr>
    <td>문제 상황</td>
    <td>
      무한 스크롤을 적용한 투두리스트에서 생성, 수정, 삭제 시 캐싱의 의미 없이 API 호출이 발생하여 성능 저하
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
      <ul>
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
      </ul>
    </td>
  </tr>
  <tr>
    <td>결과</td>
    <td>
      <ul>
        <li><strong>API 호출 최소화</strong>: API 요청 횟수 최소 50% 감소, 조회된 페이지 수에 비례하여 최대 90% 감소 효과 기대</li>
        <li><strong>사용성 개선</strong>: 투두 생성, 수정, 삭제 시 리페치 없이 변경된 데이터를 즉시 반영하여 사용자 경험 향상</li>
        <li>업데이트 로직을 유틸 함수로 분리하여 <strong>가독성과 유지보수성</strong> 향상</li>
      </ul>
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

### 예외의 관점에서 바라보는 React Query 캐싱

<table >
  <tr>
    <th width="120px">항목</th>
    <th width="1080px">내용</th>
  </tr>
  <tr>
    <td>개요</td>
    <td>
세션 삭제 후 UI가 정상 렌더링 되고, 브라우저 새로고침 시 인증 에러가 발생하며 ErrorBoundary가 동작합니다.</br>
  캐시 데이터 기반 렌더링의 동작을 분석하여 일관성 문제를 해결하고자 했습니다.
    </td>
  </tr>
  <tr>
    <td>원인 분석</td>
    <td>
      <ul>
        <li>
          <strong>React Query의 cacheTime 유지</strong>: 캐시 데이터로 UI를 먼저 렌더링하므로 Suspense가 트리거 되지 않음  
        </li>
                <li>
          <strong>staleTime 만료 후 백그라운드 리페치</strong>: 콘솔에 401 에러는 출력되지만, UI에는 영향을 미치지 않음
        </li>
                <li>
          <strong>브라우저 새로고침</strong>: 상태와 캐시가 초기화되면서, 캐시 데이터가 없어 리페치된 데이터를 사용해 UI를 렌더링하며 ErrorBoundary가 감지함
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>결과</td>
    <td>
            <ul>
        <li>staleTime과 cacheTime의 목적 이해</li>
              <li>서버 상태와 캐시 데이터 간의 일관성을 유지하며 사용자 경험을 고려한 캐싱 전략</li>
              <li>ErrorBoundary와 Suspense를 활용한 에러 핸들링 적용</li>
        <li>캐시 데이터를 렌더링함으로써 사용자가 보던 화면이 사라지는 문제와 화면 깜빡임을 방지하는 것이 사용자 경험에 더 좋다고 판단하여 기존의 <code>useSuspenseQuery</code>를 유지하면서 별도의 에러 처리는 하지 않음</li>
      </ul>
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

<br/>

### 개발 환경과 배포 환경에서의 실시간 협업 최적화

<table >
  <tr>
    <th width="120px">항목</th>
    <th width="1080px">내용</th>
  </tr>
  <tr>
    <td>문제 상황</td>
    <td>
      <ol>
        <li>
         <strong>보안 문제</strong>: Vite 프록시 설정에서 서버 URL 노출 
        </li>
        <li>
         <strong>개발 환경</strong>: XMLHttpRequest 에러
        </li>
        <li>
         <strong>배포 환경</strong>: Mixed-Content 에러
        </li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>원인 분석</td>
    <td>
      <ul>
        <li>
          서버 URL을 <code>.env</code> 파일로 관리했지만, <code>vite.config.js</code> 파일에서 이를 반영하지 않음
        </li>
        <li>
          개발 환경에서 클라이언트와 서버의 도메인 불일치
        </li>
        <li>
          <strong>HTTPS와 HTTP 간 통신 불일치</strong>: 배포 환경에서 HTTPS와 HTTP 간의 통신 차단
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>해결</td>
    <td>
            <ul>
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
      </ul>
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

</br>

# 구현 사항

## 01. 웹 접근성과 웹 표준

- Lighthouse 접근성 점수를 **79점**에서 **100점**으로 점진적 개선했습니다. [[관련 PR 바로가기]](https://github.com/Eggmeoni-na/scrumble-FE/pull/182#issue-2840561133)
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

  3. **목록 요소(ul/li)의 올바른 활용과 이벤트 처리 최적화**

     - 투두리스트는 리스트형 UI로 ul - li 구조를 적용하였으며, 각 li 요소는 개별 투두 아이템을 나타냅니다. li 태그는 Non-interactive 요소이므로 직접 이벤트 핸들러를 할당하는 것은 적절하지 않습니다. 이에 button 요소로 감싸 클릭 이벤트의 명확한 역할을 부여하였습니다.

     - 이벤트 위임 최적화
       - Calendar 컴포넌트는 월별 날짜를 렌더링하며, 상대적으로 변동이 적습니다.
       - 각 날짜 요소마다 개별적으로 이벤트 핸들러를 할당하는 대신, `ul` 부모 요소에 한 번만 이벤트 리스너를 등록하고, `dataset`을 활용하여 개별 요소를 식별함으로써 메모리 사용량을 줄였습니다.
       - 접근성을 고려하여 ul 요소에 `role="listbox"`, li 요소에 `role="option"`을 설정하고, `aria-activedescendant` 및 `id` 속성을 활용하여 선택된 날짜를 스크린 리더가 정확히 인식할 수 있도록 하였습니다.

  4. **Compound Component Pattern**

     ```
     Calendar.Item.displayName = 'CalendarItem';
     ```

     `forwardRef`를 사용한 컴포넌트의 경우 컴포넌트 이름이 **React.ForwardRef**나 **Anonymous**로 표시될 수 있어 `displayName`으로 명확히 지정합니다.

- 시맨틱 태그를 적극 활용했습니다.
- `section` 태그에 heading 태그가 필요하지 않는 경우에 IR 기법 중 `sr-only` 속성을 전역 클래스로 선언하여 사용했습니다.
- `aria-label` 속성을 적용해 의미가 명확하지 않은 UI 요소에 대한 정보를 제공했습니다.
  
<br/>

## 02. 검색 엔진 최적화

- meta 태그 및 robots/sitemap 설정 추가로 lighthouse SEO 점수를 **22% 향상**시켰습니다.
- Open Graph 이미지 최적화로 크기를 **48% 감축**하였습니다.
<table>
  <tr>
    <th width="240px">Before</th>
    <th width="240px">After</th>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://github.com/user-attachments/assets/59ba6c11-7bcd-402b-bcb4-8f99c693b7d9" alt="SEO 최적화 전" >
    </td>
    <td>
      <img width="100%" src="https://github.com/user-attachments/assets/599d0307-5260-4880-b170-0de39f15cfc3" alt="SEO 최적화 후">
    </td>
  </tr>
</table>


<br/>

## 03. SVG 에셋 컴포넌트화

- **아이콘용으로 사용할 svg 파일을 정적 자산이 아닌 컴포넌트로 관리했습니다.**

  - 정적 파일보다 무거워질 수 있지만, 경로를 전달하는 것보다 컴포넌트를 이용하여 선언적으로 사용하는 것이 더 낫다고 판단했습니다.
  - Vite의 **svgr 플러그인**을 이용했습니다.

- 아이콘 활용이 대부분 동일한 스타일과 핸들러를 공유하면서 중복 코드가 발생했습니다. 이를 해결하기 위해, SVG 컴포넌트를 children으로 받는 IconWrapper 컴포넌트를 구현하여 공통 속성을 부여할 수 있도록 했습니다.

<table>
    <tr>
      <th width="120px">문제</th>
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
      <th width="120px">해결</th>
      <td>
              <ul>
        <li>
          클릭 가능 여부에 따라 동적으로 태그를 설정하여, 상호작용이 필요한 경우에는 button 태그를, 단순 UI 요소인 경우에는 div 태그 사용
        </li>
        <li><code>HTMLAttribute</code>와 <code>rest 파라미터</code>를 활용해 웹 접근성 속성을 동적으로 처리할 수 있도록 구현하여 확장성 개선 
        </li>
      </ul>
      </td>
    </tr>
     <tr>
    <th width="120px">배움</th>
    <td>
      <ul>
        <li>
          네비게이션 역할을 하는 아이콘의 경우, 최상위 태그에 올바른 접근성 속성을 지정해야 중복과 혼란을 방지할 수 있습니다.
        </li>
        <li><code>Reat-Router-Dom</code> 의 Link는 다른 페이지로 이동하는 역할로 이미 button 태그를 사용하고 있어 icon에 다른 속성을 부여할 필요 없이 Link 태그에 직접 지정 해줄 수 있습니다. 
          <ul>
            <li><code>aria-label</code>은 Link 태그에만 설정하여 접근성 속성이 중복되지 않도록 처리합니다.</li>
          </ul>
        </li>
      </ul>
    </td>
    </tr>
  </table>

<br/>

## 04. 컴포넌트를 매개변수로 받는 전역 모달에 props 추가 및 스타일 확장성 보완

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

## 05. SSE(Server Sent Event)

### 스쿼드 초대 알림 구현 필요성

스쿼드는 멤버 초대를 통해서만 참여할 수 있으며, 사용자가 초대를 누락하지 않도록 초대 알림 송/수신 기능을 구현했습니다. 이 알림 기능의 기술 선택 시 다음과 같은 요구 사항을 고려했습니다

- **실시간 확인**: 온라인 상태에서 발생한 알림을 즉시 확인
- **오프라인 상태 보장**: 오프라인 중 수신된 알림을 온라인 상태에서 확인

### 기술 선택 및 검토

<table>
  <tr>
    <th width=120px><strong>구분</strong></th>
    <th><strong>장점</strong></th>
  <th><strong>단점</strong></th>
  </tr>
  <tr>
    <th width=120px><strong>폴링</strong></th>
    <td>
    구현이 간단하며 HTTP 기반으로 어디서나 사용 가능
    </td>
        <td>
      주기적으로 서버에 요청을 보내 불필요한 트래픽이 발생하여 서버 부하 증가
    </td>
  </tr>
    <tr>
    <th width=120px><strong>롱폴링</strong></th>
    <td>
    폴링 단점을 보완하여 서버에서 응답 시까지 연결을 유지해 불필요한 요청 감소
    </td>
        <td>
      서버에서 응답을 보낸 후 연결이 종료되어 새로운 데이터가 필요하면 재연결 필요
    </td>
  </tr>
      <tr>
    <th width=120px><strong>웹소켓</strong></th>
    <td>
    실시간 양방향 데이터 전송 가능
    </td>
        <td>
      지속적인 연결 유지로 서버 리소스 부담 및 단순 단방향 통신에 비해 복잡성 증가
    </td>
  </tr>
        <tr>
    <th width=120px><strong>FCM</strong></th>
    <td>
    모바일 기기 대상 푸시 알림에 적합
    </td>
        <td>
      웹 서비스에서의 기기별 알림 동기화 문제
    </td>
  </tr>
          <tr>
    <th width=120px><strong>SSE</strong></th>
    <td>
    서버에서 클라이언트로 단방향 실시간 이벤트 스트림 제공, HTTP 기반으로 단순하고 효율적
    </td>
        <td>
      양방향 통신에는 적합하지 않음
    </td>
  </tr>
</table>

### SSE 선택 이유

SSE는 폴링 및 롱폴링에 비해 **불필요한 요청을 줄이고 지속적인 연결**을 유지하여 네트워크 비용을 절감할 수 있습니다. 웹소켓의 복잡한 연결 관리가 불필요하고, FCM의 플랫폼 제한 문제를 피할 수 있습니다.

알림은 **서버에서 클라이언트로 정보를 전달**하는 데이터로 사용자 행동(ex. 초대 수락, 거절)은 별도의 HTTP 요청이나 이벤트 핸들러를 통해 처리할 수 있기 때문에, 알림 자체에는 클라이언트에서 서버로의 즉각적인 데이터 전송이 필요하지 않습니다. 이에 **클라이언트에서 서버로의 연결 유지**는 필수적이지 않으며, 단방향 통신으로 충분하다고 판단하여 **효율성과 구현 용이성**을 충족하는 SSE를 도입하였습니다.

<br/>

---

# 실행화면

투두의 생성, 수정, 삭제 작업은 낙관적 업데이트 방식을 적용하여 네트워크 중복 호출이 발생하지 않습니다.

<table>
  <tr>
    <th width="360px">투두 생성</th>
    <th width="360px">투두 수정</th>
    <th width="360px">투두 삭제</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/77221144-85c0-4011-9199-8cc334128fd2" alt="투두 생성" >
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/323c35f4-22f2-4cee-b44a-4e3c9eab7a4a" alt="투두 수정">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/db23341e-b4f8-493d-85b2-4e83f4e14280" alt="투두 삭제">
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
