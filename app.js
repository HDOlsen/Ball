const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

var models = require('./models');

app.use(logger('dev'));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(cookieParser());

// CORS MIDDLEWARE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  key: 'user_sid',
  secret: 'kittykat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}))

app.use((req,res,next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next()
})


var sessionChecker = (req,res,next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/')
  }
  else {
    next()
  }
}

//Route Posts and Database Queries

  app.post('/member', (req,res) => {
    let member = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
      memType: req.body.memType,
      photo: req.body.photo
    }
      models.member.create(member)
      .catch(function(err) {
        console.log(err, member)
  })})

  app.get('/members', (req,res) => {
      models.member.findAll()
      .then(members => members = res.status(200).json(members))
  })

  app.post('/member/:memberId', (req,res) => {
    let member = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
      memType: req.body.memType,
      photo: req.body.photo
    }
      models.member.update(member, {
        where: { id: req.params.memberId}
      }).then(() => res.send({message : "success"}))
    })

  app.delete('/members', (req,res) => {
    let memberId = req.body.memberId
    models.member.destroy({
      where: {
        id : memberId
      }
    }).then(() => res.send({message : "success"}))
  })


  app.post('/', (req,res) => {
    let court = {
      date:req.body.date,
      court:req.body.court,
      startTime:req.body.startTime,
      endTime:req.body.endTime,
      memberId:req.body.memberId
    }
    models.reservation.create(court)
      .catch(function(err) {
        console.log(err,court)
  })})

  app.get('/', (req,res) => {
    models.reservation.findAll()
    .then(reservations => reservations = res.status(200).json(reservations))
  })

  app.delete('/', (req,res) => {
    let reservationId = req.body.reservationId
    models.reservation.destroy({
      where: {
        id : reservationId
      }
    }).then(() => res.send({message : "success"}))
  })

  app.post('/:reservationId', (req,res) => {
    let court = {
      date:req.body.date,
      court:req.body.court,
      startTime:req.body.startTime,
      endTime:req.body.endTime,
      memberId:req.body.memberId
    }
      models.reservation.update(court, {
        where: { id: req.params.reservationId}
      }).then(() => res.send({message : "success"}))
    })


app.all('/*',sessionChecker, (req,res,next) => {
  next()
})

app.listen(3001, () => console.log(`Listening on port 3001`))