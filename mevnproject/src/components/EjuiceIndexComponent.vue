<template>
    <div>
        <div class="row">
            <div class="col s6 m2" v-for="e_juice in e_juices" :key="e_juice._id">
                <div class="card">
                    <div class="card-image">
                        <img src="../assets/ejuice.png" />
                    </div>
                    <div class="card-content">
                        <span class="card-title">{{e_juice.name}}</span>
                    </div>
                    <div class="card-action ">
                        <span>Price: {{e_juice.price}}</span>
                        <button @click=addToCart(e_juice) class="btn btn-danger right">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            e_juices: [],
        };
    },
    created() {
        let uri = "http://localhost:4000/e_juices";
        this.axios.get(uri).then((response) => {
            this.e_juices = response.data;
        });
    },
    methods: {
        deletePost(id) {
            let uri = `http://localhost:4000/e_juices/delete/${id}`;
            this.axios.delete(uri).then((response) => {
                console.log(response);
                this.e_juices.splice(this.e_juices.indexOf(id), 1);
            });
        },
        addToCart(item){
            let cart = JSON.parse(localStorage.getItem("cart") || "[]")
            cart.push(item)
            localStorage.setItem("cart", JSON.stringify(cart));

        }
    },
    mounted() {
        window.M.AutoInit(); // That way, it is only initialized when the component is mounted
    },
};
</script>
