<template>
    <div>
        <PageTitle icon="fa fa-book" title="Movimentações" sub="CRUD Movimentações"/>
        <div v-if="edit" >
      <div>
        
      </div>
      <div >
        <div class="row p-3">
            <div class="col-md-3 form-group">
                <label for="newMovimentacao.idTipo">Tipo de Movimentação</label>
                <select class="form-control" name="Tipo" id="tipo" v-model="newMovimentacao.idTipo">
                    <option value="" disabled selected >Selecione...</option>
                    <option v-for="tipo in tipos" :value="tipo.id" :key="tipo.id">{{tipo.tipo}}</option>
                </select>
            </div>
            <div class="col-md-3 form-group">
                <label for="newMovimentacao.idContainer">Container</label>
                <select class="form-control" name="Tipo" id="tipo" v-model="newMovimentacao.idContainer">
                    <option value="" disabled selected >Selecione...</option>
                    <option v-for="container in containers" :value="container.id" 
                    :key="container.id">{{container.containerCliente}}</option>
                </select>
            </div>
            <div class="col-md-3 form-group">
                <label for="newMovimentacao.dataHoraInicio">Data e Hora Inicio</label>
                <input class="form-control" type="datetime-local" v-model="newMovimentacao.dataHoraInicio">
            </div>
            <div class="col-md-3 form-group">
                <label for="newMovimentacao.dataHoraFim">Data e Hora Fim</label>
                <input class="form-control" type="datetime-local" v-model="newMovimentacao.dataHoraFim">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" @click="salvar()" class="btn btn-success">Salvar</button>
        <button type="button" @click="edit=!edit; newMovimentacao={}" class="btn btn-danger" data-dismiss="modal">cancelar</button>
      </div>
</div>
        <div class="row">
            <div class="col-md-1 p-4"><button @click="isEdit" class="btn btn-primary">Editar</button></div>
        </div>
        <table class="table table-hover table-striped" id="datatable">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Tipo de Movimentação</th>
                    <th>Data e Hora Inicio</th>
                    <th>Data e Hora Inicio</th>
                    <th v-show="edit">Açoes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="movimentacao in movimentacoes" :key="movimentacao.id">
                    <td>{{movimentacao.cliente}}</td>
                    <td>{{movimentacao.tipo}}</td>
                    <td>{{new Date(movimentacao.dataHoraInicio).toLocaleString('pt-BR', { timeZone: 'UTC' })}}</td>
                    <td>{{new Date(movimentacao.dataHoraFim).toLocaleString('pt-BR', { timeZone: 'UTC' })}}</td>
                    <td v-show="edit" class="">
                        <button @click="editar(movimentacao)" class="btn-table"><i class="fa fa-edit btn-edit"></i></button>
                        <button @click="remover(movimentacao)" class="btn-table"><i class="fa fa-trash btn-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import PageTitle from '../tamplate/PageTitle'
import axios from 'axios'
import {baseApiUrl} from "@/global"
import Swal from 'sweetalert2'
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'


export default {
    name: 'MyMovimentacoes',
    components: { PageTitle },

    data: function(){
        return {
            edit: false,
            movimentacoes:[],
            containers: [],
            newMovimentacao: {},
            tipos:[],

        }
    },
    methods: {

        isEdit(){
            this.edit = !this.edit
            console.log(this.edit)
        },
        getMovimentacoes(){
            axios.get(`${baseApiUrl}/movimentacoes/getalljoin`).then(res => this.movimentacoes = res.data)
            setTimeout(() => $('#datatable').DataTable(), 100);
            console.log($('#datatable'))
        },
        getContainers(){
            axios.get(`${baseApiUrl}/container/getContainerCliente`).then(res => this.containers = res.data)
        },
        async salvar(){
                await axios.post(`${baseApiUrl}/movimentacoes`,this.newMovimentacao)
                .then(()=>{
                    if(this.newMovimentacao.id){
                        Swal.fire({
                            icon: 'success',
                            title: 'Contêiner Atualizado!',
                            showConfirmButton: true,
                            timer: 1500
                        })
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: 'Contêiner Adicionado!',
                            showConfirmButton: true,
                            timer: 1500
                        })
                    }
                    this.newMovimentacao = {};
                    this.edit = !this.edit
                    this.getMovimentacoes()
                    })
                .catch(err=>{
                    console.log(err)
                    
                    Swal.fire({
                        icon: 'error',
                        title: err.response.data,
                        showConfirmButton: true,
                        timer: 2500
                    }
                    )
                    })
            
        },
        async remover(selected) {
            await axios.delete(`${baseApiUrl}/movimentacoes/${selected.idmovimentacao}`,selected)
            .then((res)=>{
                console.log(res)
                this.newMovimentacao = {};
                this.edit = !this.edit
                this.getMovimentacoes()
                Swal.fire({
                    icon: 'success',
                    title: 'Contêiner Excluido!',
                    showConfirmButton: true,
                    timer: 1500
                })
            })
            .catch(err=>{
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: err.response.data,
                    showConfirmButton: true,
                    timer: 2500
                }
                )
            })
        },
        getTipos(){
             axios.get(`${baseApiUrl}/tipos`).then(res => this.tipos = res.data)
        },
        editar(selected){
            this.newMovimentacao = {}
            this.newMovimentacao.id = selected.idmovimentacao
            this.newMovimentacao.idTipo = selected.idTipo;
            this.newMovimentacao.idContainer = selected.idcontainer
            var dataInicio = selected.dataHoraInicio.replace(" ", "T")
            var dataFim = selected.dataHoraFim.replace(" ", "T")
            this.newMovimentacao.dataHoraInicio = dataInicio.substr(0,19)
            this.newMovimentacao.dataHoraFim = dataFim.substr(0,19)
            
        }        
    },
    mounted() {
        this.getContainers()
        this.getTipos()
        this.getMovimentacoes()
        console.log(this.movimentacoes)

    }
    
    
}

</script>

<style>
    .btn-table{
        border: none;
        background-color: var(--bs-table-bg);
        color: rgb(39, 39, 88);
        font-size: 20px;
    }

    .btn-table .btn-edit{
        color: rgb(33, 97, 33);
    }

    .btn-table .btn-trash{
        color: rgba(170, 41, 41, 0.932);
    }
</style>