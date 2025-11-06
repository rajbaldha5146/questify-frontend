// Automatically detect environment and use appropriate backend URL
export const backend_url = process.env.NODE_ENV === 'production' 
  ? "https://questify-backend-1.onrender.com"  // Your production backend URL
  : "http://localhost:5000";  // Local development URL