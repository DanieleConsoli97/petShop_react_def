import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import CarouselCustom from "../components/Carousel"
import Banner from "../components/Banner";


function Home() {

  return (
    <>
    
      <Hero />
      <Banner />
      
      <div className="container-sm">
        
        <CarouselCustom />
        
      </div>
    
    </>
  );
}

export default Home;