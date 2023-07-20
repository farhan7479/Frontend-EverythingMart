// InvoicePage.js
import React from 'react';
import './InvoicePage.css'; // Import the CSS file for InvoicePage.js

const InvoicePage = ({ order, goBackToOrders }) => {
  const { orderId, customerName, date, items, totalAmount } = order;

  return (
    <div className="invoice-page">
      <h2>Invoice Details</h2>
      <div>
        <p>Order ID: {orderId}</p>
        <p>Customer: {customerName}</p>
        <p>Date: {new Date(date).toLocaleDateString()}</p>
        <h3>Items:</h3>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
      <button onClick={() => window.print()}>Print Invoice</button>
      <button onClick={goBackToOrders}>Back to Orders</button>
    </div>
  );
};

export default InvoicePage;
