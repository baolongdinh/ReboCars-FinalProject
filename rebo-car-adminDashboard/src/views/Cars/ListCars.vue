<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <div class="flex">
                <div>
                    <h3 class="mb-0 font-semibold text-xl">List Cars</h3>
                </div>

                <div>
                    <b-input-group
                        class="input-group-alternative input-group-merge shadow-2xl                                                                                                                                              ">
                        <b-form-input placeholder="Search" type="text" v-model="matchString"> </b-form-input>

                        <div @click="loadCars()" class="input-group-append">
                            <span class="input-group-text"><i class="fas fa-search"></i></span>
                        </div>
                    </b-input-group>
                </div>

            </div>

        </b-card-header>

        <el-table class="table-responsive table" header-row-class-name="thead-light" :data="cars">
            <el-table-column label="Image" min-width="280px">
                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">
                        <a class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="getImage(row.images[0])">
                        </a>
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.name.toUpperCase() }}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>
            <el-table-column label="Identify Number" min-width="180px">

                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">

                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.identifyNumber }}</span>
                        </b-media-body>
                    </b-media>
                </template>

            </el-table-column>

            <el-table-column label="Car Owner" min-width="210px">
                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">
                        <a class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="getImage(row.car_owner[0].avatar)">
                        </a>
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.car_owner[0].name }}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>

            <el-table-column label="Status" min-width="130px">
                <template v-slot="{ row }">
                    <b-media-body>
                        <span v-if="row.status" class="text-green font-medium"> activated </span>
                        <span v-else class="text-red font-medium"> non-activated </span>
                    </b-media-body>
                </template>
            </el-table-column>



            <el-table-column label="Action" min-width="150px">
                <template v-slot="{ row }">

                    <button class="px-4 py-1" @click="activeOrBlockUser(row)" v-if="row.status">
                        Block
                    </button>


                    <button class="px-4 py-1" @click="activeOrBlockUser(row)" v-else>
                        Active
                    </button>

                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <paginate :page-count="pageCount" :page-range="2" :margin-pages="2" :click-handler="clickPageChange"
                :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
            </paginate>
        </b-card-footer>
    </b-card>
</template>
<script>

import projects from '../Tables/projects'
import { Table, TableColumn } from 'element-ui'
import { RepositoryFactory } from "../../apis/repositoryFactory";
const carsRepo = RepositoryFactory.get("cars");
export default {
    name: 'light-table',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    data() {
        return {
            projects,
            cars: {},
            currentPage: 1,
            limit: 6,
            matchString: "",
            timeout: null,
            pageCount: 1
        };
    },
    methods: {
        loadCars() {
            console.log(this.currentPage, this.matchString)
            carsRepo.getCarsWithSearchString({ page: this.currentPage, limit: this.limit, matchString: this.matchString }).then((response) => {
                this.cars = response.data.metadata.cars
                console.log(this.cars)
                // Number of users per page
                const totalCars = response.data.metadata.totalCars
                this.pageCount = Math.ceil(totalCars / this.limit);
            })
        },
        getImage(url) {
            return this.$baseUrl + url
        },

        clickPageChange(pageNum) {
            this.currentPage = pageNum
            this.loadCars()
        },
        activeOrBlockUser(car) {
            carsRepo.activeOrBlockCarById(car._id).then((result) => {
                this.$notify({
                    title: 'Notification',
                    text: 'Update car status success.',
                    type: 'success'
                });
                console.log({ result })
                this.loadCars()
            }).catch((err) => {
                this.$notify({
                    title: 'Notification',
                    text: err.response.data.message,
                    type: 'error'
                });
            })
        },
    },
    computed: {
    },
    watch: {
        matchString(value) {
            this.currentPage = 1
            this.loadCars()
        },
        currentPage(value) {

        }
    },
    mounted() {
        this.loadCars()

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