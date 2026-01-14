module.exports = function (express, pool, upload, path) {
  const apiRouter = express.Router();

  apiRouter.get("/", function (res) {
    res.json({ message: "Dobro dosli na nas API!" });
  });

  const postsRouter = require("./posts")(express, pool);
  apiRouter.use("/posts", postsRouter);

  const profileRouter = require("./profile")(express, pool);
  apiRouter.use("/profile", profileRouter);

  apiRouter.route("/editProfile").put(async function (req, res) {
    try {
      await pool.query("call EditProfile(?, ?, ?)", [
        req.body.idKorisnik,
        req.body.username,
        req.file.filename,
      ]);
      res.status(200).json({ message: "Success!" });
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  apiRouter
    .route("/upload")
    .post(upload.single("file"), async function (req, res) {
      res.status(200).json({ message: "Success!" });
      //res.json(req.file.filename)
    });

  apiRouter.route("/images").post(async function (req, res) {
    res.sendFile(path.join(__dirname, "..", "uploads", req.body.imageID));
  });

  return apiRouter;
};
