<template>
  <div class="signup">
    <h2>회원가입</h2>
    <form @submit.prevent="submitForm">
      <input v-model="form.userId" placeholder="아이디" required />
      <input v-model="form.password" type="password" placeholder="비밀번호" required />
      <input v-model="form.email" type="email" placeholder="이메일" required />
      <input v-model="form.phoneNumber" placeholder="전화번호" required />
      <button type="submit">가입하기</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUpForm',
  data() {
    return {
      form: {
        userId: '',
        password: '',
        email: '',
        phoneNumber: '',
      },
      message: '',
    };
  },
  methods: {
    async submitForm() {
      console.log('폼 제출 완료');
      console.log('폼 데이터:', this.form);

      try {
        const res = await axios.post('http://localhost:3000/api/signUp', this.form);
        this.message = '회원가입 성공';
        console.log('응답:', res.data);
      } catch (err) {
        console.log('오류:', err);
      }
    }
  }
};
</script>