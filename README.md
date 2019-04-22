# **42Page** - client & server

## **Why**
종종 책을 읽을 때 마음에 드는 구절을 보면 사진을 찍거나 적는 식으로 기록을 해 두었습니다. 
적으면 시간이 오래 걸리고, 사진을 찍으면 가독성 때문에 잘 보지 않는 경우가 생겨 이런 불편함을 해결할 수 없을까 생각하다가 42page 어플리케이션을 프로젝트로 고안하게 되었습니다. 또한 저는 관심있는 단어를 바탕으로 책을 고르는 편인데, 저와 같은 단어에 관심이 있는 사람들은 어떤 책을 읽을까 궁금하였는데, 이와같은 문제점과 호기심을 기반으로 42Page라는 어플리케이션을 만들게 되었습니다.


## **Preview**
![preview](https://github.com/hiiiii11/42Page-client/blob/master/src/42page-gif.gif)


## **Features**

- 로그인, 회원 인증
- 카메라 또는 사진앨범에서 사진 선택 후, 그리드로 영역 설정
- 사진 파일에서 지정된 영역 텍스트로 변환
- 텍스트로 변환한 메모에 책 정보, 메모 입력
- 메모 CRUD 기능
- 사용자 전체 메모 피드 최신순으로 보기 제공
- 사용자 프로필별 모든 메모, 책 메모 보기 제공
- 사용자의 상위 50개 키워드, Wordcloud 형태로 보기 제공
- 관심있는 키워드를 가지고 있는 사용자 검색

## **Installation**

**Client**

```
git clone https://github.com/hiiiii11/42Page-client.git
cd 42Page-client
npm install
npm start
```

**Server**

```
git clone https://github.com/hiiiii11/42Page-server.git
cd 42Page-server
npm install
npm start
```

------



## **Skills**

**1. Client Side**

* ES2015 +
* React, Create-React-App
* Redux
* React Router
* HTTP request using Axios
* Firebase Authentication
* API : Google Vision API / Kakao Books API / ETRI AI 형태소 분석 API
* Jest and Enzyme for Unit-test

**2. Server side**

* Express
* Node.js
* JSON Web Token Authentication
* Mongoose
* Mongo DB, Atlas

------



## **Version Control**

* Git, Github
* Trello를 이용한 일정관리

------

## **Deployment**

* **Client** : Netlify 서비스 이용하여 client 배포
* **Server**: AWS Elastic Beanstalk


------

## **Things to do**

* ~~AWS로 배포한 서버 https 연결~~
* 로딩 화면 
* 에러 처리
* Circle CI
* Component Unit Test
* Server Api Unit Test
* Integration Test
* 메모별 좋아요, 댓글 기능



## **Sincere Thanks**

[Ken Huh](https://github.com/ken123777 "ken huh") / Vanilla Coding 
