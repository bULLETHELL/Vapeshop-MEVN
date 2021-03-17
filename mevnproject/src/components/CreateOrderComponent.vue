<template>
    <div>
        <h1>Finalise Order</h1>
        <form @submit.prevent="addOrder">
            <div class="row">
                <div class="col s5">
                    <div class="form-group">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            class="form-control"
                            v-model="order.fullName"
                        />
                    </div>
                    <div class="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="number"
                            placeholder="Phone Number"
                            class="form-control"
                            v-model="order.phoneNumber"
                        />
                    </div>
                    <div class="form-group">
                        <label>Email Address:</label>
                        <input
                            type="email"
                            placeholder="Email Address"
                            class="form-control"
                            v-model="order.email"
                        />
                    </div>
                    <div class="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            placeholder="Address"
                            class="form-control"
                            v-model="order.address"
                        />
                    </div>
                    <div class="form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            placeholder="City"
                            class="form-control"
                            v-model="order.city"
                        />
                    </div>
                    <div class="form-group">
                        <label>Postal Code:</label>
                        <input
                            type="Number"
                            placeholder="Postal Code"
                            class="form-control"
                            v-model="order.postalCode"
                        />
                    </div>
                </div>
                <div class="col s5 offset-s2">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody
                            v-for="cartItem in cart.items"
                            :key="cartItem._id"
                        >
                            <tr>
                                <td>{{ cartItem.name }}</td>
                                <td>{{ cartItem.amount }}</td>
                                <td>{{ cartItem.price }} dkk</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Total:</td>
                                <td>{{ cart.totalItems }}</td>
                                <td>{{ cart.totalPrice }} dkk</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="form-group">
                        <button class="btn btn-primary">Finalise order and go to payment</button>
                    </div>
                </div>
            </div>
            <br />
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cart: JSON.parse(localStorage.getItem("cart") || "[]"),
            order: {
                orderDate: new Date().toISOString().substr(0, 10),
            },
        };
    },
    methods: {
        addOrder() {
            let uri = "http://localhost:4000/orders/add";
            this.order.products = this.cart;
            this.axios.post(uri, this.order).then(() => {
                this.$router.push({ name: "orders" });
            });
        },
    },
};
</script>
