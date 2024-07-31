<script setup>

    defineOptions({
        inheritAttrs: false
    })
</script>

<template>
    <div class="mb-5 flex items-center justify-center">
        <div v-bind="$attrs" class="bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light flex flex-col">
            <div v-if="$slots.head">
                <slot name="head"></slot>
            </div>
            <div class="flex-1">
                <slot></slot>
            </div>
            <div v-if="$slots.foot">
                <slot name="foot"></slot>
            </div>
        </div>
    </div>
</template>

