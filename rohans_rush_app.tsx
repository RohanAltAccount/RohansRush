import React, { useState, useEffect } from 'react';
import { Clock, Package, CheckCircle, XCircle, Plus, User } from 'lucide-react';

const RohansRush = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('customer');
  const [customerName, setCustomerName] = useState('');
  const [orderDetails, setOrderDetails] = useState('');
  const [snackPayment, setSnackPayment] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem('rohansRushOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rohansRushOrders', JSON.stringify(orders));
  }, [orders]);

  const submitOrder = () => {
    if (!customerName || !orderDetails || !snackPayment) {
      alert('Please fill in all fields!');
      return;
    }
    const newOrder = {
      id: Date.now(),
      customerName,
      orderDetails,
      snackPayment,
      additionalNotes,
      status: 'pending',
      timestamp: new Date().toLocaleString(),
      deliveryTime: null
    };
    setOrders([newOrder, ...orders]);
    setCustomerName('');
    setOrderDetails('');
    setSnackPayment('');
    setAdditionalNotes('');
    alert('Order submitted. Waiting for approval.');
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'snackmaster_1920398041zUdeurudqodo') {
      setIsAdmin(true);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const setDeliveryTime = (id, time) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, deliveryTime: time } : order
    ));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'delivered': return <Package className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-2 border-red-600 rounded-lg shadow-md p-6 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-red-600">
                Rohan's Rush
              </h1>
              <p className="text-gray-600 mt-1">Snack-based delivery service</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Active Orders</div>
              <div className="text-2xl font-bold text-red-600">
                {orders.filter(o => o.status === 'accepted').length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-red-600 border-t-0 shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('customer')}
              className={`flex-1 py-3 px-4 font-medium ${
                activeTab === 'customer'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Place Order
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 py-3 px-4 font-medium ${
                activeTab === 'track'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Track Orders
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-3 px-4 font-medium ${
                activeTab === 'admin'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        <div className="bg-white border-2 border-red-600 border-t-0 rounded-b-lg shadow-md p-6 mb-4">
          {activeTab === 'customer' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Request Delivery</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What do you want?
                  </label>
                  <textarea
                    value={orderDetails}
                    onChange={(e) => setOrderDetails(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    placeholder="e.g., Chick-Fil-A sandwich meal, large fries"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Snack Payment Offer
                  </label>
                  <input
                    type="text"
                    value={snackPayment}
                    onChange={(e) => setSnackPayment(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    placeholder="e.g., Chick-Fil-A sauce packet + 3 fries"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Good offers: sauce packets, cookies, fries, chips<br/>
                    Bad offers: napkins, straws, IOUs
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    placeholder="e.g., No pickles, extra sauce, meet at cafeteria"
                    rows="2"
                  />
                </div>
                <button
                  onClick={submitOrder}
                  className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700"
                >
                  Submit Order Request
                </button>
              </div>
            </div>
          )}

          {activeTab === 'track' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">All Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{order.customerName}</h3>
                          <p className="text-sm text-gray-500">{order.timestamp}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-600">Order:</p>
                        <p className="text-gray-800">{order.orderDetails}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-600">Snack Payment:</p>
                        <p className="text-gray-800">{order.snackPayment}</p>
                      </div>
                      {order.additionalNotes && (
                        <div className="mb-2">
                          <p className="text-sm font-medium text-gray-600">Notes:</p>
                          <p className="text-gray-800">{order.additionalNotes}</p>
                        </div>
                      )}
                      {order.deliveryTime && (
                        <div className="bg-gray-100 border border-gray-300 rounded p-2 mt-3">
                          <p className="text-sm font-medium text-gray-700">
                            Estimated Delivery: {order.deliveryTime}
                          </p>
                        </div>
                      )}
                      {order.status === 'rejected' && (
                        <div className="bg-red-50 border border-red-200 rounded p-2 mt-3">
                          <p className="text-sm text-red-800">
                            Order rejected. Snack offer was insufficient.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'admin' && (
            <div>
              {!isAdmin ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Login</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                        placeholder="Enter admin password"
                      />
                    </div>
                    <button
                      onClick={handleAdminLogin}
                      className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700"
                    >
                      Login
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Manage Orders</h2>
                    <button
                      onClick={() => setIsAdmin(false)}
                      className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p>No orders to manage</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{order.customerName}</h3>
                              <p className="text-sm text-gray-500">{order.timestamp}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                              {order.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="mb-2">
                            <p className="text-sm font-medium text-gray-600">Order:</p>
                            <p className="text-gray-800">{order.orderDetails}</p>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-600">Snack Payment Offer:</p>
                            <p className="text-gray-800 font-semibold">{order.snackPayment}</p>
                          </div>
                          {order.additionalNotes && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-600">Notes:</p>
                              <p className="text-gray-800">{order.additionalNotes}</p>
                            </div>
                          )}
                          
                          {order.status === 'accepted' && (
                            <div className="mb-3">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Set Delivery Time
                              </label>
                                                              <input
                                type="text"
                                value={order.deliveryTime || ''}
                                onChange={(e) => setDeliveryTime(order.id, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-red-600 focus:outline-none"
                                placeholder="e.g., 12:30 PM - 12:45 PM"
                              />
                            </div>
                          )}
                          
                          <div className="flex gap-2 flex-wrap">
                            {order.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'accepted')}
                                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'rejected')}
                                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {order.status === 'accepted' && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                              >
                                Mark Delivered
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this order?')) {
                                  deleteOrder(order.id);
                                }
                              }}
                              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center text-gray-600 text-sm pb-4">
          <p>Food Delivery Service. Restaurants must be reasonable walking distance or Rohan will get tired.</p>
        </div>
      </div>
    </div>
  );
};

export default RohansRush;