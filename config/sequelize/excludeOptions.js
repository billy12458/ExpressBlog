var excludeBasic = ['password', 'salt'] ;

var userExcludeOptions = { 
    exclude: excludeBasic
};

var userSearchExclude = {
    exclude: excludeBasic.concat(['email', 'phone', 'sex', 'age'])
}

var emailInclude = ['email']

module.exports = {
    userExcludeOptions,
    userSearchExclude,
    emailInclude
}