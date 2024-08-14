import { useEffect } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const AllProducts = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products, isLoading } = useSelector((state) => state.product);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
    // window.location.reload();
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id, navigate]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },

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
            <Link to={`/product/${params.id}`}>
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
  products &&
    products.forEach((data) =>
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
        <div className="w-full h-full pt-1 mx-8 mt-14 bg-white ">
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

export default AllProducts;
