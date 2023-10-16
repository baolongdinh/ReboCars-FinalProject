<template>
    <div class="">

        <div class="grid grid-rows-1 gap-4 mt-2 p-6 scroll-smooth">
            <div v-for="promotion in listPromotions" :key="promotion._id">
                <Promotion :promotion=promotion @handleSelectDiscount="handleSelectDiscount" />
            </div>
        </div>

    </div>
</template>

<script>

import { defineAsyncComponent, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const Promotion = defineAsyncComponent(() =>
    import('./PromotionCardDialog.vue')
)

export default {
    components: { Promotion },
    props: {
        listPromotions: Array,
    },
    setup(props, { emit }) {
        console.log("props", props.listPromotions)

        function handleSelectDiscount(promotion) {
            emit('handleSelectDiscount', promotion)
        }
        return {
            handleSelectDiscount
        }
    }
}
</script>

<style lang="scss" scoped></style>