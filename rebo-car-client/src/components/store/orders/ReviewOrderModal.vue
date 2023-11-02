<template>
    <VueFinalModal class="justify-center items-center absolute font-sans"
        content-class="flex flex-col bg-gray-100 text-black rounded-md space-y-2 p-2 ">

        <div class="relative p-2">

            <div class="text-3xl text-center font-semibold ">
                Đánh giá đơn hàng
            </div>

            <div class="p-2 flex flex-col space-y-4">
                <div class="flex">
                    <label for="star-rating" class="text-lg text-center font-semibold text-gray-600 mt-3">
                        Đánh giá:
                    </label>
                    <star-rating id="star-rating" class="ml-6" @update:rating="updateRating" />
                </div>

                <div class="flex">
                    <label for="reviewMessage" class="text-lg text-center font-semibold text-gray-600 mt-3">
                        Nhận xét:
                    </label>
                    <textarea class=" w-415 h-40 ml-6" name="reviewMessage" id="reviewMessage" cols="30" rows="10"
                        v-model="comment"></textarea>
                </div>

            </div>

            <div class=" float-right mt-4">
                <button @click="this.$emit('logout')"
                    class="px-4 py-2 w-32 bg-rose-400 hover:bg-rose-600 text-white font-semibold  rounded-lg">
                    Hủy
                </button>

                <button @click="handleConfirmSubmitReviewBtn"
                    class="ml-2 px-4 w-32 py-2 bg-green-400 hover:bg-indigo-600 text-white font-semibold rounded-lg">
                    Xác nhận
                </button>
            </div>

        </div>


    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { ref, onMounted, inject } from 'vue';
import { RepositoryFactory } from "../../../apis/repositoryFactory";
import StarRating from 'vue-star-rating'
import { useStore } from 'vuex'



//define
const store = useStore()
const userAvatar = store.state.authStore.user.avatar
const userName = store.state.authStore.user.name
const orderRepo = RepositoryFactory.get('orders')
const rate = ref(0)
const comment = ref("")
const orderId = inject('orderId')
const carId = inject('carId')
const emit = defineEmits(['handleConfirmSubmitReviewBtn'])
//logic
function updateRating(rating) {
    rate.value = rating
}


function handleConfirmSubmitReviewBtn() {
    orderRepo.addReviewOrderById(orderId, { carId, userAvatar, userName, rate: rate.value, comment: comment.value }).then(() => {
        emit('handleConfirmSubmitReviewBtn')
    }).catch((err) => {
        console.error(err)
    })
}


onMounted(async () => {
    console.log(orderId)
})



</script>

<style lang="css" scoped>
.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    -webkit-appearance: none;
    -moz-appearance: none;
    display: inline-block;
}

.button--small {
    padding: 10px 20px;
    font-size: 0.875rem;
}

.button--green {
    outline: none;
    background-color: #64d18a;
    border-color: #64d18a;
    color: white;
    transition: all 200ms ease;
}

.button--green:hover {
    background-color: #8bdda8;
    color: white;
}
</style>