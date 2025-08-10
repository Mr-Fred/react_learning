const router = require('express').Router()
const { Note, User, Team } = require('../models')


router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: [
      {
        model: Note,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Team,
        attributes: ['name', 'id'],
        through: {
          attributes: [] // Exclude join table attributes
        }
      }
    ]
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const include = [
    {
      model: Note, // Notes created by the user
      attributes: { exclude: ['userId'] }
    },
    {
      model: Note,
      as: 'marked_notes', // Notes marked by the user
      attributes: { exclude: ['userId']},
      through: {
        attributes: []
      },
      include: {
        model: User, // The original author of the marked note
        attributes: ['name']
      }
    }
  ];

  // Conditionally add the Team include to the main query
  if (req.query.teams) {
    include.push({
      model: Team,
      attributes: ['name'],
      through: {
        attributes: []
      }
    });
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['passwordHash'] }, // Correctly exclude sensitive data
    include
  });

  if (user) {
    res.json(user); // The 'teams' property is now part of the user object if requested
  } else {
    res.status(404).end();
  }
})

module.exports = router