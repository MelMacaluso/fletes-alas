<template>
    <div class="container mx-auto">
      <div class="max-w-sm mx-auto">
        <form>
            <div class="flex flex-wrap -mx-4">
                <div class="w-1/2 px-2">
                    <input type="text" placeholder="Nombre" class="w-full border border-grey-dark rounded p-4" v-model="name">
                </div>
                <div class="w-1/2 px-2">
                    <input type="text" placeholder="Telefono/Mobil" class="w-full border border-grey-dark rounded p-4" v-model="tel">
                </div>
                <div class="w-full px-2 mt-4">
                    <input type="email" placeholder="Email" class="w-full border border-grey-dark rounded p-4" v-model="email">
                </div>
            </div>
            <div class="flex flex-col -mx-4">
                <div class="w-full px-2">
                    <textarea placeholder="Cuéntenos sobre su mudanza y preferencias." class="w-full mt-4 border border-grey-dark rounded mb-4 p-4 min-h-32" v-model="enquiry"></textarea>
                </div>
            </div>
            <div class="flex flex-col -mx-4">
                <div class="w-full px-2 text-center">
                  <input type="submit" value="Pide un Flete" class="w-full max-w-xxs px-4 py-4 bg-blue text-white shadow hover:shadow-lg rounded cursor-pointer" @click.prevent="mockRequest">
              </div>
          </div>
      </form>
  </div>
</div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    name: "",
    email: "",
    enquiry: ""
}),
  methods: {
    mockRequest() {
      axios
      .post("/sendSMS", {
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