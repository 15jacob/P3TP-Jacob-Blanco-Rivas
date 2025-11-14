const authViews = (req, res, next) => {
    //Puenteado momentaneamente
    next()
    
/*     if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/login');
    } */
};

module.exports = authViews;