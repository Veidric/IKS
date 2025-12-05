module.exports = {
  port: process.env.PORT || 8080, //port na kojem će biti server
  pool: {
    connectionLimit: 100,
    host: "localhost", //localhost je default
    user: "root", //root je default
    password: "rootpass", //dopisati lozinku za lokalni mysql
    database: "IKS", //naziv baze podataka
  },
  secret: "najjacisecretikad",
};
