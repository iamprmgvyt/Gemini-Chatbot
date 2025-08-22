const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  if (!userMessage) return;

  // show user message
  chatBox.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;
  input.value = "";

  // send to backend
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await res.json();
  chatBox.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
});
