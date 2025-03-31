import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import PathNav from "../components/PathNav"
import CarouselCustom from "../components/Carousel"


function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PathNav />
      <div className="container-sm">
        <p>Prodotti per Cani</p>
        <CarouselCustom />
        <p>Prodotti per gatti</p>
        <CarouselCustom />
      </div>
    </div>
  );
}

export default Home;