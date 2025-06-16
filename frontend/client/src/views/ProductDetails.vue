<template>
  <div class="product-detail">
    <h2>상품 상세 정보</h2>

    <div v-if="product && Object.keys(product).length" class="product-info">
      <img
        :src="getImageUrl(product.product_img)"
        alt="상품 이미지"
        class="product-image"
      />

      <p><strong>상품명:</strong> {{ product.product_name }}</p>
      <p><strong>가격:</strong> {{ product.product_price }}원</p>
      <p><strong>등록자:</strong> {{ product.user_name }}</p>
      <p><strong>품질:</strong> {{ product.product_quality }}</p>
      <p><strong>사용 기간:</strong> {{ product.product_timeUsed }}</p>
      <p><strong>상품 설명:</strong></p>
      <p>{{ product.product_description }}</p>

      <button v-if="isLoggedIn" @click="goToSendMessage">메시지 보내기</button>
      <p v-else>메시지 보내기는 로그인 후에 가능합니다.</p>
    </div>

    <div v-else>
      <p>상품 정보를 불러오고 있습니다..</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetails',
  props: ['id'],
  data() {
    return {
      product: {},
      isLoggedIn: false
    };
  },
  async mounted() {
    try {
      const res = await axios.post('http://localhost:3000/api/getProductDetails', {
        productId: this.id
      });
      this.product = res.data[0];

      const sessionRes = await axios.post(
        'http://localhost:3000/api/checkSession',
        {},
        { withCredentials: true }
      );
      this.isLoggedIn = sessionRes.data.isLoggedIn;
    } catch (err) {
      console.error('상세 정보 조회 실패:', err);
    }
  },
  methods: {
    goToSendMessage() {
      this.$router.push({ name: 'sendMessage', params: { id: this.id } });
    },
    getImageUrl(imgPath) {
      if (!imgPath) return require('@/assets/product_image.png');
      return `http://localhost:3000${imgPath}`;
    }
  }
};
</script>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  font-size: 18px;
}

.product-image {
  max-width: 300px;
  margin-bottom: 20px;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 15px;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>