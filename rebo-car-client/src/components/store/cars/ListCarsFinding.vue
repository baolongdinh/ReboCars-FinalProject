<template>
    <div class="bg-gray-100">
        <div class="sticky top-0 z-50">
            <date-picker-filter> </date-picker-filter>
        </div>

        <list-cars />
    </div>
</template>

<script setup>

import listCars from './ListCars.vue';
import DatePickerFilter from '../cars/DatePickerFilter.vue';

</script>

<style lang="scss" scoped></style>