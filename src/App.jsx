
import Home from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./components/ProductsList";

function App() {
  return (

 <GlobalProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
</GlobalProvider>

  );
}

export default App;