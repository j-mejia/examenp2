var express = require('express');
var router = express.Router();

function initMangaApi(db)
{
  var fileModel = require('../filemodel');
  var mangaCollection = fileModel.getManga();

  var mangaModel = require('./manga.model')(db);

  router.get('/', function (req, res) {
    res.json({
      "entity": "manga",
      "version": "0.0.1"
    });
  }); //get

  router.get('/all', function(req, res){
    mangaModel.getAllManga((err, manga)=>{
      if(err){
        res.status(404).json([]);
      } else {
        res.status(200).json(manga);
      }
    });// end getAllProducts
  }); // get /all


  router.post('/new', function(req, res)
  {
    if (req.user.roles.findIndex((o)=>{return o=="administrador"}) == -1) 
    {
      return res.status(401).json({"error":"Sin privilegio"});
    }

    var newManga = Object.assign(
       {},
       req.body,
       { 
         "codigo":req.body.codigo,
         "nombre":req.body.nombre,
         "autor":req.body.autor,
         "PaisOrigen": req.body.PaisOrigen,
         "Estado": req.body.Estado,
         "KeyWords":req.body.KeyWords,
         "Categorias": req.body.Categorias
       }
     );
    mangaModel.saveNewManga(newManga, (err, rslt)=>{
      if(err){
        res.status(500).json(err);
      }else{
        res.status(200).json(rslt);
      }
    });// saveNewProduct
 }); // post /new

    return router;
}

module.exports = initMangaApi;