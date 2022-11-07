const getDb =  require('../util/database').getDB;
class User{
    constructor(username,password){
        this.username = username;
        this.password = password;
    }

    save(){
        const db = getDb();
        return db.collection('users')
        .insertOne(this)
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.error(err)
        });
        
    }
}