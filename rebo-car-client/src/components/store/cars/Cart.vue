<template>
    <div class="p-8 bg-blue-50 rounded-xl">
        <div v-if="discountPrice" class="font-semibold text-3xl">
            {{ discountPrice.toLocaleString() }}K/ngày
        </div>

        <div class="flex flex-col gap-4 pt-6 text-gray-700 font-sans">

            <div class="grid grid-cols-2 divide-x divide-slate-300 border border-gray-300 rounded-lg bg-white p-2">

                <div class="grid grid-row-2 gap-2 text-center">
                    <div>
                        Nhận xe
                    </div>
                    <div class="font-semibold">
                        {{ startDate }} {{ startTime }}
                    </div>
                </div>

                <div class="grid grid-row-2 gap-2  text-center">
                    <div>
                        Trả xe
                    </div>
                    <div class="font-semibold">
                        {{ endDate }} {{ endTime }}
                    </div>
                </div>
            </div>

            <div class="grid grid-row-2 gap-2 divide-slate-300 border border-gray-300 rounded-lg bg-white p-2">
                <div>
                    Địa điểm nhận xe
                </div>
                <div v-if="location?.compound?.district" class="font-semibold">
                    {{ location.compound.district }}, {{ location.compound.province }}
                </div>

                <div class="text-gray-600 text-sm font-normal">
                    Bạn sẽ nhận trả xe tại địa chỉ xe do chủ xe không hỗ trợ giao nhận tận nơi. Địa chỉ cụ thể sẽ được hiển
                    thị sau khi đặt cọc
                </div>
            </div>

            <div>
                <button type="button"
                    class="text-white bg-blue-300 hover:bg-blue-400 w-full focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                    @click="showDeliveryCarDialog">

                    <img :src="LocationIcon" alt="LocationIcon" id="LocationIcon">

                    <div class="text-black  text-base font-normal pl-3">
                        Chọn địa điểm giao xe
                    </div>
                </button>

            </div>

            <div class="grid grid-row-2 gap-2 border-t border-b border-gray-300 p-2">
                <div class="grid grid-cols-2 relative">
                    <div class="text-gray-700">
                        Đơn giá thuê
                    </div>
                    <div v-if="discountPrice" class="text-black font-medium">
                        {{ discountPrice.toLocaleString() }} 000đ/ngày
                    </div>
                </div>

                <div class="grid grid-cols-2 relative">
                    <div class="text-gray-700">
                        Giảm giá
                    </div>
                    <div v-if="price" class="text-black font-medium line-through">
                        {{ price.toLocaleString() }} 000đ/ngày
                    </div>
                </div>

                <div class="grid grid-cols-2 relative">
                    <div class="text-gray-700">
                        Phí dịch vụ
                    </div>
                    <div v-if="brokerageCost" class="text-black font-medium">
                        {{ brokerageCost.toLocaleString() }} 000đ/ngày
                    </div>
                </div>





            </div>

            <div class="grid grid-cols-2 relative">
                <div class="text-gray-700">
                    Tổng phí thuê xe
                </div>
                <div v-if="unitPrice" class="text-black font-medium">
                    {{ unitPrice.toLocaleString() }} 000đ/ngày
                </div>
            </div>

            <div v-if="deliveryPrice" class="grid grid-cols-2 relative">
                <div class="text-gray-700">
                    Phí giao xe
                </div>
                <div class="flex justify-between">
                    <div class="text-black font-medium">
                        {{ deliveryPrice.toLocaleString() }} 000đ/ngày
                    </div>
                    <div>
                        <button @click="handleDeleteDeliveryCarPrice">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path
                                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                            </svg>
                        </button>

                    </div>
                </div>

            </div>


            <div>
                <button type="button"
                    class="text-white bg-green-200 hover:bg-green-400 w-full focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                    @click="show = true">

                    <img :src="DiscountIcon" alt="DiscountIcon" id="DiscountIcon">

                    <div class="text-black  text-base font-normal pl-3">
                        Sử dụng mã khuyến mãi
                    </div>
                </button>

            </div>

            <div class="opacity-80 bg-gray-800 fixed z-40 inset-0" v-if="show">
                <!-- OVERLAY SCREEN WHEN POP UP DIALOG MODAL -->

                <PromotionsModal class="overflow-y-auto h-650 w-580 absolute m-auto inset-0" v-model="show"
                    @logout="hiddenDialog" @handleSelectDiscount="handleSelectDiscount">

                </PromotionsModal>
            </div>

            <div v-if="promotionDiscount > 0" class="grid grid-cols-2 relative">
                <div class="text-gray-700">
                    Khuyến mãi
                </div>
                <div class="text-black font-medium line-through">
                    {{ promotionDiscount }} 000đ
                </div>
            </div>


            <div class="grid grid-cols-2 relative text-black font-bold ">
                <div class="">
                    Tổng cộng
                </div>
                <div class="">
                    {{ unitTotalPrice }} 000đ/ngày
                </div>
            </div>

            <div>
                <button type="button" @click="showOrderConfirmDialog"
                    class="text-white bg-gradient-to-r w-full from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    CHỌN THUÊ
                </button>
            </div>



            <div class="opacity-80 bg-gray-800 fixed z-40 inset-0" v-if="showOrderConfirmModal">

                <OrderConfirm class="overflow-y-auto w-full h-full pt-12 px-24 absolute m-auto inset-0"
                    v-model="showOrderConfirmModal" @logout="hiddenOrderConfirmDialog">
                </OrderConfirm>
            </div>

            <div class="opacity-80 bg-gray-800 fixed z-40 inset-0" v-if="showDeliveryCarModal">

                <DeliveryCarModal class="overflow-y-auto w-650 h-415 absolute m-auto inset-0" v-model="showDeliveryCarModal"
                    @logout="hiddenDeliveryCarDialog" @confirm="confirmDeliveryAddress">
                </DeliveryCarModal>
            </div>

        </div>


    </div>
