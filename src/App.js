import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login/Login";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login/*" element={<Login/>} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
