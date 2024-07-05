const mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
})

connection.connect((err) => {
    if (err) { throw err }
    else {
        console.log("Database connected")
    };
})
connection.query("CREATE DATABASE IF NOT EXISTS wpr2023")
connection.query(`USE wpr2023`)
connection.query(`
    CREATE TABLE IF NOT EXISTS user(
        userId INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL 
    )`)
connection.query(`
    CREATE TABLE IF NOT EXISTS email(
        emailId INT PRIMARY KEY AUTO_INCREMENT,
        senderId INT, 
        recipientId INT,
        subject VARCHAR(255),
        body TEXT,
        sent_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (senderId) REFERENCES user(userId),
        FOREIGN KEY (recipientId) REFERENCES user(userId)  
    )
    `)


connection.query('SELECT * FROM user', '', (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
        var insertUserSql = `INSERT INTO user (username, email, password) VALUES ? `
        var insertUserValues = [
            ['user1', 'a@a.com', '123'],
            ['user2', 'user2@gmail.com', 'abc'],
            ['user3', 'user3@gmail.com', 'xyz']
        ]
        connection.query(insertUserSql, [insertUserValues], (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Data inserted')
            }
        })
    } 
})


connection.query('SELECT * FROM email', '', (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
        connection.query(`INSERT INTO email (senderId, recipientId, subject, body, sent_datetime) VALUES
(1, 2, 'Subject 1', 'Body of email 1', TIMESTAMP(NOW())),
(2, 1, 'Subject 2', 'Body of email 2', TIMESTAMP(NOW())),
(1, 3, 'Subject 3', 'Body of email 3', TIMESTAMP(NOW())),
(3, 1, 'Subject 4', 'Body of email 4', TIMESTAMP(NOW())),
(2, 3, 'Subject 5', 'Body of email 5', TIMESTAMP(NOW())),
(3, 2, 'Subject 6', 'Body of email 6', TIMESTAMP(NOW())),
(1, 2, 'Subject 7', 'Body of email 7', TIMESTAMP(NOW())),
(2, 1, 'Subject 8', 'Body of email 8', TIMESTAMP(NOW()));
`, (err) => {
            if (err) { throw new Error(err.message) }
            console.log("Mail inserted")
        })
    } 
})


module.exports = connection
