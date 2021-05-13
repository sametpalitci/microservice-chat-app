const checkFields = (...args)=>{
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '' || args[i] === null || args[i] == undefined) {
            return false;
        }
    }
    return true;
};

module.exports = {checkFields};