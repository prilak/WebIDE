var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}

exports.signin = function(req, res) {
 
    res.render('signin');
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
        if (err) throw err;
        res.redirect('/');
 
    });
 
}

exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}

exports.home = function(req, res) {
    res.render('home');
}