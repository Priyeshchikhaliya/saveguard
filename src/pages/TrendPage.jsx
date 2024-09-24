// src/pages/TrendPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import trendsData from "../Data/trendsData";

function TrendPage() {
  const { id } = useParams();
  const trend = trendsData.find((trend) => trend.id === parseInt(id));
  const navigate = useNavigate();

  if (!trend) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
          <p className="text-2xl font-bold text-center dark:text-gray-300">
            Article Not Found
          </p>
        </div>
      </Layout>
    );
  }

  const paragraphs = trend.content.trim().split("\n\n");

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg shadow transition"
        >
          Back
        </button>
        <article className="prose dark:prose-dark max-w-none">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {trend.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            By {trend.author} • {trend.date} • {trend.readTime} min read
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {trend.description}
          </p>
          <hr className="border-gray-300 dark:border-gray-600 mb-6" />
          <div className="text-justify text-gray-800 dark:text-gray-200 leading-relaxed space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <a
              href={trend.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 font-semibold hover:underline"
            >
              Read the full article on the original website →
            </a>
          </div>
        </article>
      </div>
    </Layout>
  );
}

export default TrendPage;
