import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (params?.slug) fetchProductsByCategory();
  }, [params?.slug]);

  const fetchProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h4>Category - {category?.name || "Loading..."}</h4>
          <h6>
            {products.length} result{products.length !== 1 ? "s" : ""} found
          </h6>
        </div>
        <div className="row justify-content-center">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 col-sm-6 mb-4">
              <div className="card shadow-sm h-100 d-flex flex-column">
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {product.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h6>
                    <p className="card-text">
                      {product.description.substring(0, 60)}...
                    </p>
                  </div>
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      More Details
                    </button>
                    {/* Uncomment this if cart functionality is added */}
                    {/* <button
                      className="btn btn-secondary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
