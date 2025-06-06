<template>
  <div class="product-list">
    <h2>상품 목록</h2>
    <ul v-if="products.length">
      <li v-for="(product, index) in products" :key="index">
        <p><strong>상품명:</strong> {{ product.product_name }}</p>
        <p><strong>가격:</strong> {{ product.product_price }}원</p>
        <p><strong>등록자:</strong> {{ product.user_name }}</p>
        <button @click="goToDetails(product.product_id)">상세 정보</button>
        <hr />
      </li>
    </ul>
    <p v-else>상품이 없습니다.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductList',
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    try {
      const res = await axios.post('http://localhost:3000/api/productList');
      this.products = res.data;
    } catch (err) {
      console.error('상품 목록 조회 실패:', err);
      alert('상품 목록을 불러오는 데 실패했습니다.');
    }
  },
  methods: {
    goToDetails(productId) {
      this.$router.push({ name: 'productDetails', params: { id: productId } });
    }
  }
};
</script>