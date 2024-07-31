<script setup>

    import { ref, computed,onMounted} from 'vue'
    import LoadingBar from './LoadingBar.vue'

    // -------------PROPERTIES--------------

    
    const search = ref('')
    const startIndex = ref(1)
    const endIndex = ref(1)
    const currentPage = ref(1)
    const rowsPerPage = ref(10)
    const searchables = []
    const sortColumn = ref(null)
    const sortDir = ref('asc')
    const sortType = ref(false)


    const props = defineProps({
        headers:null, 
        data:null,
        color:{
            default:'bg-[#DBEAFE] text-blue-muni'
        },
        loading : {
            type : Boolean,
            default : false
        }
    })


    
    
    
    // -------------COMPUTATED--------------
    
    props.headers.map(el => {
        searchables.push(el.key.toLowerCase().trim())
    })
    
    const data = computed(() => props.data )

    const filteredData = computed(() => {
        currentPage.value = 1
        const searchTerms = search.value.toLowerCase().trim().split(';').map(term => term.trim())
        return sortedItems.value.filter((item) => {
            return searchTerms.every((searchTerm) => {
                return searchables.some((column) => {
                    const value = getObjectValue(item, column)
                    return String(value).toLowerCase().includes(searchTerm)
                })
            })
        })
    },{ cache : true })

    function getObjectValue(object, key) {
        const keys = key.split('.')
        return keys.reduce((value, currentKey) => {
            return value && value[currentKey]
        }, object)
    }

    const paginatedData = computed(() => {
        startIndex.value = (currentPage.value - 1) * rowsPerPage.value
        endIndex.value = parseInt(startIndex.value) + parseInt(rowsPerPage.value)
        return filteredData.value.slice(startIndex.value, endIndex.value)
    })

    const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage.value))

    const setCurrentPage = (page) => {
        currentPage.value = page
    }

    const sortedItems = computed(() => {
        if (sortColumn.value) {
            return data.value.sort((a, b) => {
                
                if(!sortType.value) {
                    const valA = String(getObjectValue(a, sortColumn.value))
                    const valB = String(getObjectValue(b, sortColumn.value))
                    return sortDir.value === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
                }

                const valA = Number(getObjectValue(a, sortColumn.value))
                const valB = Number(getObjectValue(b, sortColumn.value))
                return sortDir.value === 'asc' ? valA - valB : valB - valA
            });
        }
        return data.value
    })

    const displayedPages = computed(() => {

        const totalDisplayedPages = 6
        const halfDisplayedPages = Math.floor(totalDisplayedPages / 2)
        let startPage = Math.max(currentPage.value - halfDisplayedPages, 1)
        let endPage = Math.min(startPage + totalDisplayedPages - 1, totalPages.value)

        if (endPage - startPage + 1 < totalDisplayedPages) {
            startPage = Math.max(endPage - totalDisplayedPages + 1, 1)
        }

        return Array(endPage - startPage + 1).fill().map((_, index) => startPage + index)
    })


    // -------------METHODS--------------

    const sort = (column, type) => {

        sortType.value = type
        
        if (sortColumn.value === column) {
            sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn.value = column;
            sortDir.value = 'asc';
        }
        
    }

    const resetPage = () => {
        currentPage.value = 1
    }

    const formatAsNumber = (value,symbol = false) => {
        
        let format
        
        if(symbol){
            format = new Intl.NumberFormat("es-GT", {
                'style': "currency",
                'currency': "GTQ",
                'minimumFractionDigits': 2,
            }).format(value)
        }else{
            format = new Intl.NumberFormat("es-GT", { 
                'minimumFractionDigits': 2,
            }).format(value)
        }
        return format
    }

    onMounted( () => {

        setTimeout( () => {
            if(data.value.length === 0 && props.loading === true ){
                props.loading = false
            }
        },2000)
    })

</script>

