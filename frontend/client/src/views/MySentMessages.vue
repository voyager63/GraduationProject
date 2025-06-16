<template>
  <div class="my-sent-messages">
    <h2>내가 보낸 메시지</h2>
    <div v-if="messages.length">
      <ul>
        <li v-for="(msg, index) in messages" :key="index" class="message-item">
          <img
            :src="getImageUrl(msg.product_img)"
            alt="상품 이미지"
            class="product-img"
          />
          <div class="message-content">
            <p><strong>상품명:</strong> {{ msg.product_name }}</p>
            <p><strong>가격:</strong> {{ msg.product_price }}원</p>
            <p><strong>보낸 사람:</strong> {{ msg.sender_name }}</p>
            <p><strong>받은 사람:</strong> {{ msg.receiver_name }}</p>
            <p><strong>메시지 내용:</strong> {{ msg.contents }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>보낸 메시지가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MySentMessage',
  data() {
    return {
      messages: []
    };
  },
  async mounted() {
    try {
      const res = await axios.post('http://localhost:3000/api/getMySentMessages', {}, { withCredentials: true });
      this.messages = res.data;
    } catch (err) {
      console.error('메시지 조회 실패:', err);
      alert('로그인이 필요합니다.');
    }
  },
  methods: {
    getImageUrl(imgPath) {
      if (!imgPath) return require('@/assets/product_image.png');
      return `http://localhost:3000${imgPath}`;
    }
  }
};
</script>

<style scoped>
.my-sent-messages {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.message-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #ccc;
}

.product-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid #ddd;
}

.message-content {
  flex: 1;
}
</style>