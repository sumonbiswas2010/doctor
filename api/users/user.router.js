const router = require("express").Router();
//const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  getDoc,
  getDocByID
} = require("./user.controller");
router.get("/",getUsers);
router.post("/doc",getDoc);
router.post("/docID",getDocByID);
router.post("/",createUser);
router.get("/:id", getUserByUserId);
router.post("/login", login);
router.patch("/",updateUsers);
router.delete("/", deleteUser);

module.exports = router;