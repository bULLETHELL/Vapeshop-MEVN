<template>
    <div>
        <div class="row">
            <div class="col s6 m2" tr v-for="e_juice in e_juices" :key="e_juice._id">
                <div class="card">
                    <div class="card-image">
                        <img src="../assets/ejuice.png" />
                    </div>
                    <div class="card-content">
                        <span class="card-title">{{e_juice.name}}</span>
                    </div>
                    <div class="card-action">
                        <a class="waves-effect waves-light btn" @click="createOrder">button</a>
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
        createOrder(id) {
            let uri = `http://localhost:4000/e_juices/delete/${id}`;
            this.axios.delete(uri).then((response) => {
                console.log(response);
                this.e_juices.splice(this.e_juices.indexOf(id), 1);
            });
        },
    },
    mounted() {
        window.M.AutoInit(); // That way, it is only initialized when the component is mounted
    },
};
</script>
