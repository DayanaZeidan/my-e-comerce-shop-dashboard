import React, { useContext } from "react";
import "./Products.css";
import { useState } from "react";
import axios from "axios";
import { ProductsContext } from "../../App";
import ProductView from "./ProductView/ProductView";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Products() {
  const [products, setProducts] = useContext(ProductsContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [picture, setPicture] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDes = (e) => {
    setDescription(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const create = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("picture", picture);
    axios
      .post("http://localhost:5000/Products/create", formData)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={handleOpen}>Add a product</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Create Product</h2>
          <form onSubmit={create}>
            <input type="text" placeholder="name" onChange={handleName} />
            <textarea placeholder="description" onChange={handleDes} />
            <input type="number" placeholder="price" onChange={handlePrice} />
            <input
              type="number"
              placeholder="quantity"
              onChange={handleQuantity}
            />
            <input
              type="text"
              placeholder="category"
              onChange={handleCategory}
            />
            <input type="file" onChange={handleFile} />
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>

      <table className="content-table">
        <tr>
          <th>id</th>
          <th>name</th>
          <th>price</th>
          <th>quantity</th>
          <th>description</th>
          <th>category</th>
          <th>image</th>
          <th>edit</th>
        </tr>
        {products.map((product, i) => {
          return <ProductView key={i} product={product} />;
        })}
      </table>
    </div>
  );
}

export default Products;
