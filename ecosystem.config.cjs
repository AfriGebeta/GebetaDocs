module.exports = {
  apps: [
    {
      name: "gebeta-docs",
      script: "server.js",
      interpreter: process.execPath,
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: "6006",
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
