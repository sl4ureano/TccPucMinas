class ExternalComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div>Componente personalizado externo elemento personalizado</div>
      <button id="myBtn">Click Aqui</button>
      <div id="receivedDataLabel"></div>
    `;

    // Adiciona um event listener para o clique no botão
    this.querySelector('#myBtn').addEventListener('click', () => {
      microfrontendCommunication.sendData({ message: "Hello from button custom-element" }, EventType.MfeToShell);
    });

    microfrontendCommunication.sendData({ message: "Hello from custom-element" }, EventType.MfeToShell);

    microfrontendCommunication.initializeListener(EventType.ShellToMfe);

    // Example listening for data
    microfrontendCommunication.listenForData(EventType.ShellToMfe, (data) => {
      console.log("Received data in shell:", data);
       // Atualiza o elemento com o valor recebido
       document.getElementById('receivedDataLabel').textContent = `Valor Recebido: ${data.message}`;
    });
  }
}

// Estilos CSS para o botão
const buttonStyles = `
  #myBtn {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 10px;
  }
`;

// Cria um elemento de estilo e adiciona os estilos do botão
const styleElement = document.createElement('style');
styleElement.innerHTML = buttonStyles;

// Adiciona o estilo ao head do documento
document.head.appendChild(styleElement);

customElements.define('custom-element', ExternalComponent);
