import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { fetchCategories, fetchCats } from "../store/catSlice";
import "../style/sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.cat.categories);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <header className="sidebar-header">
        <div className="burger-menu" onClick={toggleSidebar}>
          <FontAwesomeIcon className="icon" icon={faBars} />
        </div>
        <Link className="app-name">KittyStore</Link>
      </header>
      <section className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/category/${category.id}`}
                onClick={() => dispatch(fetchCats(category.id))}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export { Sidebar };
