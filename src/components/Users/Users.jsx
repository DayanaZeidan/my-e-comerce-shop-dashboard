import React, { useContext } from "react";
import "./Users.css";
import { useState } from "react";
import axios from "axios";
import { UsersContext } from "../../App";
import UserView from "./UserView/UserView";
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

function Users() {
  const [users, setUsers] = useContext(UsersContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const create = (e) => {
    e.preventDefault();
    //initialze a new form-data (built in javascript)
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("quantity", quantity);
    // formData.append("price", price);
    // formData.append("category", category);
    // formData.append("image_path", name);
    axios
      .post("http://localhost:5000/Users/register", {
        name: name,
        username: username,
        email: email,
        password: password,
        role: role,
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
      <button onClick={handleOpen}>Add a user</button>
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
            <input placeholder="username" onChange={handleUsername} />
            <input type="email" placeholder="email" onChange={handleEmail} />
            <input type="text" placeholder="password" onChange={handlePassword} />
            <select placeholder="Role" onChange={handleRole}>
              <option value={"Admin"}>Admin</option>
              <option value={"Editor"}>Editor</option>
              <option value={"Subscriber"}>Subscriber</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>

      <table className="content-table">
        <tr>
          <th>id</th>
          <th>name</th>
          <th>username</th>
          <th>email</th>
          <th>password</th>
          <th>role</th>
        </tr>
        {users.map((user, i) => {
          return <UserView key={i} user={user} />;
        })}
      </table>
    </div>
  );
}

export default Users;
