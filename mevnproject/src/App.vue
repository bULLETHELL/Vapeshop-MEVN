// App.vue

<template>
 <div >
  <nav >
   <ul >
    <li >
     <router-link to="/" >Home</router-link>
    </li>
    <li >
     <router-link to="/create" >Create Post</router-link>
    </li>
    <li >
     <router-link to="/posts" >Posts</router-link>
    </li>
   </ul>
  </nav><br />
  <transition name=fade>
   <router-view></router-view>
  </transition>
 </div>
</template>

<style>
  
</style>

<script>

  export default{
  }
</script>