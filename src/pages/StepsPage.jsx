// src/pages/StepsPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

function StepsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const content = location.state?.content || "";

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 md:p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg shadow transition"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold mb-4 dark:text-gray-300">
          Steps to Follow
        </h1>
        <div className="text-gray-800 dark:text-gray-200 space-y-4">
          {content.split("\n").map((step, index) => (
            <p key={index} className="leading-relaxed">
              {step.trim()}
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default StepsPage;
