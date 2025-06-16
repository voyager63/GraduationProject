<template>
  <div class="send-message">
    <h2>메시지 보내기</h2>

    <div v-if="product && Object.keys(product).length" class="message-content">
      <img
        :src="getImageUrl(product.product_img)"
        alt="상품 이미지"
        class="product-image"
      />

      <p><strong>등록자:</strong> {{ product.user_name }}</p>
      <p><strong>상품명:</strong> {{ product.product_name }}</p>
      <p><strong>가격:</strong> {{ product.product_price }}원</p>
      <p><strong>품질:</strong> {{ product.product_quality }}</p>
      <p><strong>사용 기간:</strong> {{ product.product_timeUsed }}</p>
      <p><strong>상품 설명:</strong></p>
      <p>{{ product.product_description }}</p>

      <textarea
        v-model="message"
        placeholder="메시지를 입력하세요..."
        rows="5"
        class="message-box"
      ></textarea>

      <button @click="sendMessage" class="send-button">전송</button>
      <p v-if="successMessage">{{ successMessage }}</p>
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
      message: '',
      successMessage: ''
    };
  },
  async mounted() {
    try {
      const sessionRes = await axios.post(
        'http://localhost:3000/api/checkSession',
        {},
        { withCredentials: true }
      );
      if (!sessionRes.data.isLoggedIn) {
        alert('로그인이 필요합니다.');
        this.$router.push({ name: 'userLogin' });
        return;
      }

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
        await axios.post(
          'http://localhost:3000/api/sendMessage',
          {
            product_id: this.id,
            receiver_id: this.product.user_id,
            contents: this.message
          },
          { withCredentials: true }
        );

        this.successMessage = '메시지 전송 완료';
        this.message = ''; // 메시지 입력창 비우기
      } catch (err) {
        console.error('메시지 전송 실패:', err);
        alert('메시지 전송에 실패했습니다.');
      }
    },
    getImageUrl(imgPath) {
      if (!imgPath) return require('@/assets/product_image.png');
      return `http://localhost:3000${imgPath}`;
    }
  }
};
</script>

<style scoped>
.send-message {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  font-size: 18px;
}

.product-image {
  max-width: 300px;
  margin-bottom: 20px;
}

.message-box {
  width: 100%;
  margin: 20px 0;
  padding: 10px;
  font-size: 16px;
}

.send-button {
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
}

.send-button:hover {
  background-color: #0056b3;
}

</style>