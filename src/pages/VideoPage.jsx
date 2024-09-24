import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

function VideoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const content = location.state?.content || "";

  // Function to convert YouTube URL to embed URL if it's a standard watch URL
  const getEmbedUrl = (url) => {
    const youtubeRegex = /https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url; // Return the original URL if it's already an embed URL or a different link
  };

  const embedUrl = getEmbedUrl(content);

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 md:p-6 w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg shadow transition"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold mb-4 dark:text-gray-300">
          Instructional Video
        </h1>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            className="w-full h-[400px] md:h-[600px] rounded-md shadow-lg"
            src={embedUrl}
            title="Recommendation Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}

export default VideoPage;
