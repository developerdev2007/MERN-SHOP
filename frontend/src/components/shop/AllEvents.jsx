import { useEffect } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { deleteEvent, getAllEvents } from "../../redux/actions/events";

const AllEvents = () => {
  const { seller } = useSelector((state) => state.seller);
  const { events, isLoading } = useSelector((state) => state.events);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteEvent(id));
    // window.location.reload();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents(seller._id));
  }, [dispatch, seller._id]);

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
        const d = params.row.name;

        const eventName = d.replace(/\s+/g, "-");

        return (
          <>
            <Link to={`/product/${eventName}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },

    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
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

export default AllEvents;
