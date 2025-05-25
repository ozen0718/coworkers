<h1 align="center">Coworkers</h1>
<p align="center">Coworkers은 업무 배정과 현황 공유를 위한 서비스입니다.</p>

<div style="text-align: center;">
  <a href="https://coworkers-ruddy.vercel.app/">
    
![ReadMe](https://github.com/user-attachments/assets/53fe895b-c4c2-4eaa-98e6-b2e5f353f392)
  </a>
</div>
<p style="text-align: center">
- 개발 기간 : 25.04.16 ~ 25.05.26<br>
- 리팩토링 :
</p>

#  Cowokers는?
[Coworkers]은 업무 배정과 현황 공유를 위한 서비스입니다.
실제 업무 프로세스에 최적화된 To-do 리스트 형태로 업무를 생성하고 공유할 수 있으며, 성과 지표를 시각적으로 확인할 수 있는 기능을 제공합니다. 일관된 UI/UX를 바탕으로 달력, 팝오버, 모달 등 다양한 UI 컴포넌트를 활용하며, 반응형 디자인을 적용해 다양한 기기에서도 최적의 사용성을 보장합니다. 외부 패키지를 적절히 조정하여 사용자 친화적인 인터페이스를 구축함으로써 더욱 편리한 서비스를 제공합니다.



# Team
|이름  |컴포넌트 제작        | 페이지 제작                    |기타                    |                         
|------|---------------------|--------------------------|--------------------------|
|임용균|Button, Gnb, SideMenu profile upload |랜딩 페이지, 비밀번호 재설정, 로그인, 회원가입, 팀 추가|vercel배포, 레포지토리 생성|
|이성준|- useJoinTeamForm, FormField, ProfileUploade, useAddTeamForm  |팀 생성하기, 팀 참여하기, 할 일 리스트 페이지||
|박수연|공통 모달, 할 일 만들기 상세 모달(UI)|팀 수정 페이지 (UI), No-team 페이지, 마이 히스토리 페이지, 계정 설정 페이지, 404 페이지| 페이지 구조 및 레이아웃 세팅,Tanstack Query 초기 세팅프로젝트 운영 문서 관리 (Notion|
|박재현|input, list, teampage-header profile uploadUI |팀 페이지, 팀수정 페이지, 멤버초대 페이지||
|김교연|Card-댓글, Card-상세, Card-자유게시판, ImgUpload,  리스트페이지 - 상세카드|자유게시판, 리스트||

# Skill Stacks

<div>
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/Zustand-FF4154?style=flat-square"/>
<img src="https://img.shields.io/badge/Tanstack Queryr-FF4154?style=flat-square"/>
</div>

# Collaboration

<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/><img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white"/><img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white"/>




# Package Structure

```
src/
├── app/                              # Next.js App Router 루트
│   ├── (pages)/                      # 실제 화면 라우트 그룹
│   │   ├── (auth)/                   # 인증 관련 라우트
│   │   │   ├── invite/                # 팀페이지 초대 수락 페이지
│   │   │   ├── login/                # 로그인 페이지
│   │   │   ├── reset-password/   # 비밀번호 재설정 페이지
│   │   │   ├── signup/               # 회원가입 페이지
│   │   │   │── addteam/              # 팀 생성 페이지
│   │   │   └── layout.tsx            # 인증 관련 페이지 공통 레이아웃
│   │   ├── (main)/                   # 로그인 후 메인 기능 페이지
│   │   │   ├── [teamid]/             # 팀별 대시보드
│   │   │   │   ├── tasklist/         # 할 일 목록
│   │   │   │   └── edit/             # 팀 대시보드 수정 페이지
│   │   │   ├── addteam/            # 팀 생성하기 페이지
│   │   │   ├── boards/               # 자유게시판
│   │   │   ├── join/                    # 팀 참여하기 페이지
│   │   │   ├── myhistory/         # 내가 완료한 할 일 목록 페이지
│   │   │   ├── mypage/               # 계정 설정 페이지
│   │   │   └── noteam/               # 팀 없는 경우 안내 페이지
│   │   └── layout.tsx                    # 페이지 공통 레이아웃
│   └── layout.tsx                    # 공통 레이아웃 (루트)
│
├── components/                       # 재사용 UI 컴포넌트
│   ├── common/                       # 버튼, 모달 등 공통 요소
│   ├── layout/                       # 헤더, 사이드바 등
│   └── ...                                 # 페이지 특화 컴포넌트 등
│
├── constants/
├── context/
├── hooks/
├── lib/
├── stores/
├── styles/
├── utils/
└── utils/
```

# Installation

1. Clone the repository

```bash
git clone https://github.com/FE13-part4-team4
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start dev
npm run dev
```

4. Open the project in your browser

```bash
http://localhost:3000
```
