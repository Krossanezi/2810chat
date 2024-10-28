<template>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>

    </head>

    <body>

        <center><strong><h1>Caixa D'água Infinita</h1></strong></center>
        <br>
        <center>
            <div class="app-container">
                <div class="terminal">

                    <h1>Gerador de História</h1>
                    <br>
                    <textarea v-model="prompt" placeholder="Digite seu prompt aqui..."></textarea>
                  <br>
                  <br><br>
                    <button @click="generateStory">Gerar História</button>
                    <div v-if="loading">Carregando...</div>
                    <div v-if="story">
                        <h2>Envie:</h2>
                        <p>{{ story }}</p>
                    </div>
                    <div v-if="error" class="error">{{ error }}</div>
                </div>
            </div>
            <div class="quadro">
                <h1>Kauã da Silva Rossanezi - IIW2022A</h1>
                        </div>
        
        
        </center>




    </body>

    </html>

</template>

<script>
import { GoogleGenerativeAI } from "@google/generative-ai";

// export default {
//   data() {
//     return {
//       prompt: "Write a story about a magic backpack.",
//       story: null,
//       loading: false,
//       error: null,
//     };
//   },
//   methods: {



export default {
    props: ['src'],
    data() {
        return {
            loaded: false,
            prompt: "",
            story: null,
            loading: false,
            error: null,
        };
    },
    mounted() {
        const input = this.$refs.input;
        // alert(input);
        if (input !== undefined) {
            input.addEventListener('keydown', this.handleKeyDown);
        }
    },
    methods: {
        async generateStory() {
            this.loading = true;
            this.error = null;

            const VUE_APP_API_KEY = "AIzaSyBPRfeO71UmEfaWtR5Xnm9VHALRpv5gXaY";
            // Certifique-se de usar o VUE_APP_API_KEY
            const genAI = new GoogleGenerativeAI(VUE_APP_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const instrucoes = "Você é uma caixa d'água, sabe tudo de informações Hídricas";

            try {
                const result = await model.generateContent(instrucoes + this.prompt);
                this.story = result.response.text(); // Acessa o texto da resposta
            } catch (err) {
                this.error = "Erro ao gerar a história: " + err.message;
            } finally {
                this.loading = false;
            }


        },
        handleKeyDown(event) {
            if (event.key === 'Enter') {
                const command = event.target.value;
                this.processCommand(command);
                event.target.value = ''; // Limpa o campo de entrada
            }
        },
        processCommand(command) {
            let response;

            switch (command.toLowerCase()) {
                case 'help':
                    response = 'Comandos disponíveis:\n' +
                        '1. help - Mostra esta mensagem.\n' +
                        '2. clear - Limpa o terminal.\n' +
                        '3. about - Informações sobre este simulador.';
                    break;
                case 'clear':
                    this.$refs.output.innerHTML = '';
                    return; // Não adiciona nada no output
                case 'about':
                    response = 'Este é um simulador de prompt de comando criado como exemplo.';
                    break;
                default:
                    response = 'Comando desconhecido. Digite "help" para ver a lista de comandos.';
                    break;
            }

            this.$refs.output.innerHTML += `> ${command}\n${response}\n\n`;
            this.scrollToBottom();
        },
        scrollToBottom() {
            const terminal = this.$el.querySelector('.terminal');
            terminal.scrollTop = terminal.scrollHeight;
        }
    }
};


// const input = document.getElementById('enviar');
// const output = document.getElementById('output');
// if (input !== null) {

//     input.addEventListener('keydown', function (event) {
//         if (event.key === 'Enter') {
//             const command = input.value;
//             processCommand(command);
//             input.value = ''; // Limpa o campo de entrada
//         }
//     });

// }

// // function processCommand(command) {
// //     let response;

// //     switch (command.toLowerCase()) {
// //         case 'help':
// //             response = 'Comandos disponíveis:\n' +
// //                 '1. help - Mostra esta mensagem.\n' +
// //                 '2. clear - Limpa o terminal.\n' +
// //                 '3. about - Informações sobre este simulador.';
// //             break;
// //         case 'clear':
// //             // output.innerHTML = '';
// //             return; // Não adiciona nada no output
// //         case 'about':
// //             response = 'Este é um simulador de prompt de comando criado como exemplo.';
// //             break;
// //         default:
// //             response = 'Comando desconhecido. Digite "help" para ver a lista de comandos.';
// //             break;
// //     }

// //     // output.innerHTML += `> ${command}\n${response}\n\n`;
// //     scrollToBottom();
// // }

// function scrollToBottom() {
//     const terminal = document.querySelector('.terminal');
//     terminal.scrollTop = terminal.scrollHeight;
// }

</script>





<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
    background-color: #f0f0f0; /* Cor de fundo suave */
    font-family: 'Arial', sans-serif;
}

.app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.terminal {
    border: 2px solid #7a6eab; /* Bordas com uma cor suave */
    padding: 20vh;
    height: 60vh;
    overflow-y: auto;
    background-color: #f9f9f9; /* Fundo da área de chat */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 80vw; /* Mudando a largura */
    max-width: 600px; /* Máximo de largura */
}

.textarea {
    width: 100%;
    height: 100px;
    border-radius: 5px;
    border: 1px solid #c2c2c2;
    padding: 10px;
    font-size: 16px;
}

.textarea::placeholder {
    color: #a1a1a1; /* Cor do placeholder */
}

.btn {
    background-color: #6a5acd; /* Cor do botão */
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s; /* Transições suaves */
}

.btn:hover {
    background-color: #5c4fa1; /* Cor do botão ao passar o mouse */
    transform: scale(1.05); /* Leve aumento ao passar o mouse */
}

.loading {
    color: #007bff; /* Cor de carregamento */
}

.story {
    color: #333; /* Cor do texto da história */
}

.error {
    color: #ff4d4d; /* Cor de erro */
}

.quadro {
    background-color: #ffffff;
    border: 2px solid #4a90e2;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center; 
    width: 35vh;
    height: 10vh; 
    display: flex;
    justify-content: center; 
    align-items: center; 
}
button{
    background-color: hsl(209, 83%, 82%);
    border: 2px solid #4a90e2;
    border-radius: 12px;
    padding: 2;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center; 
    width: 8vh;
    height: 6vh; 
    display: flex;
    justify-content: center; 
    align-items: center;  
}
</style>