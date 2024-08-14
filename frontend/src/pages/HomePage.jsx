import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import Events from "../components/Route/Events/Events";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <div className="bg-teal-50">
        <Hero />
        <Categories />
        <BestDeals />
        <Events />
        <FeaturedProducts />
        <Sponsored />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
