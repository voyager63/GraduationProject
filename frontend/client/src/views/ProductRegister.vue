<template>
  <div class="product-register">
    <h2>{{ id ? '상품 수정' : '상품 등록' }}</h2>
    <form @submit.prevent="submitProduct" enctype="multipart/form-data">
      <input v-model="product.name" placeholder="상품명" required />
      <input v-model="product.price" type="number" placeholder="가격" required />
      <input v-model="product.quality" placeholder="품질" required />
      <input v-model="product.timeUsed" placeholder="사용 기간" required />
      <textarea v-model="product.description" placeholder="상품 설명" rows="4"></textarea>

      <label class="file-label">
        사진 첨부:
        <input type="file" @change="handleFileChange" accept="image/*" />
      </label>

      <button type="submit">{{ id ? '수정하기' : '등록하기' }}</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductRegister',
  props: {
    id: { type: Number, default: null } // router params에서 전달됨
  },
  data() {
    return {
      product: {
        name: '',
        price: '',
        quality: '',
        timeUsed: '',
        description: '',
        imagePath: ''
      },
      imageFile: null,
      message: ''
    };
  },
  async mounted() {
    if (this.id) {
      // 수정 모드: 기존 상품 정보 불러오기
      try {
        const res = await axios.post(
          'http://localhost:3000/api/getProductDetails',
          { productId: this.id },
          { withCredentials: true }
        );
        const data = res.data[0];
        this.product.name = data.product_name;
        this.product.price = data.product_price;
        this.product.quality = data.product_quality;
        this.product.timeUsed = data.product_timeUsed;
        this.product.description = data.product_description;
        this.product.imagePath = data.product_img; // 기존 이미지 경로
      } catch (err) {
        console.error(err);
        this.message = '상품 정보를 불러올 수 없습니다.';
      }
    }
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
        if (this.imageFile) formData.append('image', this.imageFile);

        let url = 'http://localhost:3000/api/registerProduct';
        if (this.id) {
          // 수정 모드
          formData.append('productId', this.id);
          formData.append('imagePath', this.product.imagePath); // 기존 이미지 유지용
          url = 'http://localhost:3000/api/updateProduct';
        }

        await axios.post(url, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        this.message = this.id ? '상품 수정 성공' : '상품 등록 성공';
      } catch (err) {
        console.error(err);
        this.message = '상품 등록/수정 실패: ' + (err.response?.data?.message || '서버 오류');
      }
    }
  }
};
</script>

<style scoped>
.product-register {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input,
textarea,
button {
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.file-label {
  width: 100%;
  text-align: left;
  margin-bottom: 15px;
}
</style>