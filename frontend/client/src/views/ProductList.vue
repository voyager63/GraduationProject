<template>
  <div class="container px-2 mt-4">
    <h2 class="mb-4">상품 목록</h2>
    <div class="row gx-2 gy-3">
      <div class="col-6 col-md-3" v-for="(product, index) in products" :key="index">
        <div
          class="card h-100"
          style="width: 220px; height: 300px; font-size: 0.9rem;"
        >
          <img
            :src="getImageUrl(product.product_img)"
            class="card-img-top"
            alt="상품 이미지"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.product_name }}</h5>
            <p class="card-text">{{ product.product_price }}원</p>
            <button class="btn btn-primary" @click="goToDetails(product.product_id)">
              상세 정보
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-if="!products.length" class="mt-4 text-muted">상품이 없습니다.</p>
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
      alert('상품 목록을 불러올 수 없습니다.');
    }
  },
  methods: {
    goToDetails(productId) {
      this.$router.push({ name: 'productDetails', params: { id: productId } });
    },
    getImageUrl(imgPath) {
      if (!imgPath) return require('@/assets/product_image.png');
      return `http://localhost:3000${imgPath}`;
    }
  }
};
</script>