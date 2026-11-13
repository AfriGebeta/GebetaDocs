module.exports = {
  apps: [
    {
      name: "gebeta-docs",
      script: "server.js",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: "6006",
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
