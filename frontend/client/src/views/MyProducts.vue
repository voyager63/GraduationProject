<template>
  <div class="my-products">
    <h2>내가 등록한 상품</h2>
    <div v-if="products.length === 0">등록한 상품이 없습니다.</div>
    <ul v-else>
      <li
        v-for="(product, index) in products"
        :key="product.product_id"
        style="display: flex; align-items: center;"
      >
        <img
          :src="getImageUrl(product.product_img)"
          alt="상품 이미지"
          style="width: 100px; height: 100px; object-fit: cover; margin-right: 15px;"
        />
        <div>
          <p><strong>{{ index + 1 }}. 상품명:</strong> {{ product.product_name }}</p>
          <p><strong>가격:</strong> {{ product.product_price }}원</p>
          <p><strong>품질:</strong> {{ product.product_quality }}</p>
          <p><strong>사용 기간:</strong> {{ product.product_timeUsed }}</p>
          <button @click="editProduct(product.product_id)">수정</button>
          <button @click="deleteProduct(product.product_id)">삭제</button>
        </div>
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
      this.message = '상품 목록을 불러올 수 없습니다.';
      console.error(err);
    }
  },
  methods: {
    getImageUrl(imgPath) {
      if (!imgPath) return require('@/assets/product_image.png');
      return `http://localhost:3000${imgPath}`;
    },
    async deleteProduct(productId) {
      if (!confirm('정말 이 상품을 삭제하시겠습니까?')) return;
      try {
        await axios.post('http://localhost:3000/api/deleteProduct', { productId }, { withCredentials: true });
        this.products = this.products.filter(p => p.product_id !== productId);
        this.message = '상품 삭제 성공';
      } catch (err) {
        this.message = '상품 삭제 실패';
        console.error(err);
      }
    },
    editProduct(productId) {
      // params 방식으로 이동
      this.$router.push({
        name: 'productRegister',
        params: { id: productId }
      });
    }
  }
};
</script>

<style scoped>
.my-products {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.my-products > h2 {
  text-align: left;
  padding-left: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  width: 90%;
  max-width: 600px;
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  text-align: left;
}

button {
  margin-left: 10px;
  background-color: crimson;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:first-of-type {
  background-color: steelblue;
}
</style>