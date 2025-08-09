const express = require('express');

const { User, Blog } = require('../Models');
const checkDisabled = require('../middlewares/checkDisabled');
const userFinder = require('../middlewares/userFinder');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const { isAuthorizedUser } = require('../utils/helpers');

 
const userRouter = express.Router();

userRouter.get('/', auth, adminOnly, async function getAllUsers (req, res) {
  // The global error handler will catch any unexpected errors.
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] }, // Exclude sensitive data
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] } // The userId is redundant in this context
    }
  });
  res.json(users);
});


userRouter.put('/:username', auth, checkDisabled, userFinder, async function updateUser (req, res) {
  // req.user is the authenticated user (from auth middleware)
  // req.targetUser is the user to be updated (from userFinder middleware)
  // isAuthorizedUser will throw an error if not permitted.
  // The errorHandler middleware will catch it and send a 403 response.
  isAuthorizedUser(req.targetUser.id, req.user.id);
  
  req.targetUser.username = req.body.username;
  await req.targetUser.save();
  res.json(req.targetUser);
});

userRouter.get('/:username', auth, checkDisabled, userFinder, async function getSingleUser (req, res) {
  // isAuthorizedUser will throw, and the errorHandler will handle it.
  isAuthorizedUser(req.targetUser.id, req.user.id);
  return res.json(req.targetUser);
});

userRouter.delete('/:username', auth, adminOnly, checkDisabled, userFinder, async function deleteUser (req, res) {
  // req.targetUser is found by the userFinder middleware
  await req.targetUser.destroy();
  return res.status(204).end();
});

module.exports = userRouter;