</template>

<script setup>
import InputAutoCompletePlace from '../InputAutoCompletePlace.vue';
import DiscountIcon from "../../../assets/icons/discount.svg"
import LocationIcon from "../../../assets/icons/location.svg"
import PromotionsModal from "./PromotionsModal.vue"
import OrderConfirm from '../orders/OrderConfirm.vue';
import DeliveryCarModal from './DeliveryCarModal.vue';


import { onMounted, ref, onUpdated, inject, provide } from 'vue';




const props = defineProps({
    startDateTime: Date,
    endDateTime: Date,
    location: Object,
    price: Number,
    discount: Number
})

const startDate = ref()
const endDate = ref()
const startTime = ref()
const endTime = ref()
const startDateTimeObj = ref()
const endDateTimeObj = ref()
const deliveryAddress = ref("")


const discountPrice = ref()
const brokerageCost = ref()
const unitPrice = ref()
const unitTotalPrice = ref()
const unitPriceClone = ref()
const promotionDiscount = ref(0)
const deliveryPrice = ref()


///// provide value to lower component
provide('startDate', startDate)
provide('endDate', endDate)
provide('startTime', startTime)
provide('endTime', endTime)
provide('startDateTimeObj', startDateTimeObj)
provide('endDateTimeObj', endDateTimeObj)
provide('deliveryAddress', deliveryAddress)


provide('discountPrice', discountPrice)
provide('brokerageCost', brokerageCost)
provide('unitPrice', unitPrice)
provide('promotionDiscount', promotionDiscount)
provide('deliveryPrice', deliveryPrice)
provide('unitTotalPrice', unitTotalPrice)



function calculatePriceAndFixedNumber() {
    discountPrice.value = props.price - (props.price * props.discount / 100)
    discountPrice.value = discountPrice.value.toFixed()

    brokerageCost.value = discountPrice.value * 15 / 100
    brokerageCost.value = brokerageCost.value.toFixed()

    unitPrice.value = parseInt(discountPrice.value) + parseInt(brokerageCost.value)
    unitTotalPrice.value = unitPrice.value
    unitPriceClone.value = structuredClone(unitPrice.value)

}


function convertAndFormatDateStringToDate() {
    startDateTimeObj.value = new Date(props.startDateTime)
    endDateTimeObj.value = new Date(props.endDateTime)

    startDate.value = `${startDateTimeObj.value.getDate()}/${startDateTimeObj.value.getMonth() + 1}/${startDateTimeObj.value.getFullYear()}`
    startTime.value = `${startDateTimeObj.value.getHours()}:${startDateTimeObj.value.getMinutes()}`

    endDate.value = `${endDateTimeObj.value.getDate()}/${endDateTimeObj.value.getMonth() + 1}/${endDateTimeObj.value.getFullYear()}`
    endTime.value = `${endDateTimeObj.value.getHours()}:${endDateTimeObj.value.getMinutes()}`

}

// handle show up dialog
const show = ref(false)
const showOrderConfirmModal = ref(false)
const showDeliveryCarModal = ref(false)

function hiddenDialog() {
    show.value = false
}

function confirmDeliveryAddress(value) {
    //set unit price to default value 
    unitTotalPrice.value = unitPriceClone.value - promotionDiscount.value

    deliveryPrice.value = value

    unitTotalPrice.value = unitTotalPrice.value + parseInt(deliveryPrice.value)

    hiddenDeliveryCarDialog()

}


function handleDeleteDeliveryCarPrice() {
    deliveryPrice.value = ""
    unitTotalPrice.value = unitPriceClone.value - parseInt(promotionDiscount.value)
}

function hiddenDeliveryCarDialog() {
    showDeliveryCarModal.value = false

}

function showDeliveryCarDialog() {
    showDeliveryCarModal.value = true
}


function showOrderConfirmDialog() {
    showOrderConfirmModal.value = true
}

function hiddenOrderConfirmDialog() {
    showOrderConfirmModal.value = false
}



function handleSelectDiscount(promotion) {

    //set unit price to default value 
    const deliveryPriceCheck = deliveryPrice.value ? parseInt(deliveryPrice.value) : 0
    unitTotalPrice.value = unitPriceClone.value + deliveryPriceCheck

    promotionDiscount.value = promotion.discount_value * unitPrice.value / 100
    promotionDiscount.value = promotionDiscount.value.toFixed()

    unitTotalPrice.value = unitTotalPrice.value - promotionDiscount.value

    hiddenDialog()

}

onMounted(async () => {
    await convertAndFormatDateStringToDate()
    await calculatePriceAndFixedNumber()

})

onUpdated(() => {
    console.log('updated')
})

</script>

<style lang="scss" scoped></style>