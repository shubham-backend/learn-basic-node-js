
// exports.getUsers = async function (req, res, next) {
// console.log('Hello');
// 	connection.query('select * from users', function (error, results, fields) {
//         if (error) throw error;
//         return res.status(200).json({ status: 200, data: results, message: "Succesfully Users Retrieved" });
//         //res.end(JSON.stringify(results));
//     });
// }

//MySql Connection
var connection = require('../../../mysql.js')


exports.getUsers = (req,res,next) => {
		connection.query('select * from users', function (error, results, fields) {
        if (error) throw error;
        return res.end(results);
        });

	}

