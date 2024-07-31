<script setup>
    import { useGlobalStore } from '../stores/global'

    const global = useGlobalStore()
</script>
<template>
    <p class=" font-medium text-center "> Cybernelsk8© 2024 - {{ global.year.getFullYear() }}</p>
</template>
