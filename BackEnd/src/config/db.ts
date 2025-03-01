import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create a Sequelize instance with MySQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Disable logging for cleaner console output
  }
);

// Test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
