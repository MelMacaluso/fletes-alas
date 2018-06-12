<template>
    <div class="container mx-auto">
        <div class="flex flex-col justify-center text-center max-w-xs mx-auto">
            <input type="text" placeholder="Name" class="mt-12 border border-grey-dark rounded mb-4 p-4" v-model="name">
            <input type="email" placeholder="Email" class="mt-4 border border-grey-dark rounded mb-4 p-4" v-model="email">
            <textarea placeholder="Enquiry" class="mt-4 border border-grey-dark rounded mb-4 p-4" v-model="enquiry"></textarea>
            <button class="px-4 py-2 bg-grey-dark text-white shadow-md rounded" @click="mockRequest">Book your flete</button>
            <p>{{serverResponse}}</p>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    serverResponse: "",
    name: "",
    email: "",
    enquiry: ""
  }),
  methods: {
    mockRequest() {
      axios
        .post("https://server.flete-alas.com/leads/send_sms_notification", {
          name: this.name,
          email: this.email,
          enquiry: this.enquiry
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>