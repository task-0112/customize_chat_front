'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/v1/tests");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Message from the server: {message}</p>
      </div>
    </main>
  );
}