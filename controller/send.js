const db = require('../routes/dbsetup')

const send = (req, res, next) => {
    let { recipient, subject, content } = req.body
    const cookieArray = req.cookies.user.split(', ');
    const userId = cookieArray[0]
    const username = cookieArray[1]
    let message = ''
    if (!recipient) {
        const userId = cookieArray[0]
        const username = cookieArray[1]
        const getUsersSql = 'SELECT userId, username FROM user WHERE userId != ?';
        db.query(getUsersSql, [userId],
            (err, results) => {
                if (err) throw err
                message = 'Please select recipient'
                return res.render('home', {
                    username: username,
                    inbox: 'hidden="hidden"',
                    outbox: 'hidden="hidden"',
                    compose: '',
                    detail: 'hidden="hidden"',
                    email: '',
                    currentPage: '',
                    totalPage: '',
                    users: results,
                    message: message
                })
            })
    } else {
        const sendEmailSql = 'INSERT INTO email (senderId, recipientId, subject, body) VALUES (?, ?, ?, ?)';
        if(subject === '') {
            subject = '(no subject)'
        }
        db.query(sendEmailSql, [userId, recipient, subject, content],
        (err, results) => {
            if (err) {
                console.log(err)
                message = 'Unable to send mail'
                res.status(400).render('home', {
                    username: username,
                    inbox: 'hidden="hidden"',
                    outbox: 'hidden="hidden"',
                    compose: 'none',
                    detail: 'hidden="hidden"',
                    email: '',
                    currentPage: '',
                    totalPage: '',
                    users: results,
                    message: message
                })
                
            }
            res.redirect('/home/outbox/')
            console.log('Mail sent succesfully: ' + results);
        })
    }
    
}

module.exports = send