<template>
  <div class="home">
    <div v-if="username === 'MOSTRAR'"> <!-- Estandar de codificacion internacial-->
    <img class = "logoMiniso" alt="Vue logo" src="../assets/Miniso_logo.png">
  </div>
  <div v-else>
    <img class = "logoPacMan" alt="Vue logo" src="../assets/pac-man-logo.png">
  </div>
    <div>{{username}}</div>
    <div>
      <input type="button" value="Clic Aqui">  
      <input v-model="username" type="text" id="button2">
    </div>
    
    <div>
      <table>
        <tr>
          <td>
           <label for="username">Cedula</label> 
          </td>
          <td>
            <input v-model="username" type="text" id="username">
          </td>
        </tr>
        <tr>   
          <td>
            <label for="clave">Contraseña</label>
          </td> 
          <td>
            <input v-model="clave" type="text" id="clave" class="texto1">
          </td>
        </tr>
        <tr>
        <td>
            <button v-on:click="login" class="button1"> Login</button>
        </td>
      </tr>
      </table>
    </div>
    <div>
      <label for="clave">Contraseña</label> 
      <input v-model="username" type="text" id="clave">
    </div>
  </div>
</template>

<script>
// De primero se hacen las importaciones 
 import axios from 'axios'
//import { response } from 'express'
 // export default
 const host = "http://localhost"
 export default{
  data(){
    return{
      username : '',
      password : '',
      mensaje_login : '',
      token : ''
    } // Despues de este van variables
  }, // Despues de este van las metodologias
  methods: {
     // mayuscula(palabra){
    //   var m = palabra.toUpperCase()
    //   this.username = m
    //   return m
    //  }
  
  login(){
 //   alert("Se ha dado clic")
    var datos = {
      cedula : this.username,
      clave : this.password
    }
    axios.post(host + "/login", datos)
    .then(response =>{
      var m = response.data.mensaje
      this.mensaje_login = m
      console.log(response)
      if(response.data.token && response.data.check){
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        this.$router.replace('about')
      }
    }).catch(error =>{
      console.log(error)
    })
  }
}
 }
</script>
<style>
 .table, th, td{
  border : 0px solid black;
 }
 .texto1 {
  border-radius: 5px;
 }
.logoPacMan {
  width: 400px;
}
</style>
