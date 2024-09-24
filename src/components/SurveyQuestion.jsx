import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../Data/Questions.jsx"; // Importing questions data
import Question from "./Question"; // Question component that handles individual survey questions
import { recommendations } from "../Data/Recommendations.tsx"; // Importing recommendations data
import Layout from "../Layout/Layout.jsx"; // Layout component for consistent styling

// Function to display the survey completion section
function getCompletedSection(
  navigate,
  points,
  maxPoints,
  fulfilledRecommendationIds,
  filteredRecommendationIds
) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      <p className="text-2xl font-bold mb-4 text-center dark:text-gray-300 animate-fade-in">
        Thank you for completing the survey!
      </p>
      {/* Success Icon */}
      <div className="flex items-center justify-center mb-4 animate-pop-up">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-24 text-green-500 dark:text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() =>
            navigate("/checklist", {
              state: {
                points,
                maxPoints,
                fulfilledRecommendationIds,
                filteredRecommendationIds,
              },
            })
          }
          className="bg-green-300 outline-black hover:outline-2 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Proceed to Checklist
        </button>
      </div>
    </div>
  );
}

const SurveyQuestion = () => {
  // State management for the survey
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // Tracks current question by ID
  const [maxPoints, setMaxPoints] = useState(0); // Tracks the maximum possible points in the survey
  const [points, setPoints] = useState(0); // Tracks the user's accumulated points
  const [selectedOptions, setSelectedOptions] = useState([]); // Tracks selected options for the current question
  const [fulfilledRecommendationIds, setFulfilledRecommendationIds] = useState(
    []
  ); // Tracks recommendations fulfilled based on answers
  const navigate = useNavigate(); // Navigation hook to change routes programmatically

  const currentQuestion = questions.find((q) => q.id === currentQuestionId); // Finds the current question based on ID

  // Adds fulfilled recommendation IDs to the state if not already present
  function pushFulfilledRecommendationIds(fulfilledRecommendationId) {
    console.log("pushing fulfilledID", fulfilledRecommendationId);
    if (
      !!fulfilledRecommendationId &&
      !fulfilledRecommendationIds.includes(fulfilledRecommendationId)
    ) {
      setFulfilledRecommendationIds((prevState) => [
        fulfilledRecommendationId,
        ...prevState,
      ]);
    }
  }

  // Handles changes when the user selects an option
  const handleOptionChange = (options) => {
    setSelectedOptions(options);
  };

  // Filters recommendations based on the user's accumulated points
  const filteredRecommendationIds = recommendations
    .filter(
      (rec) =>
        rec.minPoints <= points && !fulfilledRecommendationIds.includes(rec.id)
    )
    .map((rec) => rec.id);

  // Handles the logic when the user proceeds to the next question
  const handleNext = () => {
    if (!currentQuestion) return;

    // Finds the selected option in the current question
    const selectedOption = currentQuestion.options.find((opt) =>
      selectedOptions.includes(opt.text)
    );

    const nextQuestionId = selectedOption?.nextQuestionId;

    // Logic for single-choice questions
    if (currentQuestion.type === "single") {
      // Calculate maximum points for the current question
      const maxPointsOfQuestion = currentQuestion.options.reduce(
        (acc, option) => Math.max(acc, option.points),
        0
      );
      setMaxPoints((prevMaxPoints) => prevMaxPoints + maxPointsOfQuestion);

      // Update the user's points and fulfilled recommendations
      setPoints((prevPoints) => prevPoints + (selectedOption?.points || 0));
      pushFulfilledRecommendationIds(
        selectedOption?.recommendationFullFilledId
      );
    }
    // Logic for multiple-choice questions
    else if (currentQuestion.type === "multiple") {
      // Calculate total points and max points for multiple selected options
      const maxPointsOfQuestion = currentQuestion.options.reduce(
        (acc, option) => acc + option.points,
        0
      );
      setMaxPoints((prevMaxPoints) => prevMaxPoints + maxPointsOfQuestion);

      let totalPoints = 0;
      selectedOptions.forEach((option) => {
        const optionDetails = currentQuestion.options.find(
          (opt) => opt.text === option
        );

        if (optionDetails) {
          totalPoints += optionDetails.points || 0;
          pushFulfilledRecommendationIds(
            optionDetails.recommendationFullFilledId
          );
        }
      });
      setPoints((prevPoints) => prevPoints + totalPoints);
    }

    // Navigate to the next question or show completion section if there are no more questions
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
      setSelectedOptions([]); // Reset selected options when moving to the next question
    } else {
      // End of survey, prepare to show checklist
      setCurrentQuestionId(undefined);
    }
  };

  return (
    <Layout>
      <div className="flex items-center">
        {currentQuestion ? (
          <div>
            {/* Render Question Component */}
            <div className="mt-16">
              <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                type={currentQuestion.type}
                onOptionChange={handleOptionChange}
                onNext={handleNext}
                // Pass key to force re-render of Question component when question changes
                key={currentQuestionId}
              />
            </div>
          </div>
        ) : (
          // Show completion section when survey ends
          getCompletedSection(
            navigate,
            points,
            maxPoints,
            fulfilledRecommendationIds,
            filteredRecommendationIds
          )
        )}
      </div>
    </Layout>
  );
};

export default SurveyQuestion;
