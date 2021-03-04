<template>
  <div class="">
    <nav
      class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center"
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">My Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="nav-link btn btn-danger"
            v-on:click="logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
    <br />
    <div class="d-flex justify-content-center">
      <img src="./assets/test.png" />
    </div>
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="p-2"><img src="./assets/logo.png" /></div>
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            placeholder="Search"
            type="text"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <a class="dropdown-item" href="#!">Action</a>
            <a class="dropdown-item" href="#!">Another action</a>
          </div>
        </div>
      </div>

      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/e-juice" class="nav-link">E-juice</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tanks_and_coils" class="nav-link"
              >Tanks and Coils</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/batteries_and_mods" class="nav-link"
              >Batteries and Mods</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/accessories" class="nav-link"
              >Accessories</router-link
            >
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      let url = "http://localhost:4000/user/logout";
      this.axios
        .get(url)
        .then((res) => {
          console.log(res);
          console.log(this.$cookie.get("auth"));
          this.$cookie.delete("auth");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
