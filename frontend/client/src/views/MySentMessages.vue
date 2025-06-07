<template>
  <div class="my-sent-messages">
    <h2>내가 보낸 메시지</h2>
    <div v-if="messages.length">
      <ul>
        <li v-for="(msg, index) in messages" :key="index">
          <p><strong>상품명:</strong> {{ msg.product_name }}</p>
          <p><strong>가격:</strong> {{ msg.product_price }}원</p>
          <p><strong>보낸 사람:</strong> {{ msg.sender_name }}</p>
          <p><strong>받은 사람:</strong> {{ msg.receiver_name }}</p>
          <p><strong>메시지 내용:</strong> {{ msg.contents }}</p>
          <hr />
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
      alert('로그인이 필요하거나 메시지 조회에 실패했습니다.');
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
</style>