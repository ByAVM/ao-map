import("execa").then(async ({ execa }) => {
  (async () => {
    try {
      await execa("git", ["checkout", "--orphan", "gh-pages"]);
      console.log("Starting deployment..");
      await execa("git", ["--work-tree", "dist", "add", "--all"]);
      await execa("git", ["--work-tree", "dist", "commit", "-m", "gh-pages", "--no-verify"]);
      console.log("Pushing to gh-pages...");
      await execa("git", ["push", "origin", "HEAD:gh-pages", "--force", "--no-verify"]);
      await execa("git", ["checkout", "-f", "master"]);
      await execa("git", ["branch", "-D", "gh-pages"]);
      console.log("Successfully deployed, check your settings");
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  })();
});
