const mongoose = require('mongoose');
const Project = require('../models/Project');
const Client = require('../models/Client');
require('dotenv').config();

const sampleProjects = [
    {
        name: "E-Commerce Platform",
        description: "A full-stack e-commerce platform built with React and Node.js. Features include product catalog, shopping cart, payment integration, and admin dashboard.",
        image: "https://via.placeholder.com/500x300?text=E-Commerce+Platform",
        link: "https://example.com/ecommerce"
    },
    {
        name: "Task Management App",
        description: "Collaborative task management application with real-time updates, team collaboration features, and progress tracking.",
        image: "https://via.placeholder.com/500x300?text=Task+Manager",
        link: "https://example.com/taskmanager"
    },
    {
        name: "Social Media Dashboard",
        description: "Analytics dashboard for social media metrics. Displays real-time data from multiple platforms with custom reports.",
        image: "https://via.placeholder.com/500x300?text=Social+Dashboard",
        link: "https://example.com/socialdash"
    },
    {
        name: "AI Chatbot Solution",
        description: "Intelligent chatbot powered by AI for customer support. Integrates with multiple messaging platforms and CRM systems.",
        image: "https://via.placeholder.com/500x300?text=AI+Chatbot",
        link: "https://example.com/chatbot"
    },
    {
        name: "Mobile Banking App",
        description: "Secure mobile banking application with user authentication, fund transfers, bill payments, and account management.",
        image: "https://via.placeholder.com/500x300?text=Banking+App",
        link: "https://example.com/banking"
    }
];

const sampleClients = [
    {
        name: "Sarah Johnson",
        designation: "CEO, Tech Innovations Inc.",
        description: "The team delivered exceptional results. Their attention to detail and professionalism made our project a huge success.",
        image: "https://via.placeholder.com/200x200?text=Sarah+Johnson"
    },
    {
        name: "Michael Chen",
        designation: "Product Manager, Digital Solutions",
        description: "Outstanding work! They understood our requirements perfectly and delivered beyond our expectations. Highly recommended!",
        image: "https://via.placeholder.com/200x200?text=Michael+Chen"
    },
    {
        name: "Emily Rodriguez",
        designation: "Founder, StartUp Ventures",
        description: "Professional, reliable, and innovative. They helped us build our MVP and get to market faster than expected.",
        image: "https://via.placeholder.com/200x200?text=Emily+Rodriguez"
    },
    {
        name: "David Thompson",
        designation: "Director, Enterprise Solutions",
        description: "Great communication throughout the project. They adapted well to our changing requirements and delivered on time.",
        image: "https://via.placeholder.com/200x200?text=David+Thompson"
    },
    {
        name: "Lisa Anderson",
        designation: "CTO, Cloud Services Ltd.",
        description: "Excellent technical expertise. The architecture they designed is scalable and maintainable. Very impressed with the quality.",
        image: "https://via.placeholder.com/200x200?text=Lisa+Anderson"
    }
];

async function seedData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data (optional - comment out to keep existing data)
        // await Project.deleteMany({});
        // await Client.deleteMany({});
        // console.log('Cleared existing data');

        // Check if data already exists
        const projectCount = await Project.countDocuments();
        const clientCount = await Client.countDocuments();

        if (projectCount === 0) {
            // Add sample projects
            const createdProjects = await Project.insertMany(sampleProjects);
            console.log(`✅ Added ${createdProjects.length} sample projects`);
        } else {
            console.log(`⚠️  Projects already exist (${projectCount}). Skipping...`);
        }

        if (clientCount === 0) {
            // Add sample clients
            const createdClients = await Client.insertMany(sampleClients);
            console.log(`✅ Added ${createdClients.length} sample clients`);
        } else {
            console.log(`⚠️  Clients already exist (${clientCount}). Skipping...`);
        }

        console.log('\n✅ Seeding completed successfully!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error seeding data:', err.message);
        process.exit(1);
    }
}

// Run seed
seedData();
