import React, { useState, useEffect } from "react";
import "./ProductEditScreen.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import Resizer from "react-image-file-resizer";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("12x16");
  const [desc, setDesc] = useState("");
  const [style, setStyle] = useState("Oil on Canvas");
  const [category, setCategory] = useState("Landscape");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        400,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await resizeFile(file);
    setImage(base64);
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        size,
        desc,
        style,
        category,
      }).unwrap(); // NOTE: here need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setSize(product.size);
      setDesc(product.desc);
      setCategory(product.style);
      setCategory(product.category);
    }
  }, [product]);

  return (
    <div className="product-edit">
      <Link to="/admin/productList">
        <button className="product-edit-back-btn">Go back</button>
      </Link>
      <div className="product-edit-content">
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error.data.message}</Message>
        ) : (
          <form className="product-edit-form" onSubmit={submitHandler}>
            <div className="product-edit-form-item">
              <label>Name: </label>
              <input
                type="text"
                className="product-edit-input"
                placeholder="Enter name"
                id="name"
                name="name"
                size="40"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="product-edit-form-item">
              <label>Image: </label>

              <img
                type="text"
                className="product-edit-image"
                src={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="file-input-wrapper">
              <input
                className="choose-file"
                label="Choose File"
                onChange={handleImage}
                type="file"
              />
            </div>
            <div className="product-edit-form-item">
              <label>Price: </label>
              <input
                type="number"
                className="product-edit-input"
                placeholder="Enter price"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="product-edit-form-item">
              <label>Size: </label>
              <input
                type="text"
                className="product-edit-input"
                placeholder="Enter size"
                id="size"
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="product-edit-form-item">
              <label>Description: </label>
              <input
                type="text"
                className="product-edit-input"
                placeholder="Enter description"
                id="desc"
                name="desc"
                size="100"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="product-edit-form-item">
              <label>Style: </label>
              <select
                className="product-edit-input option"
                id="style"
                name="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option value="Oil on Canvas">Oil on Canvas</option>
                <option value="Oil on Board">Oil on Board</option>
                <option value="Oil on Linen">Oil on Linen</option>
                <option value="Oil">Oil</option>
                <option value="Acrylic">Acrylic</option>
                <option value="Cards">Cards</option>
              </select>
            </div>
            <div className="product-edit-form-item">
              <label>Category: </label>
              <select
                className="product-edit-input option"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Landscape">Landscape</option>
                <option value="Horses">Horses</option>
                <option value="Wildlife">Wildlife</option>
              </select>
            </div>
            <button className="product-edit-update-btn">Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditScreen;
