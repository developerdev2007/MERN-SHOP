import styles from "../../../styles/style";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div
        className={`${styles.normalFlex} relative bg-cover min-h-[70vh] 800px:min-h-[80vh] w-full  bg-no-repeat `}
        style={{
          backgroundImage:
            "url(https://wallpapers.com/images/high/blue-ombre-background-1920-x-1152-48nnlmdk6rm2dvaa.webp)",
        }}
      >
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
          <h1 className="text-4xl leading-10 800px:text-5xl text-violet-700 font-[500] capitalize">
            Best Collection for <br />
            Home Decoration
          </h1>
          <p className="pt-4 text-lg font-[Poppins] font-[500] text-[#000000ba]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, in
            ipsum? Nesciunt quo accusamus iste, doloremque molestiae, quos
            voluptates, assumenda architecto <br />
            fuga voluptas repellat exercitationem!
          </p>
          <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
              <span className="text-[#fff] font-[Poppins] font-[400] text-lg">
                Shop now
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
