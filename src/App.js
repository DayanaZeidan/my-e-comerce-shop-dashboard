import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "./components/Products/Products";
import Users from "./components/Users/Users";
import Categories from "./components/Categories/Categories";
import Navbar from "./components/Navbar/Navbar";
export const ProductsContext = React.createContext();
export const UsersContext = React.createContext();
export const CategoriesContext = React.createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/Products/get")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <ProductsContext.Provider value={[products, setProducts]}>
        <UsersContext.Provider value={[users, setUsers]}>
          <CategoriesContext.Provider value={[categories, setCategories]}>
            <BrowserRouter>
            <Navbar/>
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/users" element={<Users />} />
                <Route path="/categories" element={<Categories />} />
              </Routes>
            </BrowserRouter>
          </CategoriesContext.Provider>
        </UsersContext.Provider>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;
