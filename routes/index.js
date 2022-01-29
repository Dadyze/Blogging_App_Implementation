const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')
const Comment = require('../models/Comment');

// @desc    Login/Landing page
// @route   GET /

router.get('/', ensureGuest,async (req,res)=>{
  try {
    const stories = await Story.find({ status: 'public' })
      .populate("user")
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('stories/guest', {
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})


// @desc    Login/Landing page
// @route   GET /login
router.get('/login', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    var stories;
    if(req.user.id == process.env.ADMIN_ID){
       stories = await Story.find(_ => true).lean();
    }else{
       stories = await Story.find({ user: req.user.id }).lean()     
    }
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})


// @desc    Show single story - NOT LOGGGD IN
// @route   GET /:id

router.get('/guest/:id', async (req,res) =>{
  try {
    let story = await Story.findById(req.params.id).populate('user').lean()
    let komentar = await Comment.find({story:req.params.id}).populate("user").lean();
    if (!story) {
      return res.render('error/404')
    }

    if (story.status == 'private') {
      res.render('error/404')
    } else {
      res.render('stories/guestShow', {
        story,komentar
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})


module.exports = router
