import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/style";

const PaymentMethod = () => {
  return (
    <>
      <div className="w-full px-4">
        <div className="flex items-center justify-between w-full ">
          <h1 className="font-semibold text-2xl text-[#000000ba] pb-2     ">
            Payment Methods
          </h1>
          <div className={`${styles.button} !rounded-lg`}>
            <span className="text-[#fff]">Add New</span>
          </div>
        </div>
        <br />
        <div className="flex items-center justify-between w-full h-16 px-3 pr-10 bg-white rounded-md shadow-lg ">
          <div className="flex items-center">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              fill="#000"
              version="1.1"
              viewBox="0 0 750 471"
            >
              <g>
                <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                  <g fillRule="nonzero">
                    <rect
                      width="750"
                      height="471"
                      x="0"
                      y="0"
                      fill="#0E4595FF"
                      rx="40"
                    ></rect>
                    <path
                      fill="#FFF"
                      d="M278.1975 334.2275L311.5585 138.4655 364.9175 138.4655 331.5335 334.2275z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M524.308 142.688c-10.572-3.966-27.137-8.222-47.823-8.222-52.725 0-89.865 26.55-90.18 64.603-.298 28.13 26.513 43.822 46.753 53.186 20.77 9.594 27.752 15.714 27.654 24.283-.132 13.121-16.587 19.116-31.923 19.116-21.357 0-32.703-2.966-50.226-10.276l-6.876-3.111-7.49 43.824c12.464 5.464 35.51 10.198 59.438 10.443 56.09 0 92.501-26.246 92.916-66.882.2-22.268-14.016-39.216-44.8-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.667-16.839 30.556-16.839 17.45-.27 30.089 3.535 39.937 7.5l4.781 2.26 7.234-42.43"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M661.615 138.465h-41.231c-12.774 0-22.332 3.487-27.942 16.234l-79.245 179.404h56.032s9.161-24.123 11.233-29.418c6.124 0 60.554.084 68.337.084 1.596 6.853 6.491 29.334 6.491 29.334h49.513l-43.188-195.638zm-65.418 126.407c4.413-11.279 21.26-54.723 21.26-54.723-.316.522 4.38-11.334 7.075-18.684l3.606 16.879s10.217 46.728 12.352 56.528h-44.293z"
                    ></path>
                    <path
                      fill="#fff"
                      fillOpacity="1"
                      d="M45.879 138.465l-.682 4.074c21.091 5.106 39.93 12.494 56.422 21.686l47.346 169.691 56.455-.066 84.004-195.385h-56.522l-52.24 133.496-5.566-27.129a88.005 88.005 0 00-.823-2.49l-18.166-87.35c-3.23-12.396-12.598-16.095-24.187-16.527H45.879z"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <h5 className="pl-5 font-medium">developerdev2007</h5>
          </div>
          <div className="flex items-center pl-8">
            <h6 className="font-medium">1234 **** **** ****</h6>
            <h5 className="pl-6 ">08/24</h5>
          </div>
          <div className="min-w-[10%}">
            <AiOutlineDelete size={25} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
