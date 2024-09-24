// src/pages/Survey.jsx
import SurveyQuestion from "../components/SurveyQuestion"; // Importing the SurveyQuestion component

function Survey() {
  return (
    // Main container with minimum height to cover the full screen
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Rendering the SurveyQuestion component which handles the survey logic */}
      <SurveyQuestion />
    </div>
  );
}

export default Survey;
