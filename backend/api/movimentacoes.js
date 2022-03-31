module.exports = app => {
    const { existisOrError, notExistisOrError } = app.api.validation

    const save = async(req, res) => {
        const movimentacao = {...req.body}
        
        try{
            existisOrError(movimentacao.idTipo, 'Escolha o tipo de movimentação')
            existisOrError(movimentacao.idContainer, 'Escolha o container a ser movimentado')
            existisOrError(movimentacao.dataHoraInicio, 'Escolha a hora de Inicio')
            existisOrError(movimentacao.dataHoraFim, 'Escolha a hora de Fim')
            
            const existisContainer= await app.db('containers')
            .where({id: req.body.idContainer})
            console.log(existisContainer)
            existisOrError(existisContainer, "o contêiner informado não existe!")

        }catch(msg){
            return res.status(400).send(msg)
        }
        if(movimentacao.id){
            app.db('movimentacoes').update(movimentacao).where({id:movimentacao.id})
            .then(()=> res.status(204).send())
            .catch(err=> res.status(500).send(err))
        }else{
            app.db('movimentacoes').insert(movimentacao)
            .then(()=> res.status(204).send())
            .catch(err=> res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try{
            const rowsDeleted = await app.db('movimentacoes')
            .where({id: req.params.id}).del()
            existisOrError(rowsDeleted, 'Movimentação não encontrada')
            res.status(204).send()
        } catch(msg){
            res.status(500).send(msg)
        }
    }
    const getAll = (req, res) => {
        app.db('movimentacoes').select('id', 'idTipo', 'idContainer', 'dataHoraInicio', 'dataHoraFim' )
        .then(movimentacoes => res.json(movimentacoes))
        .catch(err => res.status(500).send(err))
    }

//app.db.count('movimentacoes.id', {as: 'quantidade'})
    const getRelatorio = (req, res) =>{
        app.db.count('movimentacoes.id', {as: 'quantidade'}).select('containers.cliente', 'tipos.tipo').from('movimentacoes')
        .join('containers', 'containers.id', 'movimentacoes.idContainer').join('tipos', 'tipos.id', 'movimentacoes.idTipo')
        .groupBy('containers.cliente', 'tipos.id').orderBy('containers.cliente').then(relatorio => res.json(relatorio))
    }

    const getExportImport = (req, res) =>{
        app.db.count('id').from('containers').where({categoria: req.params.categoria}).then(relatorio => res.json(relatorio))
    }

    const getAllJoin = (req, res) =>{
        app.db.select('containers.id as idcontainer', 'containers.container', 'containers.cliente', 
        'movimentacoes.id as idmovimentacao', 'movimentacoes.idTipo', 'movimentacoes.dataHoraInicio', 
        'movimentacoes.dataHoraFim', 'tipos.tipo')
        .from('containers').join('movimentacoes', {'containers.id': 'movimentacoes.idContainer'})
        .join('tipos', 'movimentacoes.idTipo', 'tipos.id').then(mov => res.json(mov))
    }
    return { save, getAll, remove, getRelatorio, getAllJoin, getExportImport } 
}