<template>
  <div class="my-products">
    <h2>내가 등록한 상품</h2>
    <div v-if="products.length === 0">등록한 상품이 없습니다.</div>
    <ul v-else>
      <li v-for="(product, index) in products" :key="product.product_id">
        <p><strong>{{ index + 1 }}. 상품명:</strong> {{ product.product_name }}</p>
        <p><strong>가격:</strong> {{ product.product_price }}원</p>
        <p><strong>품질:</strong> {{ product.product_quality }}</p>
        <p><strong>사용 기간:</strong> {{ product.product_timeUsed }}</p>
        <button @click="deleteProduct(product.product_id)">삭제</button>
        <hr />
</li>
    </ul>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyProducts',
  data() {
    return {
      products: [],
      message: ''
    };
  },
  async mounted() {
    try {
      const res = await axios.post('http://localhost:3000/api/getMyProducts', {}, { withCredentials: true });
      this.products = res.data;
    } catch (err) {
      this.message = '상품을 불러오는 데 실패했습니다.';
      console.error(err);
    }
  },
  methods: {
    async deleteProduct(productId) {
      if (!confirm('이 상품을 삭제하시겠습니까?')) return;
      try {
        await axios.post('http://localhost:3000/api/deleteProduct', { productId }, { withCredentials: true });
        this.products = this.products.filter(p => p.product_id !== productId);
        this.message = '상품이 삭제되었습니다.';
      } catch (err) {
        this.message = '상품 삭제 실패';
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.my-products {
  padding: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
button {
  margin-left: 10px;
  background-color: crimson;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>