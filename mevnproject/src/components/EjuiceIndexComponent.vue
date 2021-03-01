<template>
  <div>
      <h1>Posts</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link :to="{ name: 'create' }" class="btn btn-primary">Create Post</router-link>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Taste</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="e_juice in e_juices" :key="e_juice._id">
                  <td>{{ e_juice.name }}</td>
                  <td>{{ e_juice.taste }}</td>
                  <!--<td><router-link :to="{name: 'edit', params: { id: post._id }}" class="btn btn-primary">Edit</router-link></td>-->
                  <td><button class="btn btn-danger" @click.prevent="deletePost(e_juice._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          e_juices: []
        }
      },
      created() {
      let uri = 'http://localhost:4000/e_juices';
      this.axios.get(uri).then(response => {
        this.e_juices = response.data;
      });
    },
    methods: {
      deletePost(id)
      {
        let uri = `http://localhost:4000/e_juices/delete/${id}`;
        this.axios.delete(uri).then(response => {
          console.log(response)
          this.e_juices.splice(this.e_juices.indexOf(id), 1);
        });
      }
    }
  }
</script>