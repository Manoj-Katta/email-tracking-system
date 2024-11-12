import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://email-tracking-system-backend.vercel.app/emails")
      .then((response) => {
        setEmails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // More detailed error message
        if (error.response) {
          // If the error comes from the server
          setError(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else {
          setError("Network Error: Please check your connection or the backend status");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Email Tracking Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Email ID</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Open Time</th>
            <th>Click Time</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.emailId}>
              <td>{email.emailId}</td>
              <td>{email.userId}</td>
              <td>{email.opened ? "Opened" : "Not Opened"}</td>
              <td>{email.openTimestamps.join(", ")}</td>
              <td>{email.clickTimestamps.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
