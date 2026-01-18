module.exports = function (express, pool, path, upload, fs) {
  const profileRouter = express.Router();

  // Get profile by ID
  profileRouter
    .route("/:id")
    .get(async function (req, res) {
      try {
        let [[rows]] = await pool.query("call GetProfile(?)", [req.params.id]);
        res.status(200).json(rows[0]);
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    })
    // Edit profile
    .put(async function (req, res) {
      try {
        await pool.query("call EditProfile(?, ?, ?, ?, ?)", [
          req.params.id,
          req.body.username,
          req.body.name,
          req.body.surname,
          req.body.dateOfBirth,
        ]);
        res.status(200).json({ message: "Success!" });
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    });

  profileRouter
    // Get Profile image
    .route("/:id/image")
    .get(async function (req, res) {
      const imagePath = path.join(
        __dirname,
        "..",
        "profile-images",
        `user_${req.params.id}.jpg`,
      );

      if (fs.existsSync(imagePath)) res.sendFile(imagePath);
      else
        res.sendFile(
          path.join(__dirname, "..", "profile-images", `default.jpg`),
        );
    })
    // Change profile image
    .post(upload.single("image"), async function (req, res) {
      res.status(200).json({ message: "Success!" });
    })
    // Delete image
    .delete(async function (req, res) {
      const filePath = path.join(
        __dirname,
        "..",
        "profile-images",
        `user_${req.params.id}.jpg`,
      );

      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) throw err;
        });
      }
      res.status(204).json({ message: "Image doesn't exist" });
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
    // Follow a user
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
    // Unfollow a user
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
