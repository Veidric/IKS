module.exports = function (express, pool) {
  const postsRouter = express.Router();

  postsRouter.route("/").get(async function (req, res) {
    res.json({ message: "Posts route is working!" });
  });

  // Get posts for a user
  postsRouter
    .route("/:id")
    .get(async function (req, res) {
      try {
        let [[rows]] = await pool.query("call GetPost(?)", [req.params.id]);
        res.status(200).json(rows);
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    })
    .post(async function (req, res) {
      try {
        await pool.query("call MakePost(?, ?, ?)", [
          req.params.id,
          req.body.content,
          req.body.visibility,
        ]);
        res.status(200).json({ message: "Success!" });
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    });

  // Get posts from followed users
  postsRouter.route("/:id/following").get(async function (req, res) {
    try {
      let [[rows]] = await pool.query("call GetPostFollowed(?)", [
        req.params.id,
      ]);
      res.status(200).json(rows);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  // Get users profile posts
  postsRouter.route("/:id/profile").get(async function (req, res) {
    try {
      let [[rows]] = await pool.query("call GetProfilePosts(?)", [
        req.params.id,
      ]);
      res.status(200).json(rows);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  // RATINGS------------------------------------------------------
  postsRouter
    .route("/:id/ratings")
    // Get users post ratings
    .get(async function (req, res) {
      try {
        let [[rows]] = await pool.query("call GetRatings(?)", [req.params.id]);
        res.status(200).json(rows);
      } catch (e) {
        res.status(400).json({ message: "Bad request" }); // Bad request
      }
    })
    // Rate a post
    .post(async function (req, res) {
      try {
        await pool.query("call RatePost(?, ?, ?)", [
          req.params.id,
          req.body.idPost,
          req.body.value,
        ]);
        res.status(200).json({ message: "Success!" });
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    })
    // Unrate a post
    .delete(async function (req, res) {
      try {
        await pool.query("call UnratePost(?, ?)", [
          req.params.id,
          req.body.idPost,
        ]);
        res.status(200).json({ message: "Success!" });
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    });

  // COMMENTS-----------------------------------------------
  postsRouter
    .route("/comments/:postId")
    // Get comments for a post
    .get(async function (req, res) {
      try {
        let [[rows]] = await pool.query("call GetComments(?)", [
          req.params.postId,
        ]);
        res.status(200).json(rows);
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    })
    // Create a new comment
    .post(async function (req, res) {
      try {
        await pool.query("call MakeComment(?, ?, ?)", [
          req.body.userId,
          req.params.postId,
          req.body.content,
        ]);
        res.status(200).json({ message: "Success!" });
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    });

  return postsRouter;
};
