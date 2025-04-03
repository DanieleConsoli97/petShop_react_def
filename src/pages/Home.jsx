import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import CarouselCustom from "../components/Carousel"


function Home() {

  return (
    <>
    
      <Hero />
      <div className="container-sm">
        
        <CarouselCustom />
        
      </div>
    </>
  );
}

export default Home;