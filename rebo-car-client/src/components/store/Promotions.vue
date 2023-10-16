<template>
    <div class="mt-36">

        <div class="font-sans text-5xl text-center font-medium text-black ">
            Chương trình khuyến mãi
        </div>

        <div>
            <vueper-slides class="no-shadow ml-24 mr-24 mt-8 " :visible-slides="3" :slide-ratio="1 / 5"
                :dragging-distance="70" :gap="1">
                <vueper-slide class="rounded-lg w-400 h-72" v-for="(promotion, i) in promotions" :key="i"
                    :image="promotion.image" @click="(e) => console.log(i)">
                </vueper-slide>
            </vueper-slides>
        </div>

    </div>
</template>

<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

const promotions = [
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },
    {
        image: 'https://n1-cstg.mioto.vn/g/2023/09/02/10/5K3K1C89.jpg'
    },


]


</script>

<style></style>