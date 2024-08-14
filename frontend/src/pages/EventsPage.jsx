import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import EventCard from "../components/Route/Events/EventCard";
import Loader from "../components/Layout/Loader";

const ProductsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <EventCard active={true} data={allEvents && allEvents[0]} />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
