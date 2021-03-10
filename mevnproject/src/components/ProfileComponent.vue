<template>
  <div class="row">
    <div class="col l6">
      <h5>Your Account</h5>
      <form @submit.prevent="handleSubmit">
        <label for="email">Email</label>
        <div>
          <input id="email" type="text" v-model="email" required autofocus />
        </div>

        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>

        <label for="password-confirm">Confirm Password</label>
        <div>
          <input
            id="password-confirm"
            type="password"
            v-model="passwordConfirmation"
            required
          />
        </div>

        <label for="address">Address</label>
        <div>
          <input id="address" type="text" v-model="address" required />
        </div>

        <label for="zipCode">Zip Code</label>
        <div>
          <input id="zipCode" type="number" v-model="zipCode" required />
        </div>

        <label for="city">City</label>
        <div>
          <input id="city" type="text" v-model="city" required />
        </div>

        <div class="form-group">
          <button class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
    <div class="col l6">
      <h5>Your Orders</h5>
      <ul class="collapsible" v-if="orders.length != 0">
        <li v-for="order in orders" :key="order._id">
          <div class="collapsible-header">First</div>
          <div class="collapsible-body">
            <span>Date: {{ order.orderDate }}</span
            ><br />
            <span>Products: {{ order.products }}</span
            ><br />
            <span>Address: {{ order.deliveryAddress.address }}</span
            ><br />
            <span
              >City: {{ order.deliveryAddress.postalCode }},
              {{ order.deliveryAddress.city }}</span
            ><br />
            <span>Full Name: {{ order.orderingCustomer.fullName }}</span
            ><br />
            <span>Phone Number: {{ order.orderingCustomer.phoneNumber }}</span
            ><br />
            <span>Email: {{ order.orderingCustomer.email }}</span
            ><br />
          </div>
        </li>
      </ul>
      <p v-else>No orders</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: null,
      email: null,
      address: null,
      zipCode: null,
      city: null,
      password: null,
      passwordConfirmation: null,
    };
  },
  created() {
    let url = "http://localhost:4000/user/profile";
    this.axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.orders = response.data.order;
        this.email = response.data.email;
        this.address = response.data.address;
        this.zipCode = response.data.zipCode;
        this.city = response.data.city;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  mounted() {
    window.M.AutoInit(); // That way, it is only initialized when the component is mounted
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (
        this.password === this.passwordConfirmation &&
        this.password.length > 0
      ) {
        let url = "http://localhost:4000/user/edit";
        this.axios
          .put(url, {
            email: this.email,
            password: this.password,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city,
          })
          .then((response) => {
            console.log(response.status);
            alert("Success");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.password = "";
        this.passwordConfirmation = "";

        return alert("Passwords do not match");
      }
    },
  },
};
</script>