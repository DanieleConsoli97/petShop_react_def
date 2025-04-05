
import Home from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

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
import CatProducts from "./pages/CatProducts";
import CheckOut from "./pages/CheckOut";
import Carrello from "./pages/Carrello";
import NotFound from "./pages/NotFound";
import WishList from "./pages/WishList";
import CheckouDone from "./pages/CheckoutDone";



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
            <Route path="/wishList" element={<WishList />} />
            <Route path="/checkoutDone" element={<CheckouDone />} />
            {/* Rotta dedicata per la pagina 404 */}
            <Route path="/404" element={<NotFound />} />
            {/* Rotta catch-all per gestire tutti i percorsi non validi */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>



  );
}

export default App;