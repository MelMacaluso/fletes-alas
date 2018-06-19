<template>
  <div class="container mx-auto relative">
    <div class="max-w-sm mx-auto">
      <transition name="fade">
      <update v-if="dealUpdateTrigger"></update>
      </transition>
      <transition name="fade">
        <form v-show="!submitted && !dealUpdateTrigger" @submit.prevent="findBookingInPipedrive">
          <div class="flex flex-wrap -mx-4">
            <div class="relative w-full px-2 mb-4">
              <input v-validate="'required|min:36|max:36'" v-validate.disable="'blur'" data-vv-validate-on="input" name="bookingref" autocomplete='off' type="text" placeholder="Numero Reserva..." :class="[ 'w-full border rounded p-5', errors.has('name') ? 'border-red active:border-red focus:border-red bg-red-lightest' : 'border-grey-dark' ]" v-model="bookingRef">
              <transition name="fade">
                <span class="absolute pin-t pin-l ml-4 mt-1 text-xs text-red-light" v-if="errors.has('bookingref')">El campo tiene que ser de 36 cifras alpanumericas</span>
              </transition>
            </div>
          </div>
          <div class="flex flex-col -mx-4">
            <div class="w-full px-2 text-center">
              <input type="submit" value="Pesquizar detalles" :class="['w-full max-w-xxs px-4 py-4 text-white shadow hover:shadow-lg rounded bg-animated', errors.any() ? 'bg-grey-dark cursor-not-allowed' : 'bg-blue cursor-pointer']" :disabled="errors.any()" @click.prevent="findBookingInPipedrive">
            </div>
          </div>
        </form>
      </transition>
      <transition name="fade">
        <div v-if="dealDetails && !dealUpdateTrigger">
          <div class="relative mt-8 bg-white p-5 rounded shadow-md flex flex-col justify-center text-left">
            <i class="fas fa-box-open absolute pin-b pin-r text-grey-lightest text-10xl mb-4 mr-4 z-0"></i>
            <h2 v-if="dealDetails.title" class="mb-8">Detalles mudanza:</h2>
            <div class="z-10">
              <div v-if="dealDetails.title">
                <p class="pb-8"><span class="font-bold"><i class="fas fa-user pr-2"></i>Nombre</span>:{{dealDetails.title}}</p>
                <p class="pb-8"><span class="font-bold"><i class="fas fa-phone pr-2"></i>Telefono</span>: {{dealDetails['73fa7c56b03517b77043a7f6debb789d1b966a32']}}</p>
                <p class="pb-8"><span class="font-bold"><i class="fas fa-calendar-alt pr-2"></i>A las</span>: {{dealDetails['47947b83d91c37b34015d1bfa07bb8a650a952eb'] + ' ' + dealDetails['6ef593f2be5ac7ade9d88f7449d64cf2ef47b2c6']}}</p>
                <p class="pb-8"><span class="font-bold"><i class="fas fa-map-marker-alt pr-2"></i>Desde</span>: {{dealDetails['c58a9448026b1bdf0d59cab244c42cdd053c9ae4']}}</p>
                <p class="pb-8"><span class="font-bold"><i class="fas fa-map-marker-alt pr-2"></i>Hasta</span>: {{dealDetails['2b08c44ec10ccc9510be9fd8d0df7674a2eed251']}}</p>
                <p class="pb-8"><span class="font-bold"><i class="fas fa-align-left pr-2"></i>Detalles</span>: {{dealDetails['f19415f34822af02040f3b3308b69eadc3eac4fc']}}</p>
              </div>
              <div v-else>
                <p class="py-8 text-lg"><span class="font-bold"><i class="fas fa-times pr-2"></i></span>{{dealDetails}}</p>
              </div>
            </div>
          </div>
          <div v-if="dealDetails.title" class="flex flex-wrap mb-2 mt-6 -mx-4">
            <transition name="fade">
              <div v-if="dealCanceled" class="w-full px-4 mt-2 mb-2">
                  <p class="bg-red-light text-white px-4 py-4">Mudanza Cancelada</p>
              </div>
            </transition>
            <div class="w-1/2 px-4">
              <button @click="begingUpdateInPipedrive" class="w-full bg-blue-light px-4 py-6 rounded text-white shadow hover:shadow-lg"><i class="fas fa-pencil-alt pr-2"></i>Editar Detalles</button>
            </div>
            <div class="w-1/2 px-4">
              <button @click="cancelBookingInPipedrive" class="w-full bg-red-light px-4 py-6 rounded text-white shadow hover:shadow-lg"><i class="fas fa-times pr-2"></i>Cancelar Mudanza</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Update from "./UpdateMyBooking";

export default {
  data: () => ({
    submitted: false,
    bookingRef: "",
    dealDetails : "",
    dealCanceled: false,
    dealUpdateTrigger: false
  }),
  components: {
    Update
  },
  methods: {
    findBookingInPipedrive() {
      axios
      .post("/booking/find", {
        term: `${this.bookingRef}`,
        exact_match: 1,
        field_key: "dc60267b256501217f31455115ebb55a577a7dd2",
        field_type: "dealField",
        return_item_ids: 1
      })
      .then( response => {
        //   console.log(response.data);
        this.dealDetails = response.data
        localStorage.setItem('Booking Details', JSON.stringify({"id": `${response.data.id}`, "title": `${response.data.title}`})); // set some booking details to be later used
        })
      .catch(error => {
        //   console.log(error.response.data);
      });
    },
    cancelBookingInPipedrive() {
      axios
      .post("/booking/cancel", {
        term: `${this.bookingRef}`,
        exact_match: 1,
        field_key: "dc60267b256501217f31455115ebb55a577a7dd2",
        field_type: "dealField",
        return_item_ids: 1
      })
      .then( () => {
        //   console.log(response.data);
        this.dealCanceled = !this.dealCanceled
      })
      .catch(error => {
        //   console.log(error.response.data);
      });
    },
    begingUpdateInPipedrive() {
      this.dealUpdateTrigger = !this.dealUpdateTrigger
    }
  }
};
</script>