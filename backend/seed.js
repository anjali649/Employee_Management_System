const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const employees = [
  {
    name: "Aman Sharma",
    email: "em1@ex.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Fix login bug",
        taskDescription: "Resolve issue with login API timeout",
        taskDate: "2026-03-22",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Update UI",
        taskDescription: "Improve dashboard design",
        taskDate: "2026-03-20",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Deploy app",
        taskDescription: "Deployment failed due to config error",
        taskDate: "2026-03-18",
        category: "DevOps"
      }
    ]
  },
  {
    name: "Rohit Verma",
    email: "em2@ex.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create landing page",
        taskDescription: "Build responsive landing page for product launch",
        taskDate: "2026-03-22",
        category: "Frontend"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "API integration",
        taskDescription: "Connect frontend with backend REST APIs",
        taskDate: "2026-03-21",
        category: "Backend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Fix CSS issues",
        taskDescription: "Resolve mobile responsiveness bugs",
        taskDate: "2026-03-19",
        category: "Frontend"
      }
    ]
  },
  {
    name: "Priya Singh",
    email: "em3@ex.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Database design",
        taskDescription: "Design MongoDB schema for user module",
        taskDate: "2026-03-22",
        category: "Database"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Optimize queries",
        taskDescription: "Improve slow DB queries for reporting",
        taskDate: "2026-03-20",
        category: "Database"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Backup system",
        taskDescription: "Automated backup script failed on staging",
        taskDate: "2026-03-18",
        category: "DevOps"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Fix indexing",
        taskDescription: "Improve query indexing on orders collection",
        taskDate: "2026-03-21",
        category: "Database"
      }
    ]
  },
  {
    name: "Neha Gupta",
    email: "em4@ex.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Write test cases",
        taskDescription: "Unit testing for payment API endpoints",
        taskDate: "2026-03-22",
        category: "Testing"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Bug report",
        taskDescription: "Documented and reported critical UI bugs",
        taskDate: "2026-03-19",
        category: "QA"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Automation script",
        taskDescription: "Create Cypress end-to-end test suite",
        taskDate: "2026-03-21",
        category: "Testing"
      }
    ]
  },
  {
    name: "Karan Mehta",
    email: "em5@ex.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Client meeting",
        taskDescription: "Discuss Q2 feature requirements with client",
        taskDate: "2026-03-22",
        category: "Management"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Project planning",
        taskDescription: "Create sprint roadmap for April release",
        taskDate: "2026-03-20",
        category: "Management"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Budget approval",
        taskDescription: "Q2 infrastructure budget rejected by finance",
        taskDate: "2026-03-18",
        category: "Finance"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Team sync",
        taskDescription: "Daily standup and sprint review meeting",
        taskDate: "2026-03-21",
        category: "Management"
      }
    ]
  },
  {
    name: "Divya Nair",
    email: "em6@ex.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Design system update",
        taskDescription: "Update component library with new brand colors",
        taskDate: "2026-03-22",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Figma prototype",
        taskDescription: "Created clickable prototype for onboarding flow",
        taskDate: "2026-03-19",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Icon export",
        taskDescription: "SVG export failed due to font missing",
        taskDate: "2026-03-17",
        category: "Design"
      }
    ]
  },
  {
    name: "Arjun Kapoor",
    email: "em7@ex.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Setup CI/CD",
        taskDescription: "Configure GitHub Actions pipeline for staging",
        taskDate: "2026-03-22",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Server migration",
        taskDescription: "Migrated app from AWS EC2 to ECS containers",
        taskDate: "2026-03-20",
        category: "DevOps"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "SSL certificate",
        taskDescription: "Renew and configure SSL for all subdomains",
        taskDate: "2026-03-21",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Load balancer config",
        taskDescription: "Health check misconfiguration caused downtime",
        taskDate: "2026-03-16",
        category: "DevOps"
      }
    ]
  }
];

const admin = {
  name: "Anjali Tanwar",
  email: "anjali@gmail.com",
  password: "Anjali@123",
  role: "admin",
  tasks: []
};

const importData = async () => {
    try {
        await User.deleteMany(); // Clear existing users

        // Use save() per user so the bcrypt pre-save hook runs and hashes passwords
        const allUsers = [...employees, admin];
        for (const userData of allUsers) {
            const user = new User(userData);
            await user.save();
        }

        console.log(`✅ Data Imported! (${allUsers.length} users seeded)`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error with data import: ${error}`);
        process.exit(1);
    }
};

importData();
