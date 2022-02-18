import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser'
import { check, validationResult } from 'express-validator'
import cors from 'cors'
const app = express();
// farhin154188205a3

// middleware
const urlEncoded = bodyParser.urlencoded({ extended: false });
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(bodyParser.json())
app.use(urlEncoded)
app.use(express.static("public"))
app.use(express.json())
app.use(cors())



//                                  Routes                     //
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/cwh', (req, res) => {
  res.render('cwh');
});
app.get('/registration', (req, res) => {
  res.render('registration');
});
app.get('/login', (req, res) => {
  res.render('login');
});




//                post routes                //

//       for login Routes
app.post('/detail',[
  check('username').custom((value) => {
    // validate username by regular expression
    return value.match(/\b[a-zA-Z\d]{1,}\d$\b/);
  }).withMessage("username must be alphanumeric").isEmpty()
  
],(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('login',{
      title:'errors',
      error:errors.array()[0].msg
    })
  }
  if (errors.isEmpty()) {
    res.render('dashboard', {
      title: 'nameOfUser',
      username: req.body.username,
    });
  }
})











//               registration Routes               //
app.post('/dashboard',[
  check('name').custom((value) => {
    // validate username by regular expression
    return value.match(/\b[a-zA-Z\d]{1,}\d$\b/);
  }).withMessage("name must be alphanumeric correct it first"),
   check('email')
    .not().isEmpty()
    .withMessage("email is not valid"),
     check('password').not().isEmpty()
    .withMessage("password is empty")
    .isLength({min:6})
    .withMessage("password should be atleast 7 character"),
     check('password1')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password does not match');
  }
      return true;
    }),
], (req, res) => {
  const errors = validationResult(req)
if (!errors.isEmpty()) {
  return res.render('registration',{
    title:'errors',
    error:errors.array()[0].msg
  })
}
  if (errors.isEmpty()) {
    res.render('dashboard', {
      title: 'nameOfUser',
      username: req.body.name,
    });
  }
})





// Server listen
app.listen(5000, () => console.log('server is listening'));









