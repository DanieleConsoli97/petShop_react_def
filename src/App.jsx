
import Home from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//layout
import DefaultLayout from "./layout/DefaultLayout";
import Search from "./pages/Search";

//pages
import DogFoodList from "./pages/DogFoodList";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductsList";
import DogProducts from "./pages/DogProducts";
import DogGamesList from "./pages/DogGamesList";
import CatFoodList from "./pages/CatFoodList";
import CatGamesList from "./pages/CatGamesList";
import Accessories from "./pages/Accesories";
import DiscountedProducts from "./pages/DiscountedProducts";




function App() {
  return (


    <GlobalProvider>
      <Router>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/cani" element={<DogProducts />} />
            <Route path="/products/cani/food" element={<DogFoodList />} />
            <Route path="/products/cani/games" element={<DogGamesList />} />
            <Route path="/products/gatti/food" element={<CatFoodList />} />
            <Route path="/products/gatti/games" element={<CatGamesList />} />
            <Route path="/products/Accessories" element={<Accessories />} />
            <Route path="/products/discounted" element={<DiscountedProducts />} />
            <Route path="/products/search/:term" element={<Search />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>

 

  );
}

export default App;