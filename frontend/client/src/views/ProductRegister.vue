<template>
  <div class="product-register">
    <h2>상품 등록</h2>
    <form @submit.prevent="submitProduct" enctype="multipart/form-data">
      <input v-model="product.name" placeholder="상품명" required />
      <input v-model="product.price" type="number" placeholder="가격" required />
      <input v-model="product.quality" placeholder="품질" required />
      <input v-model="product.timeUsed" placeholder="사용 기간" required />
      <textarea v-model="product.description" placeholder="상품 설명" rows="4"></textarea>
      <label>
        사진 첨부:
      <input type="file" @change="handleFileChange" accept="image/*" />
      </label>

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
      imageFile: null,
      message: ''
    };
  },
  methods: {
    handleFileChange(event) {
      this.imageFile = event.target.files[0];
    },
    async submitProduct() {
      try {
        const formData = new FormData();
        formData.append('name', this.product.name);
        formData.append('price', this.product.price);
        formData.append('quality', this.product.quality);
        formData.append('timeUsed', this.product.timeUsed);
        formData.append('description', this.product.description);
        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }

        const res = await axios.post(
          'http://localhost:3000/api/registerProduct',
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
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