import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { error, success } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  // useEffect(() => {
  //   // if (error) {
  //   //   toast.error(error);
  //   // }
  //   // if (success) {
  //   //   toast.success("Product created successfully");
  //   //   navigate("/dashboard-products");
  //   // }
  // }, [success, error]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("originalPrice", originalPrice);
    newForm.append("tags", tags);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    dispatch(createProduct(newForm));
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully");
      navigate("/dashboard-products");
    }
  };
  return (
    <>
      <div
        className={`w-[90%] mt-6 800px:w-[60%] bg-slate-100 shadow-lg h-[80vh] rounded-sm p-3 overflow-y-auto`}
      >
        <h5 className="text-3xl font-semibold text-center font-Poppins ">
          Create Product{" "}
        </h5>

        <form action="" className="" onSubmit={handleSubmit}>
          <br />
          <div className="">
            <label htmlFor="" className="pb-2 ">
              Name <span className="text-xl text-red-700">*</span>
            </label>
            <input
              type="text"
              className="block w-full mt-2 appearance-none  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Enter product Name..."
            />
          </div>

          <br />
          <div className="">
            <label htmlFor="" className="pb-2 ">
              Description <span className="text-xl text-red-700">*</span>
            </label>
            <textarea
              cols="30"
              rows="10"
              type="text"
              className="block w-full mt-2 appearance-none   p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="name"
              placeholder="Enter Description of Product..."
            ></textarea>
          </div>

          <br />
          <div className="">
            <label htmlFor="" className="pb-2 ">
              Category <span className="text-xl text-red-700">*</span>
            </label>
            <select
              name=""
              className="w-full h-8 mt-2 border border-blue-500 rounded-sm focus:outline-none focus:ring-blue-600 "
              id=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose a category" className="">
                Choose a category
              </option>
              {categoriesData &&
                categoriesData?.map((data, index) => (
                  <>
                    <option value={data?.title} key={index} className="">
                      {data?.title}
                    </option>
                  </>
                ))}
            </select>
          </div>

          <br />
          <div className="">
            <label htmlFor="" className="pb-2 ">
              Tags <span className="text-xl text-red-700">*</span>
            </label>
            <input
              type="text"
              className="block w-full mt-2 appearance-none  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              name="tags"
              placeholder="Enter product Tags Name..."
            />
          </div>

          <br />
          <div className="">
            <label htmlFor="" className="pb-2 ">
              Original Price
            </label>
            <input
              type="number"
              className="block w-full mt-2 appearance-none  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              name="price"
              placeholder="Enter Original product Price..."
            />
          </div>

          <br />
          <div className="">
            <label htmlFor="" className="pb-2 ">
              Discount Price <span className="text-xl text-red-700">*</span>
            </label>
            <input
              type="number"
              className="block w-full mt-2 appearance-none  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              name="discountPrice"
              placeholder="Enter product Price with discount Price..."
            />
          </div>

          <br />
          <div className="">
            <label htmlFor="" className="pb-2 ">
              Product Stock <span className="text-xl text-red-700">*</span>
            </label>
            <input
              type="number"
              className="block w-full mt-2 appearance-none  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              name="stock"
              placeholder="Enter the size of stock..."
            />
          </div>

          <br />
          <div className="">
            <label htmlFor="upload" className="pb-2 ">
              Upload Images <span className="text-xl text-red-700">*</span>
            </label>
            <input
              type="file"
              name="upload"
              id="upload"
              className="hidden "
              multiple
              onChange={handleImageChange}
            />
            <div className="flex flex-wrap items-center w-full">
              <label htmlFor="upload" className="">
                <AiOutlinePlusCircle
                  size={40}
                  className="mt-3 cursor-pointer text-sky-500"
                />
              </label>
              {images &&
                images.map((img, index) => (
                  <>
                    <img
                      src={URL.createObjectURL(img)}
                      key={index}
                      alt=""
                      className="object-cover m-2 h-28 w-28 "
                    />
                  </>
                ))}
            </div>
          </div>
          <div className="flex items-center mt-4 justify-center">
            <input
              type="submit"
              value="Create"
              className="block w-10/12 text-center px-3 bg-teal-500 hover:bg-teal-600/90 text-bold  h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
