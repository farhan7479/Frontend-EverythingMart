// InvoicePage.js
import React from 'react';

const InvoicePage = ({ order, goBackToOrders }) => {
  return (
    <div className="invoice-page">
      <h2>Invoice Details</h2>
      <div>
        <p>Order ID: {order.orderId}</p>
        <p>Customer: {order.customerName}</p>
        <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
        {/* Add other invoice details here */}
      </div>
      <button onClick={() => window.print()}>Print Invoice</button>
      <button onClick={goBackToOrders}>Back to Orders</button>
    </div>
  );
};

export default InvoicePage;

