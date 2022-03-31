module.exports = app => {
    function existisOrError (value, msg) {
        if(!value) throw msg;
        if(Array.isArray(value) && value.length === 0 ) throw msg;
        if(typeof value === 'string' && !value.trim()) throw msg;
    }

    function notExistisOrError(value, msg) {
        try{
            existisOrError(value, msg)
        } catch(msg){
            return
        }
        throw msg
    }

    function validateContainer(value, msg) {
        re = /^[A-Za-z]{3}[0-9]{4}$/
        if(re.test(value)) return
        else throw msg
    }

    return { existisOrError, notExistisOrError, validateContainer }
}