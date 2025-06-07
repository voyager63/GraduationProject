<template>
  <div class="product-detail">
    <h2>상품 상세 정보</h2>
    <div v-if="product && Object.keys(product).length">
      <p><strong>상품명:</strong> {{ product.product_name }}</p>
      <p><strong>가격:</strong> {{ product.product_price }}원</p>
      <p><strong>등록자:</strong> {{ product.user_name }}</p>
      <p><strong>품질:</strong> {{ product.product_quality }}</p>
      <p><strong>사용 기간:</strong> {{ product.product_timeUsed }}</p>

      <button v-if="isLoggedIn" @click="goToSendMessage">메시지 보내기</button>
      <p v-else>메시지 보내기는 로그인 후 이용 가능합니다.</p>
    </div>
    <div v-else>
      <p>상품 정보를 불러오는 중입니다...</p>
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

      // 세션을 통한 로그인 여부 확인
      const sessionRes = await axios.post('http://localhost:3000/api/checkSession', {}, { withCredentials: true });
      this.isLoggedIn = sessionRes.data.isLoggedIn;
    } catch (err) {
      console.error('상세 정보 조회 실패 또는 로그인 확인 실패:', err);
    }
  },
  methods: {
    goToSendMessage() {
      this.$router.push({ name: 'sendMessage', params: { id: this.id } });
    }
  }
};
</script>