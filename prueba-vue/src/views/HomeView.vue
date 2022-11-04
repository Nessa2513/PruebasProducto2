<template>
  <div class="home">
    <div v-if="mayuscula(username) === 'MOSTRAR'"> <!-- Estandar de codificacion internacial-->
    <img class = "logoMiniso" alt="Vue logo" src="../assets/Miniso_logo.png">
  </div>
  <div v-else>
    <img class = "logoPacMan" alt="Vue logo" src="../assets/pac-man-logo.png">
  </div>
    <div>{{username}}</div>
    <div>
      <input type="button" value="Clic Aqui">  
      <input v-model="username" type="text" id="username">
    </div>
  </div>
</template>

<script>
// De primero se hacen las importaciones 
 
 // export default
 export default{
  data(){
    return{
      username : 'Vanessa',
      password : 'Colombia123'
    } // Despues de este van variables
  }, // Despues de este van las metodologias
methods:{
  mayuscula(palabra){
    var m = palabra.toUpperCase()
    this.username = m
    return m
  }
}
 }
</script>
<style>
 
.logoPacMan {
  width: 400px;
}
</style>
