<template>
    <div class="chat-container">
        <h1>Chatbot</h1>
        <textarea v-model="prompt" placeholder="Digite sua mensagem..."></textarea>
        <button @click="sendMessage">Enviar</button>
        <div class="conversation">
            <div v-for="(message, index) in conversation" :key="index" class="message">
                <strong>{{ message.sender }}:</strong> {{ message.text }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const prompt = ref('');
        const conversation = ref([]);

        // Recupera as conversas armazenadas ao montar o componente
        onMounted(() => {
            const savedConversation = localStorage.getItem('conversation');
            if (savedConversation) {
                conversation.value = JSON.parse(savedConversation);
            }
        });

        const sendMessage = () => {
            if (prompt.value.trim() === '') return;

            const userMessage = {
                sender: 'Você',
                text: prompt.value,
            };

            // Adiciona a mensagem do usuário à conversa
            conversation.value.push(userMessage);

            // Simula uma resposta do chatbot (substitua pela lógica real)
            const botMessage = {
                sender: 'Chatbot',
                text: 'Esta é uma resposta simulada.',
            };
            conversation.value.push(botMessage);

            // Armazena a conversa atualizada no localStorage
            localStorage.setItem('conversation', JSON.stringify(conversation.value));

            // Limpa o prompt
            prompt.value = '';
        };

        return {
            prompt,
            conversation,
            sendMessage,
        };
    },
};
</script>

<style>
.chat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    margin: auto;
}

textarea {
    width: 100%;
    height: 100px;
}

button {
    margin-top: 10px;
}

.conversation {
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
    height: 300px;
    overflow-y: auto;
}

.message {
    margin: 5px 0;
}
</style>
