<template>
    <div class="chat-container">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        <p>{{ msg.sender }}: {{ msg.text }}</p>
      </div>
      <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Digite sua mensagem" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { apiService } from "@/services/apiService"; // Supondo que você tenha um serviço para se comunicar com a API
  
  export default {
    name: "Chatbot",
    setup() {
      const messages = ref([]);
      const userMessage = ref("");
  
      // Carregar histórico do localStorage
      onMounted(() => {
        const savedMessages = localStorage.getItem("chat-history");
        if (savedMessages) {
          messages.value = JSON.parse(savedMessages);
        }
      });
  
      // Função para enviar a mensagem do usuário e obter a resposta do chatbot
      const sendMessage = async () => {
        if (userMessage.value.trim()) {
          messages.value.push({ sender: "User", text: userMessage.value });
          const response = await apiService.getResponse(userMessage.value);
          messages.value.push({ sender: "Chatbot", text: response });
  
          // Salvar o histórico no localStorage
          localStorage.setItem("chat-history", JSON.stringify(messages.value));
  
          userMessage.value = ""; // Limpar a mensagem do usuário
        }
      };
  
      return { messages, userMessage, sendMessage };
    }
  };
  </script>
  
  <style>
  .chat-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-top: 10px;
  }
  </style>
  