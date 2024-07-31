<script setup>
    const props = defineProps({
        open:{
            type: Boolean,
            default : false
        },
        title : {
            type : String,
            default : ''
        },
        icon : ''
    })
    defineOptions({
        inheritAttrs: false
    })
</script>

<template>
    <Transition>
        <div v-show="props.open" class ='inset-0 fixed h-screen bg-gray-900 bg-opacity-30 z-30 overflow-y-auto'>
            <div  class="relative flex justify-center mt-6">
                <Card class="max-w-5xl flex flex-col">
                    <header v-if="$slots.head">
                        <slot name="head"></slot>
                    </header>
                    <div v-bind="$attrs" class="flex-1">
                        <slot></slot>
                    </div>
                    <footer v-if="$slots.foot">
                        <slot name="foot"></slot>
                    </footer>
                </Card>
            </div>
        </div>
    </Transition>
</template>

<style>
    .v-enter-active, .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from, .v-leave-to {
        opacity: 0;
    }
</style>