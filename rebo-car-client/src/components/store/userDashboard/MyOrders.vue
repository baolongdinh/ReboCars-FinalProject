<template>
    <div class="relative">
        <div class="font-bold font-sans text-3xl flex-col">
            <div>
                Đơn hàng của tôi
            </div>

            <div class="flex-col space-y-5 pt-4">
                <CardCarOrder class="shadow-xl rounded-lg" />
                <CardCarOrder class="shadow-xl rounded-lg" />
                <CardCarOrder class="shadow-xl rounded-lg" />
                <CardCarOrder class="shadow-xl rounded-lg" />
            </div>

        </div>
    </div>
</template>

<script setup>
import CardCarOrder from './CardCarOrder.vue';

</script>

<style lang="scss" scoped></style>