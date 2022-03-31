module.exports = app =>{
    const { existisOrError, notExistisOrError, validateContainer } = app.api.validation

    const save = async(req, res) => {
        const container = {...req.body}
        
        try{
            existisOrError(container.cliente, 'Digite o nome do cliente')
            existisOrError(container.container, 'Digite o numero do conteiner')
            validateContainer(container.container, 'Digite um numero de conteiner valido')
            existisOrError(container.tipo, 'Por favor escolha o tipo')
            existisOrError(container.status, 'Por favor escolha o status')
            existisOrError(container.categoria, 'Por favor escolha a categoria')

            //const conteinerFromDb = await app.db('containers').where({})
        }catch(msg){
            return res.status(400).send(msg)
        }
        if(container.id){
            app.db('containers').update(container).where({id:container.id})
            .then(()=> res.status(204).send())
            .catch(err=> res.status(500).send(err))
        }else{
            app.db('containers').insert(container)
            .then(()=> res.status(204).send())
            .catch(err=> res.status(500).send(err))
        }
    }

    const getAll = (req, res) => {
        app.db('containers').select('id', 'cliente', 'container', 'tipo', 'status', 'categoria' )
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try{
            existisOrError(req.params.id, "Container não informado")

            const existisMovement = await app.db('movimentacoes')
            .where({idContainer: req.params.id})

            notExistisOrError(existisMovement, "Existe movimentação cadastrada para o container")
            const rowsDeleted = await app.db('containers')
            .where({id: req.params.id}).del()
            existisOrError(rowsDeleted, 'Container não encontrado')
            res.status(204).send()
        } catch(msg){
            res.status(500).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db( 'containers' )
        .where({id: req.params.id})
        .first()
        .then(category => res.json(category))
        .catch(err => res.status(500).send())
    }

    const getContainerCliente = (req, res) => {
        app.db.select('id',app.db.raw('CONCAT(container, \' -> \', cliente) as "containerCliente"')).from( 'containers' )
        .then(category => res.json(category))
        .catch(err => res.status(500).send())
    }

    return { save, getAll, remove, getById, getContainerCliente } 
}