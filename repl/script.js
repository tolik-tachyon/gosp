document.getElementById("runBtn").addEventListener("click", async () => {
  const code = document.getElementById("codeInput").value;
  const output = document.getElementById("output");

  output.textContent = "Running...";

  try {
    const response = await fetch("/api/expr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expr: code })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      output.textContent = `Error: ${data.error}`;
    } else if (data.result) {
      output.textContent = `Result: ${data.result}`;
    } else {
      output.textContent = `Unknown response: ${JSON.stringify(data)}`;
    }

  } catch (err) {
    output.textContent = `Fetch error: ${err.message}`;
  }
});