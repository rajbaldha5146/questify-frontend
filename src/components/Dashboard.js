import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../url";


const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading state for each document
  const navigate = useNavigate();

  // Fetch uploaded documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backend_url}/api/documents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error.response?.data || error.message);
        toast.error("Failed to fetch documents.");
      }
    };

    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${backend_url}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("File uploaded successfully!");
      setDocuments([...documents, response.data.document]); // Add the new document to the list
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
      toast.error("File upload failed.");
    }
  };

  const handleGenerateSummary = async (documentId) => {
    // console.log("Document ID:", documentId); // Log the documentId
    setLoadingStates((prev) => ({ ...prev, [documentId]: true }));
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backend_url}/api/summarize`,
        { documentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadingStates((prev) => ({ ...prev, [documentId]: false }));
      navigate(`/summary/${documentId}`, { state: { summary: response.data.summary, documentId } });
    } catch (error) {
      console.error("Error generating summary:", error.response?.data || error.message);
      toast.error("Failed to generate summary.");
      setLoadingStates((prev) => ({ ...prev, [documentId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1B1F] p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
      <div className="flex flex-col space-y-8">
        {/* Upload Document Section */}
        <div className="bg-[#1F2128] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Upload Document</h2>
          <p className="text-[#8A8F98] mb-6">
            Upload a PDF or text file to get started.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4"
              accept=".pdf,.txt"
            />
            <button
              type="submit"
              className="bg-[#6C5CFF] text-white px-6 py-3 rounded-lg hover:bg-[#5A4AE0] transition-colors duration-300"
            >
              Upload
            </button>
          </form>
        </div>

        {/* History Section */}
        <div className="bg-[#1F2128] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">History</h2>
          <p className="text-[#8A8F98] mb-6">
            View your uploaded documents.
          </p>
          <div className="space-y-4">
            {documents.slice().reverse().map((doc) => (
              <div key={doc._id} className="bg-[#2A2C34] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white">{doc.filename}</h3>
                <p className="text-sm text-[#8A8F98]">
                  Uploaded on: {new Date(doc.uploadDate).toLocaleString()}
                </p>
                <button
                  onClick={() => handleGenerateSummary(doc._id)}
                  className="bg-[#6C5CFF] text-white px-4 py-2 rounded-lg hover:bg-[#5A4AE0] transition-colors duration-300 flex items-center justify-center"
                  disabled={loadingStates[doc._id]} // Disable button when loading
                >
                  {loadingStates[doc._id] ? ( // Show loader only for this document
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                  ) : (
                    "Generate Summary"
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;