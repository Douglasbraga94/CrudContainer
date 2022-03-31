<template>
    <div class="page-title">
        <h2><i :class="icon"></i> {{title}} </h2>
        <h3>{{sub}}</h3>
        
    </div>
</template>

<script>

export default {
    name:'PageTitle',
    props:['icon', 'title', 'sub']
}
</script>

<style>
    .page-title h2{
        margin: opx;
    }

    .page-title h3 {
        color: #777;
        margin-top: 5px;
        font-size: 1.3rem;
        border-bottom: solid 1.5px #777;
        padding-bottom: 20px;
    }
</style>