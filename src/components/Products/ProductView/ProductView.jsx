import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductView.css";

function ProductView(props) {
  const product = props.product;
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category_id);
  const [quantity, setQuantity] = useState(product.quantity);
  const [image_path, setImage] = useState(product.image_path);
  const [category_name, setCategory_name] = useState("");
  //toggle function to change the state
  const toggle = () => {
    if (!editable) {
      setEditable(true);
    }
    if (editable) {
      setEditable(false);
      save();
    }
  };

  const handlename = (e) => {
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

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/Categories/getbyid/${product.category}`)
      .then((res) => {
        setCategory_name(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const del = () => {
    axios.delete(`http://localhost:5000/Products/delete/${product.id}`);
  };

  const save = () => {
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("picture", image_path);
    axios
      .patch("http://localhost:5000/Products/update", formData)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>{product.id}</td>
      <td>
        {editable ? (
          <input type="text" placeholder={product.name} onChange={handlename} />
        ) : (
          product.name
        )}
      </td>
      <td>
        {editable ? (
          <input
            type="text"
            placeholder={product.price}
            onChange={handlePrice}
          />
        ) : (
          product.price
        )}
      </td>
      <td>
        {editable ? (
          <input
            type="text"
            placeholder={product.quantity}
            onChange={handlename}
          />
        ) : (
          product.quantity
        )}
      </td>
      <td>
        {editable ? (
          <input
            type="text"
            placeholder={product.description}
            onChange={handleDes}
          />
        ) : (
          product.description
        )}
      </td>
      <td>
        {editable ? (
          <input
            type="text"
            placeholder={category_name}
            onChange={handleCategory}
          />
        ) : (
          category_name
        )}
      </td>

      <td>
        {editable ? (
          <input type="file" onChange={handleImage} />
        ) : (
          <img
            src={`http://localhost:5000/${product.image_path}`}
            className="product_image"
            alt="product_image"
          />
        )}
      </td>

      <td>
        <button onClick={toggle}>{editable ? "save" : "edit"}</button>
        <button onClick={del}>delete</button>
      </td>
    </tr>
  );
}

export default ProductView;
