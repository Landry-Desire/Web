var psow = {
    "_id" : "56a0ee6cfa6bdef00800b7a5",
    "password" : "passer33",
    "pseudo" : "psow",
    "bills" : [ 
        {
            "description" : "Test1",
            "amount" : 350,
            "splitType" : "PART",
            "_id" : "56a0ee7bfa6bdef00800b7a6",
            "split" : [ 
                {
                    "pseudo" : "psow",
                    "part" : 350,
                    "_id" : "56a0ee7bfa6bdef00800b7a7"
                }, 
                {
                    "pseudo" : "ouz",
                    "part" : 0,
                    "_id" : "56a0eef6fa6bdef00800b7ab"
                }
            ],
            "mine" : true
        }, 
        {
            "description" : "Test 2",
            "amount" : 400,
            "splitType" : "PART",
            "_id" : "56a0eebbfa6bdef00800b7a8",
            "split" : [ 
                {
                    "pseudo" : "psow",
                    "part" : 400,
                    "_id" : "56a0eebbfa6bdef00800b7a9"
                }
            ],
            "mine" : true
        }
    ],
    "friends" : [ 
        "ouz"
    ],
    "__v" : 4
};
var ouz = {
    "_id" : "56a0eedcfa6bdef00800b7aa",
    "password" : "passer33",
    "pseudo" : "ouz",
    "bills" : [ 
        {
            "description" : "Test1",
            "amount" : 350,
            "splitType" : "PART",
            "_id" : "56a0ee7bfa6bdef00800b7a6",
            "split" : [ 
                {
                    "pseudo" : "psow",
                    "part" : 350,
                    "_id" : "56a0ee7bfa6bdef00800b7a7"
                }, 
                {
                    "pseudo" : "ouz",
                    "part" : 0,
                    "_id" : "56a0eef6fa6bdef00800b7ac"
                }
            ],
            "mine" : false
        }
    ],
    "friends" : [ 
        "psow"
    ],
    "__v" : 2
};
//==============================================================================
//==============================================================================
//==============================================================================
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/Landry-Desire_Web";
/*MongoClient.connect(url, function(err, db) {
    db.collection("users", function(err, users) {
        if(err)
            throw err;
        users.insertOne(psow,function (e,r) {
            if(e)
                throw e;
            console.log('psow inserted');
        });
        users.insertOne(ouz,function (e,r) {
            if(e)
                throw e;
            console.log('ouzera inserted');
            console.log('Done - Type < ctrl+c >');
        });
        
    });
});
*/
console.log('Done - Type < ctrl+c >');
