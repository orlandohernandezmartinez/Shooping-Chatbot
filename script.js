let countingInterval;
let seconds = 0;

document.addEventListener("DOMContentLoaded", function () {
  const micBtn = document.getElementById('mic-btn');

  // Escuchar los eventos mousedown y mouseup en el botón del micrófono
  micBtn.addEventListener('mousedown', startCounting);
  micBtn.addEventListener('mouseup', stopCounting);

  // Para manejar el caso en el que el usuario haga un click muy rápido (mismo evento mouseup)
  micBtn.addEventListener('mouseleave', stopCounting); 
});

function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  if (chatbot.style.display === 'none' || chatbot.style.display === '') {
    chatbot.style.display = 'flex';
  } else {
    chatbot.style.display = 'none';
  }
}

function toggleSendButton() {
  const input = document.getElementById('user-input').value;
  const sendBtn = document.getElementById('send-btn');
  if (input.trim().length > 0) {
    sendBtn.disabled = false;
  } else {
    sendBtn.disabled = true;
  }
}

function handleEnter(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendPreloadedMessage(message) {
  sendMessage(message);
}

function sendMessage(preloadedMessage = null) {
  const input = document.getElementById('user-input');
  const chatBody = document.getElementById('chat-body');

  let messageText = preloadedMessage ? preloadedMessage : input.value.trim();

  if (messageText.length > 0) {
    // Eliminar el mensaje inicial y los botones de mensajes precargados
    const initialMessage = document.getElementById('initial-message');
    if (initialMessage) {
      initialMessage.remove();
    }

    // Agregar el mensaje del usuario alineado a la derecha
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = messageText;
    chatBody.appendChild(userMessage);

    // Limpiar el input
    input.value = '';
    toggleSendButton();

    // Responder con un mensaje genérico alineado a la izquierda
    setTimeout(() => {
      const botMessage = document.createElement('div');
      botMessage.className = 'bot-message';
      botMessage.textContent = 'Message received';
      chatBody.appendChild(botMessage);

      // Desplazar hacia abajo para ver el nuevo mensaje
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
  }
}

function restartChat() {
  const chatBody = document.getElementById('chat-body');
  chatBody.innerHTML = `
    <div id="initial-message">
      <p>Hi, I'm your shopping assistant. I can help you with...</p>
      <div class="preloaded-messages">
        <button onclick="sendPreloadedMessage('Help me find a gift')">Help me find a gift</button>
        <button onclick="sendPreloadedMessage('I want vegan products')">I want vegan products</button>
        <button onclick="sendPreloadedMessage('I am looking for running shoes')">I am looking for running shoes</button>
      </div>
    </div>
  `;
}

function startCounting() {
  const micBtn = document.getElementById('mic-btn');
  const micIcon = micBtn.querySelector('i');
  const userInput = document.getElementById('user-input');

  // Cambiar el ícono del micrófono a rojo y el botón activo
  micBtn.classList.add('active');
  micIcon.style.color = 'red';  // Cambiar el ícono a rojo

  // Iniciar el contador solo si no está ya corriendo
  if (!countingInterval) {
    countingInterval = setInterval(() => {
      seconds++;
      userInput.value = formatSeconds(seconds);  // Mostrar el contador en el input
      userInput.classList.add('active');  // Aplicar estilo activo al input
    }, 1000);
  }
}

function stopCounting() {
  const micBtn = document.getElementById('mic-btn');
  const micIcon = micBtn.querySelector('i');
  const userInput = document.getElementById('user-input');

  // Detener el contador
  if (countingInterval) {
    clearInterval(countingInterval);
    countingInterval = null;  // Reiniciar el intervalo para evitar múltiples inicios
    seconds = 0;
  }

  // Restaurar el estado inicial del ícono y el input
  micBtn.classList.remove('active');
  micIcon.style.color = 'white';  // Restaurar el ícono a blanco
  userInput.value = '';  // Limpiar el input
  userInput.classList.remove('active');  // Remover el estilo activo del input
}

function formatSeconds(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;  // Formato mm:ss
}

function sendMessage(preloadedMessage = null) {
  const input = document.getElementById('user-input');
  const chatBody = document.getElementById('chat-body');

  let messageText = preloadedMessage ? preloadedMessage : input.value.trim();

  if (messageText.length > 0) {
    // Eliminar el mensaje inicial y los botones de mensajes precargados
    const initialMessage = document.getElementById('initial-message');
    if (initialMessage) {
      initialMessage.remove();
    }

    // Agregar el mensaje del usuario alineado a la derecha
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = messageText;
    chatBody.appendChild(userMessage);

    // Limpiar el input
    input.value = '';
    toggleSendButton();

    // Verificar si el mensaje del usuario contiene las palabras clave
    const keywords = ['imagen', 'foto', 'producto'];
    const containsKeyword = keywords.some(keyword => messageText.toLowerCase().includes(keyword));

    if (containsKeyword) {
      // Responder con el mensaje y renderizar el cuadro del producto
      setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.textContent = 'Este es el producto que buscas?';
        chatBody.appendChild(botMessage);

        // Crear el cuadro del producto
        const productBox = document.createElement('div');
        productBox.style.width = '100px';
        productBox.style.height = '100px';
        productBox.style.backgroundColor = '#BABABA';
        productBox.style.marginTop = '10px';
        productBox.style.borderRadius = '5px';  // Añadir bordes redondeados, si lo deseas
        chatBody.appendChild(productBox);

        // Desplazar hacia abajo para ver el nuevo mensaje
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 500);
    } else {
      // Si no hay palabra clave, responde con un mensaje genérico
      setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.textContent = 'Message received';
        chatBody.appendChild(botMessage);

        // Desplazar hacia abajo para ver el nuevo mensaje
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 500);
    }
  }
}

// Variable global para la cantidad del producto
let productQuantity = 1;

document.addEventListener("DOMContentLoaded", function () {
  const micBtn = document.getElementById('mic-btn');

  // Escuchar los eventos mousedown y mouseup en el botón del micrófono
  micBtn.addEventListener('mousedown', startCounting);
  micBtn.addEventListener('mouseup', stopCounting);

  // Para manejar el caso en el que el usuario haga un click muy rápido (mismo evento mouseup)
  micBtn.addEventListener('mouseleave', stopCounting); 
});

// Función para cambiar a la vista del producto
function showProductView() {
  const chatBody = document.getElementById('chat-body');
  chatBody.innerHTML = `
    <div class="product-view">
      <button class="back-btn" onclick="backToChat()">← Back</button>
      <div class="product-box" style="background-color: #FFFFFF; width: 300px; height: 300px;"></div>
      <p class="product-name">Nombre del producto</p>
      <p class="product-price">$123.00</p>
      <p class="product-description-heading">Descripción</p>
      <p class="product-description-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Nulla facilisi. Sed cursus ante dapibus diam.</p>
      <div class="quantity-section">
        <span class="quantity-label">Quantity</span>
        <div class="quantity-btns">
          <button class="quantity-btn" onclick="decreaseQuantity()">-</button>
          <span id="quantity-value">${productQuantity}</span>
          <button class="quantity-btn" onclick="increaseQuantity()">+</button>
        </div>
      </div>
      <button class="add-to-cart-btn">Add to cart</button>
    </div>
  `;
}

// Función para regresar a la vista principal del chatbot
function backToChat() {
  const chatBody = document.getElementById('chat-body');
  chatBody.innerHTML = `
    <div id="initial-message">
      <p>Hi, I'm your shopping assistant. I can help you with...</p>
      <div class="preloaded-messages">
        <button onclick="sendPreloadedMessage('Help me find a gift')">Help me find a gift</button>
        <button onclick="sendPreloadedMessage('I want vegan products')">I want vegan products</button>
        <button onclick="sendPreloadedMessage('I\'m looking for running shoes')">I'm looking for running shoes</button>
      </div>
    </div>
  `;
}

// Función para aumentar la cantidad del producto
function increaseQuantity() {
  productQuantity++;
  document.getElementById('quantity-value').textContent = productQuantity;
}

// Función para disminuir la cantidad del producto
function decreaseQuantity() {
  if (productQuantity > 1) {
    productQuantity--;
    document.getElementById('quantity-value').textContent = productQuantity;
  }
}

// Modifica la función de renderización del cuadro del producto para que sea clicable
function sendMessage(preloadedMessage = null) {
  const input = document.getElementById('user-input');
  const chatBody = document.getElementById('chat-body');

  let messageText = preloadedMessage ? preloadedMessage : input.value.trim();

  if (messageText.length > 0) {
    // Eliminar el mensaje inicial y los botones de mensajes precargados
    const initialMessage = document.getElementById('initial-message');
    if (initialMessage) {
      initialMessage.remove();
    }

    // Agregar el mensaje del usuario alineado a la derecha
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = messageText;
    chatBody.appendChild(userMessage);

    // Limpiar el input
    input.value = '';
    toggleSendButton();

    // Verificar si el mensaje del usuario contiene las palabras clave
    const keywords = ['imagen', 'foto', 'producto'];
    const containsKeyword = keywords.some(keyword => messageText.toLowerCase().includes(keyword));

    if (containsKeyword) {
      // Responder con el mensaje y renderizar el cuadro del producto
      setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.textContent = 'Este es el producto que buscas?';
        chatBody.appendChild(botMessage);

        // Crear el cuadro del producto clicable
        const productBox = document.createElement('div');
        productBox.style.width = '100px';
        productBox.style.height = '100px';
        productBox.style.backgroundColor = '#BABABA';
        productBox.style.marginTop = '10px';
        productBox.style.borderRadius = '5px';
        productBox.style.cursor = 'pointer';  // Hacer el cuadro clicable
        productBox.onclick = showProductView;  // Abrir la vista de producto al hacer clic
        chatBody.appendChild(productBox);

        // Desplazar hacia abajo para ver el nuevo mensaje
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 500);
    } else {
      // Si no hay palabra clave, responde con un mensaje genérico
      setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.textContent = 'Message received';
        chatBody.appendChild(botMessage);

        // Desplazar hacia abajo para ver el nuevo mensaje
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 500);
    }
  }
}