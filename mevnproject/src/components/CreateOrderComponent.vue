<template>
    <div>
        <h1>Add an E-juice</h1>
        <form @submit.prevent="addOrder">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Ordering Customer:</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="order.orderingCustomer"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Order Date:</label>
                        <input
                            type="date"
                            class="form-control"
                            v-model="order.orderDate"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Products</label>
                        <input
                            type=""
                            class="form-control"
                            v-model="order.products"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>deliveryAddress:</label>
                        <input
                            type="number"
                            class="form-control"
                            v-model="order.deliveryAddress"
                        />
                    </div>
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
            order: {},
        };
    },
    methods: {
        addOrder() {
            let uri = "http://localhost:4000/orders/add";
            this.axios.post(uri, this.order).then(() => {
                this.$router.push({ name: "orders" });
            });
        },
    },
};
</script>