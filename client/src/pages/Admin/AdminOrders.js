import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [statusOptions] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // Fetch all orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Handle order status change
  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      toast.success("Order status updated successfully.");
      getOrders(); // Refresh orders
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status.");
    }
  };

  return (
    <Layout title="Admin - Orders">
      <div className="row dashboard">
        {/* Sidebar */}
        <div className="col-md-3">
          <AdminMenu />
        </div>

        {/* Orders Section */}
        <div className="col-md-9">
          <h1 className="text-center mb-4">All Orders</h1>
          {orders?.length > 0 ? (
            orders.map((order, index) => (
              <div className="border shadow mb-4" key={order._id}>
                <div className="p-3 bg-light">
                  <h5>Order #{index + 1}</h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            defaultValue={order?.status}
                            onChange={(value) => handleChange(order._id, value)}
                            className="form-select"
                          >
                            {statusOptions.map((status, i) => (
                              <Option key={i} value={status}>
                                {status}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{order?.buyer?.name || "N/A"}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>
                          {order?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td>{order?.products?.length || 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Product Details */}
                <div className="p-3">
                  {order?.products?.map((product) => (
                    <div
                      className="row mb-2 p-2 border rounded"
                      key={product._id}
                    >
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="img-fluid"
                          style={{
                            height: "100px",
                            width: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <p className="mb-1">
                          <strong>{product.name}</strong>
                        </p>
                        <p className="mb-1 text-muted">
                          {product.description.substring(0, 50)}...
                        </p>
                        <p className="mb-1">Price: ₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No orders found.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
