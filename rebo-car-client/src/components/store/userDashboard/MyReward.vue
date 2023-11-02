<template>
    <div class="relative">
        <div class="font-bold font-sans text-3xl flex-col">
            <div>
                Khuyến mãi
            </div>

            <div class="bg-white rounded-2xl shadow-md p-8 mt-4 flex-col space-y-4">
                <div v-for="promotion in listPromotions" :key="promotion._id">
                    <PromotionCard :promotion="promotion" @handleBtnShowPromotionDetail="handleBtnShowPromotionDetail">
                    </PromotionCard>
                </div>
            </div>
            <div class="opacity-80 bg-gray-800 fixed z-200 inset-0" v-if="showPromotionDetailModal">

                <PromotionDetailModal v-if="promotionSelected" :promotion="promotionSelected"
                    class="  w-full h-full px-465 py-20 absolute m-auto inset-0" v-model="showPromotionDetailModal"
                    @logout="hidePromotionDetailDialog">
                </PromotionDetailModal>

            </div>
        </div>
    </div>
</template>

<script setup>
import PromotionCard from './PromotionCard.vue';
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';
import PromotionDetailModal from './PromotionDetailModal.vue';


const store = useStore()
const listPromotions = ref()
const filter = {

}

//handle btn show promotion detail
const promotionSelected = ref()
const showPromotionDetailModal = ref(false)

function showPromotionDetailDialog() {
    showPromotionDetailModal.value = true
}

function hidePromotionDetailDialog() {
    showPromotionDetailModal.value = false
}

function handleBtnShowPromotionDetail(promotion) {
    promotionSelected.value = promotion
    showPromotionDetailDialog()
}

onMounted(async () => {

    listPromotions.value = await store.dispatch('getAllDiscount', { filter })
    console.log(listPromotions.value)
})

</script>

<style lang="scss" scoped></style>