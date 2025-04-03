
import Home from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//layout
import DefaultLayout from "./layout/DefaultLayout";
import Search from "./pages/Search";
import Footer from './components/Footer';

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
import CatProducts from "./pages/CatProducts";
import CheckOut from "./pages/CheckOut";
import Carrello from "./pages/Carrello";
import NotFound from "./pages/NotFound";



function App() {
  return (


    <GlobalProvider>
      <Router>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" element={<Home />} />
            <Route path="/prodotti/:slug" element={<ProductDetails />} />
            <Route path="/prodotti" element={<ProductList />} />
            <Route path="/prodotti/cani" element={<DogProducts />} />
            <Route path="/prodotti/cani/cibo" element={<DogFoodList />} />
            <Route path="/prodotti/cani/giochi" element={<DogGamesList />} />
            <Route path="/prodotti/gatti" element={<CatProducts />} />
            <Route path="/prodotti/gatti/cibo" element={<CatFoodList />} />
            <Route path="/prodotti/gatti/giochi" element={<CatGamesList />} />
            <Route path="/prodotti/accessori" element={<Accessories />} />
            <Route path="/prodotti/promozioni" element={<DiscountedProducts />} />
            <Route path="/prodotti/search/:term" element={<Search />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/carrello" element={<Carrello />} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </GlobalProvider>



  );
}

export default App;