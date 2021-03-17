<template>
  <div>
    <form>
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
          required
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
          required
        />
      </div>
      <button type="submit" @click="handleSubmit" class="btn btn-primary">
        Login
      </button>
    </form>
    <a href="/register">Don't have a user? Register here</a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.axios
          .post(
            "http://localhost:4000/user/login",
            {
              email: this.email,
              password: this.password,
            },
            { withCredentials: true }
          )
          .then((response) => {
            if (response.data.isAuth == true) {
              this.$emit("loggedIn");
              this.$router.push({ name: "home" });
              this.$router.go();
            } else {
              alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
  },
};
</script>