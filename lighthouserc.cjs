module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: ["http://localhost:3000/"],
      numberOfRuns: 3,
      startServerReadyPattern: "Ready in",
    },
    assert: {
      preset: "lighthouse:recommended",
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
    },
  },
};
