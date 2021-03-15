<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <ul class="nav-mobile right">
          <li>
            <router-link to="/"></router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/profile">Profile</router-link>
          </li>
          <li v-if="isAuthenticated">
            <a v-on:click="logout" class="waves-effect waves-light btn"
              >Log out</a
            >
          </li>
        </ul>
      </div>
    </nav>
    <br />
    <div class="center-align">
      <img src="./assets/test.png" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col s4">
          <img src="./assets/logo.png" />
        </div>
        <div class="col s4">
          <form>
            <div class="input-field">
              <label class="label-icon" for="search"
                ><i class="material-icons">search</i></label
              >
              <input list="productsList" id="search" type="search" required />
              <datalist id="productsList"></datalist>
              <i class="material-icons">close</i>
            </div>
          </form>
        </div>
        <div class="col s2 offset-s2">
          <a @click="updateCart()" class="waves-effect waves-light btn modal-trigger" href="#shoppingCart"> <i class="material-icons">shopping_cart</i>Shopping Cart</a>
          <div id="shoppingCart" class="modal">
            <div class="modal-content">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody v-for="item in cart" :key="item._id">
                  <tr>
                    <td>{{item[Object.keys(item)[0]].name}}</td>
                    <td>{{item.amount}}</td>
                    <td>130</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
          </div>
        </div>
      </div>

      <nav>
        <div class="nav-wrapper">
          <a href="#" data-target="mobile-nav" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
          <ul class="hide-on-med-and-down">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/e_juices">E-juice</router-link>
            </li>
            <li>
              <router-link to="/tanks_and_coils">Tanks and Coils</router-link>
            </li>
            <li>
              <router-link to="/batteries_and_mods"
                >Batteries and Mods</router-link
              >
            </li>
            <li>
              <router-link to="/accessories">Accessories</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <ul class="sidenav" id="mobile-nav">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/e_juices">E-juice</router-link>
        </li>
        <li>
          <router-link to="/tanks_and_coils">Tanks and Coils</router-link>
        </li>
        <li>
          <router-link to="/batteries_and_mods">Batteries and Mods</router-link>
        </li>
        <li>
          <router-link to="/accessories">Accessories</router-link>
        </li>
      </ul>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Steam N Smoke</h5>
            <p class="grey-text text-lighten-4">Faaborgvej 33</p>
            <p class="grey-text text-lighten-4">5250 Odense, Denmark</p>
            <p class="grey-text text-lighten-4">+45 30 51 54 03</p>
          </div>
          <div class="col l6 s12">
            <h5>Contact Us</h5>
            <ul>
              <li>
                <a class="grey-text text-lighten-3" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">© 2021 Steam n Smoke</div>
      </div>
    </footer>
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
    return {
      cart: [],
      isAuthenticated: this.$cookie.get("auth") != null ? true : false,
      products: [],
    };
  },
  created() {
    console.log("hejsa"),
    this.cart = JSON.parse(localStorage.getItem("cart") || "[]")
    window.M.AutoInit(); // That way, it is only initialized when the component is mounted
    let url = "http://localhost:4000/products/getall";
    this.axios
      .get(url)
      .then((res) => {
        this.products = res.data;

        // Update Search Result datalist
        var searchResultsDatalistElement = document.getElementById(
          "productsList"
        );

        this.products.forEach((product) => {
          var optionElement = document.createElement("option");
          optionElement.value = product[Object.keys(product)[0]].name;
          searchResultsDatalistElement.appendChild(optionElement);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    updateCart() {
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
      console.log(this.cart);
    },
    logout() {
      let url = "http://localhost:4000/user/logout";
      this.axios
        .get(url)
        .then((res) => {
          console.log(res);
          console.log(this.$cookie.get("auth"));
          this.$cookie.delete("auth");
          this.$router.push({ name: "home" });
          this.$router.go();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
