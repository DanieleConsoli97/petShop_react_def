import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import CarouselCustom from "../components/Carousel"


function Home() {
  return (
    <div>
    
      <Hero />
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