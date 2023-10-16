<template>
    <VueFinalModal class="justify-center items-center text-center absolute "
        content-class="flex flex-col bg-gray-100 text-black rounded-lg space-y-2  ">

        <div class="relative">

            <div
                class="font-sans font-semibold text-black text-center sticky top-0 z-40 bg-gray-50 h-8 p-2 text-2xl w-full border-bottom flex">

                Danh sách khuyến mãi

                <button @click="this.$emit('logout')">
                    <span
                        class="absolute right-5 top-5 p-1 font-light border border-gray-900 hover:bg-gray-500  rounded-full leading-5">

                        <div class=" decoration-0 text-base px-1 mb-1 mx-1">
                            x
                        </div>
                    </span>
                </button>

            </div>

            <div class=" overflow-y-auto">
                <ListPromotions v-if="listPromotions" :listPromotions=listPromotions
                    @handleSelectDiscount="(promotion) => this.$emit('handleSelectDiscount', promotion)"></ListPromotions>
            </div>

        </div>

    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import PromotionCardDialog from './PromotionCardDialog.vue';
import ListPromotions from './ListPromotions.vue';
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';

const store = useStore()
const listPromotions = ref()

const filter = {

}

const emit = defineEmits(['handleSelectDiscount'])


onMounted(async () => {

    listPromotions.value = await store.dispatch('getAllDiscount', { filter })
    console.log(listPromotions.value)
})

</script>

<style lang="css" scoped>
.border-bottom {
    padding-bottom: 55px;
    border-bottom: 1px solid gray;
}

.border-top {
    border-top: 1px solid gray;
}
</style>

<style src="@vueform/slider/themes/default.css"></style>