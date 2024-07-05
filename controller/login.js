const db = require('../routes/dbsetup')

const login = (req, res, next) => {
        let email = req.body.email
        let password = req.body.password
        if(email && password) {
            db.query('SELECT * FROM user WHERE email = ? AND password = ?',
            [email, password], (err, results) => {
                if (err) {
                    throw new Error(err.message)
                } 
                if (results.length > 0) {
                    const userId = results[0].userId
                    const username = results[0].username
                    res.cookie('user', `${userId}, ${username}`, { maxAge: 5000000, httpOnly: true})
                    res.redirect('/home/inbox?page=1')
                    console.log("Successfully logged in");
                    next()
                    // res.redirect(`inbox/?email=${email}`)
                } else {
                    res.send('Incorrect email or password !')
                }
            })
        }
    }

module.exports = login
