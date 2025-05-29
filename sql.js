module.exports = {
    userList: {
        query: `SELECT * FROM user;`
    },

    productList: {
        query: `SELECT * FROM product;`
    },

    userInsert: {
        query: `INSERT INTO user(user_id, user_password, user_email, user_phoneNumber)
                VALUES(?, ?, ?, ?);`
    },

    productInsert: {
        query: `INSERT INTO product(product_id, seller_id, product_name, product_price, product_quality, product_timeUsed)
                VALUES(?, ?, ?, ?, ?, ?);`
    }
}