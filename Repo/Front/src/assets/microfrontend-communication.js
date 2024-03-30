// microfrontend-communication-service.js
window.microfrontendCommunication = (function () {
  const eventSubject = {};

  function sendData(data, type) {
    const event = new CustomEvent(type, { detail: data });
    window.dispatchEvent(event);
  }

  function listenForData(type, callback) {
    window.addEventListener(type, (event) => {
      const data = event.detail;
      callback(data);
    });
  }

  function initializeListener(type) {
    window.addEventListener(type, (event) => {
      const data = event.detail;
      eventSubject[type] = data;
    });
  }

  return {
    sendData: sendData,
    listenForData: listenForData,
    initializeListener: initializeListener
  };
})();

// Define EventType in the global scope
window.EventType = {
  MfeToShell: "microfrontendEventMfeToShell",
  ShellToMfe: "microfrontendEventShellToMfe"
};
