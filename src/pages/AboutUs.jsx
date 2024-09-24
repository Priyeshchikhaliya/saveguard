import Layout from "../Layout/Layout";
import Secured from "../assets/secured_2.png";

const AboutUs = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md select-none text-justify">
        <p className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Why Use SaveGuard?
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Welcome to SaveGuard! We are committed to providing you with the tools
          and knowledge to protect your online privacy and security. Our app
          offers personalized recommendations that are tailored to your needs
          based on comprehensive surveys, expert insights, and cutting-edge
          research.
        </p>
        <p className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Our Mission
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          At SaveGuard, our mission is to empower individuals and organizations
          with the best practices for safeguarding their online presence. We
          strive to make online security accessible, practical, and
          straightforward, ensuring that everyone can navigate the digital world
          safely and confidently.
        </p>
        <p className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Why We Stand Out
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our approach is rooted in extensive research and collaboration with
          experts in cybersecurity. We have conducted surveys, interviews, and
          analyzed academic papers to carefully craft questions and
          recommendations that reflect the latest trends and threats in online
          security. Our app doesn’t just provide advice—it offers actionable
          steps tailored to your specific needs, making security less daunting
          and more effective.
        </p>
        <p className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          How It Works
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          SaveGuard’s intuitive survey guides you through a series of questions
          designed to assess your current security posture. Based on your
          responses, our app delivers targeted recommendations, video tutorials,
          and security checklists, empowering you to take control of your
          digital life.
        </p>
        <div className="flex justify-center">
          <img
            src={Secured}
            alt="Security Illustration"
            className="mt-2 size-96 mb-4 rounded-lg"
          />
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Join us on our mission to make the internet a safer place for
          everyone. Together, we can turn online security from a challenge into
          an everyday habit.
        </p>
      </div>
    </Layout>
  );
};

export default AboutUs;
