<template>
    <div class="relative">
        <div class="font-bold font-sans text-3xl flex-col">
            <div>
                Danh sách xe
            </div>

            <div class="flex-col space-y-5 pt-4">
                <MyCarCard></MyCarCard>
                <MyCarCard></MyCarCard>
                <MyCarCard></MyCarCard>
                <MyCarCard></MyCarCard>
            </div>

        </div>
    </div>
</template>

<script setup>
import MyCarCard from './MyCarCard.vue';
</script>

<style lang="scss" scoped></style>