var express = require("express");
var passport = require("passport");
var router = express.Router();
var cookieSession = require("cookie-session");
var db = require("../config/db");
const e = require("express");
require("../config/passport");

router.use(passport.initialize());
router.use(passport.session());

router.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// Initializes passport and passport sessions
router.use(passport.initialize());
router.use(passport.session());

// Example protected and unprotected routes
router.get("/", (req, res) => res.render("login"));
router.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get("/good", isLoggedIn, (req, res) => {
  const email = req.user.emails[0].value;
  const name_email = req.user.displayName;
  const imgURL = req.user.photos[0].value;
  const created_at = new Date();
  const updated_at = new Date();
  const role = 1;

  var domain = email.substring(email.lastIndexOf("@") +1);
  console.log( domain ); 

  if (email) {
    db.query("SELECT * FROM users WHERE email = ? ", email, (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length > 0) {
        const userID = result[0].id;
        db.query(
          "SELECT  * FROM users,roles,users_roles WHERE users.id = users_roles.userID AND roles.id = users_roles.roleID AND users_roles.userID = ?",
          userID,
          (err, result) => {
            const title = result[0].title;
            if (err) {
              console.log(err);
            } else if (
              result[0].name_email == null &&
              result[0].imgURL == null
            ) {
              db.query(
                "UPDATE users SET name_email=?,imgURL=?,created_at=?,updated_at=? WHERE id=?",
                [name_email, imgURL, created_at, updated_at, userID],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(title);
                    console.log("welcome role set");

                    res.render("profile", {
                      name: req.user.displayName,
                      pic: req.user.photos[0].value,
                      email: req.user.emails[0].value,
                      role: title,
                    });
                  }
                }
              );
            } else {
              console.log(result[0].title);
              console.log("welcome back");

              res.render("profile", {
                name: req.user.displayName,
                pic: req.user.photos[0].value,
                email: req.user.emails[0].value,
                role:title
              });
              // let ans = { result: result, path: "login", note: "welcome back" };
              // res.send(ans);
            }
          }
        );
        console.log(result[0].id);
      } else {
        db.query(
          "INSERT INTO users (email,name_email,imgURL,created_at,updated_at) VALUES(?,?,?,?,?)",
          [email, name_email, imgURL, created_at, updated_at],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(
                "select id FROM users WHERE email=?",
                email,
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    const id = result[0].id;
                    console.log(id);
                    db.query(
                      "INSERT INTO users_roles VALUES(?,?)",
                      [id, role],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          db.query(
                            "SELECT  * FROM users,roles,users_roles WHERE users.id = users_roles.userID AND roles.id = users_roles.roleID AND users_roles.userID = ?",
                            id,
                            (err, result) => {
                              if (err) {
                                console.log(err);
                              } else {
                                console.log(result[0].title);
                                console.log("first login");

                                res.render("profile", {
                                  name: req.user.displayName,
                                  pic: req.user.photos[0].value,
                                  email: req.user.emails[0].value,
                                  role: result[0].title,
                                });
                              }
                            }
                          );                      
                        }
                      }
                    );
                  }
                }
              );
  
            }
          }
        );
      }
    });
  }
  
});

// Auth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

router.post("/set-role", (req, res) => {
  const email = req.body.email;
  const role = req.body.role;
  db.query("INSERT INTO users (email) VALUES (?)", email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userID = result.insertId;
      console.log(userID);
      db.query("SELECT id FROM roles WHERE title = ?", role, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const roleID = result[0].id;
          db.query(
            "INSERT INTO users_roles VALUES (?,?)",
            [userID, roleID],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("user set " + role + " role");
              }
            }
          );
        }
      });
    }
  });
});

router.put("/edit-role", (req, res) => {
  const userID = req.body.userID;
  const roleID = req.body.roleID;
  db.query(
    "UPDATE users_roles SET roleID = ? WHERE userID = ?",
    [roleID, userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("edit role");
      }
    }
  );
});

router.get("/roles", (req, res) => {
  db.query("SELECT TITLE FROM roles", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



module.exports = router;
