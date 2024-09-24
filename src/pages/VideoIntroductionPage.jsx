// src/pages/VideoIntroductionPage.jsx
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";

function VideoIntroductionPage() {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Handler to navigate to the survey page when the button is clicked
  const handleStartSurvey = () => {
    navigate("/survey");
  };

  return (
    <Layout>
      {/* Main Container */}
      <div className="flex flex-col gap-1 max-w-6xl mx-auto md:p-6 p-3 bg-white dark:bg-gray-800 rounded-md shadow-md">
        {/* Page Title */}
        <p className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Introduction to Privacy and Security
        </p>

        {/* Introductory Text */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          Learn the basics of privacy and security to protect yourself online.
          This video will guide you through the essential concepts in an
          easy-to-understand way.
        </p>

        {/* Video Embed Section */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-[1000px]">
            <iframe
              className="w-full h-[500px] rounded-md shadow-lg"
              src="https://www.youtube.com/embed/inWWhr5tnEA"
              title="Introduction to Privacy and Security"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Additional Information Text */}
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">
          This video introduces key concepts such as data privacy, online
          security, and the steps you can take to protect your personal
          information. Whether you are concerned about protecting your personal
          data or just want to learn how to stay safe online, this video is the
          perfect starting point.
        </p>

        {/* Call to Action Button to Start the Survey */}
        <div className="text-center w-full mt-4 p-10 rounded-lg transform transition-transform">
          <button
            onClick={handleStartSurvey}
            className="shadow-2xl relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-400 group-hover:to-lime-400 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Start your survey now
            </span>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default VideoIntroductionPage;
