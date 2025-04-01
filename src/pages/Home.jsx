import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import CarouselCustom from "../components/Carousel"


function Home() {

  return (
    <div>
    
      <Hero />
      <div className="container-sm">
        
        <CarouselCustom />
        
      </div>
    </div>
  );
}

export default Home;