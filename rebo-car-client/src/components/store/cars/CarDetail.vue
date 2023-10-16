<template>
    <div class="container  mx-auto">
        <div class="px-28 pb-8">
            <div class="grid-cols-3 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-2">
                <div class="w-full col-span-2 row-span-3 rounded-xl ">
                    <img loading="lazy" alt="Cho thuê xe tự lái MERCEDES MAYBACH S450 4MATIC 2018"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mercedes_maybach_s450_4matic_2018/p/g/2023/06/04/18/O-2NoKB4uroktdmQpNgu1A.jpg">
                </div>
                <div class="w-full rounded-xl">
                    <img loading="lazy" class="" alt="Cho thuê xe tự lái MERCEDES MAYBACH S450 4MATIC 2018"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mercedes_maybach_s450_4matic_2018/p/g/2023/06/04/18/O-2NoKB4uroktdmQpNgu1A.jpg">
                </div>

                <div class="w-full rounded-xl">
                    <img loading="lazy" alt="Cho thuê xe tự lái MERCEDES MAYBACH S450 4MATIC 2018"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mercedes_maybach_s450_4matic_2018/p/g/2023/06/04/18/O-2NoKB4uroktdmQpNgu1A.jpg">
                </div>
            </div>

            <div class="grid-cols-3 space-y-2 lg:space-y-0 lg:grid lg:gap-3">

                <div v-if="car?.name" class="w-full col-span-2 row-span-3 grid gap-y-6 divide-gray-300 divide-y">
                    <div class="font-semibold text-4xl ">
                        {{ car.name }}
                    </div>

                    <div class="font-medium text-xl pt-6">
                        Đặc điểm

                        <div class="grid grid-cols-4 gap-6 pt-6">

                            <div class="flex gap-2">
                                <div>
                                    <img :src="seatIcon" alt="seatIcon" id="seatIcon">
                                </div>

                                <label for="seatIcon" class="grid grid-rows-2 leading-none gap-2 ">
                                    <div class="font-normal text-base text-gray-500 ">
                                        Số ghế
                                    </div>
                                    <div v-if="car?.characteristics?.seats" class="font-medium text-lg">
                                        {{ car.characteristics.seats }}
                                    </div>
                                </label>
                            </div>

                            <div class="flex gap-2">
                                <div>
                                    <img :src="transmissionIcon" alt="transmissionIcon" id="transmissionIcon">
                                </div>

                                <label for="transmissionIcon" class="grid grid-rows-2 leading-none gap-2 ">
                                    <div class="font-normal text-base text-gray-500 ">
                                        Truyền động
                                    </div>
                                    <div v-if="car?.characteristics?.transmission" class="font-medium text-lg">
                                        {{ car.characteristics.transmission }}
                                    </div>
                                </label>
                            </div>

                            <div class="flex gap-2">
                                <div>
                                    <img :src="fuelIcon" alt="fuelIcon" id="fuelIcon">
                                </div>

                                <label for="fuelIcon" class="grid grid-rows-2 leading-none gap-2 ">
                                    <div class="font-normal text-base text-gray-500 ">
                                        Nhiên liệu
                                    </div>
                                    <div v-if="car?.characteristics?.fuel" class="font-medium text-lg">
                                        {{ car.characteristics.fuel }}
                                    </div>
                                </label>
                            </div>

                            <div class="flex gap-2">
                                <div>
                                    <img :src="sfcIcon" alt="sfcIcon" id="sfcIcon">
                                </div>

                                <label for="sfcIcon" class="grid grid-rows-2 leading-none gap-2 ">
                                    <div class="font-normal text-base text-gray-500 ">
                                        NL tiêu hao
                                    </div>
                                    <div v-if="car?.characteristics?.sfc_100km" class="font-medium text-lg">
                                        {{ car.characteristics.sfc_100km }}L/100km
                                    </div>
                                </label>
                            </div>


                        </div>

                    </div> <!--  end dac diem // -->

                    <div class="font-medium text-xl pt-6">
                        Mô tả
                        <div v-if="car.description" class="font-normal text-base text-gray-500 pt-4 ">
                            {{ car.description }}
                        </div>
                    </div>


                    <div class="font-medium text-xl pt-6">
                        Các tiện nghi khác
                        <div class="font-normal text-base text-gray-800 pt-4 grid grid-cols-4 gap-2 ">
                            <div v-for="feature in car.features" :key="feature">
                                {{ feature }}
                            </div>
                        </div>
                    </div>

                    <div class="font-medium text-xl pt-6">
                        Giấy tờ thuê xe

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
                                        <img loading="lazy"
                                            src="https://n1-cstg.mioto.vn/v4/p/m/icons/papers/gplx_cccd.png">
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
                    </div>


                    <div class="font-medium text-xl pt-6">
                        Tài sản thế chấp

                        <div class=" bg-rose-50 rounded-md text-black text-base font-medium p-5 mt-3">
                            Miễn thế chấp
                        </div>

                    </div>

                    <div class="font-medium text-xl pt-6">
                        Chính sách hủy xe

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


                    <div class="font-medium text-xl pt-6 relative">
                        Vị trí xe

                        <div ref="mapContainer" class=" h-355 w-full mt-4">

                        </div>
                    </div>


                    <div class="font-medium text-xl pt-6">
                        Chủ xe
                        <div class="grid grid-cols-2 mt-3 p-auto relative">
                            <div class="flex">
                                <div class="">
                                    <img class="rounded-full w-20 h-20" loading="lazy"
                                        src="https://n1-astg.mioto.vn/g/2022/01/11/08/QnTonJtJSUHkXkf0B8NTyA.jpg">
                                </div>

                                <div class="grid grid-row-2 gap-1 pl-2 absolute top-ne24 left-20   ">
                                    <div class="font-medium text-xl pt-6">
                                        {{ car.carOwner[0].name }}
                                    </div>
                                    <div class="flex text-sm ">
                                        <div v-if="car?.reviewRateAvg">
                                            <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                                            {{ car.reviewRateAvg }}
                                        </div>
                                        <div v-else>
                                            <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                                            0
                                        </div>

                                        <div v-if="car?.bookedNumber" class="pl-2">
                                            <font-awesome-icon :icon="['fas', 'car-rear']" size="lg"
                                                style="color: #17ba22;" />
                                            {{ car.bookedNumber }}
                                        </div>

                                    </div>

                                    <div class="font-normal text-sm text-gray-800">
                                        Thông tin liên hệ với chủ xe sẽ được hiển thị sau khi đặt cọc
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



                    <div class="font-medium text-xl pt-6">
                        Reviews

                        <div class="flex flex-col">
                            <div class="mt-1 flex">
                                <div v-if="car?.reviewRateAvg">
                                    <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                                    {{ car.reviewRateAvg }}
                                </div>
                                <div v-else>
                                    <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                                    0
                                </div>

                                <div class=" font-normal text-base pt-1 pl-2">
                                    {{ car.reviews.length }} đánh giá
                                </div>

                            </div>

                            <div>
                                <ReviewCard />
                            </div>
                        </div>


                    </div>

                </div>



                <div class="w-full">
                    <Cart v-if="car.location" :startDateTime=startDateTime :endDateTime=endDateTime :location=car.location
                        :price=car.price :discount=car.discount @handleClickShowPromotionsDialog="show = true"></Cart>
                </div>




            </div>

        </div>



    </div>
