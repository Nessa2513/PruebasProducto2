<template>
  <nav>
    <h1 class="HomeroTitulo">Sistema de Rastreo</h1>
  </nav>
  <router-view/>
</template>

<style>
.HomeroTitulo{
  color :rgb(181, 47, 218)
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
