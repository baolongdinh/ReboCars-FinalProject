<template>
    <div class="relative">
        <div class="font-bold font-sans text-3xl flex-col">
            <div>
                Lịch sử đặt xe
            </div>

            <div v-if="!orders.length" class="flex flex-col space-y-2 w-355 h-305 mx-auto mt-4">

                <div>
                    <img class="" loading="lazy" src="https://www.mioto.vn/static/media/empty-trip.8f191e42.svg" alt="">
                </div>

                <div class="font-semibold text-2xl text-gray-600 text-center">
                    Bạn chưa có chuyến
                </div>
            </div>



            <div class="flex-col space-y-5 pt-4">

                <div v-for="order in orders" :key="order">
                    <CardCarOrder :order="order" :orderHistory="true" class="shadow-xl rounded-lg"
                        @handleInfoDetailBtn="showOrderDetailDialog" />
                </div>

            </div>

            <div class="opacity-80 bg-gray-800 fixed z-40 inset-0" v-if="showOrderDetailModal">
                <!-- OVERLAY SCREEN WHEN POP UP DIALOG MODAL -->
                <OrderDetailModal :order="orderSelected" :orderHistory="true" v-if="orderSelected"
                    class=" absolute m-auto inset-0 p-20" v-model="showOrderDetailModal" @logout="hiddenOrderDetailDialog"
                    @handleSelectDiscount="handleSelectDiscount">
                </OrderDetailModal>

            </div>

        </div>
    </div>
</template>

<script setup>
import CardCarOrder from './CardCarOrder.vue';
import { ref, onMounted, onUpdated } from 'vue';
import OrderDetailModal from './OrderDetailModal.vue';
import { useStore } from 'vuex';
import { RepositoryFactory } from "../../../apis/repositoryFactory";

const ordersRepo = RepositoryFactory.get("orders");
const store = useStore()

//define 
const orders = ref([])
var limit = 6
var page = 1
const user_id = store.state.authStore.user._id
const orderSelected = ref({})


const filter = ref({ user_id, historyOrders: true })


// logical

async function loadOrders() {

    const result = await ordersRepo.getOrders(limit, page, filter.value)

    orders.value = result.data.metadata
}




async function loadMoreOrders() {
    page = page + 1
    const result = await ordersRepo.getOrders(limit, page, filter.value)
    const moreOrders = result.data.metadata
    orders.value = orders.value.concat(moreOrders)
}

const handleUserScrollBottom = async (e) => {

    const clientHeight = e.target.documentElement.clientHeight
    const scrollHeight = e.target.documentElement.scrollHeight
    const scrollTop = e.target.documentElement.scrollTop

    if (scrollTop + clientHeight >= scrollHeight) {
        console.log('bottom!')
        await loadMoreOrders(page, limit, filter.value)
    }
}


// handle show OrderDetail Modal
const showOrderDetailModal = ref(false)
function showOrderDetailDialog(order) {
    orderSelected.value = order
    showOrderDetailModal.value = true
}

function hiddenOrderDetailDialog() {
    showOrderDetailModal.value = false
}


onMounted(async () => {
    window.addEventListener("scroll", handleUserScrollBottom)
    await loadOrders()
    console.log('mounted', filter.value)
    console.log(orders.value)
})

onUpdated(() => {
    console.log('updated', filter.value)
    console.log('orders', orders.value)
})



</script>

<style lang="scss" scoped></style>