import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import axios from "axios";

function App() {
  const [URL, setURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleInput = (e) => {
    setURL(e.target.value);
    setStatus("");
  };

  const downloadVideo = async (e) => {
    e.preventDefault();
    if (!URL) {
      setStatus("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setStatus("Download started...");

    const options = {
      method: "GET",
      url: "https://youtube-data8.p.rapidapi.com/video/streaming-data/",
      params: { id: URL },
      headers: {
        "x-rapidapi-key": "08de0cc688msh077919d7f1c57c0p1f40fajsn282bfdf9f6de",
        "x-rapidapi-host": "youtube-data8.p.rapidapi.com",
        "content-type": "application/json",
      },
    };

    try {
      const response = await axios.request(options);
      const videoURL = response?.data?.formats[0]?.url;

      if (videoURL) {
        window.location.href = videoURL;
        setStatus("Download successful!");
      } else {
        setStatus("Failed to retrieve the video. Please try again.");
      }
    } catch (err) {
      setStatus("An error occurred. Ensure the URL is valid.");
      console.error(err);
    } finally {
      setLoading(false);
      setURL(""); // Clear the input box
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-gray-900 to-black px-4"
    >
      {/* Header Section */}
      <div className="relative flex items-center justify-center mb-12">
        <FaYoutube
          size={80}
          className="text-red-600 animate-bounce mr-4"
          style={{ animationDuration: "1.5s" }}
        />
        <h1 className="text-4xl font-bold text-white">YouTube Downloader</h1>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl p-8">
        <p className="text-center text-gray-600 text-lg mb-4">
          Enter the URL of a YouTube video below:
        </p>
        <form className="space-y-4" onSubmit={downloadVideo}>
          <input
            type="url"
            value={URL}
            className="h-12 w-full px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter YouTube Video URL"
            onChange={handleInput}
            required
          />
          <button
            type="submit"
            className={`h-12 w-full text-white rounded-lg shadow-lg transition-all duration-200 ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            }`}
            disabled={loading}
          >
            {loading ? "Downloading..." : "Download Video"}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p
            className={`mt-4 text-center ${
              status.includes("successful")
                ? "text-green-600"
                : status.includes("started")
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>

      {/* Footer Section */}
      <div className="mt-8 text-center">
        <p className="text-white text-sm">
          Built with ❤️ by <span className="font-semibold">Your Name</span>
        </p>
      </div>
    </div>
  );
}

export default App;
