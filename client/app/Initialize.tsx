import { config } from "dotenv";

config(); // Get All Environment Variables from '.env' files
export const {
  APP_NAME = "My App",
  APP_DESCRIPTION = "App Description Here...",
  APP_MODE = "development",
} = process.env; // Get App Info

export const {
  CLIENT_PROTOCOL = "http",
  CLIENT_HOST = "localhost",
  CLIENT_PORT = "3000",
  CLIENT_URI = `${CLIENT_PROTOCOL}://${CLIENT_HOST}${
    CLIENT_PORT ? ":" + CLIENT_PORT : ""
  }`,
} = process.env; // Get Client Info

export const {
  SERVER_PROTOCOL = "http",
  SERVER_HOST = "localhost",
  SERVER_PORT = "8000",
  SERVER_URI = `${SERVER_PROTOCOL}://${SERVER_HOST}${
    SERVER_PORT ? ":" + SERVER_PORT : ""
  }`,
} = process.env; // Get Server Info
