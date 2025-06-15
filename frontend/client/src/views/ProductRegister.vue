<template>
  <div class="product-register">
    <h2>상품 등록</h2>
    <form @submit.prevent="submitProduct">
      <input v-model="product.name" placeholder="상품명" required />
      <input v-model="product.price" type="number" placeholder="가격" required />
      <input v-model="product.quality" placeholder="품질" required />
      <input v-model="product.timeUsed" placeholder="사용 기간" required />
      <textarea v-model="product.description" placeholder="상품 설명" rows="4"></textarea>
      
      <button type="submit">등록하기</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductRegister',
  data() {
    return {
      product: {
        name: '',
        price: '',
        quality: '',
        timeUsed: '',
        description: ''
      },
      message: ''
    };
  },
  methods: {
    async submitProduct() {
      try {
        const res = await axios.post(
          'http://localhost:3000/api/productRegister',
          {
            name: this.product.name,
            price: this.product.price,
            quality: this.product.quality,
            timeUsed: this.product.timeUsed,
            description: this.product.description
          },
          { withCredentials: true }
        );
        this.message = '상품이 성공적으로 등록되었습니다!';
        console.log(res.data);
      } catch (err) {
        console.error(err);
        this.message = '상품 등록 실패: ' + (err.response?.data?.message || '서버 오류');
      }
    }
  }
};
</script>

<style scoped>
.product-register {
  max-width: 400px;
  margin: 0 auto;
}
input, textarea, button {
  display: block;
  margin: 10px auto;
  width: 100%;
}
</style>