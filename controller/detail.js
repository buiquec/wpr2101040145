const db = require('../routes/dbsetup')

const detail = (req, res) => {
    const cookieArray = req.cookies.user.split(', ');
    const userId = cookieArray[0]
    const username = cookieArray[1]
    const emailId = req.params.id
    let message = ''
    const getEmailSql = `select sender.email as sender, recipient.email as recipient, email.subject, email.body, email.sent_datetime from email
  inner join user sender on email.senderId = sender.userId
  inner join user recipient on email.recipientId = recipient.userId
  where emailId = ?;`
    db.query(getEmailSql, [emailId], (err, results) => {
        if (err) {
            message = 'An error occurred'
            throw err
        }
        // console.log(results[0])
        res.render('home', {
            username: username,
            inbox: 'hidden="hidden"',
            outbox: 'hidden="hidden"',
            compose: 'hidden="hidden"',
            detail: '',
            email: results[0],
            currentPage: '',
            totalPage: '',
            users: '',
            message: message
        })
    })
}

module.exports = detail