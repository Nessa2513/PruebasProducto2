<template>
  <div class="about">
    <div v-if="sesion">
    <h1>Bienve al sistema de trasteo :D</h1>
  </div>
    <div v-else>Chao pa</div>
  </div>

</template>

<script>
import { Session } from 'inspector';

export default{
  data(){ // Retorna todas las variables
    return{
      token: '',
      sesion : false
    }
  },
  mounted(){ // se ejecuta apenas se abre el componente (en este caso, la pagina completa) - es función y por eso se ejecuta una unica vez al cargar la pagina
    var tok = localStorage.getItem('token')
    console.log(tok)
    if(tok != null){
      this.sesion = true
    }else{
      this.sesion = false
    }
  },
  methods:{ //Zona para escribir funciones - es json
    logout(){
      localStorage.clear()
    }
  }
}
</script>
