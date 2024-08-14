import { useSelector } from "react-redux";
import styles from "../../../styles/style";
import EventCard from "./EventCard";
import Loader from "../../Layout/Loader";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  console.log("events");
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1 className="">Popular Events</h1>
          </div>
          <div className="grid w-full ">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
