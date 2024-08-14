import styles from "../../styles/style";

const Sponsored = () => {
  return (
    <>
      <div
        className={`${styles.section} hidden sm:block bg-slate-200  py-10  px-5 mb-12 cursor-pointer rounded-xl `}
      >
        <div className="flex justify-between w-full">
          <div className="flex items-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3KzhnKO-CQmzJHyFa2s0mP9tSVbNwE2aADA&s"
              alt=""
              className="object-contain w-full bg-white h-28"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="flex items-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5cKr223A3WuyrDPyrLJUZJ6mHlPssWnuew&s"
              className="object-contain w-full bg-white h-28"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="flex items-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnp9HxUty8mdovT3UHuXD4mH0LOQswZ8Z56w&s"
              className="object-contain w-full bg-white h-28"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="flex items-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTash2yE2U5LOn0b8iGRcNjTVyLxHYNrK96GQ&s"
              className="object-contain w-full bg-white h-28"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsored;
