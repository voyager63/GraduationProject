module.exports = {
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
        query: "INSERT INTO product(user_id, product_name, product_price, product_quality, product_timeUsed) VALUES(?, ?, ?, ?, ?);"
    },

    login: {
        query: "SELECT * FROM user WHERE user_id = ? AND user_password = password(?);"
    },

    deleteProduct: {
        query: "DELETE FROM product WHERE product_id = ? AND user_id = ?"
    }
}