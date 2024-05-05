document.addEventListener("DOMContentLoaded", (event) => {
  const [
    chat,
    headerChat,
    chatMessageCounter,
    chatFeedback,
    sendButton,
    newChatButton,
    chatHistory,
  ] = [
    ".chat",
    "#live-chat #header-chat",
    ".chat-message-counter",
    ".chat .chat-feedback",
    ".chat form .send-button",
    ".chat form .new-chat",
    ".chat-history",
  ].map((s) => $(s));
  const audio = document.getElementById("audio-not");

  let [isToggled, messagesCounter, userChat] = [false, 0, []];
  // let preMessages = ["Hello, Nice to meet you.", "I am chatbot trained in Abubakr data", "I am still learning, so maybe data will mislead, make sure about the information I gave you.", "Important note: If sending messages is not working try to use VPN, if the problem still the same try to contact me to solve this problem"];
  let preMessages = [
    [
      "Hello, it's a pleasure to meet you.",
      "Hi there, delighted to make your acquaintance.",
      "Greetings, I'm glad to meet you.",
    ],
    [
      "I am a chatbot, trained using data from Abubakr.",
      "I'm a chatbot, my training is based on Abubakr's data.",
      "As a chatbot, I've been trained on data provided by Abubakr.",
    ],
    [
      "Please note that I am still in the learning phase, so there may be instances where the data could be misleading. Always verify the information I provide.",
      "Bear in mind that I'm still learning, so the data might not always be accurate. Please double-check any information I give you.",
      "I'm still in the process of learning, so the data might occasionally be incorrect. It's always a good idea to confirm the information I share.",
    ],
    [
      "Important: If you're having trouble sending messages, consider using a VPN. If the issue persists, please don't hesitate to contact me for further assistance.",
      "Important notice: If message sending isn't working, you might want to try using a VPN. If that doesn't solve the problem, feel free to reach out to me for help.",
      "Please note: If you're experiencing issues with sending messages, a VPN could be a solution. If the problem continues, don't hesitate to get in touch with me.",
    ],
  ];

  // Initialize chat
  chat.slideToggle(1, "swing");
  headerChat.css("border-radius", "16px");
  chatMessageCounter.fadeToggle(300, "swing");
  chatFeedback.hide();

  headerChat.on("click", toggleChat);
  sendButton.on("click", sendMessage);
  newChatButton.on("click", resetChat);

  let countMessages = 0;
  let intervalId = setInterval(
    () => displayMessages(preMessages, countMessages++),
    1500
  );

  function toggleChat() {
    chat.slideToggle(300, "swing");
    chatMessageCounter.fadeToggle(300, "swing");
    headerChat.css("border-radius", isToggled ? "16px" : "16px 16px 0 0");
    if (!isToggled) $("#live-chat").css("max-width", "500px");
    isToggled = !isToggled;
    $("#header-chat").toggleClass("opened");
  }

  function addMessage(message, who, picture) {
    const time = new Date().toTimeString().split(" ")[0];
    chatMessageCounter.text(++messagesCounter);
    chatHistory.append(`
      <div class="chat-message clearfix">
        <img src="images/${picture}" alt="" width="48" height="48">
        <div class="chat-message-content clearfix">
          <span class="chat-time">${time}</span>
          <h3>${who}</h3>
          <p>${message}</p>
        </div>
      </div>
      <hr>
    `);
    chatHistory.scrollTop(chatHistory[0].scrollHeight);
    audio.volume = 0.2;
    audio.play();
  }

  function displayMessages(messages, count) {
    if (count < messages.length && messages[count] != "") {
      let message = messages[count];
      if (Array.isArray(messages[count]) && messages[count].length > 0) {
        let randomIndex = Math.floor(Math.random() * messages[count].length);
        message = messages[count][randomIndex];
      }
      if (message != "") {
        addMessage(message, "Abubakr Alsheikh", "AbubakrAlsheikh.jpeg");
      }
    } else {
      clearInterval(intervalId);
    }
  }

  function sendMessage(e) {
    e.preventDefault();
    const userMessage = $('.chat form input[type="text"]').val();
    if (userMessage === "") return;
    sendButton.attr("disabled", true).css("opacity", "0.7");
    chatFeedback.show();
    addMessage(userMessage, "You", "user.jpg");
    $('.chat form input[type="text"]').val("");
    // https://exuberant-book-production.up.railway.app/webhook-1
    fetch("https://abubakralsheikh.pythonanywhere.com/chat-response/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, userchat: userChat }),
    })
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
        let modelResponse = data.response; // Extract the 'response' property

        let count = 0;
        intervalId = setInterval(
            () => displayMessages(modelResponse.split(". "), count++),
            2000
        );
        userChat.push({ role: "user", parts: [{ text: userMessage }] });
        userChat.push({ role: "model", parts: [{ text: modelResponse }] });
    })
      .catch((error) => {
        addMessage(
          "I am sorry, something bad happened, try again. Or try to use VPN, maybe it will fix the problem. If not, try to contact me to fix the problem.",
          "Abubakr Alsheikh",
          "AbubakrAlsheikh.jpeg"
        );
        console.error("Error:", error);
      })
      .finally(() => {
        chatFeedback.hide();
        sendButton.attr("disabled", false).css("opacity", "1");
      });
      // .then((response) => response.text())
      // .then((modelResponse) => {
      //   let count = 0;
      //   intervalId = setInterval(
      //     () => displayMessages(modelResponse.split(". "), count++),
      //     2000
      //   );
      //   userChat.push({ role: "user", parts: [{ text: userMessage }] });
      //   userChat.push({ role: "model", parts: [{ text: modelResponse }] });
      // })
  }
  
  function resetChat(e) {
    e.preventDefault();
    userChat = [];
    chatHistory.text("");
    chatMessageCounter.text(0);
    newChatButton.blur();
  }
});
