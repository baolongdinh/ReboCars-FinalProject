<template>
    <div class=" p-8 bg-white w-full relative rounded-lg">
        <div class="flex flex-col">
            <div class="text-bold font-sans text-xl rounded-xl text-white bg-green-400 w-44 text-center ">
                SUZUKI XL7 2023
            </div>

            <div class="flex mt-2">
                <div>
                    <img class=" w-64 h-150 rounded-lg"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_2021/p/g/2023/07/22/17/Jx-BZ9TvayCUDVOjSJ10Mw.jpg">
                </div>

                <div class="ml-8 flex-col space-y-1 text-base font-normal text-gray-800">
                    <div>
                        <span class="font-semibold">
                            Vị trí:
                        </span>
                        Chung cư gia phúc, 94 Tô Vĩnh Diện, Phường Linh Chiểu, Quận Thủ Đức, Thành Phố Hồ Chí Minh
                    </div>

                    <div class="flex">
                        <span class="font-semibold">
                            Trạng thái:
                        </span>
                        <div class="flex pl-1">
                            Đang hoạt động

                            <img :src="activeIcon" alt="activeIcon">

                        </div>

                    </div>

                    <div class="text-lg font-semibold">
                        Giá cho thuê: <span class="ml-2 text-green-400 font-bold text-xl">
                            300K
                        </span>
                        <span class="text-gray-600 font-normal font-sans">
                            /ngày
                        </span>
                    </div>

                    <div class="flex space-x-4">
                        <div class="text-base font-normal">
                            <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                            <span class="">
                                5.0
                            </span>
                        </div>

                        <div class="text-base font-normal">
                            <font-awesome-icon :icon="['fas', 'car-rear']" size="lg" style="color: #17ba22;" />
                            <span class="pl-1">
                                20 chuyến
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="absolute bottom-5 right-8">
            <button class="bg-green-400 hover:bg-green-500 w-32 h-12 rounded-lg ">
                <div class="text-white font-sans font-semibold text-base">
                    Xem chi tiết
                </div>

            </button>

        </div>
    </div>
</template>

<script setup>
import activeIcon from "../../../../assets/icons/active.svg"
</script>

<style lang="scss" scoped></style>