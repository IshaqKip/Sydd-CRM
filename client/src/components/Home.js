import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const countries = ['USA', 'Canada', 'UK', 'Australia'];
  const jobs = ['Software Engineer', 'Nurse', 'Teacher'];
  const visaTypes = ['Tourist', 'Work', 'Student', 'Business', 'Transit'];
  const handleLogin = async () => {
    const res = await axios.post('http://localhost:5000/api/login', { email, password });
    localStorage.setItem('token', res.data.token);
  };

  return (
    <div className="home-container">
      <h1>SYDD Travel Agency</h1>
      <div className="section">
        <h2>Visa Countries</h2>
        <ul>{countries.map((country) => <li key={country}>{country}</li>)}</ul>
      </div>
      <div className="section">
        <h2>Jobs Abroad</h2>
        <ul>{jobs.map((job) => <li key={job}>{job}</li>)}</ul>
      </div>
      <div className="section">
        <h2>Visa Types</h2>
        <ul>{visaTypes.map((visa) => <li key={visa}>{visa}</li>)}</ul>
      </div>
      <div className="login-buttons">
        <Link to="/customer"><button>Customer Login</button></Link>
        <Link to="/admin"><button>Admin Login</button></Link>
      </div>
    </div>
  );
};

export default Home;