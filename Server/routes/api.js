module.exports = function (express, pool) {
  const apiRouter = express.Router();

  apiRouter.get("/", function (res) {
    res.json({ message: "Dobro dosli na nas API!" });
  });

  const postsRouter = require("./posts")(express, pool);
  apiRouter.use("/posts", postsRouter);

  const profileRouter = require("./profile")(express, pool);
  apiRouter.use("/profile", profileRouter);

  apiRouter.route("/chats").post(async function (req, res) {
    try {
      let [[rows]] = await pool.query("call GetChat(?)", [req.body.idKorisnik]);
      res.status(200).json(rows);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  apiRouter.route("/chat").post;

  apiRouter.route("/newchat").post(async function (req, res) {
    try {
      await pool.query("call MakeChat(?, ?)", [
        req.body.idKorisnik1,
        req.body.idKorisnik2,
      ]);
      res.status(200).json({ message: "Success!" });
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  apiRouter.route("/sendmessage").post(async function (req, res) {
    try {
      await pool.query("call MakeMessage(?, ?, ?)", [
        req.body.idChat,
        req.body.idKorisnik,
        req.body.content,
      ]);
      res.status(200).json({ message: "Success!" });
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  apiRouter.route("/editProfile").put(async function (req, res) {
    try {
      await pool.query("call EditProfile(?, ?)", [
        req.body.idKorisnik,
        req.body.username,
      ]);
      res.status(200).json({ message: "Success!" });
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  return apiRouter;
};
