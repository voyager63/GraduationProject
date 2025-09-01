<template>
  <div class="my-received-messages">
    <h2>내가 받은 메시지</h2>
    <div v-if="messages.length">
      <ul>
        <li v-for="msg in messages" :key="msg.message_id" class="message-item">
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

            <div class="message-actions">
              <template v-if="msg.request === 1">
                <button @click="respond(msg.message_id, 'accepted')">수락</button>
                <button @click="respond(msg.message_id, 'rejected')">거절</button>
              </template>
              <template v-else>
                <button @click="deleteMessage(msg.message_id)">삭제</button>
              </template>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>받은 메시지가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyReceivedMessages',
  data() {
    return {
      messages: []
    };
  },
  async mounted() {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/getMyReceivedMessages',
        {},
        { withCredentials: true }
      );
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
    },
    async respond(messageId, action) {
      try {
        await axios.post(
          `http://localhost:3000/api/messages/${messageId}/respond`,
          { action },
          { withCredentials: true }
        );
        alert(action === 'accepted' ? '메시지를 수락했습니다.' : '메시지를 거절했습니다.');
        this.messages = this.messages.filter(msg => msg.message_id !== messageId);
      } catch (err) {
        console.error('응답 실패:', err);
        alert('처리 중 오류가 발생했습니다.');
      }
    },
    async deleteMessage(messageId) {
      try {
        await axios.post(
          'http://localhost:3000/api/deleteMessageCompletely',
          { messageId },
          { withCredentials: true }
        );
        this.messages = this.messages.filter(msg => msg.message_id !== messageId);
        alert('메시지가 삭제되었습니다.');
      } catch (err) {
        console.error('삭제 실패:', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  }
};
</script>

<style scoped>
.my-received-messages {
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

/* 버튼 스타일 */
.message-actions {
  margin-top: 10px;
}
.message-actions button {
  margin-right: 10px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}
.message-actions button:hover {
  background-color: #0056b3;
}
.message-actions button:last-child {
  background-color: #dc3545;
}
.message-actions button:last-child:hover {
  background-color: #a71d2a;
}
</style>