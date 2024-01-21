let form = document.getElementById("my-form");
let status = document.getElementById("my-form-status");

function ShowStats(color) {
status.classList.add("show");
status.style.backgroundColor = color;
setTimeout(function () {
    status.classList.remove("show");
}, 3000);
}

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
event.preventDefault();
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
        ShowStats("#A5D6A7");
        status.innerHTML = "Thanks for your submission!";
        form.reset();
    } else {
        response.json().then((data) => {
        ShowStats("#E53935");
        if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
            .map((error) => error["message"])
            .join(", ");
        } else {
            status.innerHTML =
            "Oops! There was a problem submitting your form";
        }
        });
    }
    })
    .catch((error) => {
    ShowStats("#E53935");
    status.innerHTML = "Oops! There was a problem submitting your form";
    });
}