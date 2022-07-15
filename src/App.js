import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage";
const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    
  )
};

export default App;