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
                Thông tin đơn hàng
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

            <div class="pb-4">
                <button @click="handleBtnClickCarDetail" class="bg-green-400 hover:bg-green-500 p-2 rounded-lg ">
                    <div class="text-white font-sans font-semibold text-lg">
                        Xem thông tin chi tiết của xe
                    </div>

                </button>

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

                                {{ startDateTimeString }}
                            </div>
                            <div class="text-base font-normal">
                                <span class=" font-medium text-gray-700">Kết thúc:</span>
                                {{ endDateTimeString }}
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
                            {{ order.delivery_receipt_address.description }}
                        </div>

                    </div>
                </div>

            </div>


            <div v-if="carOwnerOrder" class="border-t border-gray-300 pb-8">

                <div class="text-lg font-sans pt-4 font-bold ">
                    THÔNG TIN NGƯỜI THUÊ XE
                </div>

                <div class="grid grid-cols-2 mt-3 p-auto relative">
                    <div class="flex">

                        <div>
                            <img class="rounded-full w-20 h-20" loading="lazy"
                                src="https://n1-astg.mioto.vn/g/2023/05/20/11/Amw7XK7x-BYML-KfFumPFA.jpg">
                        </div>

                        <div class="grid grid-row-2 gap-1 pl-6 absolute top-ne24 left-20   ">
                            <div v-if="order?.user_info[0]?.name" class="font-medium text-xl pt-6">
                                {{ order.user_info[0].name }}
                            </div>

                            <div v-if="order?.user_info[0]?.phone" class="font-normal text-base text-gray-800">
                                <span class="font-medium"> SĐT: </span>
                                {{ order.user_info[0].phone }}
                            </div>
                            <div v-if="order.user_info[0].email" class="font-normal text-base text-gray-800">
                                <span class="font-medium"> Email: </span>
                                {{ order.user_info[0].email }}
                            </div>
                        </div>

                    </div>


                </div>

            </div>


            <div v-else class="border-t border-gray-300 pb-8">

                <div class="text-lg font-sans pt-4 font-bold ">
                    THÔNG TIN CHỦ XE
                </div>

                <div class="grid grid-cols-2 mt-3 p-auto relative">
                    <div class="flex">

                        <div>
                            <img class="rounded-full w-20 h-20" loading="lazy"
                                src="https://n1-astg.mioto.vn/g/2023/05/20/11/Amw7XK7x-BYML-KfFumPFA.jpg">
                        </div>

                        <div class="grid grid-row-2 gap-1 pl-2 absolute top-ne24 left-20   ">
                            <div v-if="order?.car_owner_info[0]?.name" class="font-medium text-xl pt-6">
                                {{ order.car_owner_info[0].name }}
                            </div>

                            <div v-if="order?.car_owner_info[0]?.phone" class="font-normal text-base text-gray-800">
                                <span class="font-medium"> SĐT: </span>
                                {{ order.car_owner_info[0].phone }}
                            </div>
                            <div v-if="order.car_owner_info[0].email" class="font-normal text-base text-gray-800">
                                <span class="font-medium"> Email: </span>
                                {{ order.car_owner_info[0].email }}
                            </div>
                        </div>

                    </div>

                    <div class="grid grid-cols-3 pl-10 text-center">
                        <div class="flex flex-col">
                            <div class="text-gray-500 font-medium text-sm">
                                Tỷ lệ phản hồi
                            </div>
                            <div class="pt-1">
                                100%
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <div class="text-gray-500 font-medium text-sm">
                                Thời gian phản hồi
                            </div>
                            <div class="pt-1">
                                5 phút
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <div class="text-gray-500 font-medium text-sm">
                                Tỷ lệ đồng ý
                            </div>
                            <div class="pt-1 ">
                                99%
                            </div>
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

                    <div class="grid grid-row-2 gap-2 border-b border-t border-gray-300 p-2">
                        <div class="grid grid-cols-2 relative">
                            <div class="text-gray-700">
                                Đơn giá thuê
                            </div>
                            <div class="text-black font-medium">
                                {{ order.prices_table.discountPrice || order.prices_table.price }} 000đ/ngày
                            </div>
                        </div>

                        <div v-if="order.prices_table.discountPrice" class="grid grid-cols-2 relative">
                            <div class="text-gray-700">
                                Giảm giá
                            </div>
                            <div class="text-black font-medium line-through">
                                {{ order.prices_table.price }} 000đ/ngày
                            </div>
                        </div>

                        <div v-if="order.prices_table.brokerageCost" class="grid grid-cols-2 relative">
                            <div class="text-gray-700">
                                Phí dịch vụ
                            </div>
                            <div class="text-black font-medium">
                                {{ order.prices_table.brokerageCost }} 000đ/ngày
                            </div>
                        </div>

                    </div>

                    <div v-if="order.prices_table.unitPrice" class="grid grid-cols-2 relative pl-2 pt-1">
                        <div class="text-gray-700">
                            Tổng phí thuê xe
                        </div>
                        <div class="text-black font-medium">
                            {{ order.prices_table.unitPrice }} 000đ/ngày
                        </div>
                    </div>

                    <div v-if="order.prices_table.promotionDiscount" class="grid grid-cols-2 relative pl-2 pt-1 pb-2">
                        <div class="text-gray-700">
                            Khuyến mãi
                        </div>
                        <div class="text-black font-medium line-through">
                            {{ order.prices_table.promotionDiscount }} 000đ
                        </div>
                    </div>

                    <div v-if="order.prices_table.unitTotalPrice"
                        class="grid grid-cols-2 relative border-t border-gray-500 pt-2 pb-2 pl-2 pt-1">
                        <div class="text-black font-semibold">
                            Tổng cộng
                        </div>
                        <div class="text-black font-bold">
                            {{ order.prices_table.unitTotalPrice }} 000đ
                        </div>
                    </div>

                    <div v-if="order.prices_table.depositPrice"
                        class="grid grid-cols-2 relative border-t border-gray-500 pt-2 pl-2 ">
                        <div class="text-black font-semibold">
                            Số tiền đã cọc
                        </div>
                        <div class="text-green-600 font-bold">
                            {{ order.prices_table.depositPrice }} 000đ
                        </div>
                    </div>

                    <div v-if="order.prices_table.payLaterPrice" class="grid grid-cols-2 relative  pt-2 pl-2">
                        <div class="text-black font-semibold">
                            Số tiền thanh toán cho chủ xe khi nhận xe
                        </div>
                        <div class="text-green-600 font-bold">
                            {{ order.prices_table.payLaterPrice }} 000đ
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

                <div class="text-lg font-sans font-bold pt-4 border-t-8 border-gray-200 pb-6">
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

                <div v-if="order.reviewed" class="border-t-8 border-gray-200  pb-6 pt-4 ">
                    <div class="text-lg font-sans font-bold">
                        NGƯỜI DÙNG ĐÁNH GIÁ
                    </div>

                    <ReviewCardVue :review=order.review></ReviewCardVue>
                </div>

            </div>

            <div v-if="date_now < start_date_time">
                <button v-if="carOwnerOrder" @click="showCarOwnerDeleteOrderConfirmDialog"
                    class="bg-red-400 hover:bg-red-500 p-2 rounded-lg w-1/6 absolute bottom-0 right-2 ">
                    <div class="text-white font-sans font-semibold text-lg">
                        Hủy đơn hàng
                    </div>

                </button>

                <button v-else @click="showDeleteOrderConfirmDialog"
                    class="bg-red-400 hover:bg-red-500 p-2 rounded-lg w-1/6 absolute bottom-0 right-2 ">
                    <div class="text-white font-sans font-semibold text-lg">
                        Hủy đơn hàng
                    </div>

                </button>
            </div>
            <div v-else>
                <button v-if="!carOwnerOrder && !order.reviewed" @click="showReviewOrderDialog"
                    class="bg-green-400 hover:bg-green-600 p-3 rounded-lg absolute bottom-0 right-2 ">
                    <div class="text-white font-sans font-semibold text-lg">
                        Đánh giá đơn hàng
                    </div>
                </button>
            </div>


            <div class="opacity-80 bg-gray-800 fixed z-200 inset-0" v-if="showDeleteOrderConfirm">

                <DeleteOrderConfirmModal v-if="order" :order="order" class=" w-415 h-60 absolute m-auto inset-0"
                    v-model="showDeleteOrderConfirm" @logout="hiddenDeleteOrderConfirmDialog">
                </DeleteOrderConfirmModal>

            </div>

            <div class="opacity-80 bg-gray-800 fixed z-200 inset-0" v-if="showCarOwnerDeleteOrderConfirm">

                <CarOwnerDeleteOrderConfirmModal v-if="order" :order="order" class=" w-415 h-60 absolute m-auto inset-0"
                    v-model="showCarOwnerDeleteOrderConfirm" @logout="hiddenCarOwnerDeleteOrderConfirmDialog">
                </CarOwnerDeleteOrderConfirmModal>

            </div>

            <div class="opacity-80 bg-gray-800 fixed z-200 inset-0" v-if="showReviewOrderModal">

                <ReviewOrderModal class=" w-580 h-56 absolute mx-auto mt-36 inset-0" v-model="showReviewOrderModal"
                    @logout="hideReviewOrderDialog" @handleConfirmSubmitReviewBtn="handleConfirmSubmitReviewBtn">
                </ReviewOrderModal>

            </div>

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
import gongAPI from "../../../apis/goongMapAPI/api"
import { ref, onMounted, onUpdated, shallowRef, provide } from 'vue'
import { useRouter } from 'vue-router'
import DeleteOrderConfirmModal from '../orders/DeleteOrderConfirmModal.vue'
import CarOwnerDeleteOrderConfirmModal from "../orders/CarOwnerDeleteOrderConfirmModal.vue"
import ReviewOrderModal from '../orders/ReviewOrderModal.vue'
import ReviewCardVue from '../cars/ReviewCard.vue'



