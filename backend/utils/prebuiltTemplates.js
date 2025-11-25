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
  },

  {
    name: "Welcome Email",
    blocks: [
      {
        id: "block-1",
        type: "image",
        content: "",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000",
          width: "160px",
          height: "auto",
          url: "/mnt/data/A_vector-based_digital_graphic_design_showcases_th.png"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Welcome to [Company Name]!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "24px",
          color: "#000000"
        }
      },
      {
        id: "block-3",
        type: "text",
        content: "Hi [Name],\n\nThanks for joining [Company]. We're excited to have you — here are a few ways to get started:",
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
        content: "• Explore the dashboard\n• Import your first template\n• Follow our quick-start guide",
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
        content: "Get Started",
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
        content: "If you need any help, reply to this email — we're here to help.",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "14px",
          color: "#666666"
        }
      }
    ]
  },

  {
    name: "Password Reset",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Password Reset Request",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Hi [Name],",
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
        content: "We received a request to reset your password. Click the button below to proceed. This link will expire in 60 minutes.",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "button",
        content: "Reset Password",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      },
      {
        id: "block-5",
        type: "text",
        content: "If you didn't request a reset, ignore this email or contact support.",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "14px",
          color: "#666666"
        }
      }
    ]
  },

  {
    name: "Order Confirmation",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Thank you for your order, [Name]!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Order #[Order ID]\nPlaced on [Date]",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "14px",
          color: "#666666"
        }
      },
      {
        id: "block-3",
        type: "text",
        content: "Items:\n• [Item 1] — [Qty]\n• [Item 2] — [Qty]\n\nSubtotal: [Subtotal]\nTotal: [Total]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "button",
        content: "View Order",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      },
      {
        id: "block-5",
        type: "text",
        content: "We'll send an update when your order ships.",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "14px",
          color: "#666666"
        }
      }
    ]
  },

  {
    name: "Shipping Notification",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Your order is on the way!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Hi [Name],\n\nGood news — your package (Order #[Order ID]) has shipped.",
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
        content: "Carrier: [Carrier]\nTracking #: [Tracking Number]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "button",
        content: "Track Package",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  },

  {
    name: "Thank You (Post-meeting)",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Thank you for your time, [Name]",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "It was great meeting with you. Here's a quick recap of next steps:",
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
        content: "• [Action 1]\n• [Action 2]\n• [Action 3]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "text",
        content: "Looking forward to continuing — let me know if you have questions.",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "14px",
          color: "#666666"
        }
      },
      {
        id: "block-5",
        type: "text",
        content: "Best,\n[Your Name]",
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
    name: "Sales Offer / Discount",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Limited-Time Offer — Save [X]%!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "22px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Hi [Name],\n\nFor a short time only, enjoy [X]% off [Product/Service].",
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
        content: "Use code: [CODE] — expires [Date]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "button",
        content: "Claim Offer",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  },

  {
    name: "Abandoned Cart",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "You left something behind...",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Hi [Name],\n\nItems in your cart are waiting. Complete your order now and enjoy free shipping.",
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
        content: "• [Item 1]\n• [Item 2]\n\nSubtotal: [Subtotal]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "button",
        content: "Complete Your Order",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  },

  {
    name: "Feedback Request",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "We'd love your feedback",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Hi [Name],\n\nThanks for using [Product]. Could you spare 2 minutes to tell us how we did?",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-3",
        type: "button",
        content: "Give Feedback",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  },

  {
    name: "Webinar Invite",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Join our webinar: [Topic]",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "22px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Date: [Date]\nTime: [Time]\nHost: [Host Name]",
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
        content: "What you'll learn:\n• [Point 1]\n• [Point 2]\n• [Point 3]",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "button",
        content: "Register Now",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  },

  {
    name: "Appointment Reminder",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Appointment Reminder",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Hi [Name],\n\nThis is a reminder for your appointment with [Person] on [Date] at [Time].",
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
        content: "Location: [Location]\nIf you need to reschedule, click below.",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "button",
        content: "Reschedule",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  },

  {
    name: "Follow-Up (After Proposal)",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Following up on our proposal",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Hi [Name],\n\nJust checking in to see if you had any questions about the proposal I sent on [Date].",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-3",
        type: "button",
        content: "Reply to Discuss",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  },

  {
    name: "Post-Event Thank You",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Thank you for attending [Event Name]!",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "We appreciate you joining us. Here are event highlights and resources:",
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
        content: "• [Resource 1]\n• [Resource 2]\n\nWe hope to see you next time.",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      }
    ]
  },

  {
    name: "Blog Update",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "New on the blog: [Post Title]",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Hi [Name],\n\nWe just published a new article: [Post Title]. Here's a quick excerpt:",
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
        content: "[Short excerpt...]\n\nRead the full post below.",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "button",
        content: "Read Article",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  },

  {
    name: "New Feature Announcement",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "New Feature: [Feature Name]",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "22px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "We're excited to launch [Feature]. It helps you [benefit].",
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
        content: "Try it now and see how it can speed up your workflow.",
        styles: {
          backgroundColor: "#f8f9fa",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-4",
        type: "button",
        content: "See Feature",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  },

  {
    name: "Survey Email",
    blocks: [
      {
        id: "block-1",
        type: "text",
        content: "Help us improve — quick survey",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "20px",
          color: "#000000"
        }
      },
      {
        id: "block-2",
        type: "text",
        content: "Hi [Name],\n\nWould you mind answering 3 quick questions about your experience with [Product]?",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#000000"
        }
      },
      {
        id: "block-3",
        type: "button",
        content: "Take Survey",
        styles: {
          backgroundColor: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          color: "#333333",
          link: "#"
        }
      }
    ]
  }
];

module.exports = prebuiltTemplates;