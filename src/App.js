import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [orders, setOrders] = useState([]);

  // Function to handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to upload the CSV file
  const uploadCSV = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('https://localhost:8080/api/upload', formData, {
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

  // Function to fetch all orders and their total amount
  const getOrders = async () => {
    try {
      const response = await axios.get('https://localhost:8080/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    // Fetch orders when the component mounts
    getOrders();
  }, []);

  return (
    <div className="App">
      <h1>EverythingMart Order Management</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadCSV}>Upload CSV</button>
      </div>
      <div>
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Generate Invoice</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>{order.orderDate}</td>
                <td>
                  <button>Generate Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
