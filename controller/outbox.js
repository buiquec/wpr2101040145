const db = require('../routes/dbsetup')

const outbox = (req, res) => {
    const cookieArray = req.cookies.user.split(', ');
    const userId = cookieArray[0]
    const username = cookieArray[1]
    let message = ''
    const page = parseInt(req.query.page) || 1
    const ITEMS_PER_PAGE = 5

    const startIndex = (page - 1) * ITEMS_PER_PAGE;

    const outboxSql = `
      SELECT email.*, user.username as recipient_name
      FROM email
      INNER JOIN user ON email.recipientId = user.userId
      WHERE senderId = ?
      ORDER BY sent_datetime DESC
      LIMIT ?, ?;
    `;
    db.query(outboxSql, [userId, startIndex, ITEMS_PER_PAGE],
        (err, results) => {
            if (err) throw err

            const totalItemsSql = 'SELECT COUNT(*) as count FROM email WHERE senderId = ?';
            db.query(totalItemsSql, [userId], (err, result) => {
                if (err) throw err;

                const totalItems = result[0].count;
                const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
                // console.log(results)
                res.render('home', {
                    username: username,
                    inbox: 'hidden="hidden"',
                    outbox: "",
                    compose: 'hidden="hidden"',
                    detail: 'hidden="hidden"',
                    email: results,
                    currentPage: page,
                    totalPage: totalPages,
                    users: '',
                    message: message
                })
            })
        })
}

module.exports = outbox