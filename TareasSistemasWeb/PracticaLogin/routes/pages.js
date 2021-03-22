const express = require("express");
const router = express.Router();


router.get('/', (req,res) => {
       if(req.session.isAuth){
        res.render('index');
        console.log(req.session.username);
       }else{
           res.status(401).render('login',{message: 'No has iniciado sesion'})
       }
            
        
});
router.get('/register', (req,res) => {
    res.render('register');
});
router.get('/login', (req,res) => {
    res.render('login');
});


module.exports = router;