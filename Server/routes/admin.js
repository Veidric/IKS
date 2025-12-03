module.exports = function(express, pool, jwt, secret) {

    const admRouter = express.Router();
    const bcrypt = require('bcryptjs');

    admRouter.get('/', function (req, res) {
        res.json({message: 'Admin moment.'});
    });

    admRouter.route('/getUsers').get(async function (req, res) {
        try {
        let [[rows]] = await pool.query('call GetAllUsers()');
        await pool.query('call GetAllUsers()');
          res.status(200).json(rows);
      } catch (e) {
        res.status(400).json({message: e.message});
      }
    });

    admRouter.route('/deleteUser').delete(async function (req, res) {
        try{
            await pool.query('call DeleteUser(?)', [req.body.id]);
            res.status(200).json({message: 'Success!'});
        } catch(e){
            res.status(400).json({message: e.message});
        }
    });
    admRouter.route('/editUser').put(async function (req, res) {
         try{
            await pool.query('call EditUser(?,?,?,?,?,?)', [req.body.id, req.body.Username, req.body.Name, req.body.Surname, req.body.DateOfBirth, req.body.IsAdmin]);
            res.status(200).json({message: 'Success!'});
        } catch(e){
            res.status(400).json({message: e.message});
        }
    });
    


    return admRouter;
}