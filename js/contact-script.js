let form = document.getElementById("my-form");
let status = document.getElementById("my-form-status");

function ShowStats(color, message) {
  status.classList.add("show");
  status.style.backgroundColor = color;
  status.innerHTML = message;
  setTimeout(function () {
    status.classList.remove("show");
  }, 3000);
}

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  // Validate input fields
  let isValid = true;
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      isValid = false;
      ShowStats("#E53935", "Please fill in all fields.");
    }
  });

  // Submit form if all fields are valid
  if (isValid) {
    let data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          ShowStats("#A5D6A7", "Thanks for your submission!");
          form.reset();
        } else {
          response.json().then((data) => {
            ShowStats("#E53935");
            if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
            .map((error) => error["message"])
            .join(", ");
            } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
            }
            }
        );
        }
      })
      .catch((error) => {
        ShowStats("#E53935", "Oops! There was a problem submitting your form");
      });
  }
}
