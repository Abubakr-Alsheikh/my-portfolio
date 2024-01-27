document.addEventListener("DOMContentLoaded", (event) => {
  // Live chat
  $(".chat").slideToggle(1, "swing");
  $("#live-chat #header-chat").css("border-radius", "16px");
  $(".chat-message-counter").fadeToggle(300, "swing");
  $(".chat .chat-feedback").hide();

  var isToggled = false;
  $("#live-chat #header-chat").on("click", function () {
    $(".chat").slideToggle(300, "swing");
    $(".chat-message-counter").fadeToggle(300, "swing");

    if (isToggled) {
      $("#live-chat #header-chat").css("border-radius", "16px");
    } else {
      $("#live-chat #header-chat").css("border-radius", "16px 16px 0 0");
    }
    isToggled = !isToggled;
  });

  // Index to keep track of the current message
  var messagesCounter = 0;

  // Function to add a message to the chat history
  function addMessage(message, who, picture) {
    var now = new Date();

    // Format the time as HH:MM:SS
    var time =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0") +
      ":" +
      now.getSeconds().toString().padStart(2, "0");

    var newMessage = `
      <div class="chat-message clearfix">
        <img src="images/${picture}" alt="" width="48" height="48">
        <div class="chat-message-content clearfix">
          <span class="chat-time">${time}</span>
          <h5>${who}</h5>
          <p>${message}</p>
        </div> <!-- end chat-message-content -->
      </div> <!-- end chat-message -->
      <hr>
    `;

    // Add the new message to the chat history
    $(".chat-message-counter").text(messagesCounter + 1);
    $(".chat-history").append(newMessage);

    // Scroll to the bottom of the chat history
    $(".chat-history").scrollTop($(".chat-history")[0].scrollHeight);

    // Play a sound
    var audio = new Audio("../data/messageNotification.mp3");
    audio.volume = 0.1;
    audio.play();
  }

  // Display messages using array
  function displayMessages(messages, count) {
    if (count < messages.length && messages[count] != "") {
      addMessage(messages[count], "Abubakr Alsheikh", "AbubakrAlsheikh.jpeg");
      messagesCounter++;
    } else {
      clearInterval(intervalId);
    }
  }

  var preMessages = [
    "Hello, Nice to meet you.",
    "I am chatbot tranied in Abubakr data",
    "If sending messages is not working try to use vpn, if the problem still the same try to contact to me to solve this problem.",
    "Important note: I am still learing, so my maybe mislaid, make sure about the infromation I gave you.",
  ];

  let countMessages = 0;

  let intervalId = setInterval(function () {
    displayMessages(preMessages, countMessages++);
  }, 1500);

  let userChat = [];

  // When the button send click
  $(".chat form button").on("click", function (e) {
    e.preventDefault();

    // Get the user's message from the input field
    var userMessage = $('.chat form input[type="text"]').val();

    if (userMessage == "") {
      return;
    }

    $(".chat form button").attr("disabled", true).css("opacity", "0.7");
    $(".chat .chat-feedback").show();

    // Create a new chat message using the template
    messagesCounter++;
    addMessage(userMessage, "You", "user.jpg");

    $('.chat form input[type="text"]').val("");
    // Send the user input to the server
    fetch("https://exuberant-book-production.up.railway.app/webhook-1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage, userchat: userChat }),
    })
      .then((response) => response.text())
      .then((modelResponse) => {
        var splitData = modelResponse.split(".");
        let count = 0;
        console.log(splitData);
        intervalId = setInterval(function () {
          // Create a new chat message using the response data
          displayMessages(splitData, count++);
        }, 2000);

        userChat.push({
          role: "user",
          parts: [
            {
              text: userMessage,
            },
          ],
        });

        userChat.push({
          role: "model",
          parts: [
            {
              text: modelResponse,
            },
          ],
        });
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        $(".chat .chat-feedback").hide();
        $(".chat form button").attr("disabled", false).css("opacity", "1");
      });
  });
});
