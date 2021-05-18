'use strict';

module.exports = function(app){
    var jsonku =require('./controler');
    app.route('/')
        .get(jsonku.index);
    app.route('/tampil')
        .get(jsonku.tampilsemuamahasiswa);
}