export const portfolioData = {
    sectionTitle: {
        title: "My Portfolio",
        subtitle: "Explore my works, certifications, and the technologies I use — all in one place."
    },

    tabs: {
        projects: [
            {
                id: 1,
                img: "/assets/project.png",
                title: "Money Tracker App",
                subtitle: "Track your finances with clarity and control.",
                desc: "Money Tracker is a modern web application that helps users monitor income and expenses effortlessly. Featuring a minimalist interface, dark mode toggle, and intuitive dashboard, it’s built to encourage financial awareness for everyday users. Data can be synced via Supabase or stored locally.",
                demo: "#",
                tags: ["React", "Tailwind CSS", "Supabase", "Vite"]
            },
            {
                id: 2,
                img: "/assets/project.png",
                title: "Chatbot Assistant",
                subtitle: "A chatbot that evolves with every conversation.",
                desc: "This chatbot is a React-based assistant that learns from user input and stores knowledge using a simple Express + JSON backend. It’s designed to grow smarter over time and simulate natural, human-like dialogue. Ideal for basic AI training or personalized assistants.",
                demo: "#",
                tags: ["React", "Express", "Node.js", "JSON"]
            },
            {
                id: 3,
                img: "/assets/project.png",
                title: "Personal Portfolio Website",
                subtitle: "Your work deserves a beautiful showcase.",
                desc: "A sleek and responsive personal portfolio built with Vite and Tailwind CSS. This site features categorized project sections, certificates, and a dynamic tech stack. Optimized for both desktop and mobile experiences, it reflects professional branding with clean code.",
                demo: "#",
                tags: ["Vite", "React", "Tailwind CSS", "JavaScript"]
            }
        ],

        certificates: [
            {
                id: 1,
                img: "/assets/cert.jpg"
            },
            {
                id: 2,
                img: "/assets/cert.jpg",
            },
            {
                id: 3,
                img: "/assets/cert.jpg",
            }
        ],

        techStacks: [
            {
                id: 1,
                icon: "bx bxl-react",
                label: "React",
                color: "#61DAFB"
            },
            {
                id: 2,
                icon: "bx bxl-tailwind-css",
                label: "Tailwind CSS",
                color: "#38BDF8"
            },
            {
                id: 3,
                icon: "bx bxl-nodejs",
                label: "Node.js",
                color: "#3C873A"
            },
            {
                id: 4,
                icon: "bx bxl-javascript",
                label: "JavaScript",
                color: "#F7DF1E"
            },
            {
                id: 5,
                icon: "bx bxl-typescript",
                label: "TypeScript",
                color: "#3178C6"
            },
            {
                id: 6,
                icon: "bx bxl-git",
                label: "Git",
                color: "#F05032"
            }
        ]
    }
};
