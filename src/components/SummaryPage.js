import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_url } from "../url";

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { summary, documentId } = location.state || { summary: "No summary available.", documentId: null }; // Get documentId from location.state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qaLoading, setQaLoading] = useState(false);
  const [qaHistory, setQaHistory] = useState([]);

  // Log the documentId and location.state
  // console.log("Document ID from location.state:", documentId);
  // console.log("Location State:", location.state);

  // Fetch Q&A history on component mount
  useEffect(() => {
    const fetchQaHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${backend_url}/api/qa-history/${documentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQaHistory(response.data);
      } catch (error) {
        console.error("Error fetching Q&A history:", error);
        toast.error("Failed to fetch Q&A history.");
      }
    };

    if (documentId) {
      fetchQaHistory();
    }
  }, [documentId]);

  // Handle Q&A submission
  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question.");
      return;
    }

    if (!documentId) {
      toast.error("Document ID is missing.");
      return;
    }

    setQaLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backend_url}/api/ask`,
        { documentId, question }, // Use documentId from location.state
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnswer(response.data.answer);
      setQaHistory((prev) => [...prev, { question, answer: response.data.answer }]);
    } catch (error) {
      console.error("Error fetching answer:", error.response?.data || error.message);
      toast.error("Failed to fetch answer.");
    } finally {
      setQaLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1B1F] p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Summary</h1>
      <div className="bg-[#1F2128] p-8 rounded-xl shadow-lg">
        {/* Summary Section */}
        <div className="bg-[#2A2C34] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Summary</h3>
          <p className="text-[#8A8F98]">{summary}</p>
        </div>

        {/* Q&A Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Ask a Question</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the document..."
              className="w-full p-3 bg-[#2A2C34] border border-[#3A3D45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6C5CFF]"
            />
            <button
              onClick={handleAskQuestion}
              className="bg-[#6C5CFF] text-white px-6 py-3 rounded-lg hover:bg-[#5A4AE0] transition-colors duration-300"
              disabled={qaLoading}
            >
              {qaLoading ? "Loading..." : "Ask"}
            </button>
          </div>
          {answer && (
            <div className="mt-6 bg-[#2A2C34] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Answer</h3>
              <p className="text-[#8A8F98]">{answer}</p>
            </div>
          )}
        </div>

        {/* Q&A History Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Q&A History</h2>
          <div className="space-y-4">
            {qaHistory.map((qa, index) => (
              <div key={index} className="bg-[#2A2C34] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Q: {qa.question}</h3>
                <p className="text-[#8A8F98]">A: {qa.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#6C5CFF] text-white px-6 py-3 rounded-lg hover:bg-[#5A4AE0] transition-colors duration-300 mt-6"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;