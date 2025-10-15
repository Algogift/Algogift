// FIX: Replaced invalid file content with a functional React component.
// This component demonstrates the correct usage of the Gemini API for text generation
// as per the provided guidelines.

import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

// Main App component
const App = () => {
  // State management
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle the API call
  const handleGenerateContent = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      // Initialize the GoogleGenAI client.
      // API key is read from environment variables as per guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Generate content call
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      // Extract text from the response
      const text = response.text;
      setResult(text);

    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(`An error occurred: ${e.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1>Gemini API Frontend Demo</h1>
      <p>Enter a prompt below and click "Generate" to get a response from the Gemini API.</p>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., why is the sky blue?"
        rows={5}
        style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
        disabled={loading}
      />

      <button
        onClick={handleGenerateContent}
        disabled={loading}
        style={{ 
          marginTop: '10px', 
          padding: '10px 20px', 
          fontSize: '16px', 
          cursor: 'pointer',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {error && (
        <div style={{ marginTop: '20px', color: 'red', border: '1px solid red', padding: '10px', borderRadius: '4px', backgroundColor: '#ffebee' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && (
        <div style={{ marginTop: '20px' }}>
          <p>Loading...</p>
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', whiteSpace: 'pre-wrap', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <h2>Response:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};


// In a typical React setup, you would render this component to the DOM like this:
// import ReactDOM from 'react-dom/client';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<React.StrictMode><App /></React.StrictMode>);

// For this exercise, we export the component as the default export.
export default App;
