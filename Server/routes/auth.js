module.exports = function(express, pool, jwt, secret) {

    const authRouter = express.Router();
    const bcrypt = require('bcryptjs');

    authRouter.get('/', function (req, res) {
        res.json({message: 'Auth moment.'});
    });



    authRouter.route('/register').post(async function (req, res) {
        if (req.body.Password != undefined){
          req.body.Password = await bcrypt.hash(req.body.Password,10);
        }
        else if ((req.body.password != undefined)) {
          req.body.password = await bcrypt.hash(req.body.password,10);
        }
        
        try {
          await pool.query('call RegisterUser(?)', [Object.values(req.body)], function(error, results, fields) {
            res.status(200).json({message: "Status code of 200!"});
          });
        } catch(e){
            res.status(400).json({message: e.message});
        }
    });
  
    authRouter.route('/login').post(async function (req, res) {
        try {
          let [rows] = await pool.query('SELECT * FROM user WHERE Username = ?', [req.body.username]);
            if ([rows].length>0 && await bcrypt.compare(req.body.password, rows[0].Password)) {
              const token = jwt.sign({
                username:rows[0].username,
                id:rows[0].id,
            }, secret, {
                expiresIn:3600
            });
            res.status(200).json({token:token, user:rows[0]});
            }
            else {
                res.status(401).json({message: 'UNAUTHORIZED'});
            }
          }
          catch (e) {
            res.status(400).json({message: "Bad request"});
          }
    });

    return authRouter;
}