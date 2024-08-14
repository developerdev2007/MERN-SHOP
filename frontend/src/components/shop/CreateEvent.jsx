import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createEvent } from "../../redux/actions/events";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    e.preventDefault();

    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  //   if (success) {
  //     // toast.success("Event created successfully");
  //     // navigate("/dashboard-events");
  //     // window.location.reload();
  //   }
  // }, []);

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
    newForm.append("start_date", startDate.toISOString());
    newForm.append("finish_date", endDate.toISOString());

    dispatch(createEvent(newForm));
    // window.location.reload();
  };
  return (
    <>
      <div
        className={`w-[90%] 800px:w-[50%] bg-white  shadow-lg h-[80vh] rounded-sm p-3 overflow-y-auto`}
      >
        <h5 className="text-3xl font-semibold text-center font-Poppins ">
          Create Event{" "}
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
              placeholder="Enter Event product Name..."
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
              placeholder="Enter Description of Event Product..."
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
              placeholder="Enter Event product Tags Name..."
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
              placeholder="Enter Original Event product Price..."
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
              placeholder="Enter Event product Price with discount Price..."
            />
          </div>

          <br />
          <div className="">
            <label htmlFor="" className="pb-2 ">
              Event Product Stock{" "}
              <span className="text-xl text-red-700">*</span>
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
            <label htmlFor="" className="pb-2 ">
              Event Start Date <span className="text-xl text-red-700">*</span>
            </label>
            <input
              type="date"
              id="start-date"
              className="block w-full mt-2 appearance-none  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              onChange={handleStartDateChange}
              min={today}
              name="start-date"
              // placeholder="Enter the size of stock..."
            />
          </div>

          <br />
          <div className="">
            <label htmlFor="" className="pb-2 ">
              Event End Date <span className="text-xl text-red-700">*</span>
            </label>
            <input
              type="date"
              id="end-date"
              className="block w-full mt-2 appearance-none  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              onChange={handleEndDateChange}
              min={minEndDate}
              name="end-date"
              // placeholder="Enter the size of stock..."
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
          <div className="flex items-center justify-center text-center">
            <input
              type="submit"
              value="Create Event"
              className="block w-full text-center bg-teal-500 hover:bg-teal-600 text-bold mt-2  h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
