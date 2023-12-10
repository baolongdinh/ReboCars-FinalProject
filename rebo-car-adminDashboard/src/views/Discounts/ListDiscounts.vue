<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <div class="flex">
                <div>
                    <h3 class="mb-0 font-semibold text-xl">List Discounts</h3>
                </div>

                <div class="py-2">
                    <b-input-group
                        class="input-group-alternative input-group-merge shadow-2xl                                                                                                                                              ">
                        <b-form-input placeholder="Search" type="text" v-model="matchString"> </b-form-input>

                        <div @click="loadUsers()" class="input-group-append">
                            <span class="input-group-text"><i class="fas fa-search"></i></span>
                        </div>
                    </b-input-group>
                </div>

                <div class="py-2">
                    <b-button @click="handleBtnShowAddDiscountModal()" variant="primary">Add new discount</b-button>
                </div>

            </div>

        </b-card-header>

        <el-table class="table-responsive table" header-row-class-name="thead-light" :data="discounts">
            <el-table-column label="Discount Code" min-width="210px">
                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">
                        <a class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="getImage(row.discount_image)">
                        </a>
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.discount_code }}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>
            <el-table-column label="Discount Name" min-width="270px">

                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">

                        <b-media-body>
                            <span class="font-weight-600 mb-0 text-sm text-center">{{ row.discount_name }}</span>
                        </b-media-body>
                    </b-media>
                </template>

            </el-table-column>

            <el-table-column label="Discount Value" min-width="140px">
                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.discount_value }} %</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>

            <el-table-column label="Status" min-width="150px">
                <template v-slot="{ row }">
                    <b-media-body>
                        <span v-if="row.discount_active" class="text-green font-medium"> activated </span>
                        <span v-else class="text-red font-medium"> non-activated </span>
                    </b-media-body>
                </template>
            </el-table-column>



            <el-table-column label="Action" min-width="120px">
                <template v-slot="{ row }">

                    <button class="px-4 py-1 w-24" @click="activeOrBlockDiscount(row)" v-if="row.discount_active">
                        Block
                    </button>


                    <button class="px-4 py-1 w-24" @click="activeOrBlockDiscount(row)" v-else>
                        Active
                    </button>


                    <button class="px-4 py-1 mt-2 w-24" @click="handleBtnModal(row)">
                        Detail
                    </button>

                    <button class="px-4 py-1 mt-2 w-24" @click="handleBtnDeleteDiscount(row._id)">
                        Delete
                    </button>


                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <paginate :page-count="pageCount" :page-range="3" :margin-pages="2" :click-handler="clickPageChange"
                :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
            </paginate>
        </b-card-footer>

        <discount-detail-modal ref="discountDetailModal" @reloadDiscounts="loadDiscounts"> </discount-detail-modal>

        <add-discount-modal ref="addDiscountModal" @reloadDiscounts="loadDiscounts"> </add-discount-modal>
    </b-card>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import { RepositoryFactory } from "../../apis/repositoryFactory";
import DiscountDetailModal from './DiscountDetailModal.vue';
import AddDiscountModal from './AddDiscountModal.vue';
const discountsRepo = RepositoryFactory.get("discounts");
export default {
    name: 'light-table',
    components: {
        DiscountDetailModal,
        AddDiscountModal,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    data() {
        return {
            discounts: {},
            discount: {},
            currentPage: 1,
            limit: 6,
            matchString: "",
            timeout: null,
            pageCount: 1
        };
    },
    methods: {
        loadDiscounts() {
            console.log(this.currentPage, this.matchString)
            discountsRepo.getDiscountsWithSearchString({ page: this.currentPage, limit: this.limit, matchString: this.matchString }).then((response) => {
                this.discounts = response.data.metadata.discounts
                console.log(this.discounts)
                // Number of users per page
                const totalDiscounts = response.data.metadata.totalDiscounts
                this.pageCount = Math.ceil(totalDiscounts / this.limit);
            })
        },
        getImage(url) {
            return this.$baseUrl + url
        },

        clickPageChange(pageNum) {
            this.currentPage = pageNum
            this.loadDiscounts()
        },
        handleBtnModal(discount) {
            this.$refs.discountDetailModal.showDiscountDetailModal = true
            this.$refs.discountDetailModal.discount = discount
        },
        handleBtnShowAddDiscountModal() {
            console.log('123123')
            this.$refs.addDiscountModal.showAddDiscountModal = true
        },
        activeOrBlockDiscount(discount) {
            discountsRepo.activeOrBlockDiscountById(discount._id).then((result) => {
                this.$notify({
                    title: 'Notification',
                    text: 'Update car status success.',
                    type: 'success'
                });
                console.log({ result })
                this.loadDiscounts()
            }).catch((err) => {
                this.$notify({
                    title: 'Notification',
                    text: err.response.data.message,
                    type: 'error'
                });
            })
        },
        handleBtnDeleteDiscount(id) {

            this.$dialog
                .confirm("Confirm to delete this discount", {
                    loader: true // default: false - when set to true, the proceed button shows a loader when clicked.
                    // And a dialog object will be passed to the then() callback
                })
                .then(dialog => {
                    // Triggered when proceed button is clicked
                    // dialog.close() // stops the loader and close the dialog

                    discountsRepo.deleteDiscountById(id).then((result) => {
                        this.$notify({
                            title: 'Notification',
                            text: 'Delete discount success.',
                            type: 'success'
                        });
                        this.loadDiscounts()
                        dialog.close()

                    }).catch(err => {
                        this.$notify({
                            title: 'Notification',
                            text: err.response.data.message,
                            type: 'error'
                        });
                    })


                })
                .catch(() => {
                    // Triggered when cancel button is clicked

                    console.log('Delete aborted');
                });


        }

    },
    computed: {
    },
    watch: {
        matchString(value) {
            this.currentPage = 1
            this.loadDiscounts()
        },
        currentPage(value) {

        }
    },
    mounted() {
        this.loadDiscounts()
    },
}

</script>
<style lang="css">
.pagination {
    display: flex;
    justify-content: center;
    margin-left: 4px;
}

.page-item {
    display: inline-block;
    margin: 0 5px;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    color: #000;
}

.page-item.active {
    background-color: #67ccf7;
    color: #ffffff;
    border-color: #67ccf7;
}

.page-item:hover {
    background-color: #67ccf7;
    color: #fff;
    border-color: #67ccf7;
}

.page-item:disabled {
    color: #ccc;
    cursor: not-allowed;
}
</style>