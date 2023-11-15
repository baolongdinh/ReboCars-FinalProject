<template>
    <div>

        <div class="bg-white p-10  relative rounded-lg">
            <div class="absolute top-10 left-5 font-semibold text-2xl flex">
                <div>
                    Thông tin tài khoản
                </div>


            </div>
            <div class="">
                <button @click="showUpdateAccountModal = true"
                    class="ml-2 p-2 rounded-full border font-medium text-base border-gray-300 flex absolute top-10 right-10 hover:bg-gray-400">
                    Chỉnh sửa

                    <svg class="pl-1 mt-1" width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z"
                            stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M10.2344 4.08789L11.9144 5.76788" stroke="black" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                </button>
            </div>


            <div class="flex mt-16">
                <div class="grid grid-rows-2 gap-4">
                    <div class=" w-36 h-36">

                        <img v-if="user.avatar" loading="lazy" class=" rounded-full object-cover w-full h-full"
                            :src="getImage(user.avatar)" alt="Bảo Long">

                        <img v-else loading="lazy" class=" rounded-full object-cover w-full h-full"
                            src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                            alt="Bảo Long">


                    </div>

                    <div v-if="user.name" class=" max-w-fit mx-auto font-semibold text-xl">
                        {{ user.name }}
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-12 flex flex-col gap-4 ml-20 w-full align-middle">



                    <div class="flex space-x-12 relative">
                        <div class="text-base  text-gray-700">
                            Ngày sinh
                        </div>

                        <div v-if="user.dateOfBirth" class="text-black font-semibold absolute right-0">
                            {{ convertDateString(user.dateOfBirth) }}
                        </div>
                    </div>

                    <div class="flex space-x-12 relative">
                        <div class="text-base  text-gray-700">
                            Số điện thoại
                        </div>

                        <div v-if="user.phone" class="text-black font-semibold absolute right-0">
                            {{ user.phone }}
                        </div>
                    </div>

                    <div class="flex space-x-12 relative">
                        <div class="text-base  text-gray-700">
                            Email
                        </div>

                        <div class="text-black font-semibold absolute right-0">
                            {{ user.email }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="opacity-80 bg-gray-800 fixed z-40 inset-0" v-if="showUpdateAccountModal">
            <!-- OVERLAY SCREEN WHEN POP UP DIALOG MODAL -->
            <update-account-modal v-if="user" :user="user" class=" absolute m-auto w-750 h-465 inset-0"
                v-model="showUpdateAccountModal" @logout="hiddenUpdateAccountModal" @confirm="confirmUpdate"
                @handleSelectDiscount="handleSelectDiscount">
            </update-account-modal>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const user = computed(() => store.state.authStore.user)

function convertDateString(date) {
    return new Date(date).toLocaleDateString()
}

const showUpdateAccountModal = ref(false)

function hiddenUpdateAccountModal() {
    showUpdateAccountModal.value = false
}

function confirmUpdate() {
    showUpdateAccountModal.value = false
}

// handle image src
const base_url = inject('base_url')
function getImage(url) {
    return base_url + url
}

onMounted(() => {
})

</script>

<style lang="scss" scoped></style>