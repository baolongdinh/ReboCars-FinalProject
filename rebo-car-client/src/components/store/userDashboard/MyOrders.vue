<template>
    <div class="relative">
        <div class="font-bold font-sans text-3xl flex-col">
            <div>
                Đơn hàng của tôi
            </div>

            <div class="flex-col space-y-5 pt-4">
                <CardCarOrder class="shadow-xl rounded-lg" @handleInfoDetailBtn="showOrderDetailDialog" />
                <CardCarOrder class="shadow-xl rounded-lg" />
                <CardCarOrder class="shadow-xl rounded-lg" />
                <CardCarOrder class="shadow-xl rounded-lg" />
            </div>

            <div class="opacity-80 bg-gray-800 fixed z-40 inset-0" v-if="showOrderDetailModal">
                <!-- OVERLAY SCREEN WHEN POP UP DIALOG MODAL -->

                <OrderDetailModal class=" absolute m-auto inset-0 p-20" v-model="showOrderDetailModal"
                    @logout="hiddenDialog" @handleSelectDiscount="handleSelectDiscount">

                </OrderDetailModal>
            </div>

        </div>
    </div>
</template>

<script setup>
import CardCarOrder from './CardCarOrder.vue';
import { ref } from 'vue';
import OrderDetailModal from './OrderDetailModal.vue';


const showOrderDetailModal = ref(false)
function showOrderDetailDialog() {

    showOrderDetailModal.value = true
}

function hiddenOrderDetailDialog() {
    showOrderDetailModal.value = false
}



</script>

<style lang="scss" scoped></style>