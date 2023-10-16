<template>
    <div class="p-8 bg-blue-50 rounded-xl">
        <div v-if="discountPrice" class="font-semibold text-3xl">
            {{ discountPrice }}K/ngày
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
            </div>

            <div class="grid grid-row-2 gap-2 divide-slate-300 border border-gray-300 rounded-lg bg-white p-2">
                <div>
                    Địa điểm giao xe
                </div>
                <InputAutoCompletePlace />
            </div>

            <div class="grid grid-row-2 gap-2 border-t border-b border-gray-300 p-2">
                <div class="grid grid-cols-2 relative">
                    <div class="text-gray-700">
                        Đơn giá thuê
                    </div>
                    <div v-if="discountPrice" class="text-black font-medium">
                        {{ discountPrice }} 000đ/ngày
                    </div>
                </div>

                <div class="grid grid-cols-2 relative">
                    <div class="text-gray-700">
                        Giảm giá
                    </div>
                    <div v-if="price" class="text-black font-medium line-through">
                        {{ price }} 000đ/ngày
                    </div>
                </div>

                <div class="grid grid-cols-2 relative">
                    <div class="text-gray-700">
                        Phí dịch vụ
                    </div>
                    <div v-if="brokerageCost" class="text-black font-medium">
                        {{ brokerageCost }} 000đ/ngày
                    </div>
                </div>

            </div>

            <div class="grid grid-cols-2 relative">
                <div class="text-gray-700">
                    Tổng phí thuê xe
                </div>
                <div v-if="unitPrice" class="text-black font-medium">
                    {{ unitPrice }} 000đ/ngày
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
                    {{ unitPrice }} 000đ/ngày
                </div>
            </div>

            <div>
                <button type="button"
                    class="text-white bg-gradient-to-r w-full from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    CHỌN THUÊ
                </button>
            </div>




        </div>


    </div>
</template>

<script setup>
import InputAutoCompletePlace from '../InputAutoCompletePlace.vue';
import DiscountIcon from "../../../assets/icons/discount.svg"
import ThunderIcon from "../../../assets/icons/thunder.svg"
import PromotionsModal from "./PromotionsModal.vue"

import { onMounted, ref, onUpdated } from 'vue';

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

const discountPrice = ref()
const brokerageCost = ref()
const unitPrice = ref()
const unitPriceClone = ref()


const promotionDiscount = ref(0)

function calculatePriceAndFixedNumber() {
    discountPrice.value = props.price - (props.price * props.discount / 100)
    discountPrice.value = discountPrice.value.toFixed()

    brokerageCost.value = discountPrice.value * 15 / 100
    brokerageCost.value = brokerageCost.value.toFixed()

    unitPrice.value = parseInt(discountPrice.value) + parseInt(brokerageCost.value)

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

// handle show up promotions dialog
const show = ref(false)

function hiddenDialog() {
    show.value = false
}

function handleSelectDiscount(promotion) {

    //set unit price to default value 
    unitPrice.value = unitPriceClone.value

    promotionDiscount.value = promotion.discount_value * unitPrice.value / 100
    promotionDiscount.value = promotionDiscount.value.toFixed()

    unitPrice.value = unitPrice.value - promotionDiscount.value

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