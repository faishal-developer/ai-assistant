// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import DoctorCard from './components/card';
import SkeletonLoader from './components/skeletonLoader/Skeleton';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError] = useState('');

  // Voice recognition
  const startListening = () => {
    setError("")
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      searchKeyword(transcript);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const searchKeyword = async (keyword) => {
    if(!keyword){
      setError("Searchbar is empty")
      return;
    }
    setResults([])
    setLoading(true)
    
    const response = await axios.post('https://ai-assistant-one-flax.vercel.app/api/v1/generate', { prompt:keyword });
    setResults(response.data?.data);
    console.log(response.data)
    setLoading(false)
  };

  return (
    <div className="app-container">
      <h1>Voice & Text Search(Doctors)</h1>
      <div className="input-section">
        <button className={`mic-button ${isListening ? 'listening' : ''}`} onClick={startListening}>
          🎤
        </button>
        <input
          type="text"
          placeholder="Type or speak your search..."
          value={inputText}
          onChange={(e) => {setInputText(e.target.value);setError('')}}
          className="search-input"
        />
        <button className="search-button" onClick={() => searchKeyword(inputText)}>
          Search
        </button>
      </div>
      <p className='error'>{error}</p>
      <div className="results-section">
        {
          loading?<SkeletonLoader/>:''
        }
        {results.length > 0 ? (
          <div>
            <p className='sub_heading'>Here i will suggest you a {results[0]?.type} ,  who are reliable.</p>
            <DoctorCard doctor={results[0]}/>

          </div>
        ) : (
          <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
};

export default App;
