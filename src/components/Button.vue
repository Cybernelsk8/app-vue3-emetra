<script setup>
    const props = defineProps({
        text : '',
        icon : '',
        loading : {
            default : false
        },
        option : ''
    })

</script>

<template>
    <button class="btn relative" :class="{'px-4 py-2' : $props.text }"  :disabled="props.loading">
        <div :class="{'flex items-center gap-2' : $props.text }"  >
            <Icon v-if="props.icon && !props.loading" :icon="icon" class="text-base"/>
            <small v-if="$props.text">
                {{ props.text }}
            </small>
            <Icon v-if="props.loading" icon="fas fa-spinner" spin-pulse class="text-base text-gray-200"/>
        </div>
    </button>
</template>