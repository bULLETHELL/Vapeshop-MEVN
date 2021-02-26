<template>
  <div class="">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">some nav YYYYYYYYYYYYYYYYYYYEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEETttt</router-link>
        </li>
      </ul>
    </nav><br />
    <div class="container">
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/e-juice" class="nav-link">E-juice</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/tanks_and_coils" class="nav-link">Tanks and Coils</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/batteries_and_mods" class="nav-link">Batteries and Mods</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/accessories" class="nav-link">Accessories</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add_ejuice" class="nav-link">Add E-juice</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add_address" class="nav-link">Add Address</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add_order" class="nav-link">Add Order</router-link>
        </li>
      </ul>
    </nav>
      <transition name="fade">
      <router-view></router-view>
    </transition>
    </div>

  </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>

<script>
    export default{
    }
</script>