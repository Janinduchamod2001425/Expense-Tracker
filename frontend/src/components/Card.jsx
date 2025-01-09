import { FaLocationDot } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";

const categoryColorMap = {
  saving: "from-green-700 to-green-400", // Green gradient for saving
  expense: "from-yellow-400 to-yellow-800", // Yellow gradient for expense
  investment: "from-lime-500 to-lime-300", // Green-Yellow mix gradient for investment
  donation: "from-orange-500 to-orange-300", // Orange gradient for donation
  health: "from-teal-200 to-teal-900", // Teal gradient for health (greenish blue)
};

const Card = ({ transaction, authUser }) => {
  let { category, amount, location, date, paymentType, description } =
    transaction;
  const cardClass = categoryColorMap[category];

  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
  });

  // Capitalize the first character
  description = description[0]?.toUpperCase() + description.slice(1);
  category = category[0]?.toUpperCase() + category.slice(1);
  paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

  const formattedDate = formatDate(date);

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: { transactionId: transaction._id },
      });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction", error);
      toast.error(error.message);
    }
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-mono font-bold text-white">{category}</h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="w-6 h-6 border-t-2 border-b-2 mx-1  rounded-full animate-spin"></div>
            )}
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-gray-900 flex items-center gap-1 font-mono">
          <FaIdCard className="mr-2" />
          <span className="font-bold text-gray-900">Description:</span>{" "}
          {description}
        </p>
        <p className="text-gray-900 flex items-center gap-1 font-mono">
          <MdPayments className="mr-2" />
          <span className="font-bold text-gray-900">Payment Type:</span>{" "}
          {paymentType}
        </p>
        <p className="text-gray-900 flex items-center gap-1 font-mono">
          <FaSackDollar className="mr-2" />
          <span className="font-bold text-gray-900">Amount:</span> ${amount}
        </p>
        <p className="text-gray-900 flex items-center gap-1 font-mono">
          <FaLocationDot className="mr-2" />
          <span className="font-bold text-gray-900">Location:</span>{" "}
          {location || "Not Available"}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-extrabold">{formattedDate}</p>
          <img
            src={authUser.profilePicture}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
