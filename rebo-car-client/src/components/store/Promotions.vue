<template>
    <div class="mt-36">

        <div class="font-sans text-5xl text-center font-medium text-black ">
            Chương trình khuyến mãi
        </div>

        <div v-if="listPromotions">
            <vueper-slides class="no-shadow ml-24 mr-24 mt-8 " :visible-slides="3" :slide-ratio="1 / 5"
                :dragging-distance="70" :gap="1">
                <vueper-slide class="rounded-lg w-400 h-72" v-for="(promotion, i) in listPromotions" :key="i"
                    :image="getImage(promotion.discount_image)" @click="handleSelectDiscount(promotion)">
                </vueper-slide>
            </vueper-slides>
        </div>

    </div>
</template>

<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { RepositoryFactory } from '../../apis/repositoryFactory'
import { ref, onMounted, inject } from 'vue'
import { useStore } from 'vuex'

const discountRepo = RepositoryFactory.get('discounts')
const store = useStore()
const listPromotions = ref()

const base_url = inject('base_url')
function getImage(url) {
    return base_url + url
}

const filter = {
    discount_active: true
}
const emit = defineEmits(['handleSelectDiscount'])

function handleSelectDiscount(promotion) {
    //  console.log({ promotion })
    emit('handleSelectDiscount', promotion)
}

onMounted(async () => {

    listPromotions.value = await store.dispatch('getAllDiscount', { filter })
    console.log(listPromotions.value)
})

</script>

<style></style>