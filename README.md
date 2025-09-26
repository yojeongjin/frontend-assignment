# 프론트엔드 소셜 미디어 피드 개발 과제

## 실행방법

### 1. 배포링크

📎 [Vercel 배포 링크](https://frontend-assignment-nine-coral.vercel.app)

### 2. 로컬 실행

```json
# 레포지토리 클론
git clone https://github.com/yojeongjin/frontend-assignment.git
cd frontend-assignment

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 확인
http://localhost:3000

## 기타
- `npm run dev:local` 실행 시 같은 네트워크 내 모바일 기기에서 `http://<PC_IP>:3000` 으로 접속 가능합니다.
```

## 사용한 기술 스택 및 선택 이유

### 프레임워크 & 언어

- **Next.js (React 기반 프레임워크)**
  1. **프로젝트 구조와 라우팅 편의성**: `/pages` 디렉토리 기반 라우팅으로 게시물 목록(`/`), 작성(`/create`), 상세(`/post/[id]`)와 같은 페이지 구성을 명확하게 할 수 있어 선택했습니다.
  2. **확장성**: 추후 SEO가 필요한 피드 서비스로 발전한다고 가정하면 `getServerSideProps`나 `getStaticProps`로 손쉽게 전환이 가능하기 때문에 선택했습니다.

- **TypeScript**
  - `Post`, `User`, `Category`와 같이 도메인별 타입을 정의하여 컴포넌트와 서비스 함수에 적용했습니다.
    - **타입 안정성**: `게시물(Post)`, `사용자(User)` 등 데이터 타입을 명확하게 정의하여 런타임 에러를 방지할 수 있어 선택했습니다.
    - **자동 완성 지원**: IDE의 IntelliSense를 통한 빠른 개발 경험이 가능하기에 선택했습니다.
    - **협업 관점**: 팀 환경을 가정했을 때 타입 정의가 곧 문서 역할을 하여 가독성과 유지보수성을 높일 수 있어 선택했습니다.

### 스타일링

- **styled-components**
  1. **컴포넌트 단위 스타일 관리**: 각 UI를 독립적으로 관리할 수 있어 PostArticle, PostImg, PostAction 등 피드 요소들을 재사용 가능하게 만들 수 있기 때문에 선택했습니다.
  2. **동적 스타일링**: props 기반 스타일링이 가능해 상태(예: 글자 수 초과 여부, 이미지 개수)에 따라 UI가 자동으로 변하도록 할 수 있어, 비즈니스 로직과 스타일을 분리하면서도 손쉽게 UI를 제어할 수 있기 때문에 선택했습니다.
  3. **테마 적용 용이성**: `ThemeProvider`를 통해 색상, 간격 등을 전역 관리할 수 있어 추후 다크모드나 브랜드 컬러 적용도 유연하게 할 수 있기 때문에 선택했습니다.

### 상태 관리

- **React Context API**
  - 게시물 리스트, 로그인 사용자 정보와 같이 **여러 컴포넌트에서 공통으로 필요**한 상태를 Context로 관리했습니다.
  - `useContext`를 통해 props drilling 문제를 해결하면서도 Redux보다 가볍고 단순한 구조를 유지할 수 있어 선택했습니다.
  - 이번 과제 범위에서는 비동기 처리나 복잡한 상태 전환 로직이 많지 않았기 때문에 Redux-Saga나 Zustand 같은 상태 관리 도구 보다는 Context API가 적합하다고 판단하였습니다.

### 서비스 계층

- **서비스 함수 + Mock 데이터 분리 구조**
  - `/services/post.service.ts`를 두어 UI와 데이터 로직을 분리했습니다.
  - 추후 실제 API 연동 시 서비스 계층만 교체하면 되기때문에 구조적 확장성을 고려하여 구현하였습니다.

## 디렉토리 구조 및 설명

```js
📁 src
├── components/                   # 재사용 가능한 UI 컴포넌트
├── container/                    # 페이지 단위 컨테이너
├── datas/                        # Mock 데이터
├── hooks/                        # 커스텀 훅 모음
│   ...
│   └──  useInfiniteScroll.ts     # IntersectionObserver 기반 무한 스크롤 훅
├── pages/                        # Next.js 라우트 엔트리
│   ├── create/                   # 게시물 작성 페이지
│   ├── post/                     # 게시물 페이지
│   ...
│   └── index.tsx                 # 피드 메인 페이지
├── services/                     # 서비스 계층 (데이터 로직)
│   └── post.service.ts
├── styles/                       # 글로벌 스타일 정의
├── type/                         # 전역 타입 정의
├── utils/                        # 공통 유틸 함수
└── AppStateContext.tsx           # Context API 기반 전역 상태 관리 (User, Post 리스트 등)
```

- `components/`: 순수 UI만 담당하는 레이어. 카드, 버튼, 입력창 등 재사용 가능한 단위 컴포넌트를 정의.

- `container/`: 비즈니스 로직과 UI를 연결하는 역할. 데이터 호출, 상태 제어, 여러 components를 조합하여 페이지 단위 흐름 구현
- `hooks/`: 중복되는 로직을 재사용하기 위해 커스텀 훅으로 분리.
- `services/`: 데이터 로직 전담 계층.
- `AppStateContext.tsx` : 전역 상태 관리의 중심. 사용자 정보와 게시물 리스트를 Context로 제공하여 props drilling 없이 전역 데이터 접근 가능.

## 구현한 기능 목록

### 1) 홈(피드) `/`

- **무한스크롤(IntersectionObserver)** 로 게시물 목록 표시
- **Pull to Refresh (모바일 UX)**
  - 모바일 스크롤 영역에서 당겨서 새로고침(Pull to Refresh) 제스처 지원
- **정렬/카테고리 필터**
- **게시물 카드**
  - 작성자 정보(프로필 이미지, 닉네임), 게시물 내용(텍스트, 이미지, 카테고리, **상대적 작성시간**), 좋아요/리트윗/댓글 수
  - **텍스트 하이라이팅**: 특정 키워드/조건에 따라 강조 스타일 적용
- **상호작용**
  - 상호작용 메타: 좋아요 수, 리트윗수, 댓글수
  - 좋아요/리트윗 토글 (낙관적 업데이트)
- **이미지 뷰어**
  - 카드 이미지 클릭 시 모달로 확대보기
  - 슬라이드(캐러셀) 전환, 페이지네이션/네비게이션 제공
  - 이미지 lazy loading 적용
- **스켈레톤 로딩 적용**

### 2) 게시물 작성 `/create`

- **텍스트 입력 (280자 제한)**
  - 실시간 카운터 표시 (초과 시 0으로 고정 표기)
  - 경고 상태 시 스타일 강조
- **이미지 업로드 (최대 4장)**
  - 미리보기(Blob URL) 제공, 선택 파일 목록 관리
  - 개별 제거/최대치 제한 처리
- **카테고리 선택**
- **등록 및 피드 반영**
  - 성공 시 피드로 이동하여 최신 글이 상단에 노출

### 3) 게시물 상세 `/post/[id]`

- **단일 게시물 조회**
  - 헤더/본문/이미지/상호작용 메타 동일 규격으로 표기
- **댓글 영역(UI)**
  - 댓글 작성 시 Context에 반영하여 새 댓글이 즉시 UI에 반영

### 4) 반응형 및 레이아웃

- `Header`, `Sidebar`, `MobileSidebar`로 반응형 네비게이션 구현
- **상태/뷰포트** 에 따른 동적 스타일 적용

### 5) 코드 품질 포인트

- **관심사 분리**
  - **UI(components) / 페이지 조립(container) / 데이터(services) / 상태 (Context)** 분리
- **재사용성**
  - `useInfiniteScroll`, `useUser`, `usePrototypes` 등 커스텀 훅 추출
  - 이미지 카드/헤더/액션 등 원자적 컴포넌트화
