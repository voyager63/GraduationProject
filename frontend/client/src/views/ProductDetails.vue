<template>
  <div class="product-detail">
    <h2>상품 상세 정보</h2>
    <div v-if="product && Object.keys(product).length">
      <p><strong>상품명:</strong> {{ product.product_name }}</p>
      <p><strong>가격:</strong> {{ product.product_price }}원</p>
      <p><strong>등록자:</strong> {{ product.user_name }}</p>
      <p><strong>품질:</strong> {{ product.product_quality }}</p>
      <p><strong>사용 기간:</strong> {{ product.product_timeUsed }}</p>
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
      product: {}
    };
  },
  async mounted() {
    try {
      const res = await axios.post('http://localhost:3000/api/getProductDetails', {
        productId: this.id
      });
      this.product = res.data[0];
    } catch (err) {
      console.error('상세 정보 조회 실패:', err);
    }
  }
};
</script>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}
</style>