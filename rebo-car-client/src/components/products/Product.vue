<template>
  
    <div class="">
        <search-bar class="w-1/3 " v-model="value" @input="handleDataInputCompoAndFilterProductListBySearchInput($event)" />
       

        <ul  class="absolute mt-5 overflow-y-auto h-80 w-1/3 flex flex-col space-y-4">

            <li v-for="(item, index) in products " v-bind:key="index">
                <router-link :to="{ name: 'productDetail', params: { id: item.id } }">
                    <div class="flex">
                        <div class="bg-gray-300 hover:bg-gray-500 w-5/6">
                            {{ index }} - {{ item.title }}
                        </div>
                        <button class="absolute inline right-0 bg-red-400 hover:bg-red-500
                        text-white font-bold py-1.5 px-3 rounded-full"
                            @click="handleDeleteProductButton(item.id)">Delete
                        </button>
                    </div>
                </router-link>

            </li>


        </ul>

    </div>
    <!-- <button class="absolute top-8 left-1/2" @click="updateProductList">Update Products List</button> -->
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { ref } from 'vue'
import SearchBar from '../SearchBar.vue';
import { useRouter, useRoute } from 'vue-router'

export default {
    components: { SearchBar },

    computed: {
        ...mapGetters([
            'getProductList',
            'getProductsLoading'
        ]),
    },
    methods: {
        ...mapActions(['updateProductList', 'deleteProduct']),
        ...mapMutations(['setProductList']),
        handleDeleteProductButton(id) {
            this.products = this.products.filter(products => products.id != id)
            this.setProductList(this.products)
        },
        handleDataInputCompoAndFilterProductListBySearchInput(data) {
            console.log('data input: ', data)
            console.log(typeof data)
            if (typeof data === 'string') {
                console.log('inside if', typeof data === 'string')
                if (!data) {
                    console.log('inside if 2')
                    this.products = this.getProductList
                } else {
                    console.log('inside else 2')
                    this.products = this.getProductList.filter(products => products.title.toUpperCase().includes(data.toUpperCase()))
                }
                this.$forceUpdate()
            }


        }
    },
    setup(){
        const router = useRouter()

        console.log(router)
    },
    created() {
        this.updateProductList().then(() => {
            this.products = JSON.parse(JSON.stringify(this.getProductList));
        })
    },
    watch: {
    },
    updated() {
        console.log('component re-render')
    },
    data() {
        return {
            products: ref([]),
            searchInput: '',
            value: ref('')
        }
    },

}
</script>

<style lang="scss" scoped></style>