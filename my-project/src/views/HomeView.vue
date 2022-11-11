<template>
  <div class="home">
    <div v-if="username === 'MOSTRAR'"> <!-- Estandar de codificacion internacial-->
      <img class = "logoMiniso" alt="Vue logo" src="../assets/Miniso_logo.png">
    </div>
    <div v-else>
      <img class = "logoPacMan" alt="Vue logo" src="../assets/pac-man-logo.png">
    </div>
  </div>

    <div>
      <table>
        <tr>
          <td>
            <label for="username">Usuario</label>
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
</template>

<script>
// @ is an alias to /src
import axios from 'axios' 

const host = "http://localhost"
export default {
  data(){
    return{
      username : '',
      password : '',
      mensaje_login : '',
      token : ''
    }
  },
  methods: {
    login(){
      var datos = {
        usuario : this.username,
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
.logoPacMan {
  width: 400px;
}
 .texto1 {
  border-radius: 5px;
 }
</style>
