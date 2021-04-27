export default {
  // API_ENDPOINT: process.env.SERVER_ORIGIN,
  // API_ENDPOINT: "http://localhost:8001",
  API_ENDPOINT:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8001"
      : "https://salty-gorge-82559.herokuapp.com",
};
