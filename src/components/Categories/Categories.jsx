import React, { useContext } from "react";
import "./Categories.css";
import { useState } from "react";
import axios from "axios";
import { CategoriesContext } from "../../App";
import CategoryView from "./CategoryView/CategoryView";
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

function Categories() {
  const [categories, setCategories] = useContext(CategoriesContext);
  const [name, setName] = useState("");
  const [parent_category_id, setParentcat] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleParentcat = (e) => {
    setParentcat(e.target.value);
  };

  const create = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/Categories/create", {
        name: name,
        parent_category_id: parent_category_id,
      })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={handleOpen}>Add a Category</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Create category</h2>
          <form onSubmit={create}>
            <input type="text" placeholder="name" onChange={handleName} />
            <input type="text" placeholder="parentcat" onChange={handleParentcat} />
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>

      <table className="content-table">
        <tr>
          <th>id</th>
          <th>name</th>
          <th>parent_category_id</th>
        </tr>
        {categories.map((category, i) => {
          return <CategoryView key={i} category={category} />;
        })}
      </table>
    </div>
  );
}

export default Categories;
