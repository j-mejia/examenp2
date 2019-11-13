var ObjectId = require('mongodb').ObjectId;
var IndexVerified = false;

function mangaModel(db)
{
    let mangaModel = {};
    var mangaCollection = db.collection("manga");

    
    if ( !IndexVerified) {
        mangaCollection.indexExists("codigo_1", (err, rslt)=>{
        if(!rslt){
            mangaCollection.createIndex(
            { "codigo": 1 },
            { unique: true, name:"codigo_1"},
            (err, rslt)=>{
                console.log(err);
                console.log(rslt);
            });//createIndex
        }
        }); // indexExists
    }

    mangaModel.getAllManga = (handler)=>
    {
        mangaCollection.find({}).toArray(
          (err, docs)=>{
            if(err)
            {
              console.log(err);
              return handler(err, null);
            }
            return handler(null, docs);
          }
        );
    } // end getAllProducts

    mangaModel.saveNewManga = (newManga, handler)=>
    {
        mangaCollection.insertOne(newManga, (err, result)=>
        {
          if(err)
          {
            console.log(err);
            return handler(err, null);
          }
          return handler(null, result);
        }); //insertOne
    }

    

    return mangaModel;
}
module.exports = mangaModel;