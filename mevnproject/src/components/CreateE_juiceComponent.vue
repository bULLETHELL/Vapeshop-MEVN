<template>
    <div>
        <h1>Add an E-juice</h1>
        <form @submit.prevent="addE_juice">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="e_juice.name"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Taste:</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="e_juice.taste"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Vg:</label>
                        <input
                            type="number"
                            class="form-control"
                            v-model="e_juice.vg"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Pg:</label>
                        <input
                            type="number"
                            class="form-control"
                            v-model="e_juice.pg"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Nicotine:</label>
                        <input
                            type="number"
                            class="form-control"
                            v-model="e_juice.nicotine"
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
            e_juice: {},
        };
    },
    methods: {
        addE_juice() {
            let uri = "http://localhost:4000/e_juices/add";
            this.axios.post(uri, this.e_juice).then(() => {
                this.$router.push({ name: "e_juices" });
            });
        },
    },
};
</script>