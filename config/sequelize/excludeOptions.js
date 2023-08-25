var excludeBasic = ['password', 'salt'] ;

var userExcludeOptions = { 
    exclude: excludeBasic
};

var userSearchExclude = {
    exclude: excludeBasic.concat(['email', 'phone', 'sex', 'age'])
}

module.exports = {
    userExcludeOptions,
    userSearchExclude
}