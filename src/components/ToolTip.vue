<script setup>
    const props = defineProps(['message'])
    defineOptions({
        inheritAttrs: false
    })
</script>

<template>
    <div class="flex has-nuve cursor-pointer justify-center">
        <span v-bind="$attrs" class ='nuve text-center mx-auto p-2 text-sm'>
            <slot name="message">
                {{ props.message }}
            </slot>
        </span>
        <slot></slot>
    </div>

</template>

<style scoped>
    .nuve {
        @apply invisible absolute;
    }

    .has-nuve:hover .nuve {
        @apply visible z-30;
    }
</style>