module.exports = function (express, pool, upload, fs, path) {
  const apiRouter = express.Router();

  apiRouter.get("/", function (res) {
    res.json({ message: "Dobro dosli na nas API!" });
  });

  const postsRouter = require("./posts")(express, pool);
  apiRouter.use("/posts", postsRouter);

  const profileRouter = require("./profile")(express, pool, path, upload, fs);
  apiRouter.use("/profile", profileRouter);

  return apiRouter;
};
