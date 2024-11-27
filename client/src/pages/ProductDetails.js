import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product details and similar products
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("Item added to cart");
  };

  return (
    <Layout>
      <div className="container mt-5">
        {/* Product Details */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 text-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="img-fluid rounded shadow"
              alt={product.name}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h1>Product Details</h1>
            <h6>
              <strong>Name:</strong> {product.name}
            </h6>
            <h6>
              <strong>Description:</strong> {product.description}
            </h6>
            <h6>
              <strong>Price:</strong> ₹ {product.price}
            </h6>
            <h6>
              <strong>Category:</strong> {product?.category?.name}
            </h6>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => addToCart(product)}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        <hr />

        {/* Similar Products */}
        <div>
          <h4 className="mb-4">Similar Products</h4>
          {relatedProducts.length === 0 ? (
            <p className="text-center">No similar products found</p>
          ) : (
            <div className="row">
              {relatedProducts.map((p) => (
                <div key={p._id} className="col-md-4 col-sm-6 mb-4">
                  <div className="card shadow-sm h-100 d-flex flex-column">
                    <img
                      src={`/api/v1/product/product-photo/${p?._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 30)}...
                        </p>
                        <p className="card-text fw-bold">₹ {p.price}</p>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => addToCart(p)}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
