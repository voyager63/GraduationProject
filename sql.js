module.exports = {
    productList: {
        query: "SELECT product_id, product_name, product_price, product_img FROM product;"
    },

    getMyProducts: {
        query: "SELECT * FROM product WHERE user_id = ?;"
    },

    signUp: {
        query: "INSERT INTO user(user_id, user_password, user_name, user_email, user_phoneNumber) VALUES(?, password(?), ?, ?, ?);"
    },

    registerProduct: {
        query: "INSERT INTO product(user_id, product_name, product_price, product_quality, product_timeUsed, product_img, product_description) VALUES(?, ?, ?, ?, ?, ?, ?);"
    },

    login: {
        query: "SELECT * FROM user WHERE user_id = ? AND user_password = password(?);"
    },

    deleteProduct: {
        query: "DELETE FROM product WHERE product_id = ? AND user_id = ?"
    },

    getProductDetails: {
        query: "SELECT p.*, u.user_name FROM product p JOIN user u ON p.user_id = u.user_id WHERE p.product_id = ?;"
    },

    sendMessage: {
        query: "INSERT INTO message(product_id, sender_id, receiver_id, contents) VALUES (?, ?, ?, ?);"
    },

    getMySentMessages: {
        query: "SELECT p.product_name, p.product_price, sender.user_name AS sender_name, receiver.user_name AS receiver_name, m.contents FROM message m JOIN product p ON m.product_id = p.product_id JOIN user sender ON m.sender_id = sender.user_id JOIN user receiver ON m.receiver_id = receiver.user_id WHERE m.sender_id = ? ORDER BY m.message_id DESC;"
    },

    getMyReceivedMessages: {
        query: "SELECT p.product_name, p.product_price, sender.user_name AS sender_name, receiver.user_name AS receiver_name, m.contents FROM message m JOIN product p ON m.product_id = p.product_id JOIN user sender ON m.sender_id = sender.user_id JOIN user receiver ON m.receiver_id = receiver.user_id WHERE m.receiver_id = ? ORDER BY m.message_id DESC;"
    }
}