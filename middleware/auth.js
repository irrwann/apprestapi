var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../rest');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip =require('ip');

//controller untuk register
exports.registrasi = function(req, res) {
    // var post = {
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: md5(req.body.password),
    //     role: req.body.role,
    //     tanggal_daftar: req.body.tanggal_daftar
    // }
   var username= req.body.username,
        email= req.body.email,
        password= md5(req.body.password),
        role= req.body.role,
        tanggal_daftar= req.body.tanggal_daftar
    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user","email",email];

    query =mysql.format(query,table);
    connection.query(query, function (error,rows) {
       if (error) {
           console.log(error);
       } else{
           if (rows.length == 0) {
               //var query = "INSERT INTO user(username,email,password,role,tanggal_daftar) VALUES(?,?,?,?,?)";
               connection.query('INSERT INTO user(username,email,password,role,tanggal_daftar) VALUES(?,?,?,?,?)',[username,email,password,role,tanggal_daftar],function(error,rows) {
                    if (error) {
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambah data user baru",res);
                    }
               })
           }else{
               response.ok("Email sudah terdaftar",res);
           }
       }
    });
};
