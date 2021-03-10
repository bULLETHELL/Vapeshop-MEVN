<template>
    <div>
        <h1>Finalise Order</h1>
        <form @submit.prevent="addOrder">
            <div class="row">
                <div class="col s5">
                    <div class="form-group">
                        <label>Full Name:</label>
                        <input type="text" placeholder="Full Name" class="form-control" v-model="order.fullName"/>
                    </div>
                    <div class="form-group">
                        <label>Phone Number:</label>
                        <input type="number" placeholder="Phone Number" class="form-control" v-model="order.phoneNumber"/>
                    </div>
                    <div class="form-group">
                        <label>Email Address:</label>
                        <input type="email" placeholder="Email Address" class="form-control" v-model="order.email"/>
                    </div>
                    <div class="form-group">
                        <label>Address:</label>
                        <input type="text" placeholder="Address" class="form-control" v-model="order.address"/>
                    </div>
                    <div class="form-group">
                        <label>City:</label>
                        <input type="text" placeholder="City" class="form-control" v-model="order.city"/>
                    </div>
                    <div class="form-group">
                        <label>Postal Code:</label>
                        <input type="Number" placeholder="Postal Code" class="form-control" v-model="order.postalCode"/>
                    </div>
                </div>
                <div class="col s5 offset-s2">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in cart" :key="product._id">
                                <td>{{ product.name }}</td>
                                <td>{{ product.amount }}</td>
                                <td><button class="btn btn-danger">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <br />
            <div class="form-group">
                <button class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cart: JSON.parse(localStorage.getItem("cart") || "[]"),
            order: {
                orderDate: new Date().toISOString().substr(0, 10)
            },
        };
    },
    methods: {
        addOrder() {
            let uri = "http://localhost:4000/orders/add";
            this.order.products = this.cart
            this.axios.post(uri, this.order).then(() => {
                this.$router.push({ name: "orders" });
            });
        },
    },
};
</script>