<template>
    <section class="mx-auto mb-8 px-5">
        
        <div class="mt-6 md:flex md:items-center md:justify-between">
            <div  class="text-gray-400 bg-white flex items-center border-2 px-2 py-1.5 rounded-lg shadow-lg">
                <span>Mostrar</span>
                <select v-model="rowsPerPage" @change="resetPage" class="text-center bg-white font-bold w-full focus:outline-none ring-0">
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </select>
                <span>registros</span>
            </div>
            <div class="relative flex items-center mt-4 md:mt-0">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>

                <input v-model="search" type="search" placeholder="Buscar" class="block w-full py-1.5 pr-5 text-gray-700 bg-white border-2 shadow-lg border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
            </div>
        </div>

        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-5 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border-2 border-gray-200 shadow-lg  md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 ">
                            <thead>
                                <tr :class="color">
                                    <th v-for="(head, index) in props.headers" :key="index" @click="sort(head.key, head.type)" scope="col"
                                        class="px-4 py-3.5 text-sm font-normal rtl:text-right  cursor-pointer select-none"
                                        :width="head.width" :align="head.align ?? 'left' ">
                                        <span v-if="sortColumn === head.key">{{ sortDir === 'asc' ? '▲' : '▼' }}</span>
                                        {{ head.title }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <slot name="tbody" :items="paginatedData">
                                    <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-100 text-gray-800" >
                                        <td v-for="(head, index) in props.headers" class="px-4" :align="head.align"
                                            :width="head.width" :key="index">
                                            <slot :name="head.key" :item="item">
                                                <p :class="head.class ?? 'text-sm'">{{ (head.NumberFormat) ? formatAsNumber(getObjectValue(item,head.key),head.symbol) : getObjectValue(item,head.key) }}</p>
                                            </slot>
                                        </td>
                                    </tr>
                                </slot>
                                <tr v-if="props.loading">
                                    <td align="center" :colspan="props.headers.length">
                                        <LoadingBar :color="color" class="px-10" />
                                        <span class="animate-ping">Cargando data ....</span> 
                                    </td>
                                </tr>
                                <tr v-if="data.length === 0 && props.loading === false">
                                    <td align="center" :colspan="props.headers.length">
                                        No hay data ....
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-between mt-5">
            <!-- RESPONSIVE MOBILE BUTTONS -->
            <div class="flex flex-1 justify-between md:hidden">
                <a @click="(currentPage == 1) ? currentPage = 1 : currentPage--" 
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                    Anterior
                </a>
                <a @click="(currentPage == totalPages) ? currentPage = totalPages : currentPage++" 
                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                    Siguiente
                </a>
            </div>

            <div class="hidden md:flex md:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p class="text-xs text-gray-500">
                        Mostrando
                        <span class="font-medium">{{ startIndex + 1 }}</span>
                        a
                        <span class="font-medium">{{ (endIndex >= filteredData.length) ? filteredData.length : endIndex  }}</span>
                        de
                        <span class="font-medium">{{ filteredData.length }}</span>
                        resultados
                    </p>
                </div>
                <div v-show="filteredData.length >= 11 && displayedPages.length > 1">
                    <nav class="inline-flex -space-x-px rounded-md bg-white shadow-lg mr-2">
                        <a v-if="currentPage > 4" @click="setCurrentPage(1)"
                            class="cursor-pointer relative inline-flex items-center rounded-l-md px-4 py-2 font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0">
                            <icon icon="fas fa-angles-left" class="text-xs" />
                        </a>
                        <a v-if="currentPage > 1" @click="(currentPage == 1) ? currentPage = 1 : currentPage--" 
                            class="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                            :class="{'rounded-l-md' : (currentPage > 1 && currentPage <= 4) }">
                            <span class="sr-only">Previous</span>
                            <icon icon="fas fa-angle-left" class="text-xs" />
 
                        </a>
                        <a :class=" page === currentPage ? ' scale-125 z-10 ' + props.color : '' " v-for="page in displayedPages"
                            :key="page" @click="setCurrentPage(page)" 
                            class="cursor-pointer select-none relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-200 hover:text-gray-500 focus:z-20 focus:outline-offset-0">
                            {{ page }}
                        </a>
                        <a v-if="currentPage < (totalPages - 1)" @click="(currentPage == totalPages) ? currentPage = totalPages : currentPage ++" 
                            class="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                            :class="{'rounded-r-md' : (currentPage < (totalPages - 1) && currentPage > (totalPages - 3)) }">
                            <span class="sr-only">Next</span>
                            <icon icon="fas fa-angle-right" class="text-xs" />
                        </a>
                        <a v-if="currentPage < (totalPages - 2)" @click="setCurrentPage(totalPages)"
                            class="cursor-pointer relative inline-flex items-center rounded-r-md px-4 py-2 font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0">
                            <icon icon="fas fa-angles-right" class="text-xs" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

    td{
        @apply py-3 text-gray-500 ;
    }

    th{
        @apply font-bold uppercase;
    }

</style>


