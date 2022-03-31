module.exports = app =>{
    const { existisOrError, notExistisOrError, validateContainer } = app.api.validation

    const getAll = (req, res) => {
        app.db('tipos').select('id', 'tipo')
        .then(tipos => res.json(tipos))
        .catch(err => res.status(500).send(err))
    }

    return { getAll } 
}