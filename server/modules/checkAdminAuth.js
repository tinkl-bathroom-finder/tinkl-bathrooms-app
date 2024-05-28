const pool = require('./pool');


const checkAdminAuth = async (req, res, next) => {
    const queryString = `SELECT * FROM "user" WHERE "id" = $1`;
    console.log('auth', req.user);

    try {
        const response = await pool.query(queryString, [req.user.id])
        if (response.rows[0].is_admin) {
            return next();
        } else if (!response.rows[0].is_admin) {
            res.json({ message: "User not authorized" })
        }
    } catch (error) {
        console.error("Error verifying admin user", error);
    }

};

module.exports = checkAdminAuth;