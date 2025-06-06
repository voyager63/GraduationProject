module.exports = {
    productList: {
        query: "SELECT p.product_id, p.product_name, p.product_price, u.user_name FROM product p JOIN user u ON p.user_id = u.user_id;"
    },

    getMyProducts: {
        query: "SELECT * FROM product WHERE user_id = ?;"
    },

    signUp: {
        query: "INSERT INTO user(user_id, user_password, user_name, user_email, user_phoneNumber) VALUES(?, password(?), ?, ?, ?);"
    },

    productRegister: {
        query: "INSERT INTO product(user_id, product_name, product_price, product_quality, product_timeUsed) VALUES(?, ?, ?, ?, ?);"
    },

    login: {
        query: "SELECT * FROM user WHERE user_id = ? AND user_password = password(?);"
    },

    deleteProduct: {
        query: "DELETE FROM product WHERE product_id = ? AND user_id = ?"
    },

    getProductDetails: {
        query: "SELECT p.*, u.user_name FROM product p JOIN user u ON p.user_id = u.user_id WHERE p.product_id = ?;"
    }
}