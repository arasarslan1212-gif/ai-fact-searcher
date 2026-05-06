async function search() {

  const query = document.getElementById("query").value.trim();

  if (!query) return;

  const resultEl = document.getElementById("result");

  const answerEl = document.getElementById("answer");

  const statusText = document.getElementById("statusText");

  resultEl.style.display = "block";

  statusText.textContent = "Searching DuckDuckGo...";

  answerEl.textContent = "";

  try {

    const res = await fetch(

      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`

    );

    const data = await res.json();

    if (data.AbstractText) {

      statusText.textContent = "Answer from DuckDuckGo";

      answerEl.textContent = data.AbstractText;

    } else if (data.RelatedTopics?.length > 0) {

      statusText.textContent = "Related result";

      answerEl.textContent = data.RelatedTopics[0].Text;

    } else {

      statusText.textContent = "No instant answer";

      answerEl.textContent = "Try a more specific question.";

    }

  } catch (err) {

    statusText.textContent = "Error";

    answerEl.textContent = err.message;

  }

}
