import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sizes, setSizes] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle Create Product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("sizes", sizes);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating product");
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white text-center">
                <h4>Create Product</h4>
              </div>
              <div className="card-body">
                {/* Category Selection */}
                <div className="mb-4">
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Photo Upload */}
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                {photo && (
                  <div className="mb-3 text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product Preview"
                      style={{
                        height: "200px", // Smaller preview height
                        width: "auto", // Maintain aspect ratio
                        objectFit: "contain", // Ensure the image fits the frame
                      }}
                      className="img-thumbnail"
                    />
                  </div>
                )}

                {/* Form Fields */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Product Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={sizes}
                    placeholder="Available Sizes"
                    className="form-control"
                    onChange={(e) => setSizes(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    value={description}
                    placeholder="Product Description"
                    className="form-control"
                    rows="3"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Product Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Product Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {/* Shipping Option */}
                <div className="mb-4">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    size="large"
                    showSearch
                    className="form-select"
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button className="btn btn-success" onClick={handleCreate}>
                    Create Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
