<template>
    <div>
        <div class="header relative ml-28 mr-28">
            <img class="h-auto w-full rounded-2xl object-cover" src="https://wallpapers-fenix.eu/full/141205/161554157.jpg"
                alt="image description">
            <div class="z-40 absolute bottom-ne70 w-full ">
                <div class="font-sans text-white text-5xl font-medium text-center">
                    ReboCars - Cùng bạn đến mọi hành trình
                </div>
                <date-picker> </date-picker>
            </div>

        </div>

        <div class="">
            <promotions class="w-full"></promotions>
        </div>

        <div class="mt-24 bg-gray-100">
            <div class=" font-sans  text-black text-5xl font-medium text-center">
                Xe Dành Cho Bạn
            </div>
            <listCars></listCars>
        </div>


    </div>
</template>


<script>
import DatePicker from './DatePicker.vue'
import Promotions from './Promotions.vue'
import listCars from './cars/ListCars.vue'
export default {
    components: { DatePicker, Promotions, listCars },
    setup() {


        return {}
    }
}
</script>

<style lang="css" scoped></style>