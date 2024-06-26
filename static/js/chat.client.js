const form = document.querySelector("form");
const messageList = document.querySelector("ul");
const messageInput = document.querySelector("#messageInput");

const updateHeader = (username) => {
  const chatHeader = document.getElementById("chatHeader");
  if (chatHeader) {
    chatHeader.textContent = `Chat | Usuario: ${username}`;
  }
};

// Enter username and enter chat
Swal.fire({
  title: "Bienvenido al chat! Ingrese su nombre de usuario",
  input: "text",
  confirmButtonText: "Entrar",
  showLoaderOnConfirm: false,
  allowOutsideClick: false,
}).then((result) => {
  if (!result.value) {
    Swal.fire({
      title: "Error!",
      text: "Debes ingresar un nombre de usuario",
      icon: "error",
      confirmButtonText: "Ok",
    }).then(() => {
      window.location.href = "/products";
    });
  } else {
    Swal.fire({
      title: `Bienvenido ${result.value}`,
      icon: "success",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    updateHeader(result.value);
    enterChat(result.value);
  }
});

const enterChat = (username) => {
  const socket = io({
    auth: {
      username,
    },
  });

  // User Conected
  socket.on("new-user", (username) => {
    Swal.fire({
      text: `Bienvenido ${username}`,
      toast: true,
      position: "top-right",
      timer: 2500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  });

  // User Disconected
  socket.on("user-disconnected", (username) => {
    Swal.fire({
      text: `Te vamos a extrañar ${username}! Esperamos que vuelvas pronto`,
      toast: true,
      position: "top-right",
      timer: 2500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  });

  // Send Message Event
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const messageText = messageInput?.value;
    if (messageText) {
      socket.emit("addMessage", {
        username,
        text: messageText,
      });
      form.reset();
    }
  });

  // Get Chat Messages
  socket.on("getMessages", (messages) => {
    messageList.innerHTML = "";
    for (const { username, text } of messages) {
      const li = document.createElement("li");
      li.textContent = `${username}: ${text}`;
      messageList.appendChild(li);
    }
  });
};
