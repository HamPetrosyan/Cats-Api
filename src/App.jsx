import { Route, Routes } from "react-router-dom";
import { MainPage } from "./component/MainPage";
import { Sidebar } from "./component/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="category/:id" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
