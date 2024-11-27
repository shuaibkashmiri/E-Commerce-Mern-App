import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="container mt-5">
        <h1 className="text-center mb-4">Categories</h1>
        <div className="row g-4">
          {categories.map((c) => (
            <div className="col-md-4" key={c._id}>
              <div className="card shadow-sm border-0 text-center h-100">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <Link
                    to={`/category/${c.slug}`}
                    className="btn btn-primary px-4 py-2"
                  >
                    {c.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
