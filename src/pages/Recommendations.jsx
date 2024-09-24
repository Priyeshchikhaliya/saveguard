// Import necessary hooks and components
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Layout from "../Layout/Layout";
import {recommendations} from "../Data/Recommendations";
import {Label, Listbox, ListboxButton, ListboxOption, ListboxOptions,} from "@headlessui/react";
import {CheckListType} from "../types/CheckListModel";

function Recommendations() {
    const location = useLocation();
    const navigate = useNavigate();
    const [recommendationsFilter, setRecommendationsFilter] = useState(
        location.state?.typeFilter ? location.state?.typeFilter : "All"
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Retrieve filtered recommendation IDs from state or set an empty array as default
    let filteredRecommendationIds =
        location.state?.filteredRecommendationIds || [];

    // Filter recommendations based on selected type and filtered IDs
    let filteredRecommendations = recommendations.filter((rec) => {
        if (Object.values(CheckListType).includes(recommendationsFilter)) {
            return rec.type === recommendationsFilter;
        }
        return recommendations.filter((rec) =>
            filteredRecommendationIds.includes(rec.id)
        );
    });

    // Further filter out recommendations that have already been fulfilled
    filteredRecommendations = filteredRecommendations.filter(
        (rec) => !location.state?.fulfilledRecommendationIds.includes(rec.id)
    );

    // Handle navigation to different sections (steps, video, detail) of each recommendation
    const handleNavigation = (content, type) => {
        navigate(`/${type}`, {state: {content}});
    };

  // Copy the settings URL to the clipboard based on the browser type
  const handleSetModalMessage = (rec) => {
    let link = "";

    // Enhanced browser detection to handle iPhone specific cases
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for Safari on iOS
    const isSafari =
      /Safari/.test(userAgent) &&
      !/Chrome/.test(userAgent) &&
      /iPhone|iPad|iPod/.test(userAgent);

    // Detect browser type and select the appropriate link
    if (/Chrome/.test(userAgent) && !isSafari) {
      link = rec.content.linkchrome;
    } else if (/Edg/.test(userAgent)) {
      link = rec.content.linkedge;
    } else if (isSafari) {
      link = rec.content.linksafari;
    } else if (/Firefox/.test(userAgent)) {
      link = rec.content.linkmozilla;
    } else {
      link = rec.content.linkchrome; // Default to Chrome link if unable to detect
    }

    if (link) {
      setModalMessage(
        `${link}`
      );
    }

    setIsModalOpen(true);

  };

    const handleOpenModal = (rec) => {

        handleSetModalMessage(rec);
        setIsModalOpen(true);

    };

    function handleCopyLink()  {
        console.log("Link Copied!")
        navigator.clipboard.writeText(modalMessage);
    }


  //  Render the article content by splitting and highlighting parts
    const renderContent = (content) => {
        const parts = content.split(/\*\*(.+?)\*\*/);
        return (
            <div className="text-gray-600 dark:text-gray-400">
                {parts.map((part, index) =>
                    index % 2 === 1 ? (
                        <strong key={index} className="font-semibold">
                            {part}
                        </strong>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </div>
        );
    };

  const handleModalResponse = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="min-h-screen w-full max-w-7xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 sm:p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg shadow transition"
        >
          Back
        </button>
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 md:mb-0">
              Your Recommended Actions
            </h1>
            <div className="flex-box row-auto text-left w-full md:w-auto">
              <Listbox
                value={recommendationsFilter}
                onChange={(e) => {
                  setRecommendationsFilter(e);
                }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <Label className="font-medium leading-6 text-gray-900 dark:text-gray-200">
                    <h2 className="text-lg sm:text-2xl">Filter by Type</h2>
                  </Label>
                  <div className="relative mt-2 w-full sm:w-48">
                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate capitalize">
                          {recommendationsFilter.toLowerCase()}
                        </span>
                      </span>
                    </ListboxButton>
                    <ListboxOptions
                      transition
                      className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      {[...Object.values(CheckListType), "ALL"].map((type) => (
                        <ListboxOption
                          key={type}
                          value={type}
                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 dark:text-gray-100 data-[focus]:bg-green-300 data-[focus]:text-white"
                        >
                          <div className="flex items-center">
                            <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold capitalize">
                              {type.toLowerCase()}
                            </span>
                          </div>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </div>
              </Listbox>
            </div>
          </div>

                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center mb-6">
                        Based on your survey responses, we’ve tailored these recommendations
                        to enhance your online security.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredRecommendations.map((rec) => (
                            <div
                                key={rec.id}
                                className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transform transition-transform hover:scale-105 flex flex-col"
                            >
                                <div className="mb-2">
                                    <h2 className="text-lg sm:text-xl font-bold dark:text-gray-200">
                                        {rec.name}
                                    </h2>
                                    <span className="text-sm text-gray-500 dark:text-gray-100">
                    {rec.content.author}
                  </span>
                                </div>
                                <div className="space-y-2">
                                    {renderContent(rec.content.article.substring(0, 200))}
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-2">
                                        <button
                                            onClick={() =>
                                                handleNavigation(rec.content.steps, "steps")
                                            }
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 w-full sm:w-auto"
                                        >
                                            Steps
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleNavigation(rec.content.video, "video")
                                            }
                                            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 w-full sm:w-auto"
                                        >
                                            Video
                                        </button>
                                        <button
                                            onClick={() => handleNavigation(rec.content, "detail")}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 w-full sm:w-auto"
                                        >
                                            Detailed Read
                                        </button>
                                        {rec.content.linkchrome && (
                                            <button
                                                onClick={() => handleOpenModal(rec)}
                                                className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 w-full sm:w-auto md:block hidden"
                                            >
                                                One Click
                                            </button>
                                        )}
                                    </div>
                                    <div
                                        className="pt-4 flex flex-row justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
                                        <div className="flex flex-row gap-2 items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                                />
                                            </svg>
                                            {" "}
                                            <span className="font-bold">{rec.content.rating}</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                                                />
                                            </svg>
                                            {" "}
                                            <span>{rec.content.estimatedVideoTime}</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                                                />
                                            </svg>
                                            {" "}
                                            <span>{rec.content.estimatedReadTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl drop-shadow-lg p-6 flex flex-col items-center">
                        <h1 className="text-2xl">Redirecting you to your settings</h1>
                        <div className="p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-16"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                                />
                            </svg>
                        </div>
                        <h3 className="p-2">
                            Please paste this URL into your browser's address bar:
                        </h3>

                        <div
                            className="flex items-center justify-center gap-2 bg-gray-100 p-2 mb-4 rounded-lg dark:text-black select-text">
                            <p className="text-lgfont-bold text-center">
                                {modalMessage}
                            </p>
                            <button onClick={handleCopyLink()} className="focus:outline-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6 cursor-pointer"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                                    />
                                </svg>
                            </button>
                        </div>


                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleModalResponse}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Recommendations;
