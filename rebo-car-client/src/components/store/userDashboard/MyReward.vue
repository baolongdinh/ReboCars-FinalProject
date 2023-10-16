<template>
    <div class="relative">
        <div class="font-bold font-sans text-3xl flex-col">
            <div>
                Khuyến mãi
            </div>

            <div class="bg-white rounded-2xl shadow-md p-8 mt-4 flex-col space-y-4">
                <PromotionCard></PromotionCard>
                <PromotionCard></PromotionCard>
                <PromotionCard></PromotionCard>
                <PromotionCard></PromotionCard>
            </div>

        </div>
    </div>
</template>

<script setup>
import PromotionCard from './PromotionCard.vue';
</script>

<style lang="scss" scoped></style>