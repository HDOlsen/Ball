const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const keys = require('./config/keys');
const passport = require('passport');
const passportAuth = require('./passport')();
const jwt = require('jsonwebtoken');

var models = require('./models');

// Load Input Validation //
const validateRegisterInput = require('./validators/register');
const validateLoginInput = require('./validators/login')

app.use(logger('dev'));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Initializing JWT //
app.use(passportAuth.initialize());

app.use(cookieParser());

// CORS MIDDLEWARE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const requireAuth = passport.authenticate('jwt', { session: false })

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

   app.get('/', requireAuth, (req, res) => {
    // passport.authenticate('jwt', { session: false }),
    // res.json({
    //   id: req.user.id,
    //   name: req.user.firstName,
    //   email: req.user.email
    // });
    models.reservation.findAll()
    .then(reservations => res.status(200).json(reservations))
  })


  app.delete('/', (req,res) => {
    let reservationId = req.body.reservationId
    models.reservation.destroy({
      where: {
        id : reservationId
      }
    }).then(() => res.send({message : "success"}))
  })

  app.post('/update_court/:reservationId', (req,res) => {
    let court = {
      date:req.body.date,
      court:req.body.court,
      startTime:req.body.startTime,
      endTime:req.body.endTime,
      memberId:req.body.memberId
    }
    console.log(req.params.reservationId)
      models.reservation.update(court, {
        where: { id: req.params.reservationId}
      }).then
    })

    //Admin Registration and Authorization

    app.post('/register', (req,res) => {
      console.log(req.body)
      const {errors,isValid} = validateRegisterInput(req.body);
        if(!isValid) {
          console.log(errors)
          return res.status(400).json(errors);
} 
        models.admin.findOne({where: {email : req.body.email}}).then(user => {
    if(user) {
      errors.email = "Email already exists"
      return res.status(400).json(errors);
    } 
    
    else {
        bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            let newUser = {
              firstName : req.body.firstName,
              lastName : req.body.lastName,
              email : req.body.email,
              userName: req.body.userName,
              password : hash
      }
      models.admin.create(newUser)
        .then(() => res.send({ message : "Success"}))
        })
      })
    }
  })
})

// SIGN IN //
      app.post('/login', (req,res) => {
        console.log(req.body)
        const errors = validateLoginInput(req.body);


  //Check Validation
      if(!errors.isValid) {
        return res.status(400).json(errors);
  }

    models.admin.findOne({ 
      where: {userName : req.body.userName}}).then(user => {
        if(!user) {
         errors.errors.userName = "User not found";
          console.log(errors)
            return res.status(404).json(errors);
  }

    //Check Password
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if(isMatch) {
          const payload = { id : user.id}

        // Sign Token //
        const token = jwt.sign(payload, keys.jwtSecret, {expiresIn: 7200},
        (err,token) => {
          res.json({
            success: true,
            token : 'Bearer ' + token,
            userID : user.id
        })
        console.log(res.json)
        res.redirect('/')
      }
    )} else {
        errors.errors.password = "Password incorrect"
        return res.status(401).json(errors)
      }
    })
  })
})

app.get('/authenticate/:id', (req, res)=>{
  var id = req.params.id


  models.admin.findOne({where: {id : Number(id)}}).then((foundUser)=>{
    if(foundUser && foundUser.id){
      res.status(200).json({user: foundUser.id})
    }
    else{
      res.status(200).json({error: 'user not found'})
    }
  }).catch(()=>{res.status(200).json({error: 'an error occured'})})

  

})



app.listen(3001, () => console.log(`Listening on port 3001`))