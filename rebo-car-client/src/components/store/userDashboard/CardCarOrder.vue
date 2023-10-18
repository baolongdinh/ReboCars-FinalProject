<template>
    <div class=" p-8 bg-white w-full relative rounded-lg">
        <div class="flex flex-col">
            <div class="text-bold font-sans text-xl rounded-xl text-white bg-green-400 w-44 text-center ">
                SUZUKI XL7 2023
            </div>

            <div class="flex mt-2">
                <div>
                    <img class="w-64 h-150 rounded-lg"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_2021/p/g/2023/07/22/17/Jx-BZ9TvayCUDVOjSJ10Mw.jpg">
                </div>

                <div class="ml-8 flex-col space-y-1 text-base font-normal text-gray-800">
                    <div>
                        <span class="font-semibold">
                            Bắt đầu:
                        </span>
                        20:00, 08/10/2023
                    </div>
                    <div>
                        <span class="font-semibold">
                            Kết thúc:
                        </span>
                        20:00, 15/10/2023
                    </div>
                    <div>
                        <span class="font-semibold">
                            Địa điểm giao nhận xe:
                        </span>
                        Chung cư gia phúc, Phường Linh Chiểu, Quận Thủ Đức, Thành Phố Hồ Chí Minh
                    </div>

                    <div class="text-lg font-semibold">
                        Tổng tiền: <span class="ml-2 text-green-400 font-bold text-xl">
                            3450K
                        </span>
                    </div>
                </div>

            </div>



        </div>

        <div class="absolute bottom-5 right-5">
            <button class="bg-green-400 hover:bg-green-500 w-32 h-12 rounded-lg " @click="handleInfoDetailBtn">
                <div class="text-white font-sans font-semibold text-base">
                    Xem chi tiết
                </div>

            </button>

        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['handleInfoDetailBtn'])

function handleInfoDetailBtn() {
    emit('handleInfoDetailBtn')
}

</script>

<style lang="scss" scoped></style>