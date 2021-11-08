import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line no-unused-vars
import login from "@/components/Login/login";
// eslint-disable-next-line no-unused-vars
import register from "@/components/Login/register"
// eslint-disable-next-line no-unused-vars
import task from "@/components/task/task"
// eslint-disable-next-line no-unused-vars
import taskhome from "./components/task/home"
// eslint-disable-next-line no-unused-vars
import calender from "./components/task/calender"
// eslint-disable-next-line no-unused-vars
import admin from "@/components/admin/admin";

import Home from "./components/home/home.vue"
import SchoolSearch from "./components/school/schoolsearch.vue"
import SchoolInformation from "./components/school/schoolinformation.vue"
import Subject from "./components/school/subject.vue"
import TestSearch from "./components/test/testsearch.vue"
import TestInformation from "./components/test/testinformation.vue"
import NoticeInformation from "./components/test/noticeinformation.vue"
import NoticeSearch from "./components/test/noticesearch.vue"

Vue.use(Router)

export default new Router({
    mode:'history',
    base:process.env.baseUrl,
    routes:[
        {
            path:'/login',
            name:'login',
            component:()=>import('./components/Login/login')
        },
        {
            path:'/register',
            name:'register',
            component:()=>import('./components/Login/register')
        },

        {
            path:'/task',
            name:'task',
            component:()=>import('./components/task/task'),
            children:[
                {
                    path:'/task/home',
                    name:'taskhome',
                    component:()=>import('./components/task/home')
                },
                {
                    path:'/task/calender',
                    name:'calender',
                    component:()=>import('./components/task/calender')
                }
            ]
        },
        {
            path:'/admin',
            name:'admin',
            component:()=>import('./components/admin/admin'),

        },
		
		{
		  path: '/home',
		  component: Home
		},
		{
		  path: '/schoolsearch',
		  component: SchoolSearch
		},
		{
		  path:'/schoolinformation',
		  component: SchoolInformation
		},
		{
		  path:'/subject',
		  component: Subject
		},
		{
		  path:'/testsearch',
		  component: TestSearch
		},
		{
		  path:"/testinformation",
		  component: TestInformation
		},
		{
		  path:"/noticeinformation",
		  component: NoticeInformation
		},
		{
		  path:"/noticesearch",
		  component: NoticeSearch
		},
		{
			path: '*',
			redirect: "/home"
		}
    ]
})