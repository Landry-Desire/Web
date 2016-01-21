var psow = {
    "password" : "passer33",
    "pseudo" : "psow",
    "bills" : [ 
        {
            "description" : "Test Bon",
            "amount" : 300,
            "splitType" : "PART",
            "split" : [ 
                {
                    "pseudo" : "psow",
                    "part" : 300,
                }, 
                {
                    "pseudo" : "ouzera",
                    "part" : 0,
                }
            ],
            "mine" : true
        }, 
        {
            "description" : "another good",
            "amount" : 200,
            "splitType" : "PART",
            "split" : [ 
                {
                    "pseudo" : "ouzera",
                    "part" : 150,
                }, 
                {
                    "pseudo" : "psow",
                    "part" : 50,
                }
            ],
            "mine" : false
        }
    ],
    "friends" : [ 
        "ouzera"
    ],
    "__v" : 22
};
var ouz = {
    "password" : "passer33",
    "pseudo" : "ouzera",
    "bills" : [ 
        {
            "description" : "Test Bon",
            "amount" : 300,
            "splitType" : "PART",
            "split" : [ 
                {
                    "pseudo" : "psow",
                    "part" : 300,
                }, 
                {
                    "pseudo" : "ouzera",
                    "part" : 0,
                }
            ],
            "mine" : false
        }, 
        {
            "description" : "another good",
            "amount" : 200,
            "splitType" : "PART",
            "split" : [ 
                {
                    "pseudo" : "ouzera",
                    "part" : 150,
                }, 
                {
                    "pseudo" : "psow",
                    "part" : 50,
                }
            ],
            "mine" : true
        }
    ],
    "friends" : [ 
        "psow"
    ],
};
//==============================================================================
//==============================================================================
//==============================================================================
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/Landry-Desire_Web";
MongoClient.connect(url, function(err, db) {
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
