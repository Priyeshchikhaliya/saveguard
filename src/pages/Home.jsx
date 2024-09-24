import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Step_1 from "../assets/Step_1.png";
import Step_2 from "../assets/Step_2.png";
import Step_3 from "../assets/Step_3.png";
import Secured from "../assets/secured.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import trendsData from "../Data/trendsData";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); // State for cycling between welcome messages
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const navigate = useNavigate(); // Navigation hook from React Router
  const location = useLocation(); // Location hook to handle state reset

  // Effect to cycle through welcome messages every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Handler for starting the survey, opens a modal for user choice
  const handleStartSurvey = () => {
    setIsModalOpen(true);
  };

  // Handler for modal response; redirects based on user's choice
  const handleModalResponse = (response) => {
    setIsModalOpen(false);
    if (response === "yes") {
      navigate("/survey");
    } else if (response === "no") {
      navigate("/video-introduction");
    }
  };

  // Resetting location state
  location.state = {};

  return (
    <Layout>
      <div className="flex flex-col gap-2 py-2 select-none mx-auto md:px-4 w-full max-w-[960px]">
        {/* Section 1: Welcome Banner */}
        <div className="relative select-none">
          <div className="relative w-full h-[210px] overflow-hidden bg-gradient-to-br from-teal-400 to-lime-400 rounded-lg transition-all duration-300"></div>

          {/* Secured Image with clip path */}
          <div className="size-96 absolute top-8 md:right-32 opacity-20">
            <img
              src={Secured}
              alt="step 1"
              className="mb-4 rounded-lg clip"
              style={{
                clipPath: "inset(0 0 32% 0)", // This cuts the bottom half
              }}
            />
          </div>

          {/* Welcome Text Overlay */}
          <div className="absolute top-10 left-4 md:left-20 text-left px-4">
            <div className="flex flex-col gap-2 max-w-full">
              {currentIndex === 0 ? (
                <div className="text-black dark:text-gray-200">
                  <p className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">
                    Welcome to SaveGuard
                  </p>
                  <p className="text-[14px] sm:text-[16px]">
                    The tool which assesses your security and provides
                    actionable insights to stay safe.
                  </p>
                </div>
              ) : (
                <div className="text-black dark:text-gray-200">
                  <p className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">
                    Welcome to SaveGuard
                  </p>
                  <p className="text-[14px] sm:text-[16px]">
                    Take a quick survey to learn how you can protect yourself
                    online.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-full mx-auto p-6 rounded-md">
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {/* Customized Section */}
            <div className="flex items-center gap-4 pt-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xl font-semibold dark:text-gray-200">
                  Customized
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our advice is tailored to meet your specific privacy needs.
                </p>
              </div>
            </div>

            {/* Expert-Backed Solutions Section */}
            <div className="flex items-center gap-4 pt-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xl font-semibold dark:text-gray-200">
                  Experts
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recommendations from certified experts.
                </p>
              </div>
            </div>

            {/* Constantly Updated Section */}
            <div className="flex items-center gap-4 pt-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xl font-semibold dark:text-gray-200">
                  Constantly Updated
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Solutions that evolve with emerging security threats.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Survey Invitation Section */}
        <div className="text-center w-full p-10 rounded-lg transform transition-transform hover:scale-110">
          <button
            onClick={handleStartSurvey}
            className="shadow-2xl relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-400 group-hover:to-lime-400 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Start your survey now
            </span>
          </button>
        </div>

        {/* How It Works Section */}
        <p className="text-xl font-bold mb-4 text-center dark:text-gray-300">
          Get Started in 3 Easy Steps
        </p>
        <div className="max-w-full mx-auto md:p-6 px-2 py-3 bg-white dark:bg-gray-800 mb-8 rounded-lg shadow-2xl">
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {/* Step 1 Block */}
            <div className="w-full md:w-1/3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
              <div className="h-[14rem] flex items-center justify-center">
                <img
                  src={Step_1}
                  alt="step 1"
                  className="rounded-lg object-cover h-full w-full"
                />
              </div>
              <p className="text-xl font-semibold my-4 dark:text-gray-200">
                1. Discover Your Behaviour
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Take our quick survey to uncover how well you are protected
                online. It's the first step toward a safer digital experience.
              </p>
            </div>

            {/* Step 2 Block */}
            <div className="w-full md:w-1/3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
              <div className="h-[14rem] flex items-center justify-center">
                <img
                  src={Step_2}
                  alt="step 2"
                  className="rounded-lg object-cover h-full w-full"
                />
              </div>
              <p className="text-xl font-semibold my-4 dark:text-gray-200">
                2. Analyze Your Results
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Instantly receive an overview of your online safety status,
                highlighting key areas that need your attention.
              </p>
            </div>

            {/* Step 3 Block */}
            <div className="w-full md:w-1/3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
              <div className="h-[14rem] flex items-center justify-center">
                <img
                  src={Step_3}
                  alt="step 3"
                  className="rounded-lg object-cover h-full w-full"
                />
              </div>
              <p className="text-xl font-semibold my-4 dark:text-gray-200">
                3. Get Expert Guidance
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Access personalized advice and actionable tips from our experts
                to enhance your digital security and privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Trends Section */}
        <div className="max-w-full mx-auto md:p-6 px-2 py-3 bg-white dark:bg-gray-800 shadow-2xl mb-8 rounded-lg">
          <p className="text-xl font-bold mb-6 text-center dark:text-gray-300">
            Trending Articles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendsData.map((trend) => (
              <Link
                key={trend.id}
                to={`/trends/${trend.id}`}
                className="block p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="mb-2">
                  <p className="text-xl font-semibold dark:text-gray-200">
                    {trend.title}
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <span className="mr-2">{trend.author}</span>
                    <span>•</span>
                    <span className="ml-2">{trend.date}</span>
                    <span>•</span>
                    <span className="ml-2">{trend.readTime} min read</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {trend.description}
                </p>
                <button className="text-blue-500 dark:text-blue-400 font-semibold">
                  Read more →
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center w-full p-6 rounded-lg transform transition-transform hover:scale-105">
          <p className="text-xl font-bold mb-6 dark:text-gray-300">
            Ready to Secure Your Online Presence?
          </p>
          <button
            onClick={handleStartSurvey}
            className="shadow-2xl relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-400 group-hover:to-lime-400 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Start your survey now
            </span>
          </button>
        </div>

        {/* Modal for Privacy and Security Knowledge Check */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl drop-shadow-lg p-4">
              <p className="text-lg font-bold mb-4 dark:text-gray-300">
                Do you know about privacy and security?
              </p>
              <div className="flex justify-center gap-10">
                <button
                  onClick={() => handleModalResponse("yes")}
                  className="bg-white text-black outline-black hover:outline-2 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleModalResponse("no")}
                  className="bg-white text-black outline-black hover:outline-2 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
