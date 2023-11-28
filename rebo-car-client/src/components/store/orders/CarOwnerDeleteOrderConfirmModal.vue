<template>
    <VueFinalModal class="" content-class="">
        <div class="relative w-full max-w-md h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative p-4 text-center bg-white rounded-lg shadow sm:p-5 w-full">
                <button @click=" this.$emit('logout')" type="button"
                    class="text-gray-400 absolute top-2.5 right-2.5  hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>

                </button>
                <div v-if="successDeleteOrder">
                    <SuccessDeleteOrder></SuccessDeleteOrder>
                </div>
                <div v-else>

                    <svg class="text-gray-400  w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <div v-if="msgErr" class=" w-full bg-red-400 p-2 rounded-md">
                        {{ msgErr }}
                    </div>
                    <p class="mb-1 text-gray-700 font-bold text-xl ">Bạn có đồng ý hủy đơn hàng này ? </p>
                    <p class="mb-4 text-gray-500 text-start text-base"> Nếu hủy bạn phải hoàn lại {{
                        convertNumToPrice(refundPrice) }} 000đ
                        tiền người dùng đã cọc và có thể là tiền đền thêm cho người dùng theo chính sách hủy xe </p>
                    <div class="flex justify-center items-center space-x-4">
                        <button @click="this.$emit('logout')" data-modal-toggle="deleteModal" type="button"
                            class=" w-24 py-2 px-3 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 ">
                            Hủy
                        </button>
                        <button @click="handleConfirmDeleteBtn"
                            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ">
                            Hủy đơn hàng
                        </button>
                    </div>
                </div>


            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { onMounted, ref } from 'vue';
import { RepositoryFactory } from "../../../apis/repositoryFactory";
import SuccessDeleteOrder from './SuccessDeleteOrder.vue';
// define 
const paymentRepo = RepositoryFactory.get("payment");
const ordersRepo = RepositoryFactory.get("orders");
const props = defineProps({
    order: Object
})
const msgErr = ref("")
const successDeleteOrder = ref(false)
const depositPrice = parseInt(props.order.prices_table.depositPrice)
const refundPrice = ref()

function calculateRefundPrice() {
    const new_date = new Date()
    const one_hour = 60 * 60 * 1000
    const seven_days = 60 * 60 * 24 * 7 * 1000

    const date_create_at = new Date(props.order.createdAt)
    const start_date_time = new Date(props.order.start_date_time)

    if (new_date - date_create_at < one_hour) {  // Truong hop huy chuyen trong vong 1h sau khi dat coc
        refundPrice.value = depositPrice
    } else if (start_date_time - new_date > seven_days) {
        refundPrice.value = depositPrice + depositPrice * 30 / 100
        refundPrice.value = refundPrice.value.toFixed()
    } else if (start_date_time - new_date < seven_days) {
        refundPrice.value = depositPrice * 2
    }
}

function convertNumToPrice(num) {
    return parseInt(num).toLocaleString().replaceAll(',', ' ')
}

function handleConfirmDeleteBtn() {

    ordersRepo.deleteOrderById(props.order._id).then(() => {
        const rate_vnd_usd_exchange = 0.000041
        var refundPriceUSD = refundPrice.value * 1000 * rate_vnd_usd_exchange
        refundPriceUSD = refundPriceUSD.toFixed(2).toString()
        paymentRepo.refundProcess(props.order.transaction_id, refundPriceUSD).then(() => {
            console.log('success payment')
            successDeleteOrder.value = true
        }).catch((err) => {
            msgErr.value = err.response.data.message
        })

    }).catch((err) => {
        msgErr.value = err.response.data.message
        console.log(msgErr.value)
    })

}


onMounted(() => {
    calculateRefundPrice()
    console.log(props.order)
})


</script>

<style lang="scss" scoped></style>