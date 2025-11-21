const prebuiltTemplates = [
  {
    name: "Job Proposal",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Dear [Client Name],",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "I hope this email finds you well. I am writing to propose my services for your upcoming project.",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-3",
        type: "text",
        content: "Based on our discussion, I believe I can deliver the following:",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "text",
        content: "• [Service 1]\n• [Service 2]\n• [Service 3]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-5",
        type: "button",
        content: "View Proposal",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      },
      {
        id: "block-6",
        type: "text",
        content: "Please let me know if you have any questions or if you would like to proceed.",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-7",
        type: "text",
        content: "Best regards,\n[Your Name]",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      }
    ]
  },
  {
    name: "Event Invitation",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "You're Invited!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "24px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Dear [Name],",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-3",
        type: "text",
        content: "You are cordially invited to join us for [Event Name] on [Date] at [Time].",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "text",
        content: "Event Details:\n• Date: [Date]\n• Time: [Time]\n• Location: [Location]\n• Dress Code: [Dress Code]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-5",
        type: "button",
        content: "RSVP Now",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      },
      {
        id: "block-6",
        type: "text",
        content: "We look forward to seeing you there!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      }
    ]
  },
  {
    name: "Newsletter",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Monthly Newsletter - [Month] Edition",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "24px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "divider",
        content: "",
        styles: {
          backgroundColor: "#ffffff",
          padding: "8px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-3",
        type: "text",
        content: "Hello [Name],",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "text",
        content: "Here are the latest updates from our team:",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-5",
        type: "text",
        content: "📰 News & Updates\n\n[News Item 1]\n\n[News Item 2]\n\n[News Item 3]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-6",
        type: "button",
        content: "Read More",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      },
      {
        id: "block-7",
        type: "divider",
        content: "",
        styles: {
          backgroundColor: "#ffffff",
          padding: "8px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-8",
        type: "text",
        content: "Thank you for being a valued subscriber!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      }
    ]
  },
  {
    name: "Product Launch",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "🚀 Introducing Our Latest Innovation!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "24px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Dear Valued Customer,",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-3",
        type: "text",
        content: "We're excited to announce the launch of [Product Name], designed to [Product Benefit].",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "text",
        content: "Key Features:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n• [Feature 4]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-5",
        type: "button",
        content: "Learn More",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      },
      {
        id: "block-6",
        type: "button",
        content: "Shop Now",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      },
      {
        id: "block-7",
        type: "text",
        content: "Special Launch Offer: Get 20% off for a limited time!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      }
    ]
  }
];

module.exports = prebuiltTemplates;