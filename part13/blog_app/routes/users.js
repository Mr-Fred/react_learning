const express = require('express');

const { User, Blog } = require('../Models');
const checkDisabled = require('../middlewares/checkDisabled');
const userFinder = require('../middlewares/userFinder');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const { isAuthorizedUser } = require('../utils/helpers');

 
const userRouter = express.Router();

userRouter.use(auth, checkDisabled);
userRouter.use('/:username', userFinder);

userRouter.put('/:username', async function updateUser (req, res) {
  // req.user is the authenticated user (from auth middleware)
  // req.targetUser is the user to be updated (from userFinder middleware)
  // isAuthorizedUser will throw an error if not permitted.
  // The errorHandler middleware will catch it and send a 403 response.
  isAuthorizedUser(req.targetUser.id, req.user.id);
  
  req.targetUser.username = req.body.username;
  await req.targetUser.save();
  res.json(req.targetUser);
});

userRouter.get('/:username', async function getSingleUserWithReadings (req, res) {
  // isAuthorizedUser will throw, and the errorHandler will handle it.
  isAuthorizedUser(req.targetUser.id, req.user.id);

  const includeOptions = {
    model: Blog,
    as: 'readings',
    attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
    through: {
      attributes: ['id', 'read'] // Select 'read' and 'id' from the join table
    }
  };

  if (req.query.read !== undefined) {
    includeOptions.through.where = {
      read: req.query.read === 'true'
    };
  }

  const user = await User.findByPk(req.targetUser.id, {
    attributes: { exclude: ['passwordHash'] },
    include: includeOptions
  });

  // The userFinder middleware ensures the user exists.
  return res.json(user);
});

/* ADMIN ONLY */

userRouter.get('/', adminOnly, async function getAllUsers (req, res) {
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

userRouter.delete('/:username', adminOnly, async function deleteUser (req, res) {
  // req.targetUser is found by the userFinder middleware
  await req.targetUser.destroy();
  return res.status(204).end();
});

module.exports = userRouter;
