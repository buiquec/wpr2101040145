const db = require('../routes/dbsetup')

const inbox = (req, res) => {
    const cookieArray = req.cookies.user.split(', ');
    const userId = cookieArray[0]
    const username = cookieArray[1]
    let message = ''
    const page = parseInt(req.query.page) || 1
    const ITEMS_PER_PAGE = 5

    const startIndex = (page - 1) * ITEMS_PER_PAGE;

    const inboxSql = `
      SELECT email.*, user.username as sender_name
      FROM email
      INNER JOIN user ON email.senderId = user.userId
      WHERE recipientId = ?
      ORDER BY sent_datetime DESC
      LIMIT ?, ?;
    `;
    db.query(inboxSql, [userId, startIndex, ITEMS_PER_PAGE], 
      (err, results) => {
        if (err) throw err

        const totalItemsSql = 'SELECT COUNT(*) as count FROM email WHERE recipientId = ?';
        db.query(totalItemsSql, [userId], (err, result) => {
          if (err) throw err;
  
          const totalItems = result[0].count;
          const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
          // console.log(results);
          res.render('home', {
            username: username,
            inbox: "",
            outbox: 'hidden="hidden"',
            compose: 'hidden="hidden"',
            detail: 'hidden="hidden"',
            email: results,
            currentPage: page,
            totalPage: totalPages,
            users: '',
            message : message
        }) 
  
      })
    })




}

module.exports = inbox