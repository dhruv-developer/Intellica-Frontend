import { useState } from "react";
import axios from "axios";

export default function YouTubeSummary() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("");

  const fetchSummary = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/youtube/youtube_summary/", { youtube_url: url });
      setSummary(data.summary);
      setMessage("Summary Generated!");
    } catch (error) {
      setMessage("Failed to fetch summary.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-primary">YouTube Video Summary</h2>
      <input type="text" placeholder="Enter YouTube URL" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-2 border rounded mb-2" />
      <button onClick={fetchSummary} className="bg-secondary text-white p-2 rounded">Get Summary</button>
      <p className="text-center mt-2 text-green-500">{message}</p>
      <p className="mt-4">{summary}</p>
    </div>
  );
}
