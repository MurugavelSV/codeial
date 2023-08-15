module.exports.home = (req, res) => {
    console.log(req.cookies);
    res.cookie('blah', 'hello');
    return res.render('home', {
        title: 'Codeial'
    });
}