<template>
    <div class=" mt-12">

        <div class="font-sans text-5xl text-center font-medium text-black ">
            Địa Điểm Nổi Bật
        </div>

        <div class="" v-if="specialPlaces">
            <vueper-slides class="no-shadow ml-24 mr-24 mt-16 " :visible-slides="4" :dragging-distance="90" :gap="2"
                :slideMultiple="true">
                <vueper-slide class="rounded-lg w-400 h-450 " v-for="(specialPlace, i) in specialPlaces" :key="i"
                    :image="specialPlace.image" @click="handleSelectPlace(specialPlace)">

                    <template #content>
                        <div class="vueperslide__content-wrapper font-bold text-white text-2xl">
                            <span class="absolute bottom-10 left-4"> {{ specialPlace.name }}</span>
                        </div>
                    </template>

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
import { useRouter } from 'vue-router'


const store = useStore()
const router = useRouter()

const specialPlaces = store.state.carStore.specialPlaces

const emit = defineEmits(['handleSelectDiscount'])

function handleSelectPlace(specialPlace) {
    console.log('1231232')
    const location = {
        compound: {
            province: specialPlace.name,
        },
        description: specialPlace.name
    }
    console.log({ location })
    store.commit('setLocation', location)
    router.push({ path: '/find/filter/cars' })

}

onMounted(async () => {
    console.log(specialPlaces)
})

</script>

<style></style>