// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoicePage from './InvoicePage';

import './App.css'; // Import the CSS file for App.js

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file selected'); // Add fileName state
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Function to handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name); // Set the selected file name
  };

  // Function to upload the CSV file
  const uploadCSV = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh the orders list after successful upload
      getOrders();
    } catch (error) {
      console.error('Error uploading CSV:', error);
    }
  };

  // Function to fetch all orders and their details
  const getOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Function to generate invoice for a specific order
  const viewInvoice = (orderId) => {
    setSelectedOrderId(orderId);
  };

  // Function to clear the selected order ID and go back to the orders list
  const goBackToOrders = () => {
    setSelectedOrderId(null);
  };

  useEffect(() => {
    // Fetch orders when the component mounts
    getOrders();
  }, []);

  return (
    <div className="App">
      <h1>EverythingMart Order Management</h1>
      {selectedOrderId ? (
        <InvoicePage
          order={orders.find((order) => order.orderId === selectedOrderId)}
          goBackToOrders={goBackToOrders}
        />
      ) : (
        <div>
          <label className="custom-file-upload">
            {fileName} {/* Display the selected file name */}
            <input type="file" id="fileInput" onChange={handleFileChange} />
          </label>
          <button onClick={uploadCSV}>Upload CSV</button>
          <div>
            <h2>Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Generate Invoice</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.customerName}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => viewInvoice(order.orderId)}>Generate Invoice</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
