/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// Question component handles the display and selection logic for each survey question
// eslint-disable-next-line react/prop-types
const Question = ({ question, options, type, onOptionChange, onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState([]); // State to track selected options
  const [isNextDisabled, setIsNextDisabled] = useState(true); // State to manage "Next" button disabled status
  const [showError, setShowError] = useState(false); // State to manage the visibility of the error message

  // Update the disabled status of the "Next" button based on the user's selections
  useEffect(() => {
    setIsNextDisabled(selectedOptions.length === 0); // Disable the button if no options are selected
    setShowError(false); // Reset error message when options are updated
  }, [selectedOptions]);

  // Handle option change based on the question type (single or multiple)
  const handleOptionChange = (option) => {
    let updatedOptions = [];
    if (type === "single") {
      // For single-choice questions, only one option can be selected
      updatedOptions = [option];
      setSelectedOptions(updatedOptions);
    } else if (type === "multiple") {
      // For multiple-choice questions, toggle the selected state of the option
      updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((opt) => opt !== option)
        : [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
    }
    onOptionChange(updatedOptions); // Update the parent component with the new selections
  };

  // Handle the "Next" button click
  const handleNextClick = () => {
    if (isNextDisabled) {
      setShowError(true); // Show error if attempting to proceed without making a selection
    } else {
      onNext(); // Proceed to the next question
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-lg">
      {/* Question Text */}
      <p className="text-xl font-bold mb-4 dark:text-gray-300">{question}</p>
      <ul className="space-y-2">
        {options.map((option, index) => (
          <li key={index}>
            <label className="flex items-center space-x-2">
              <input
                type={type === "multiple" ? "checkbox" : "radio"} // Input type depends on the question type
                checked={selectedOptions.includes(option.text)} // Check if the option is selected
                onChange={() => handleOptionChange(option.text)} // Update selection on change
                className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400 accent-green-300"
              />
              <span className="text-gray-700 dark:text-gray-300">
                {option.text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {/* Error message if no option is selected */}
      {showError && (
        <p className="text-red-500 mt-2">Please select at least one option.</p>
      )}

      {/* Next Button */}
      <div className="flex justify-end mt-4">
        <button
          className={`bg-white outline-black hover:outline-2 text-black font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 ${
            isNextDisabled ? "cursor-not-allowed opacity-50" : "" // Disable button styling when no option is selected
          }`}
          onClick={handleNextClick}
          disabled={isNextDisabled} // Disable button if no option is selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question;
