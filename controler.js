'use strict';

var response = require('./rest');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API berjalan dengan Baik", res);
};

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

//menampilkan semua data mahasiswa berdasarkan id
exports.tampilberdasarkanid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa where id_mahasiswa = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            }
        });
};
//menambah data mahasiswa
exports.tambahMahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)', [nim, nama, jurusan],
        function(error,rows,fields){
            if (error) {
                connection.log(error);
            }else{
                response.ok("Berhasil Menambahkan Data",res);
            }
        });
};
//mengubah data mahasiswa
exports.ubahMahasiswa = function(req, res){
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan; 
    connection.query('UPDATE mahasiswa set nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?',[nim,nama,jurusan,id],
    function(error,rows,fields){
        if (error) {
            connection.log(error);
        }else{
            response.ok("berhasil Ubah Data", res);
        }
    });
};