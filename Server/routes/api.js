module.exports = function (express, pool, upload, root) {
  const apiRouter = express.Router();

  apiRouter.get("/", function (res) {
    res.json({ message: "Dobro dosli na nas API!" });
  });

  const postsRouter = require("./posts")(express, pool);
  apiRouter.use("/posts", postsRouter);

  apiRouter
    .route("/follow")
    .post(async function (req, res) {
      try {
        await pool.query("call Follow(?, ?)", [
          req.body.idKorisnik,
          req.body.idZapratiti,
        ]);
        res.status(200).json({ message: "Success!" });
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    })
    .delete(async function (req, res) {
      try {
        await pool.query("call Unfollow(?, ?)", [
          req.body.idKorisnik,
          req.body.idZapratiti,
        ]);
        res.status(200).json({ message: "Success!" });
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    });

  apiRouter.route("/profile").post(async function (req, res) {
    try {
      let [[rows]] = await pool.query("call GetProfile(?)", [
        req.body.idKorisnik,
      ]);
      res.status(200).json(rows[0]);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  apiRouter.route("/followers").post(async function (req, res) {
    try {
      let [[rows]] = await pool.query("call GetFollowers(?)", [
        req.body.idKorisnik,
      ]);
      res.status(200).json(rows);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  apiRouter.route("/followed").post(async function (req, res) {
    try {
      let [[rows]] = await pool.query("call GetFollowed(?)", [
        req.body.idKorisnik,
      ]);
      res.status(200).json(rows);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

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

  apiRouter.route("/editPost").put(async function (req, res) {
    try {
      await pool.query("call EditPost(?, ?, ?)", [
        req.body.idPost,
        req.body.content,
        req.body.visibility,
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

  apiRouter.route("/upload").post(upload.single('file'), async function (req, res) {
    
    res.json(req.file.filename)
  });

  apiRouter.route("/images").post(async function (req, res) {
    console.log(req.body.imageID)
    res.sendFile('E:/Git Projects/IKS/Server/uploads/'+req.body.imageID + ".jpg")
  })

  return apiRouter;
};