</template>

<script setup>
import seatIcon from "../../../assets/icons/seats.svg"
import transmissionIcon from "../../../assets/icons/transmission.svg"
import fuelIcon from "../../../assets/icons/fuel.svg"
import sfcIcon from "../../../assets/icons/sfc.svg"
import greenCumulus from "../../../assets/icons/greenCumulus.svg"
import redCumulus from "../../../assets/icons/redCumulus.svg"
import Cart from "./Cart.vue"
import infoIcon from "../../../assets/icons/info.svg"
import ReviewCard from "./ReviewCard.vue"
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, shallowRef } from "vue"
import gongAPI from "../../../apis/goongMapAPI/api"
import goongAPIKey from "../../../configs/apikey.config"
import { useStore, mapGetters } from 'vuex'



const store = useStore()
const route = useRoute()
const car = ref({})

const startDateTime = route.query.startDateTime ? route.query.startDateTime : store.getters.getStartDateTime
const endDateTime = route.query.endDateTime ? route.query.endDateTime : store.getters.getEndDateTime


const mapContainer = shallowRef(null)
const map = shallowRef(null)

async function findCarByIdAndSetValue(id) {
    car.value = await store.dispatch("findCarById", id)
}


onMounted(async () => {

    await findCarByIdAndSetValue(route.params.id)
    console.log(car.value)
    // const place = await gongAPI.getPlaceDetailById(location.place_id)
    // console.log(place)
    map.value = await gongAPI.loadMap(105.83991, 21.028, mapContainer.value, 12)

})


</script>
<style lang="css" scoped>
@import "https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css"
</style>