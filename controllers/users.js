const User = require("../models/user")

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
  }

module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = await new User({ email, username });
      const registerUser = await User.register(newUser, password);
      console.log(registerUser);
      req.login(registerUser , (err) => {
        if(err){
          return next(err)
        }
        req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
      });
      
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  }

module.exports.renderLogInForm  =  (req, res) => {
    res.render("users/login.ejs");
  } 

module.exports.Login =  async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
  
module.exports.Logout =  (req,res,next) => {
    req.logout( (err) => {
      if(err){
        return next(err);
      }
      req.flash("success" , "you logged out!");
      res.redirect("/listings")
    });
  }  