<template>
    <div class="container  mx-auto">
        <div class="px-28 mt-5 pb-8">
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

            <div class="grid-cols-3 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-2">

                <div class="w-full col-span-2 row-span-3 grid gap-y-6 divide-gray-300 divide-y">
                    <div class="font-semibold text-4xl ">
                        MERCEDES MAYBACH S450 4MATIC 2018
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
                                    <div class="font-medium text-lg">
                                        4 Chỗ
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
                                    <div class="font-medium text-lg">
                                        Số tự động
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
                                    <div class="font-medium text-lg">
                                        Xăng
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
                                    <div class="font-medium text-lg">
                                        12L/100km
                                    </div>
                                </label>
                            </div>


                        </div>

                    </div> <!--  end dac diem // -->

                    <div class="font-medium text-xl pt-6">
                        Mô tả
                        <div class="font-normal text-base text-gray-500 pt-4 ">
                            Xe sang , xịn , chạy êm , lịch lãm , sang trọng , thoải mái , riêng tư !
                        </div>
                    </div>


                    <div class="font-medium text-xl pt-6">
                        Các tiện nghi khác
                        <div class="font-normal text-base text-gray-500 pt-4 ">
                            danh sách tiện nghi
                        </div>
                    </div>

                    <div class="font-medium text-xl pt-6">
                        Giấy tờ thuê xe
                        <div class="font-normal text-base text-gray-500 pt-4 ">
                            GPLX & CCCD gắn chip (đối chiếu)
                        </div>
                        <div class="font-normal text-base text-gray-500 pt-4 ">
                            GPLX (đối chiếu) & Passport (giữ lại)
                        </div>
                    </div>

                </div>



                <div class="w-full">

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

</script>

<style lang="scss" scoped></style>