<template>
    <VueFinalModal class="justify-center items-center absolute "
        content-class="flex flex-col bg-gray-100 text-black rounded-lg space-y-2  ">

        <div class="relative p-4">

            <div class="font-bold text-2xl p-2 text-center">
                Giao xe tận nơi
            </div>

            <div v-if="errorMessage" class="bg-red-400 text-white font-semibold text-lg p-2 rounded-lg">
                {{ errorMessage }}
            </div>

            <div class="grid grid-row-2 gap-2 divide-slate-300 border border-gray-300 rounded-lg bg-white p-2 mt-3">
                <div>
                    Địa điểm giao xe
                </div>
                <InputAutoCompletePlace @selectedValue="handleDeliveryAddressSelected" />

                <div class="text-gray-600 text-sm font-normal">
                    Chủ xe có hỗ trợ giao nhận xe tận nơi với chi phí 15k/km, nếu bạn không sử dụng dịch vụ này thì có thể
                    nhận xe tại địa chỉ mặc định
                </div>
            </div>


            <div class="font-semibold text-lg text-gray-600 pt-5">
                Chi phí giao xe trên km:
                <span class="text-black font-bold text-lg"> {{ deliveryPerKm }}k/km</span>
            </div>

            <div v-if="distance?.distance" class="font-semibold text-lg text-gray-600">
                Khoảng cách:
                <span class="text-black font-bold text-lg"> {{ distance.distance.text }}</span>
            </div>


            <div v-if="deliveryPrice" class="font-semibold text-lg text-gray-600">
                Tổng chi phí giao xe:
                <span class="text-green-600 font-bold text-xl"> {{ deliveryPrice }} 000đ</span>
            </div>

            <div class="flex bottom-2 right-2 space-x-2 float-right mt-3">
                <button class=" p-2 w-24 rounded-lg bg-gray-400 hover:bg-gray-700 " @click="this.$emit('logout')">
                    Hủy
                </button>
                <button v-if="errorMessage === ''" class=" p-2 w-24  rounded-lg bg-green-500 hover:bg-green-700"
                    @click="this.$emit('confirm', deliveryPrice)">
                    Áp dụng
                </button>
            </div>


        </div>

    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { useStore } from 'vuex';
import { ref, onMounted, inject, onUpdated } from 'vue';
import gongAPI from "../../../apis/goongMapAPI/api"


const car = inject('car')
const deliveryAddress = inject('deliveryAddress')
const deliveryPerKm = car.value.deliveryPerKm || 15
const origins = ref(car.value.location.geometry)
const destinations = ref({})
const distance = ref()
const deliveryPrice = ref()
const errorMessage = ref("")

function fixedPrice(price) {
    return price.toFixed()
}



async function handleDeliveryAddressSelected(value) {
    const data = await gongAPI.getPlaceDetailById(value.place_id)
    destinations.value = data.result.geometry.location
    distance.value = await gongAPI.getDistanceMatrix(origins.value, destinations.value)
    if (distance.value.distance.value > 20000) {
        errorMessage.value = `Khảng cách giao xe vượt quá khoảng cách tối đa chủ xe chấp nhận giao xe, vui lòng chọn địa điểm khác`
    } else {
        errorMessage.value = ""
        deliveryPrice.value = deliveryPerKm * distance.value.distance.value / 1000
        deliveryPrice.value = fixedPrice(deliveryPrice.value)
        console.log('12312312', { deliveryPrice })
    }

}

onMounted(async () => {
    console.log({ car, deliveryAddress, origins })
})



</script>

<style lang="css" scoped>
.border-bottom {
    padding-bottom: 55px;
    border-bottom: 1px solid gray;
}

.border-top {
    border-top: 1px solid gray;
}
</style>

<style src="@vueform/slider/themes/default.css"></style>