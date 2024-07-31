import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/Default.vue'
import UnAuthorize from '../views/401.vue'
import NotFound from '../views/404.vue'



const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_MY_BASE),
	routes: [
		{
			path: '/',
			name: '',
			component: Layout,
			
			children: [
				{
					path: '',
					name: 'Home',
					component: () => import('../views/Home.vue'),
					meta: {
						auth : true
					}
				}
			]
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('../views/Login.vue'),
		},
		{
			path: '/401',
			name: '401',
			component: UnAuthorize,
		},
		{
			//MANEJA TODAS LAS PAGINAS QUE NO EXISTEN Y LA REDIRIJE AL 404 NOT FOUND
			path: '/:catchAll(.*)',
			component: NotFound,
		}
	]
})

// router.beforeEach((to, from) => {
	
// 	if (to.meta.auth) {

// 		const hasPermission = localStorage.getItem(btoa('permissions')) ? JSON.parse(atob(localStorage.getItem(btoa('permissions')))).includes(to.name) : false

// 		if (!hasPermission) {

// 			return { name : '401'};
// 		}
// 	}
// 	return true
  
// })

export default router
