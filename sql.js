module.exports = {
    userList: {
        query: "SELECT * FROM user;"
    },

    productList: {
        query: "SELECT * FROM product;"
    },

    getMyProducts: {
        query: "SELECT * FROM product WHERE user_id = ?;"
    },

    signUp: {
        query: "INSERT INTO user(user_id, user_password, user_email, user_phoneNumber) VALUES(?, password(?), ?, ?);"
    },

    productRegister: {
        query: "INSERT INTO product(seller_id, product_name, product_price, product_quality, product_timeUsed) VALUES(?, ?, ?, ?, ?);"
    },

    login: {
        query: "SELECT * FROM user WHERE user_id = ? AND user_password = ?;"
    }
}