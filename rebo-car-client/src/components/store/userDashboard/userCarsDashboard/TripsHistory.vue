<template>
    <div class="relative">
        <div class="font-bold font-sans text-3xl flex-col">
            <div class="flex">
                <div>
                    Lịch sử chuyến đi
                </div>

                <div class="absolute right-0 flex font-normal">

                    <VueDatePicker v-model="dateRange" range :partial-range="false" placeholder="Chọn khoảng thời gian" />
                </div>

            </div>

            <div class="flex-col space-y-5 pt-4">
                <CardTripOrders class="shadow-xl rounded-lg" />
                <CardTripOrders class="shadow-xl rounded-lg" />
                <CardTripOrders class="shadow-xl rounded-lg" />
                <CardTripOrders class="shadow-xl rounded-lg" />
            </div>

        </div>
    </div>
</template>

<script setup>
import CardTripOrders from './CardTripOrders.vue';
import { ref, watch } from 'vue'

const dateRange = ref();

watch(dateRange, () => {
    console.log(dateRange.value)
})

</script>

<style lang="scss" scoped></style>