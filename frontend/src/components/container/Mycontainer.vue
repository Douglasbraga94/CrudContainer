<template>
    <div>
        <PageTitle icon="fa fa-ship" title="Contêiner" sub="CRUD Contêiner"/>
        <div v-if="edit" >
      <div>
        <h5>{{title}}</h5>
      </div>
      <div >
        <div class="row p-3">
            <div class="col-md-4 form-group">
                <label for="newContainer.cliente">Cliente</label>
                <input class="form-control" type="text" v-model="newContainer.cliente">
            </div>
            <div class="col-md-4 form-group">
                <label for="newContainer.container">Nº do Contêiner</label>
                <input class="form-control" type="text" v-model="newContainer.container">
            </div>
            <div class="col-md-4 form-group">
                <label for="newContainer.tipo">Tipo</label>
                <select class="form-control" name="Tipo" id="tipo" v-model="newContainer.tipo">
                    <option value="" disabled selected >Selecione...</option>
                    <option value=20>20</option>
                    <option value=40>40</option>
                </select>
            </div>
        </div>
        <div class="row p-3">
            <div class="col-md-4 form-group">
                <label for="newContainer.status">Status</label>
                <select class="form-control" name="status" id="tipo" v-model="newContainer.status">
                    <option value="" disabled selected >Selecione...</option>
                    <option value=true>Cheio</option>
                    <option value=false>Vazio</option>
                </select>
            </div>
            <div class="col-md-4 form-group">
                <label for="newContainer.categoria">Categoria</label>
                <select class="form-control" name="categoria" id="tipo" v-model="newContainer.categoria">
                    <option value="" disabled selected >Selecione...</option>
                    <option value="Importação">Importação</option>
                    <option value="Exportação">Exportação</option>
                </select>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" @click="salvar()" class="btn btn-success">Salvar</button>
        <button type="button" @click="edit=!edit; newContainer={}" class="btn btn-danger" data-dismiss="modal">cancelar</button>
      </div>
</div>
        <div class="row">
            <div class="col-md-1 p-4"><button @click="isEdit" class="btn btn-primary">Editar</button></div>
        </div>
        <table class="table table-hover table-striped" id="dataTable2">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Nº Contêiner</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Categoria</th>
                    <th v-show="edit">Açoes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="container in containers" :key="container.id">
                    <td>{{container.cliente}}</td>
                    <td>{{container.container}}</td>
                    <td>{{container.tipo}}</td>
                    <td><span v-show="container.status">Cheio</span><span v-show="!container.status">Vazio</span></td>
                    <td>{{container.categoria}}</td>
                    <td v-show="edit">
                        <button @click="editar(container)" class="btn-table"><i class="fa fa-edit btn-edit"></i></button>
                        <button @click="remover(container)" class="btn-table"><i class="fa fa-trash btn-trash"></i></button>
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
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
 import $ from 'jquery'

export default {
    name: 'MyContainer',
    components: { PageTitle },
    data: function(){
        return {
            containers:{},
            edit: false,
            newContainer: {}
        }
    },
    methods: {
        isEdit(){
            this.edit = !this.edit
            
        },
        getContainers(){
            axios.get(`${baseApiUrl}/container`).then(res => this.containers = res.data)
            setTimeout(() => $('.table').DataTable(), 100);
            //$('.table').DataTable()
            console.log($('.table'))
        },
        async salvar(){
                await axios.post(`${baseApiUrl}/container`,this.newContainer)
                .then(()=>{
                    if(this.newContainer.id){
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
                    this.newContainer = {};
                    this.edit = !this.edit
                    this.getContainers()
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
            await axios.delete(`${baseApiUrl}/container/${selected.id}`,selected)
            .then(()=>{
                this.newContainer = {};
                this.edit = !this.edit
                this.getContainers()
                Swal.fire({
                    icon: 'success',
                    title: 'Contêiner Excluido!',
                    showConfirmButton: true,
                    timer: 1500
                })
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    title: err.response.data,
                    showConfirmButton: true,
                    timer: 2500
                }
                )
            })
        },
        editar(selected){
            this.newContainer = selected;
        }        
    },
    mounted() {
        this.getContainers()
        //setTimeout(() => $('.table').DataTable(), 1000);
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