<template>
  <div class="login">
    <h2>로그인</h2>
    <form @submit.prevent="submitForm">
      <input v-model="form.userId" placeholder="아이디" required />
      <input v-model="form.password" type="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '../eventBus';

export default {
  name: 'UserLogin',
  data() {
    return {
      form: {
        userId: '',
        password: '',
      },
      message: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const res = await axios.post('http://localhost:3000/api/login', this.form, {
          withCredentials: true,
        });

        this.message = '로그인 성공';
        console.log('로그인 성공:', res.data);

        eventBus.emit('login-success');
        this.$router.push('/');
      } catch (err) {
        console.error('에러:', err);
        const serverMsg = err.response?.data?.message;
        this.message = '로그인 실패: ' + (serverMsg || '서버 오류');
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

input,
button {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>