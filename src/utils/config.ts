import dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT);
export const MONGODB_URI: string = process.env.MONGODB_URI;
export const SECRET_KEY: string = process.env.SECRET_KEY;
export const REFRESH_KEY: string = process.env.REFRESH_KEY;

// define more environment variables
