<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">중고 전공서적 거래 시스템</router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">메인</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/productList">상품 목록</router-link>
            </li>
            <li class="nav-item" v-if="!user">
              <router-link class="nav-link" to="/signup">회원가입</router-link>
            </li>
            <li class="nav-item" v-if="!user">
              <router-link class="nav-link" to="/login">로그인</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link class="nav-link" to="/productRegister">상품 등록</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link class="nav-link" to="/myProducts">내 상품</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link class="nav-link" to="/mySentMessages">보낸 메시지함</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link class="nav-link" to="/myReceivedMessages">받은 메시지함</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link class="nav-link" to="/logout">로그아웃</router-link>
            </li>
          </ul>

          <span class="navbar-text" v-if="user">
            {{ user.user_name }}님
          </span>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from './eventBus';

export default {
  name: 'App',
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    await this.checkSession();

    eventBus.on('login-success', this.checkSession);
    eventBus.on('logout-success', () => {
      this.user = null;
    });
  },
  beforeUnmount() {
    eventBus.off('login-success');
    eventBus.off('logout-success');
  },
  methods: {
    async checkSession() {
      try {
        const res = await axios.post('http://localhost:3000/api/checkSession', {}, {
          withCredentials: true
        });

        if (res.data.isLoggedIn) {
          this.user = res.data.user;
        } else {
          this.user = null;
        }
      } catch (error) {
        console.error('세션 확인 오류:', error);
        this.user = null;
      }
    }
  }
};
</script>