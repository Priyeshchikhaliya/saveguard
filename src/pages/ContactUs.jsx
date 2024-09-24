import { useState } from "react";
import mail_icon from "../assets/mail_icon.svg"; // Adjust the path as needed
import Layout from "../Layout/Layout";

const ContactUs = () => {
  const [copiedEmail, setCopiedEmail] = useState(null);

  const teamMembers = [
    { name: "Shirin Shams", email: "shirin.shams@uni-goettingen.de" },
    { name: "Ossama Raza", email: "ossama.raza@stud.uni-goettingen.de" },
    { name: "Phillip Hunder", email: "g.hunder@stud.uni-goettingen.de" },
    {
      name: "Priyeshkumar Chikhaliya",
      email: "p.chikhaliya@stud.uni-goettingen.de",
    },
  ];

  // Function to copy email to clipboard
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000); // Show copied message for 2 seconds
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Contact Us
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you need assistance or have any inquiries, please reach out to our
          team. We are happy to assist you.
        </p>
        <div className="mb-6">
          <p className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Meet the Team
          </p>
          <ul className="space-y-4">
            {teamMembers.map((member, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() =>
                  (window.location.href = `mailto:${member.email}`)
                } // Trigger mailto on block click
              >
                <div className="bg-[#F2F0E8] dark:bg-gray-600 rounded-lg h-[48px] w-[48px] flex justify-center items-center overflow-hidden">
                  <img src={mail_icon} alt="Mail Icon" className="h-6 w-6" />
                </div>
                <div className="w-full">
                  <p className="text-gray-900 dark:text-gray-100 font-semibold">
                    {member.name}
                  </p>
                  <div className="text-gray-600 dark:text-gray-300 flex items-center justify-between w-full">
                    <p>{member.email}</p>
                    <button
                      className="text-blue-500 hover:text-blue-700 text-sm underline ml-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents mailto trigger when copying
                        handleCopyEmail(member.email);
                      }}
                    >
                      {copiedEmail === member.email ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
