<template>
  <div class="logout">
    <button @click="logout">로그아웃</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogout',
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async logout() {
      try {
        const res = await axios.post('http://localhost:3000/api/logout', {}, {
          withCredentials: true
        });
        this.message = res.data.message;
        console.log('로그아웃 성공');
      } catch (err) {
        console.error('로그아웃 실패:', err);
        this.message = '로그아웃 실패';
      }
    }
  }
};
</script>