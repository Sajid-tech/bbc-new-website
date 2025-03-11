// import { Link } from "react-router-dom";
// import email from "../../public/images/email.png"; 

// const ThankYou = () => {
//   return (
//     <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
//       <div className="text-center">
//         <img src={email} alt="Email Icon" className="w-80 mx-auto mb-4" />
        
//         <h2 className="text-5xl font-bold text-black">Thank You!</h2>
        
//         <p className="text-gray-600 mt-2 mb-6 text-xl">
//           Your data has been successfully submitted. Our team will contact you very soon.
//         </p>

//         <div className="flex justify-center gap-4">
//           <Link
//             to="/"
//             className="w-full sm:w-auto px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
//             >
//             Home
//           </Link>

//           <Link
//             to="/services"
//             className="w-full sm:w-auto px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
//             >
//             Services
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ThankYou;


import { Link } from "react-router-dom";
import email from "../../public/images/email.png"; 

const ThankYou = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500 p-6 overflow-hidden animate-[pulse_3s_infinite]">
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="w-60 h-60 bg-green-500 opacity-20 rounded-full blur-2xl animate-pulse"></div>
      </div>
 
      <div className="relative bg-white/90 backdrop-blur-lg shadow-lg rounded-xl p-10 max-w-lg w-full text-center transition-all transform hover:scale-105 hover:shadow-2xl">
        <img src={email} alt="Email Not Sent" className="w-24 mx-auto mb-6 animate-bounce" />

        <h2 className="text-5xl font-bold text-black">Thank You!</h2>
        <p className="text-gray-800 mt-3 mb-6 text-lg leading-relaxed">
          Your data has been successfully submitted. Our team will contact you very soon.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/services"
            className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;


