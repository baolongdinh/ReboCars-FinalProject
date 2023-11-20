<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <div class="flex">
                <div>
                    <h3 class="mb-0 font-semibold text-xl">List Users</h3>
                </div>

                <div>
                    <b-input-group
                        class="input-group-alternative input-group-merge shadow-2xl                                                                                                                                              ">
                        <b-form-input placeholder="Search" type="text" v-model="matchString"> </b-form-input>

                        <div @click="loadUsers()" class="input-group-append">
                            <span class="input-group-text"><i class="fas fa-search"></i></span>
                        </div>
                    </b-input-group>
                </div>

            </div>

        </b-card-header>

        <el-table class="table-responsive table" header-row-class-name="thead-light" :data="users">
            <el-table-column label="Avatar" min-width="210px">
                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">
                        <a class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="getImage(row.avatar)">
                        </a>
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.name }}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>
            <el-table-column label="Email" min-width="210px">

                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">

                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.email }}</span>
                        </b-media-body>
                    </b-media>
                </template>

            </el-table-column>

            <el-table-column label="Phone" min-width="170px">
                <template v-slot="{ row }">
                    <b-media no-body class="align-items-center">
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.phone }}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>

            <el-table-column label="Status" min-width="170px">
                <template v-slot="{ row }">
                    <b-media-body>
                        <span v-if="row.active" class="text-green font-medium"> activated </span>
                        <span v-else class="text-red font-medium"> non-activated </span>
                    </b-media-body>
                </template>
            </el-table-column>



            <el-table-column label="Action" min-width="150px">
                <template v-slot="{ row }">

                    <button class="px-4 py-1" v-if="row.active">
                        Block
                    </button>


                    <button class="px-4 py-1" v-else>
                        Active
                    </button>


                    <button class="px-4 py-1 mt-2">
                        Detail
                    </button>

                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <paginate :page-count="pageCount" :page-range="3" :margin-pages="5" :click-handler="clickPageChange"
                :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
            </paginate>
        </b-card-footer>
    </b-card>
</template>
<script>

import projects from '../Tables/projects'
import { Table, TableColumn } from 'element-ui'
import { RepositoryFactory } from "../../apis/repositoryFactory";
import { chownSync } from 'fs';
const usersRepo = RepositoryFactory.get("users");
export default {
    name: 'light-table',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    data() {
        return {
            projects,
            users: {},
            currentPage: 1,
            limit: 6,
            matchString: "",
            timeout: null,
            pageCount: 1
        };
    },
    methods: {
        loadUsers() {
            console.log(this.currentPage, this.matchString)
            usersRepo.getUsersWithSearchString({ page: this.currentPage, limit: this.limit, matchString: this.matchString }).then((response) => {
                this.users = response.data.metadata.users
                // Number of users per page
                const totalUsers = response.data.metadata.totalUsers
                this.pageCount = Math.ceil(totalUsers / this.limit);
            })
        },
        getImage(url) {
            return this.$baseUrl + url
        },

        clickPageChange(pageNum) {
            this.currentPage = pageNum
            this.loadUsers()
        }
    },
    computed: {
    },
    watch: {
        matchString(value) {
            this.currentPage = 1
            this.loadUsers()
        },
        currentPage(value) {

        }
    },
    mounted() {
        this.loadUsers()
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