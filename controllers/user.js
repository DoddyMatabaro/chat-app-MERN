exports.postUser = (req, res, next)=>{
    const username = req.body.username;
    const pass = req.body.pass;

    const user = new User(username, pass);
    user.save()
    .then((result=>{
        console.log("user created");
        res.redirect('/users');
    }))
    .catch(err => {
        console.log(err);
    })
}