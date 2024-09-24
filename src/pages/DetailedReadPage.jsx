// src/pages/DetailedReadPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

function DetailedReadPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const content = location.state?.content || {};

  // Ensure article exists and handle potential undefined values
  const article = content.article || "";

  // Split the content into paragraphs based on double line breaks
  const paragraphs = article.trim().split("\n\n");

  // Function to render each paragraph, identifying headers and plain text
  const renderContent = (paragraph) => {
    const titlePattern = /\*\*(.+?)\*\*/g; // Pattern to identify all text between double asterisks

    // Split paragraph by detected headers, rendering each part appropriately
    const parts = paragraph.split(titlePattern);

    return (
      <div className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4 text-left">
        {parts.map((part, index) =>
          index % 2 === 1 ? ( // Odd index parts are headers
            <h2
              key={index}
              className="text-xl font-semibold mt-4 mb-2 dark:text-gray-100"
            >
              {part.trim()}
            </h2>
          ) : (
            <p key={index}>{part.trim()}</p> // Even index parts are normal text
          )
        )}
      </div>
    );
  };

  // Check if article content exists and has valid content
  if (!article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-gray-800 dark:text-gray-200">
          <p>No detailed content available to display.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 md:p-6 flex justify-center">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 md:p-8 p-3  rounded-lg shadow-lg">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg shadow transition"
          >
            Back
          </button>
          <h1 className="text-4xl font-bold mb-6 dark:text-gray-300 text-left">
            Detailed Read
          </h1>
          <article className="prose dark:prose-invert max-w-none">
            {paragraphs.map((paragraph, index) => (
              <React.Fragment key={index}>
                {renderContent(paragraph)}
              </React.Fragment>
            ))}
          </article>
          {content.author && (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Author: {content.author}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DetailedReadPage;
