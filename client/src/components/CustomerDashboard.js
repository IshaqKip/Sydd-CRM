import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CustomerDashboard.css';

const CustomerDashboard = () => {
  const [query, setQuery] = useState('');
  const [file, setFile] = useState(null);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/queries', { query }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setQuery('');
      alert('Query submitted!');
    } catch (error) {
      console.error('Error submitting query:', error);
      alert('Failed to submit query. Please log in or try again.');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      alert('File uploaded!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please log in or try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Customer Dashboard</h1>
      <div className="query-form">
        <h2>Make an Inquiry</h2>
        <form onSubmit={handleQuerySubmit}>
          <textarea value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">Submit Query</button>
        </form>
      </div>
      <div className="document-upload">
        <h2>Upload Documents</h2>
        <form onSubmit={handleFileUpload}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Upload</button>
        </form>
      </div>
      <div className="bookings">
        <h2>Book Flights/Hotels</h2>
        <button>Search Flights</button>
        <button>Search Hotels</button>
      </div>
      <div className="blogs">
        <h2>Travel Blogs</h2>
        <p>Blog 1: Tips for Visa Applications</p>
        <p>Blog 2: Best Destinations 2025</p>
      </div>
    </div>
  );
};

export default CustomerDashboard;