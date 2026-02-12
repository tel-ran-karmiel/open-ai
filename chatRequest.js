const URL = process.env["OPEN_AI_URL"] || "http://localhost:11434/api/chat";
const MODEL_NAME = process.env["MODEL_NAME"] || "phi3:mini";
const REQUEST_TIMEOUT_MS = Number(process.env["REQUEST_TIMEOUT_MS"] || 1200000);
export default async function chatRequest(messages) {
  const payload = {
    model: MODEL_NAME,
    messages,
    stream: false,
    temperature: 0.0
  };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let resp;
  let dots = 0
  let intervalId;
  try {
   intervalId  = setInterval(() => {
        dots = (dots + 1) % 5
        let text = ".".repeat(dots)
        process.stdout.write("\rthinking" + text + "   ")
    }, 250)
    resp = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
    clearInterval(intervalId)
  }
  if (!resp.ok) {
    throw Error(`HTTP error status ${resp.status}, text: ${await resp.text()}`);
  }
  const data = await resp.json();
  console.log(data);
  return data.message.content;
}
