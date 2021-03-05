const db = require('./../conn');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const e = require('express');
exports.register = (req,res) => {
    const {name, email, password, passwordConfirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error,results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register',{
                message: 'Ese email ya esta en uso'
            })
        }else if(password !== passwordConfirm){
            return res.render('register',{
                message: 'Las contrasenas no son iguales'
            })
        }
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {nombre: name, email: email,password: hashedPassword },(error,results)  => {
            if(error){
                console.log(error);
            }else{
                console.log(results)
                return res.render('register', {
                    message: 'Usuario registrado'
                });
            }
        })
    });
}
exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).render('login',{
                message: 'Por favor escribe tu correo y contraseña'
            })
        }
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error,results) => {
            if(!results || !(await bcrypt.compare(password,results[0].password))){
                res.status(401).render('login',{
                    message:'El correo o la contraseña son incorrectos'
                })
            }else {
                const id = results[0].idusers;

                const token = jwt.sign({id}, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("El token es " + token);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                    ),
                    httpOnly: true
                }
                req.session.isAuth = true;
                res.cookie('jwt',token,cookieOptions);
                res.status(200).redirect('/');
                
            }
        })
    }catch(error){
        console.log(error)
    }
}
exports.logout = (req,res) =>{
    req.session.destroy((err) => {
        if(err) throw err;
        ress.redirect('/login',{message:'has cerrado sesion'})
    })
}

