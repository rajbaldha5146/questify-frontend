import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { backend_url } from "../url";
import "../markdown.css";

const DocumentDetailPage = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [hasSummary, setHasSummary] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qaLoading, setQaLoading] = useState(false);
  const [qaHistory, setQaHistory] = useState([]);
  const [questionError, setQuestionError] = useState("");

  const [activeTab, setActiveTab] = useState("overview");

  // Fetch document details and check if summary exists
  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch document details
        const docResponse = await axios.get(
          `${backend_url}/api/documents/${documentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocument(docResponse.data);

        // Check if summary exists
        try {
          const summaryResponse = await axios.get(
            `${backend_url}/api/summary/${documentId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (summaryResponse.data.summary) {
            setSummary(summaryResponse.data.summary);
            setHasSummary(true);
            setActiveTab("summary");
          }
        } catch (summaryError) {
          // Summary doesn't exist yet - this is expected for new documents
          setHasSummary(false);
        }

        // Fetch Q&A history
        const qaResponse = await axios.get(
          `${backend_url}/api/qa-history/${documentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQaHistory(qaResponse.data);
      } catch (error) {
        console.error("Error fetching document details:", error);
        toast.error("Failed to load document details.");
        navigate("/dashboard");
      }
    };

    if (documentId) {
      fetchDocumentDetails();
    }
  }, [documentId, navigate]);

  // Generate summary
  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backend_url}/api/summarize`,
        { documentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSummary(response.data.summary);
      setHasSummary(true);
      setActiveTab("summary");
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error("Error generating summary:", error);
      if (error.response?.status === 429) {
        toast.error(
          "Daily AI operation limit reached. Please try again tomorrow."
        );
      } else {
        toast.error(
          error.response?.data?.message || "Failed to generate summary."
        );
      }
    } finally {
      setSummaryLoading(false);
    }
  };

  // Handle Q&A submission
  const handleAskQuestion = async () => {
    setQuestionError("");

    if (!question.trim()) {
      setQuestionError("Please enter a question.");
      return;
    }

    if (question.length > 500) {
      setQuestionError("Question must be less than 500 characters.");
      return;
    }

    setQaLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backend_url}/api/ask`,
        { documentId, question },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newQA = {
        question,
        answer: response.data.answer,
        createdAt: new Date(),
      };

      setAnswer(response.data.answer);
      setQaHistory((prev) => [newQA, ...prev]);
      setQuestion("");
      toast.success("Question answered successfully!");
    } catch (error) {
      console.error("Error fetching answer:", error);
      if (error.response?.status === 429) {
        toast.error(
          "Daily AI operation limit reached. Please try again tomorrow."
        );
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch answer.");
      }
    } finally {
      setQaLoading(false);
    }
  };

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-emerald-600 hover:text-emerald-700 mb-4 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {document.filename}
          </h1>
          <p className="text-gray-600">
            Uploaded on {new Date(document.uploadDate).toLocaleDateString()} at{" "}
            {new Date(document.uploadDate).toLocaleTimeString()}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("summary")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "summary"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Summary{" "}
                {hasSummary && (
                  <span className="ml-1 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                    Ready
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("qa")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "qa"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Q&A{" "}
                {qaHistory.length > 0 && (
                  <span className="ml-1 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    {qaHistory.length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Document Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">
                        File Name
                      </p>
                      <p className="text-gray-900">{document.filename}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">
                        Upload Date
                      </p>
                      <p className="text-gray-900">
                        {new Date(document.uploadDate).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">
                        Summary Status
                      </p>
                      <p className="text-gray-900">
                        {hasSummary ? (
                          <span className="text-emerald-600 font-medium">
                            Generated
                          </span>
                        ) : (
                          <span className="text-amber-600 font-medium">
                            Not Generated
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">
                        Q&A History
                      </p>
                      <p className="text-gray-900">
                        {qaHistory.length} questions asked
                      </p>
                    </div>
                  </div>
                </div>

                {!hasSummary && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-amber-800 font-medium mb-2">
                      Generate Summary
                    </h4>
                    <p className="text-amber-700 text-sm mb-4">
                      Create an AI-powered summary of this document to enable
                      Q&A functionality and get key insights.
                    </p>
                    <button
                      onClick={handleGenerateSummary}
                      disabled={summaryLoading}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                    >
                      {summaryLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        "Generate Summary"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Summary Tab */}
            {activeTab === "summary" && (
              <div>
                {hasSummary ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Document Summary
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-lg prose max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // eslint-disable-next-line jsx-a11y/heading-has-content
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-2xl font-bold text-gray-900 mb-4"
                              {...props}
                            />
                          ),
                          // eslint-disable-next-line jsx-a11y/heading-has-content
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-xl font-bold text-gray-900 mb-3"
                              {...props}
                            />
                          ),
                          // eslint-disable-next-line jsx-a11y/heading-has-content
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-lg font-semibold text-gray-900 mb-2"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p
                              className="text-gray-700 mb-3 leading-relaxed"
                              {...props}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="text-gray-900 font-semibold"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc list-inside mb-3 text-gray-700"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal list-inside mb-3 text-gray-700"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-1" {...props} />
                          ),
                        }}
                      >
                        {summary}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Summary Generated
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Generate a summary to view document insights here.
                    </p>
                    <button
                      onClick={handleGenerateSummary}
                      disabled={summaryLoading}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center mx-auto"
                    >
                      {summaryLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        "Generate Summary"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Q&A Tab */}
            {activeTab === "qa" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ask Questions
                  </h3>
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask a question about this document..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        disabled={qaLoading}
                        maxLength={500}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAskQuestion()
                        }
                      />
                      <button
                        onClick={handleAskQuestion}
                        disabled={qaLoading || !question.trim()}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        {qaLoading ? "Asking..." : "Ask"}
                      </button>
                    </div>
                    {questionError && (
                      <p className="text-red-600 text-sm">{questionError}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {question.length}/500 characters
                    </p>
                  </div>

                  {answer && (
                    <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                      <h4 className="text-emerald-800 font-medium mb-3">
                        Latest Answer
                      </h4>
                      <div className="text-emerald-700 prose max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {answer}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>

                {/* Q&A History */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Previous Questions ({qaHistory.length})
                  </h4>
                  {qaHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-gray-500">
                        No questions asked yet. Start by asking a question
                        above!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {qaHistory.map((qa, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="font-medium text-gray-900">
                              Q: {qa.question}
                            </h5>
                            {qa.createdAt && (
                              <span className="text-xs text-gray-500">
                                {new Date(qa.createdAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="text-gray-700">
                            <strong className="text-gray-900">A:</strong>
                            <div className="mt-2 prose max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {qa.answer}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailPage;
