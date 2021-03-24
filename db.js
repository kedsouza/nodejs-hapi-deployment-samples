var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
    db.run("CREATE TABLE names (name TEXT NOT NULL)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();
    db.run('INSERT INTO names VALUES (?), (?) , (?)', [ 'Bob', 'Sam', 'Jill' ], (err)=>{
        if (err) {
            console.log(err)
        } else {
            console.log('Inserted')
        }
    })

    // db.each("SELECT rowid AS id, info FROM names", function(err, row) {
    //     console.log(row.id + ": " + row.info);
// });
});

//db.close();

const getNames = () =>  {
    return new Promise((resolve, reject) => {
        db.all("SELECT rowid AS id, name FROM names", function(err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        }); 
    })
}

const findName = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT name FROM names WHERE rowid = (?)", [id], function(err, rows) {
            if (err) {
                reject(err)
            } else {
                if (rows === undefined) {
                    reject (false)
                } else {
                    resolve(true)
                }
            }
        })
    })
}

const addName = (name) => {
    return new Promise ((resolve, reject) => {
        db.run('INSERT INTO names VALUES (?)', [name], (err) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve('Inserted ' + name)
            }
        })  
    })
}

const editName = (id, name) => {
    return new Promise ((resolve, reject) => {
        db.run('UPDATE names SET name = (?) WHERE rowid = (?)', [name, id], (err) => {
            if (err) {
                reject (err)
            } else {
                resolve('Updated Id: ' + id + ' to ' + name)
            }
        })
    })
}

const deleteName = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM names WHERE rowid = (?)', [id], (err) => {
            if (err) {
                console.log(err)
                reject (err)
            } else {
                resolve('Deleted Id: ' + id)
            }
        })
    })
}


module.exports = {getNames, findName, addName, editName, deleteName}