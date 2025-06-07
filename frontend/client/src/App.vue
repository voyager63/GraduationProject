<template>
  <nav>
    <router-link to="/">메인</router-link>
    <router-link to="/productList">상품 목록</router-link>
    <router-link to="/signup">회원가입</router-link>
    <router-link to="/login">로그인</router-link>
    <router-link to="/logout">로그아웃</router-link>
    <router-link to="/productRegister">상품 등록</router-link>
    <router-link to="/myProducts">내가 등록한 상품</router-link>
    <router-link to="/mySentMessages">보낸 메시지함</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
