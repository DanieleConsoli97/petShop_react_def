
import Home from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./components/ProductsList";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (

 <GlobalProvider>
    <Router>
      <Routes>
        <Route Component={DefaultLayout}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/products" element={<ProductList />} />
        </Route>
      </Routes>
    </Router>
</GlobalProvider>

  );
}

export default App;