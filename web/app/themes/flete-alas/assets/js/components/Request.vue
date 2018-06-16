<template>
    <div class="container mx-auto">
      <div class="relative max-w-sm mx-auto h-84">
        <transition name="fade">
            <form v-if="!submitted">
                <div class="flex flex-wrap -mx-4">
                    <div class="relative w-1/2 px-2 mt-4">
                        <input v-validate="'required|alpha'" name="name" type="text" placeholder="Nombre" :class="[ 'w-full border rounded p-5', errors.has('name') ? 'border-red active:border-red focus:border-red bg-red-lightest' : 'border-grey-dark' ]" v-model="name">
                        <transition name="fade">
                            <span class="absolute pin-t pin-l ml-4 mt-1 text-sm text-red-light" v-if="errors.has('name')">Corregir el siguente error:</span>
                        </transition>
                    </div>
                    <div class="relative w-1/2 px-2 mt-4">
                        <input v-validate="'required|numeric|min:6|max:14'" name="tel" type="text" placeholder="Telefono/Mobil" :class="[ 'w-full border rounded p-5', errors.has('tel') ? 'border-red active:border-red focus:border-red bg-red-lightest' : 'border-grey-dark' ]" v-model="tel">
                        <transition name="fade">
                            <span class="absolute pin-t pin-l ml-4 mt-1 text-sm text-red-light" v-if="errors.has('tel')">Corregir el siguente error:</span>
                        </transition>
                    </div>
                    <div class="relative w-1/2 px-2 mt-4">
                        <input v-validate="'email'" name="email" type="email" placeholder="Email" :class="[ 'w-full border rounded p-5', errors.has('email') ? 'border-red active:border-red focus:border-red bg-red-lightest' : 'border-grey-dark' ]" v-model="email">
                        <transition name="fade">
                            <span class="absolute pin-t pin-l ml-4 mt-1 text-sm text-red-light" v-if="errors.has('email')">Corregir el siguente error:</span>
                        </transition>
                    </div>
                    <div class="w-1/2 px-2 mt-4">
                        <flat-pickr v-model="date" :config="config" class="w-full border border-grey-dark rounded p-5" placeholder="Fecha y hora"></flat-pickr>
                    </div>
                </div>
                <div class="flex flex-col -mx-4">
                    <div class="w-full px-2">
                        <textarea placeholder="Cuéntenos sobre su mudanza y preferencias." class="w-full mt-4 border border-grey-dark rounded mb-4 p-5 min-h-32" v-model="enquiry"></textarea>
                    </div>
                </div>
                <div class="flex flex-col -mx-4">
                    <div class="w-full px-2 text-center">
                      <input type="submit" value="Pide un Flete" :class="['w-full max-w-xxs px-4 py-4 text-white shadow hover:shadow-lg rounded bg-animated', errors.any() ? 'bg-grey-dark cursor-not-allowed' : 'bg-blue cursor-pointer']" :disabled="errors.any()" @click.prevent="sendNotification">
                  </div>
              </div>
          </form>
          <div v-else class="absolute pin m-auto flex flex-col justify-center text-center">
              <p class="bg-grey-light text-lg text-black rounded shadow px-2 py-4">Gracias, un fletero te va a contactar al mas pronto para organisar tu mudanza.</p>
          </div>
      </transition>
  </div>
</div>
</template>
<script>
import axios from "axios";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/themes/airbnb.css";
import "flatpickr/dist/flatpickr.css";

export default {
  data: () => ({
    submitted: false,
    name: "",
    tel: "",
    email: "",
    enquiry: "",
    date: null,
    config: {
      altFormat: "M j, Y h i K",
      altInput: true,
      dateFormat: "Y-m-d",
      enableTime: true
    }
  }),
  components: {
    flatPickr
  },
  methods: {
    sendSMS() {
      console.log("sms Sent");
      //    axios
      //    .post("/sendSMS", {
      //       name: this.name,
      //       email: this.email,
      //       enquiry: this.enquiry
      //   })
      //    .then(function(response) {
      //       console.log(response);
      //   })
      //    .catch(function(error) {
      //       console.log(error);
      //   });
    },
    sendNotification() {
      this.submitted = !this.submitted;
    }
  }
};
</script>