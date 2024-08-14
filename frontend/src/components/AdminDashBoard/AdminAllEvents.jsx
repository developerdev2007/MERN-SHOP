import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { deleteEvent, getAllEvents } from "../../redux/actions/events";
import axios from "axios";
import { server } from "../../server";

const AdminAllEvents = () => {
  const { isLoading } = useSelector((state) => state.events);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`${server}/event/all-events-admin`, {
          withCredentials: true,
        });
        setEvents(data.events);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
    fetchEvents();
  }, []);

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 100,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "price",
      minWidth: 100,
      type: "number",
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "stock",
      minWidth: 100,
      type: "number",
      flex: 0.6,
    },
    {
      field: "sold",
      headerName: "sold out ",
      minWidth: 130,
      type: "number",
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];
  events &&
    events.forEach((data) =>
      rows.push({
        id: data?._id,
        name: data?.name,
        price: "US$ " + data?.discountPrice,
        stock: data?.stock,
        sold: data?.sold_out,
      })
    );
  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="w-full pt-1 mx-8 mt-14 bg-white ">
          <DataGrid
            rows={rows}
            pagesize={10}
            disableSelectionOnCLick
            autoHeight
            columns={columns}
          />
        </div>
      )}
    </>
  );
};

export default AdminAllEvents;
