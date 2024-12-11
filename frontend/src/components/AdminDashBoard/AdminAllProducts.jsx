import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { server } from "../../server";

const AllProducts = () => {
  const { isLoading } = useSelector((state) => state.product);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/product/all-products-admin`,
          {
            withCredentials: true,
          }
        );
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

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
      headerName: "Preview",
      flex: 0.8,
      minWidth: 100,
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
        <div className="w-full">
          <div className="w-11/12  h-full pt-1 mx-auto mt-14 bg-white ">
            <DataGrid
              rows={rows}
              pagesize={10}
              disableSelectionOnCLick
              autoHeight
              columns={columns}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
