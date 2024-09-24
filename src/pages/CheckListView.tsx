// src/pages/CheckListView.jsx
import * as React from "react";
import CheckListDetail from "../components/CheckListDetail"; // Component for displaying individual checklist details
import { useLocation, useNavigate } from "react-router-dom"; // Hooks for navigation and accessing router state
import { CheckListType } from "../types/CheckListModel"; // Enum for the different checklist types
import { recommendations } from "../Data/Recommendations"; // Array of recommendations data
import Layout from "../Layout/Layout"; // Layout component for consistent page structure

// Helper function to map recommendations by their IDs, grouped by type
function mapRecommendationsById(ids) {
  const result = {};

  // Initialize an empty array for fulfilled recommendation IDs for each type
  Object.values(CheckListType).forEach(
    (type) =>
      (result[type] = {
        fulfilledRecommendationIds: [],
      })
  );

  // Populate the result object with recommendations based on their type
  ids.forEach((id) => {
    const recommendation = recommendations.find((r) => r.id === id);
    if (recommendation) {
      const type = recommendation.type; // Get the type of the recommendation
      result[type].fulfilledRecommendationIds.push(id); // Add the ID to the corresponding type
    }
  });

  return result;
}

function CheckListView() {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const location = useLocation(); // Hook to access the location state passed from the previous page

  // Destructure and provide default values to avoid issues if properties are missing
  const {
    points = 0,
    maxPoints = 0,
    fulfilledRecommendationIds = [],
  } = location.state || {};

  // Get recommendations grouped by type based on fulfilled IDs
  const checkListResults = mapRecommendationsById(fulfilledRecommendationIds);

  console.log(checkListResults); // Debugging log to check the structure of checklist results

  return (
    <Layout>
      {/* Main container for the checklist view */}
      <div className="flex flex-col items-center max-w-4xl mx-auto min-h-screen py-10 px-4">
        {/* Overall Score Section */}
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            {/* Displaying the overall score */}
            <div className="flex-shrink-0 text-center md:text-left md:mr-6">
              <h2 className="text-lg font-bold dark:text-gray-200">
                Overall Score:
              </h2>
              <h1 className="text-5xl font-bold text-green-600 dark:text-green-400">
                {points} / {maxPoints}
              </h1>
            </div>
            {/* Explanation and navigation button */}
            <div className="flex-grow mt-4 md:mt-0">
              <p className="text-gray-700 dark:text-gray-300">
                This score reflects the overall assessment you achieved in our
                questionnaire. Based on your survey responses, we have selected
                recommendations that match your current level.
              </p>
              <button
                onClick={() =>
                  navigate("/recommendations", {
                    state: { ...location.state, typeFilter: undefined },
                  })
                }
                className="mt-4 bg-gradient-to-r from-green-400 to-teal-400 text-white py-2 px-4 rounded-lg shadow hover:from-green-500 hover:to-teal-500 transition duration-300"
              >
                Show all recommendations
              </button>
            </div>
          </div>
        </div>

        {/* Displaying checklist details for each type */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {Object.values(CheckListType).map((type) => (
            <CheckListDetail
              key={type}
              type={type}
              fulfilledRecommendationIds={
                checkListResults[type.toString()]?.fulfilledRecommendationIds
              }
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default CheckListView;
