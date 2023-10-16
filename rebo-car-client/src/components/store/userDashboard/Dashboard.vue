<template>
    <div class="bg-gray-50 relative">
        <div class=" mx-48 pt-12 ">


            <!-- This is an example component -->
            <div class="flex space-x-20">
                <div class="flex-col space-y-4">
                    <div class="font-bold text-3xl">
                        Xin chào bạn!
                    </div>
                    <MenuSideBarVue />
                </div>


                <div class="w-full">
                    <router-view></router-view>
                </div>

            </div>



        </div>
    </div>
</template>

<script setup>

import MenuSideBarVue from "../MenuSideBar.vue";


</script>

<style lang="css" scoped></style>