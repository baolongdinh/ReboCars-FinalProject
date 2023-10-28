<template>
    <VueFinalModal class="justify-center items-center absolute"
        content-class="flex flex-col bg-gray-100 text-black rounded-md space-y-2 p-4 ">


        <div v-if="errorMessage" class="bg-red-400 text-white font-semibold text-lg p-2 rounded-lg">
            {{ errorMessage }}
        </div>

        <SuccessPaymentModal @logout="this.$emit('logout')" v-if="showSuccessPaymentGateway" class="w-full h-full">

        </SuccessPaymentModal>


        <div v-else>
            <div class="text-2xl font-sans font-bold text-center ">
                Thanh toán đơn hàng
            </div>
            <button @click="this.$emit('logout')">
                <span
                    class="absolute right-5 top-5 p-1 font-light border border-gray-900 hover:bg-gray-500  rounded-full leading-5">

                    <div class=" decoration-0 text-base px-1 mb-1 mx-1">
                        x
                    </div>
                </span>
            </button>

            <span class=" text-base text-gray-700">
                Tổng số tiền cần thanh toán:
                <span class="pl-4 font-bold text-xl ">
                    {{ unitTotalPrice }} 000đ
                </span>
                <span>
                    ~
                </span>

                <span class="font-bold text-xl">
                    {{ usdPrice }}$
                </span>

            </span>

            <div v-if="braintreeLoading">

                <svg aria-hidden="true"
                    class="w-16 h-16 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-green-400 mt-4"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>


            </div>

            <div ref="dropin-container" id="dropin-container">

            </div>



            <button id="submit-button" v-if="buttonVisible" @click="handlePurchaseClick"
                class="button button--small button--green w-full"> Thanh toán
                <span>

                </span>
            </button>
        </div>


    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import braintree from 'braintree-web-drop-in'
import { ref, onMounted, inject } from 'vue';
import SuccessPaymentModal from './SuccessPaymentModal.vue';
import { RepositoryFactory } from "../../../apis/repositoryFactory";
import { useStore } from 'vuex';

// define 
const paymentRepo = RepositoryFactory.get("payment");
const ordersRepo = RepositoryFactory.get("orders");

const store = useStore()

// inject data
const car = inject('car')
const startDate = inject('startDate')
const endDate = inject('endDate')
const startTime = inject('startTime')
const endTime = inject('endTime')
const startDateTimeObj = inject('startDateTimeObj')
const endDateTimeObj = inject('endDateTimeObj')


const discountPrice = inject('discountPrice')
const brokerageCost = inject('brokerageCost')
const unitPrice = inject('unitPrice')
const promotionDiscount = inject('promotionDiscount')
const deliveryPrice = inject('deliveryPrice')
const deliveryAddress = inject('deliveryAddress')
const unitTotalPrice = inject('unitTotalPrice')

const rate_vnd_usd_exchange = 0.000041
const usdPrice = ref()

const errorMessage = ref("")

// get store data 
const user_id = store.state.authStore.user._id


// calculate price 
calculateUSDPrice()

function calculateUSDPrice() {
    usdPrice.value = unitTotalPrice.value * 1000 * rate_vnd_usd_exchange
    usdPrice.value = usdPrice.value.toFixed(2)
}

// braintree define for payment
const braintreeInstance = ref()
const buttonVisible = ref(false)
const showSuccessPaymentGateway = ref(false)
const braintreeLoading = ref(true)

function handlePurchaseClick() {
    braintreeInstance.value.requestPaymentMethod((requestErr, payload) => {
        if (requestErr) {
            errorMessage.value = requestErr.message
        }

        paymentRepo.paymentProcess(usdPrice.value.toString(), payload.nonce).then((result) => {

            console.log({ result })

            const transaction_id = result.data.metadata

            const prices_table = {
                price: car.value.price,
                discountPrice: discountPrice.value,
                brokerageCost: brokerageCost.value,
                unitPrice: unitPrice.value,
                promotionDiscount: promotionDiscount.value,
                deliveryPrice: deliveryPrice.value,
                unitTotalPrice: unitTotalPrice.value
            }

            console.log({ transaction_id, prices_table })

            const delivery_receipt_address = deliveryAddress.value || car.value.location

            ordersRepo.createOrder({
                transaction_id,
                start_date_time: startDateTimeObj.value,
                end_date_time: endDateTimeObj.value,
                delivery_receipt_address,
                prices_table,
                user_id,
                car_id: car.value._id
            }).then(() => {
                braintreeLoading.value = false
                showSuccessPaymentGateway.value = true
            }).catch((err) => {
                errorMessage.value = err.message
            })




        }).catch((err) => {
            errorMessage.value = err.message
        })
        braintreeInstance.value.teardown(function (teardownErr) {
            if (teardownErr) {
                console.error('Could not tear down Drop-in UI!');
            } else {
                console.info('Drop-in UI has been torn down!');

                // Remove the 'Submit payment' button
                buttonVisible.value = false
                braintreeLoading.value = true
            }
        });

    })
}

async function initBraintree() {
    braintree.create({
        authorization: 'sandbox_pgjswdz9_tzvvbgws3vrfxhmv',
        container: '#dropin-container'
    }, function (createErr, instance) {
        braintreeInstance.value = instance
        buttonVisible.value = true
        braintreeLoading.value = false
    });
}


onMounted(async () => {
    initBraintree()
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