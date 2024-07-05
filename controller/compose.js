const db = require('../routes/dbsetup')

const compose = (req, res) => {
    const cookieArray = req.cookies.user.split(', ');
    let message = ''
    const userId = cookieArray[0]
    const username = cookieArray[1]
    const getUsersSql = 'SELECT userId, username FROM user WHERE userId != ?';
    db.query(getUsersSql, [userId], 
        (err, results) => {
            if (err) throw err
            // console.log(results);

            res.render('home', {
                username: username,
                inbox: 'hidden="hidden"',
                outbox: 'hidden="hidden"',
                compose: "",
                detail: 'hidden="hidden"',
                email: '',
                currentPage: '',
                totalPage: '',
                users: results,
                message: message
            })
        })



}

module.exports = compose