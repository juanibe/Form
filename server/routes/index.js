var express = require('express');
var router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'benitojuanignacio@gmail.com',
    pass: ''
  }
});

router.post('/signup', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email
  })

  transporter.sendMail({
    from: 'benitojuanignacio@gmail.com',
    to: 'benitojuanignacio@gmail.com',
    subject: `Big change in  market.`,
    text: '<p>The price has rised over 2% in lasts operations.</p>',
    html: `<h4>The price has rised more than 2% from last 100 operations</h4>`
  }).then(() => { console.log('Notification sent') })

  newUser.save(err => {
    if (err) {
      res.status(400).json({ message: "Saving user to database went wrong." })
      return;
    }
  })

})

module.exports = router;
