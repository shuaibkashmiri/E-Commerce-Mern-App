import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Increment product quantity if already in cart
  const addToCart = (product) => {
    let updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="bg-light py-3">{`Hello, ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h4>
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : ", please log in to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cart?.map((item) => (
              <div className="card mb-3 shadow-sm" key={item._id}>
                <div className="row g-0 align-items-center">
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${item._id}`}
                      className="img-fluid rounded-start"
                      alt={item.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        {item.description.substring(0, 50)}...
                      </p>
                      <p className="card-text">
                        <strong>Price:</strong>{" "}
                        {item.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                      <p className="card-text">
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => addToCart(item)}
                      >
                        Add One More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Cart Summary */}
          <div className="col-md-4">
            <div className="card shadow-sm p-4">
              <h2 className="text-center">Cart Summary</h2>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <h5>Current Address</h5>
                  <p>{auth?.user?.address}</p>
                  <button
                    className="btn btn-warning w-100 mb-2"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-warning w-100 mb-2"
                  onClick={() =>
                    navigate(auth?.token ? "/dashboard/user/profile" : "/login")
                  }
                >
                  {auth?.token ? "Update Address" : "Login to Checkout"}
                </button>
              )}
              {clientToken && cart?.length > 0 && (
                <div className="mt-3">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary w-100"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
