<template>
  <div class="send-message">
    <h2>메시지 보내기</h2>

    <div v-if="product && Object.keys(product).length">
      <p><strong>등록자:</strong> {{ product.user_name }}</p>
      <p><strong>상품명:</strong> {{ product.product_name }}</p>
      <p><strong>가격:</strong> {{ product.product_price }}원</p>
      <p><strong>품질:</strong> {{ product.product_quality }}</p>
      <p><strong>사용 기간:</strong> {{ product.product_timeUsed }}</p>

      <textarea v-model="message" placeholder="메시지를 입력하세요..." rows="5"></textarea>
      <br />
      <button @click="sendMessage">전송</button>
    </div>
    <div v-else>
      <p>상품 정보를 불러오는 중입니다...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SendMessage',
  props: ['id'],
  data() {
    return {
      product: {},
      message: ''
    };
  },
  async mounted() {
    try {
      // 세션 확인
      const sessionRes = await axios.post('http://localhost:3000/api/checkSession', {}, { withCredentials: true });
      if (!sessionRes.data.isLoggedIn) {
        alert('로그인이 필요합니다.');
        this.$router.push({ name: 'userLogin' });
        return;
      }

      // 상품 정보 로드
      const res = await axios.post('http://localhost:3000/api/getProductDetails', {
        productId: this.id
      });
      this.product = res.data[0];

    } catch (err) {
      console.error('에러 발생:', err);
    }
  },
  methods: {
    async sendMessage() {
      if (!this.message.trim()) {
        alert('메시지를 입력하세요.');
        return;
      }

      try {
        await axios.post('http://localhost:3000/api/sendMessage', {
          product_id: this.id,
          receiver_id: this.product.user_id,
          contents: this.message
        }, { withCredentials: true });

        alert('메시지를 전송했습니다.');
        this.$router.back();
      } catch (err) {
        console.error('메시지 전송 실패:', err);
        alert('메시지 전송에 실패했습니다.');
      }
    }
  }
};
</script>