<script setup>

	import { RouterView } from 'vue-router'
	import { useAuthStore } from './stores/auth'
	import { onMounted } from 'vue'

	import BackTop from './components/BackTop.vue'
</script>

<template>
	<div>
		<RouterView />
		<BackTop />
	</div>
</template>

