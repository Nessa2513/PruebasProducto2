<template>
  <div class="home">
    <img class = "logoPacMan" alt="Vue logo" src="../assets/pac-man-logo.png">
    <HelloWorld msg="Welcome to track system by VC"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style>
.logoPacMan {
  width: 400px;
}
</style>
