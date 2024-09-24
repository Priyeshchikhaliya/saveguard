export const questions = [
    {
        id: 1,
        question:
            "How often do you update your devices' software and applications?",
        options: [
            {
                text: "Immediately when updates are available",
                points: 5,
                nextQuestionId: 2,
                recommendationFullFilledId: 4,
            },
            { text: "Once a month", points: 4, nextQuestionId: 2 },
            { text: "Rarely", points: 2, nextQuestionId: 2 },
            { text: "Never", points: 0, nextQuestionId: 2 },
        ],
        type: "single",
    },
    {
        id: 2,
        question: "Which privacy tools do you currently use?",
        options: [
            {
                text: "VPN",
                points: 5,
                nextQuestionId: 3,
                recommendationFullFilledId: 3,
            },
            {
                text: "Ad blockers",
                points: 4,
                nextQuestionId: 3,
                recommendationFullFilledId: 6,
            },
            {
                text: "Secure browsers (e.g., DuckDuckGo)",
                points: 4,
                nextQuestionId: 3,
                recommendationFullFilledId: 6,
            },
            { text: "None", points: 0, nextQuestionId: 5 },
        ],
        type: "multiple",
    },
    {
        id: 3,
        question: "How do you manage your passwords?",
        options: [
            {
                text: "I use a password manager",
                points: 5,
                nextQuestionId: 4,
                recommendationFullFilledId: 8,
            },
            {
                text: "I use the same password for multiple accounts",
                points: 1,
                nextQuestionId: 4,
            },
            { text: "I write them down", points: 2, nextQuestionId: 6 },
            { text: "I memorize them", points: 3, nextQuestionId: 7 },
        ],
        type: "single",
    },
    {
        id: 4,
        question: "Do you regularly back up your important data?",
        options: [
            {
                text: "Yes, I use cloud services",
                points: 5,
                nextQuestionId: 6,
                recommendationFullFilledId: 7,
            },
            { text: "Yes, I use an external drive", points: 4, nextQuestionId: 6,  recommendationFullFilledId: 7,},
            { text: "No, I rarely back up", points: 2, nextQuestionId: 5 },
            { text: "Never", points: 0, nextQuestionId: 5 },
        ],
        type: "single",
    },
    {
        id: 5,
        question: "How do you handle online tracking and advertisements?",
        options: [
            {
                text: "I use privacy-focused browsers or extensions",
                points: 5,
                nextQuestionId: 6,
                recommendationFullFilledId: 8,
            },
            {
                text: "I clear cookies and browsing history regularly",
                points: 3,
                nextQuestionId: 6,
                recommendationFullFilledId: 6,
            },
            {
                text: "I don’t take any specific action",
                points: 0,
                nextQuestionId: 6,
            },
        ],
        type: "single",
    },
    {
        id: 6,
        question: "Do you use two-factor authentication (2FA)?",
        options: [
            {
                text: "Yes, for all accounts that support it",
                points: 5,
                nextQuestionId: 7,
                recommendationFullFilledId: 2,
            },
            {
                text: "Yes, but only for critical accounts (e.g., banking)",
                points: 4,
                nextQuestionId: 7,
            },
            { text: "No, I don’t use 2FA", points: 0, nextQuestionId: 13 },
        ],
        type: "single",
    },
    {
        id: 7,
        question: "What actions do you take to secure your home network?",
        options: [
            {
                text: "I use a strong, unique Wi-Fi password",
                points: 4,
                nextQuestionId: 8,
                recommendationFullFilledId: 1,
            },
            {
                text: "I regularly update my router firmware",
                points: 5,
                nextQuestionId: 8,
            },
            { text: "I do nothing special", points: 0, nextQuestionId: 15 },
        ],
        type: "multiple",
    },
    {
        id: 8,
        question: "How cautious are you with links and downloads?",
        options: [
            {
                text: "I avoid clicking on unknown links and downloading unverified files",
                points: 5,
                nextQuestionId: 9,
                recommendationFullFilledId: 9,
            },
            {
                text: "I occasionally click on links but am generally careful",
                points: 3,
                nextQuestionId: 9,
            },
            { text: "I don’t think much about it", points: 0, nextQuestionId: 9 },
        ],
        type: "single",
    },
    {
        id: 9,
        question: "How do you respond to suspicious emails or messages?",
        options: [
            {
                text: "I never open or respond to them",
                points: 5,
                nextQuestionId: 10,
                recommendationFullFilledId: 9,
            },
            {
                text: "I sometimes open them but don’t click on links",
                points: 2,
                nextQuestionId: 10,
            },
            {
                text: "I occasionally respond without much thought",
                points: 0,
                nextQuestionId: 10,
            },
        ],
        type: "single",
    },
    {
        id: 10,
        question: "Do you regularly clear your browser’s cache and cookies?",
        options: [
            {
                text: "Yes, frequently",
                points: 5,
                nextQuestionId: 11,
                recommendationFullFilledId:  6,
            },
            { text: "Occasionally", points: 3, nextQuestionId: 11 },
            { text: "Rarely", points: 1, nextQuestionId: 11 },
            { text: "Never", points: 0, nextQuestionId: 11 },
        ],
        type: "single",
    },
    {
        id: 11,
        question: "Do you review app permissions before installing?",
        options: [
            {
                text: "Always",
                points: 5,
                nextQuestionId: 13,
                recommendationFullFilledId: 10,
            },
            { text: "Sometimes", points: 3, nextQuestionId: 12 },
            { text: "Rarely", points: 2, nextQuestionId: 12 },
            { text: "Never", points: 0, nextQuestionId: 12 },
        ],
        type: "single",
    },
    {
        id: 12,
        question: "How do you handle location services on your devices?",
        options: [
            {
                text: "I keep location services off by default",
                points: 5,
                nextQuestionId: 13,
                recommendationFullFilledId: 10,
            },
            {
                text: "I only turn them on when needed",
                points: 4,
                nextQuestionId: 13,
            },
            {
                text: "I keep them on most of the time",
                points: 2,
                nextQuestionId: 13,
            },
            { text: "Always on", points: 0, nextQuestionId: 13 },
        ],
        type: "single",
    },
    {
        id: 13,
        question: "Do you use antivirus software on your devices?",
        options: [
            {
                text: "Yes, on all devices",
                points: 5,
                nextQuestionId: 14,
            },
            { text: "Only on my computer", points: 4, nextQuestionId: 14 },
            { text: "No, I don’t use any antivirus", points: 0, nextQuestionId: 14 },
        ],
        type: "single",
    },
    {
        id: 14,
        question:
            "Do you regularly review and manage your social media privacy settings?",
        options: [
            {
                text: "Yes, I review them often",
                points: 5,
                nextQuestionId: 15,
                recommendationFullFilledId: 11,
            },
            { text: "Occasionally", points: 3, nextQuestionId: null },
            { text: "Rarely", points: 1, nextQuestionId: null },
            { text: "Never", points: 0, nextQuestionId: null },
        ],
        type: "single",
    },
    {
        id: 16,
        question: "Do you use secure connections (HTTPS) when browsing?",
        options: [
            {
                text: "Always, I even use extensions to enforce HTTPS",
                points: 5,
                nextQuestionId: 18,
                recommendationFullFilledId: 6,
            },
            { text: "I check but don’t enforce it", points: 3, nextQuestionId: null },
            { text: "I don’t pay attention", points: 0, nextQuestionId: null },
        ],
        type: "single",
    },
    {
        id: 15,
        question: "Do you use incognito or private browsing modes?",
        options: [
            {
                text: "Yes, often",
                points: 5,
                nextQuestionId: 16,
                recommendationFullFilledId: 4,
            },
            { text: "Occasionally", points: 3, nextQuestionId: 16 },
            { text: "Never", points: 0, nextQuestionId: 16 },
        ],
        type: "single",
    },
    {
        id: 18,
        question:
            "Do you check for a site's security certificate before entering personal information?",
        options: [
            {
                text: "Always",
                points: 5,
                nextQuestionId: null,
                recommendationFullFilledId: 4,
            },
            { text: "Sometimes", points: 3, nextQuestionId: null },
            { text: "Rarely", points: 1, nextQuestionId: null },
            { text: "Never", points: 0, nextQuestionId: null },
        ],
        type: "single",
    },
];
