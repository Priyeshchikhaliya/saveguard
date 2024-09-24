import { recommendations } from "../Data/Recommendations";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckListType } from "../types/CheckListModel";
import * as React from "react";

// Type definition for the component props
type CheckListProps = {
  type: CheckListType; // The type of checklist (e.g., SECURITY, PRIVACY, etc.)
  fulfilledRecommendationIds: number[]; // Array of IDs for recommendations that have been fulfilled
};

// Status definitions for checklist evaluation
export const CheckListStatuses = {
  GOOD: {
    label: "Robust",
    color: {
      bgClass: "bg-green-100 dark:bg-green-800",
      textClass: "text-green-700 dark:text-green-300",
    },
    range: [0.7, 1.0], // Score range for "GOOD" status
  },
  OK: {
    label: "Partially",
    color: {
      bgClass: "bg-yellow-100 dark:bg-yellow-800",
      textClass: "text-yellow-700 dark:text-yellow-300",
    },
    range: [0.3, 0.7], // Score range for "OK" status
  },
  BAD: {
    label: "Vulnerable",
    color: {
      bgClass: "bg-red-100 dark:bg-red-800",
      textClass: "text-red-700 dark:text-red-300",
    },
    range: [0.0, 0.3], // Score range for "BAD" status
  },
} as const;

// Type for the status keys
export type CheckListStatus = keyof typeof CheckListStatuses;

// Function to calculate the checklist status based on the score
function calculateStatus(score: number): CheckListStatus {
  for (const key in CheckListStatuses) {
    const { range } = CheckListStatuses[key as CheckListStatus];
    if (score >= range[0] && score <= range[1]) {
      return key as CheckListStatus;
    }
  }
  return "BAD"; // Default status if score does not match any range
}

// Main component function
function CheckListDetail({
  type,
  fulfilledRecommendationIds = [],
}: CheckListProps) {
  const navigate = useNavigate(); // Hook to navigate between routes
  const location = useLocation(); // Hook to access the location state

  const label = type.toString(); // Get the type label as a string

  // Filter recommendations that are not fulfilled and match the current type
  const notFulfilledRecommendationLabels = recommendations
    .filter(
      (recommendation) =>
        !fulfilledRecommendationIds.includes(recommendation.id) &&
        recommendation.type === label
    )
    .map((recommendation) => recommendation.name);

  // Filter recommendations that are fulfilled and match the current type
  const fulFilledRecommendationsLabels = recommendations
    .filter(
      (recommendation) =>
        fulfilledRecommendationIds.includes(recommendation.id) &&
        recommendation.type === label
    )
    .map((recommendation) => recommendation.name);

  // Calculate fulfilled and not fulfilled counts
  const numberFulfilledRecommendations = fulFilledRecommendationsLabels.length;
  const numberNotFullFilledRecommendations =
    notFulfilledRecommendationLabels.length;

  // Calculate score and status
  const score =
    numberFulfilledRecommendations /
    (numberFulfilledRecommendations + numberNotFullFilledRecommendations);
  const percentage = score * 100;
  const status: CheckListStatus = calculateStatus(score);

  // Get status label and color classes based on calculated status
  const statusLabel = CheckListStatuses[status].label;
  const colors = CheckListStatuses[status].color;

  return (
    <div className="p-4 w-full">
      <div className="w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col justify-between">
        <div>
          {/* Header section displaying the type and status */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold capitalize text-gray-800 dark:text-gray-200">
              {label.toLowerCase()}
            </h2>
            <span
              className={`text-sm ${colors.bgClass} ${colors.textClass} font-semibold px-2 py-1 rounded-lg`}
            >
              {statusLabel}
            </span>
          </div>

          {/* Display the score */}
          <div className="flex flex-col items-center mb-4">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Score:
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {percentage.toFixed(0)}%
            </div>
          </div>

          {/* List of fulfilled and not fulfilled recommendations */}
          <div className="overflow-y-auto max-h-48">
            {/* Fulfilled recommendations */}
            {fulFilledRecommendationsLabels.map((recommendation, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="bg-gray-100 dark:bg-white p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-5 h-5 dark:stroke-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>{" "}
                </div>
                <span className="ml-3 text-gray-700 font-medium dark:text-white">
                  {recommendation}
                </span>
              </div>
            ))}

            {/* Not fulfilled recommendations */}
            {notFulfilledRecommendationLabels.map((recommendation, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="bg-gray-100 dark:bg-white p-2 rounded-lg">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-5 h-5 dark:stroke-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-gray-700 font-medium dark:text-white">
                  {recommendation}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Button to navigate to specific recommendations based on type */}
        <button
          onClick={() =>
            navigate("/recommendations", {
              state: { ...location.state, typeFilter: type },
            })
          }
          className="mt-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg shadow hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition duration-300"
        >
          Show {label.toLowerCase()} recommendations
        </button>
      </div>
    </div>
  );
}

export default CheckListDetail;
