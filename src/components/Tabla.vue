<script setup>
    const props = defineProps({
        color : {
            type : String,
            default : 'bg-gray-200',
        }
    })
</script>

<template>
    <div class="flex flex-col">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-5 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border-2 border-gray-200 shadow-lg  md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 px-5">
                        <thead :class="props.color">
                            <slot name="thead"></slot>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <slot name="tbody"></slot>
                        </tbody>
                        <tfoot :class="props.color">
                            <slot name="tfoot"></slot>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    td{
        @apply py-3 px-3;
    }

    th{
        @apply font-bold uppercase py-2 px-3;
    }

</style>