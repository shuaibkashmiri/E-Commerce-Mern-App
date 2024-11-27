import React from "react";
import Layout from "./../components/layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values] = useSearch();

  return (
    <Layout title="Search Results">
      <div className="container mt-5">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} result${
                  values?.results.length > 1 ? "s" : ""
                }`}
          </h6>
        </div>
        <div className="row justify-content-center mt-4">
          {values?.results.map((product) => (
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
                    <p className="card-text">
                      {product.description.substring(0, 30)}...
                    </p>
                    <p className="card-text fw-bold">₹ {product.price}</p>
                  </div>
                  <div className="mt-3 d-flex justify-content-between">
                    <button className="btn btn-primary">More Details</button>
                    <button className="btn btn-secondary">Add to Cart</button>
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

export default Search;
