const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany({});

    const categories = [
      {
        name: 'Health & Fitness',
        description: 'Physical health and fitness related habits',
        color: '#10B981',
        icon: 'heart',
        isDefault: true
      },
      {
        name: 'Productivity',
        description: 'Work and productivity habits',
        color: '#3B82F6',
        icon: 'briefcase',
        isDefault: true
      },
      {
        name: 'Learning',
        description: 'Education and skill development',
        color: '#8B5CF6',
        icon: 'book',
        isDefault: true
      },
      {
        name: 'Mindfulness',
        description: 'Mental health and mindfulness practices',
        color: '#F59E0B',
        icon: 'brain',
        isDefault: true
      },
      {
        name: 'Social',
        description: 'Social and relationship habits',
        color: '#EF4444',
        icon: 'users',
        isDefault: true
      },
      {
        name: 'Personal Care',
        description: 'Self-care and personal hygiene',
        color: '#06B6D4',
        icon: 'user',
        isDefault: true
      }
    ];

    await Category.insertMany(categories);
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

const seedDatabase = async () => {
  await connectDB();
  await seedCategories();
  mongoose.connection.close();
  console.log('Database seeding completed');
};

seedDatabase();