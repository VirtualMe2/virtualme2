import { Analytics } from '@vercel/analytics/react';
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
      // speak(data.result); // Call the speak function with the result
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  return (
    <div>
      <Head>
        <title>Taha AI Chatbot</title>
        <link rel="icon" href="/taha.jpeg" />
      </Head>

      <main className={styles.main}>
        <Analytics />
        <img src="/taha.jpeg" className={styles.icon} />
        <h3>Taha H. Ababou</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Ask me anything about Taha!"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Answer me" />
        </form>
        <div className={styles.result}>{result}</div>

        {/* This is a JSX comment, it will not render in the output */}
        <button onClick={() => window.location.href = '/public/ascii/test.html'}>
          Go to Example
        </button>


        

      </main>
      <footer className={styles.footer}>
        BETA VERSION (3D Avatar & Voice Cloning coming soon!)<br />
        Last updated Jan 31, 2024
      </footer>
    </div>
  );
}
