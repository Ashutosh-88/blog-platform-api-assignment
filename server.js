const app = require("./app");

// Export for Vercel serverless functions
module.exports = app;

// For local development only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
