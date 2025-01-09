import Lottie from "lottie-react";
import noTransactionAnimation from "../assets/nodata.json";

const NoTransactionFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie
        autoplay={true}
        animationData={noTransactionAnimation}
        loop={true}
        style={{ height: "400px", width: "400px" }}
      />
      <p className="text-lg text-gray-500 mt-[-30px]">No transactions found</p>
    </div>
  );
};

export default NoTransactionFound;