const props = defineProps({
    order: Object,
    orderHistory: Boolean,
    carOwnerOrder: Boolean
})

//provide
provide('orderId', props.order._id)
provide('carId', props.order.car_id)

const router = useRouter()
const emit = defineEmits(['handleConfirmSubmitReviewBtn'])
//define
const mapContainer = shallowRef(null)
const map = shallowRef(null)
const startDateTimeString = new Date(props.order.start_date_time).toLocaleString()
const endDateTimeString = new Date(props.order.end_date_time).toLocaleString()
const date_now = new Date()
const start_date_time = new Date(props.order.start_date_time)

//userinfo
const userAvatar = props.order.user_info[0].avatar
const userName = props.order.user_info[0].name

// handle btn delete order
// in case user order
const showDeleteOrderConfirm = ref(false)

function showDeleteOrderConfirmDialog() {
    showDeleteOrderConfirm.value = true
}

function hiddenDeleteOrderConfirmDialog() {
    showDeleteOrderConfirm.value = false
}

//in case car owner order 

const showCarOwnerDeleteOrderConfirm = ref(false)

function showCarOwnerDeleteOrderConfirmDialog() {
    showCarOwnerDeleteOrderConfirm.value = true
}

function hiddenCarOwnerDeleteOrderConfirmDialog() {
    showCarOwnerDeleteOrderConfirm.value = false
}

// show review order modal

const showReviewOrderModal = ref(false)

function showReviewOrderDialog() {
    showReviewOrderModal.value = true
}

function hideReviewOrderDialog() {
    showReviewOrderModal.value = false
}

// handle Confirm Submit Review Btn
function handleConfirmSubmitReviewBtn() {
    console.log('success reviewed')
    showReviewOrderModal.value = false
    router.go()
}

async function loadMap() {
    const lat = props.order.delivery_receipt_address.geometry.lat
    const lng = props.order.delivery_receipt_address.geometry.lng
    map.value = await gongAPI.loadMap(lng, lat, mapContainer.value, 12)
}

function handleBtnClickCarDetail() {
    const carId = props.order.car_id
    router.push({ name: 'car', params: { id: carId } })
}

onMounted(async () => {
    await loadMap()
    console.log({ props })
    console.log(startDateTimeString, endDateTimeString)

})

onUpdated(() => {
    console.log('updated', props.order)
})

</script>

<style lang="css" scoped></style>

<style src="@vueform/slider/themes/default.css"></style>