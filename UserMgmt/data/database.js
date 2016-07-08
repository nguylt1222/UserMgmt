(function (database) {
    
    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/UserMgmt";
    var theDb = null;

    database.getDb = function (next) {
        if (!theDb) {
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db,
                        employees: db.collection("employees")
                    };
                    next(null, theDb);
                }
            });

        } else { 
            next(null, theDb);
        }
    }

})(module.exports);

