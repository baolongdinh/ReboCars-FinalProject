<template>
    <VueFinalModal class="justify-center items-center absolute overflow-y-auto "
        content-class="flex flex-col bg-gray-100 text-black rounded-lg space-y-2 p-8 ">

        <div class="relative">
            <button @click="this.$emit('logout')">
                <span
                    class="absolute right-0 top-0 p-1 font-light border border-gray-400 hover:bg-gray-500  rounded-full leading-5">

                    <div class=" decoration-0 text-base px-1 mb-1 mx-1">
                        X
                    </div>
                </span>
            </button>
            <div class="text-3xl font-bold font-sans ">
                Xác nhận đơn hàng
            </div>

            <div class="text-4xl font-bold font-sans ml-8 text-center ">
                SUZUKI K9 XLZ
            </div>

            <div class="grid-cols-3 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-2 ">
                <div class="w-full col-span-2 row-span-3  ">
                    <img class="rounded-xl" loading="lazy" alt="Cho thuê xe tự lái MERCEDES MAYBACH S450 4MATIC 2018"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mercedes_maybach_s450_4matic_2018/p/g/2023/06/04/18/O-2NoKB4uroktdmQpNgu1A.jpg">
                </div>
                <div class="w-full rounded-xl">
                    <img class="rounded-xl" loading="lazy" alt="Cho thuê xe tự lái MERCEDES MAYBACH S450 4MATIC 2018"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mercedes_maybach_s450_4matic_2018/p/g/2023/06/04/18/O-2NoKB4uroktdmQpNgu1A.jpg">
                </div>

                <div class="w-full rounded-xl">
                    <img class="rounded-xl" loading="lazy" alt="Cho thuê xe tự lái MERCEDES MAYBACH S450 4MATIC 2018"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mercedes_maybach_s450_4matic_2018/p/g/2023/06/04/18/O-2NoKB4uroktdmQpNgu1A.jpg">
                </div>
            </div>



            <div class="border-t-8 border-gray-200">
                <div class="text-2xl font-sans pt-4 font-bold ">
                    Thông tin đơn hàng chi tiết
                </div>
            </div>

            <div class="flex space-x-12">

                <div class="text-lg font-sans pt-2 font-bold ">
                    THỜI GIAN

                    <div class="flex p-4">
                        <div class="pt-4">
                            <img :src="calendarIcon" alt="calendarIcon">
                        </div>

                        <div class="flex flex-col space-y-2 ml-4">
                            <div class="text-base font-normal">

                                <span class=" font-medium text-gray-700">Bắt đầu:</span>

                                {{ startDate }}, {{ startTime }}
                            </div>
                            <div class="text-base font-normal">
                                <span class=" font-medium text-gray-700">Kết thúc:</span>
                                {{ endDate }}, {{ endTime }}
                            </div>
                        </div>

                    </div>
                </div>

                <div class="text-lg font-sans pt-2 font-bold ">
                    ĐỊA ĐIỂM GIAO NHẬN XE

                    <div class="flex p-4">
                        <div class="pt-4">
                            <img :src="locationIcon" alt="locationIcon">
                        </div>

                        <div class="ml-4 pt-4 font-normal">
                            Chung Cư Gia Phúc, 94 Tô Vĩnh Diện, Kp 5, Thủ Đức, Thành phố Hồ Chí Minh 700000
                        </div>

                    </div>
                </div>

            </div>



            <div class="border-t border-gray-300 pb-8">

                <div class="text-lg font-sans pt-4 font-bold ">
                    VỊ TRÍ
                </div>
                <div ref="mapContainer" class=" h-450 w-2/3 rounded-xl p-4 ">

                </div>
            </div>

            <div class="w-2/3">
                <div class="border-t-8 border-gray-200 pb-4 ">

                    <div class="text-lg font-sans font-bold py-4">
                        BẢNG TÍNH GIÁ
                    </div>

                    <div v-if="discountPrice" class="grid grid-row-2 gap-2 border-b border-t border-gray-300 p-2">
                        <div class="grid grid-cols-2 relative">
                            <div class="text-gray-700">
                                Đơn giá thuê
                            </div>
                            <div class="text-black font-medium">
                                {{ discountPrice }} 000đ/ngày
                            </div>
                        </div>

                        <div class="grid grid-cols-2 relative">
                            <div class="text-gray-700">
                                Giảm giá
                            </div>
                            <div class="text-black font-medium line-through">
                                {{ car.price }} 000đ/ngày
                            </div>
                        </div>

                        <div v-if="brokerageCost" class="grid grid-cols-2 relative">
                            <div class="text-gray-700">
                                Phí dịch vụ
                            </div>
                            <div class="text-black font-medium">
                                {{ brokerageCost }} 000đ/ngày
                            </div>
                        </div>

                    </div>

                    <div v-if="unitPrice" class="grid grid-cols-2 relative pl-2 py-1">
                        <div class="text-gray-700">
                            Tổng phí thuê xe
                        </div>
                        <div class="text-black font-medium">
                            {{ unitPrice }} 000đ
                        </div>
                    </div>

                    <div v-if="promotionDiscount" class="grid grid-cols-2 relative pl-2 pt-1 pb-2">
                        <div class="text-gray-700">
                            Khuyến mãi
                        </div>
                        <div class="text-black font-medium line-through">
                            {{ promotionDiscount }} 000đ
                        </div>
                    </div>

                    <div v-if="deliveryPrice" class="grid grid-cols-2 relative pl-2 pt-1 pb-2">
                        <div class="text-gray-700">
                            Phí giao xe
                        </div>
                        <div class="text-black font-medium line-through">
                            {{ deliveryPrice }} 000đ
                        </div>
                    </div>

                    <div v-if="unitTotalPrice"
                        class="grid grid-cols-2 relative border-t border-gray-500 pt-2 pb-2 pl-2 pt-1">
                        <div class="text-black font-semibold">
                            Tổng cộng
                        </div>
                        <div class="text-black font-bold">
                            {{ unitTotalPrice }} 000đ
                        </div>
                    </div>

                    <div v-if="depositPrice" class="grid grid-cols-2 relative border-t border-gray-500 pt-2 pl-2 ">
                        <div class="text-black font-semibold">
                            Số tiền cần cọc trước
                        </div>
                        <div class="text-green-600 font-bold text-xl">
                            {{ depositPrice }} 000đ
                        </div>
                    </div>

                    <div v-if="payLaterPrice" class="grid grid-cols-2 relative  pt-2 pl-2">
                        <div class="text-black font-semibold">
                            Số tiền thanh toán cho chủ xe khi nhận xe
                        </div>
                        <div class="text-green-600 font-bold text-xl">
                            {{ payLaterPrice }} 000đ
                        </div>
                    </div>

                </div>

                <div class="border-t-8 border-gray-200 pt-4 pb-6 ">
                    <div class="text-lg font-sans font-bold">
                        GIẤY TỜ THUÊ XE
                    </div>

                    <div class=" bg-rose-50 rounded-md mt-3">
                        <div class="grid-cols-3 gap-2 p-5">

                            <div class="text-gray-600 text-sm font-light flex">
                                <img :src="infoIcon" alt="infoIcon" id="infoIcon">
                                <div class="pl-2">
                                    Chọn 1 trong 2 hình thức
                                </div>

                            </div>

                            <div class="text-black text-base font-medium flex pt-3">

                                <div class=" w-6 h-6">
                                    <img loading="lazy" src="https://n1-cstg.mioto.vn/v4/p/m/icons/papers/gplx_cccd.png">
                                </div>

                                <div class="pl-5">
                                    GPLX & CCCD gắn chip (đối chiếu)
                                </div>

                            </div>

                            <div class="text-black text-base font-medium flex pt-3">

                                <div class=" w-6 h-6">
                                    <img loading="lazy"
                                        src="https://n1-cstg.mioto.vn/v4/p/m/icons/papers/gplx_passport.png">
                                </div>

                                <div class="pl-5">
                                    GPLX (đối chiếu) & Passport (giữ lại)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-lg font-sans font-bold pt-4">
                        TÀI SẢN THẾ CHẤP
                    </div>

                    <div class=" bg-rose-50 rounded-md text-black text-base font-medium p-5 mt-3">
                        Miễn thế chấp
                    </div>

                </div>

                <div class="text-lg font-sans font-bold pt-4 border-t-8 border-gray-200">
                    CHÍNH SÁCH HỦY XE

                    <div class="font-normal text-base text-gray-900  pt-5 ">
                        <div
                            class="grid grid-cols-3 grid-row-4 divide-x divide-y rounded-t-xl  border border-gray-400 text-center ">
                            <div class="font-bold text-black py-2 ">
                                Thời Điểm Hủy Chuyến
                            </div>

                            <div class="font-bold text-black py-2 ">
                                Khách Thuê Hủy Chuyến
                            </div>
                            <div class="font-bold text-black py-2">
                                Chủ Xe Hủy Chuyến
                            </div>
                            <div class="py-5">
                                Trong Vòng 1h Sau Đặt Cọc
                            </div>
                            <div class="py-5 pl-16 flex px-auto">
                                <img :src="greenCumulus">

                                <div class="pl-1">
                                    Hoàn tiền 100%
                                </div>

                            </div>
                            <div class="py-5 pl-16 flex px-auto">
                                <img :src="greenCumulus">

                                <div class="pl-1">
                                    Không đền cọc
                                </div>

                            </div>
                            <div class="py-5">
                                Trước Chuyến Đi 7 Ngày
                            </div>
                            <div class="py-5 pl-16 flex px-auto">
                                <img :src="greenCumulus">

                                <div class="pl-1">
                                    Hoàn tiền 70%
                                </div>

                            </div>
                            <div class="py-5 pl-16 flex px-auto">
                                <img :src="greenCumulus">

                                <div class="pl-1">
                                    Đền cọc 30%
                                </div>

                            </div>
                            <div class="py-5">
                                Trong Vòng 7 Ngày Trước Chuyến Đi
                            </div>
                            <div class="py-5 pl-16 flex px-auto">
                                <img :src="redCumulus">

                                <div class="pl-1">
                                    Không hoàn tiền
                                </div>

                            </div>
                            <div class="py-5 pl-16 flex px-auto">
                                <img :src="redCumulus">

                                <div class="pl-1">
                                    Đền cọc 100%
                                </div>

                            </div>


                        </div>
                    </div>

                </div>

            </div>

            <button class="bg-green-400 hover:bg-green-600 p-2 rounded-lg w-1/6 absolute bottom-0 right-2 "
                @click="btnshowCheckoutModal">
                <div class="text-white font-sans font-semibold text-lg">
                    Thanh toán tiền cọc
                </div>

            </button>
        </div>

        <div class="opacity-80 bg-gray-800 fixed z-200 inset-0" v-if="showCheckoutModal">

            <CheckOutModal class="overflow-y-auto w-580 h-2/3 absolute m-auto inset-0" v-model="showCheckoutModal"
                @logout="hideCheckoutModal">
            </CheckOutModal>

        </div>

    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import calendarIcon from '../../../assets/icons/calendar.svg'
