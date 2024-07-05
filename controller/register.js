const db = require('../routes/dbsetup')

const register = (req, res) => {

    const {name, email, password, password2} = req.body;

    db.query('SELECT email from user WHERE email = ?', [email], 
    (err, results) => {
        if(err) {
            throw new Error(err.message)
        } 
        if (results.length > 0) {
            res.send('The email has already been taken')
        } else if (password !== password2) {
            res.send('Passwords do not match')
        }
    })

    db.query('INSERT INTO user SET ?', 
        {username: name,
         email: email,
         password: password   
        }, (err) => {
            if (err) {
                throw new Error(err.message)
            } else {
                console.log('User registered')
            }
        })

    res.redirect('/')
}

module.exports = register