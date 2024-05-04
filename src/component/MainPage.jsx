import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats, nextPage } from "../store/catSlice";
import "../style/mainPage.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { catImages, selectedCategory, status, error } = useSelector(
    (state) => state.cat
  );

  useEffect(() => {
    dispatch(fetchCats({ categoryId: selectedCategory, page }));
  }, [selectedCategory, page, dispatch]);

  const handleLoadMore = () => {
    dispatch(nextPage());
    setPage(page + 1);
  };

  if (status === "loading" && catImages.length === 0) {
    return <div style={{ margin: "2rem" }}>Loading...</div>;
  }

  if (status === "rejected") {
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
      {catImages.length > 0 && (
        <button onClick={handleLoadMore} disabled={status === "rejected"}>
          Load More
        </button>
      )}
    </div>
  );
};

export { MainPage };
