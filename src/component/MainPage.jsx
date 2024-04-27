import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats } from "../store/catSlice";
import "../style/mainPage.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const catImages = useSelector((state) => state.cat.catImages);
  const selectedCategory = useSelector((state) => state.cat.selectedCategory);
  const status = useSelector((state) => state.cat.status);
  const error = useSelector((state) => state.cat.error);

  useEffect(() => {
    dispatch(fetchCats(selectedCategory));
  }, [selectedCategory, dispatch]);

  if (status === "Loading") {
    return <div>Loading...</div>;
  }

  if (status === "Rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-content">
      <div className="images-container">
        {catImages?.map((cat) => (
          <div key={cat.id} className="image-item">
            <img src={cat.url} alt={cat.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { MainPage };
