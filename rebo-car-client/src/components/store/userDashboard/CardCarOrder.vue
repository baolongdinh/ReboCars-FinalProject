<template>
    <div class=" p-8 bg-white w-full relative rounded-lg">
        <div class="flex flex-col">
            <div class="text-bold font-sans text-xl rounded-xl text-white bg-green-400 max-w-fit px-6 text-center ">
                {{ order.car_info[0].name }}
            </div>

            <div class="flex mt-2">
                <div>
                    <img class="max-w-xs w-48 h-150 rounded-lg"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_2021/p/g/2023/07/22/17/Jx-BZ9TvayCUDVOjSJ10Mw.jpg">
                </div>

                <div class=" max-w-md ml-8 p-1 flex-col space-y-1 text-base font-normal text-gray-800">
                    <div>
                        <span class="font-semibold">
                            Bắt đầu:
                        </span>
                        {{ startDateTimeString }}
                    </div>
                    <div>
                        <span class="font-semibold">
                            Kết thúc:
                        </span>
                        {{ endDateTimeString }}
                    </div>
                    <div>
                        <span class="font-semibold">
                            Địa điểm giao nhận xe:
                        </span>
                        {{ description }}
                    </div>

                    <div class="text-lg font-semibold">
                        Tổng tiền: <span class="ml-2 text-green-400 font-bold text-xl">
                            {{ order.prices_table.unitTotalPrice }}K
                        </span>
                    </div>

                    <div v-if="orderHistory">
                        <div class="text-lg font-semibold text-white text-xl bg-blue-400 w-fit py-1 px-3 rounded-3xl mt-1">
                            <span class="">
                                <div v-if="order.reviewed">
                                    Đã đánh giá
                                </div>
                                <div v-else>
                                    Chưa đánh giá
                                </div>
                            </span>
                        </div>


                    </div>


                </div>

            </div>



        </div>

        <div class="absolute bottom-8 right-5">
            <button class="bg-green-400 hover:bg-green-500 w-32 h-12 rounded-lg " @click="handleInfoDetailBtn">
                <div class="text-white font-sans font-semibold text-base">
                    Xem chi tiết
                </div>

            </button>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const emit = defineEmits(['handleInfoDetailBtn'])
const props = defineProps({
    order: Object,
    orderHistory: Boolean
})

const startDateTimeString = new Date(props.order.start_date_time).toLocaleString()
const endDateTimeString = new Date(props.order.end_date_time).toLocaleString()
const description = props.order.delivery_receipt_address.description

function handleInfoDetailBtn() {
    emit('handleInfoDetailBtn', props.order)
}

onMounted(() => {

})

</script>

<style lang="scss" scoped></style>