import locationIcon from '../../../assets/icons/location.svg'
import infoIcon from '../../../assets/icons/info.svg'
import redCumulus from '../../../assets/icons/redCumulus.svg'
import greenCumulus from '../../../assets/icons/greenCumulus.svg'
import CheckOutModal from './CheckOutModal.vue'
import gongAPI from "../../../apis/goongMapAPI/api"
import { ref, onMounted, shallowRef, inject } from 'vue'


const mapContainer = shallowRef(null)
const map = shallowRef(null)

// inject data
const car = inject('car')
const startDate = inject('startDate')
const endDate = inject('endDate')
const startTime = inject('startTime')
const endTime = inject('endTime')
const startDateTimeObj = inject('startDateTimeObj')
const endDateTimeObj = inject('endDateTimeObj')


const discountPrice = inject('discountPrice')
const brokerageCost = inject('brokerageCost')
const unitPrice = inject('unitPrice')
const promotionDiscount = inject('promotionDiscount')
const deliveryPrice = inject('deliveryPrice')
const unitTotalPrice = inject('unitTotalPrice')

const depositPrice = ref()
const payLaterPrice = ref()

calculateDepositPrice()


function calculateDepositPrice() {
    depositPrice.value = unitTotalPrice.value * 20 / 100
    depositPrice.value = fixedPrice(depositPrice.value)

    payLaterPrice.value = unitTotalPrice.value - depositPrice.value
    payLaterPrice.value = fixedPrice(payLaterPrice.value)
}


// control checkout modal 
const showCheckoutModal = ref(false)

function hideCheckoutModal() {
    showCheckoutModal.value = false
}

function btnshowCheckoutModal() {
    showCheckoutModal.value = true
}


function fixedPrice(price) {
    return price.toFixed()
}


onMounted(async () => {
    map.value = await gongAPI.loadMap(105.83991, 21.028, mapContainer.value, 12)

})

</script>

<style lang="css" scoped></style>

<style src="@vueform/slider/themes/default.css"></style>