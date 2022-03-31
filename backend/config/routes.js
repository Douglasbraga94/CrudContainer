module.exports = app => {
    app.route('/container').post(app.api.container.save)
    .get(app.api.container.getAll)

    app.route('/container/getContainerCliente').get(app.api.container.getContainerCliente)
    

    app.route('/container/:id')
    .delete(app.api.container.remove)
    .put(app.api.container.save)
    .get(app.api.container.getById)

    app.route('/movimentacoes').post(app.api.movimentacoes.save)
    .get(app.api.movimentacoes.getAll)

    app.route('/movimentacoes/getalljoin').get(app.api.movimentacoes.getAllJoin)
    app.route('/movimentacoes/:categoria').get(app.api.movimentacoes.getExportImport)

    app.route('/movimentacoes/:id')
    .delete(app.api.movimentacoes.remove)
    .put(app.api.movimentacoes.save)

    app.route('/movimentacoes/relatorio/relatorio').get(app.api.movimentacoes.getRelatorio)

    app.route('/tipos').get(app.api.tipos.getAll)

    
}