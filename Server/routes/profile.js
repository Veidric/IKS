module.exports = function (express, pool) {
  const profileRouter = express.Router();

  // Get profile by ID
  profileRouter.route("/:id").get(async function (req, res) {
    try {
      let [[rows]] = await pool.query("call GetProfile(?)", [req.params.id]);
      res.status(200).json(rows[0]);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  // Get followers by user ID
  profileRouter.route("/followers/:id").get(async function (req, res) {
    try {
      let [[rows]] = await pool.query("call GetFollowers(?)", [req.params.id]);
      res.status(200).json(rows);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  // Get following by user ID
  profileRouter.route("/following/:id").get(async function (req, res) {
    try {
      let [[rows]] = await pool.query("call GetFollowed(?)", [req.params.id]);
      res.status(200).json(rows);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  });

  // Follow and Unfollow routes
  profileRouter
    .route("/follow")
    .post(async function (req, res) {
      try {
        await pool.query("call Follow(?, ?)", [
          req.body.userId,
          req.body.userToFollowId,
        ]);
        res.status(200).json({ message: "Success!" });
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    })
    .delete(async function (req, res) {
      try {
        await pool.query("call Unfollow(?, ?)", [
          req.body.userId,
          req.body.userToUnfollowId,
        ]);
        res.status(200).json({ message: "Success!" });
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    });

  return profileRouter;
};
