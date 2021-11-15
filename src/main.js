import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import router from './router'
import Vuex from "vuex";
import './assets/font/iconfont.css'
Vue.config.productionTip = false
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as dateUtils from "./util/myDate.js"

Vue.prototype.$axioss = axios;
Vue.prototype.HOST = "/api";
//Vue.prototype.HOST="http://114.116.40.188:8082"
Vue.use(Vuex);

Vue.use(VueAxios, axios)
var compareTime = function(x, y) { //比较时间
	var time1 = parseInt(x.begin.toString());
	var time2 = parseInt(y.begin.toString());
	if (time1 < time2) {
		return -1;
	} else if (time1 > time2) {
		return 1;
	} else {
		return 0;
	}
}
const store = new Vuex.Store({
	state: {
		username: "",
		planChange: 0,
		title: ""
	},
	mutations: {
		planchange(state, change) {
			state.planChange += change;
		},
		addUserName(state, username) {
			state.username = username
		},
		editTitle(state, title) {
			state.title = title;
		}
	},
	actions: {

	}

});

router.beforeEach((to, from, next) => {
	if (to.path == "/task/home" || to.path == "/admin" || to.path == "/task/calender") {
		if (store.state.username == "") {
			alert("您还未登录");
			router.push('/login');
		} else
			next();
	} else {
		next();
	}
});

/**
 * 计算两个日期之间的天数
 * @param dateString1  开始日期 yyyy-MM-dd
 * @param dateString2  结束日期 yyyy-MM-dd
 * @returns {number} 如果日期相同 返回一天 开始日期大于结束日期，返回0
 */
function  getDaysBetween(dateString1,dateString2){
    var  startDate = Date.parse(dateString1);
    var  endDate = Date.parse(dateString2);
    if (startDate>endDate){
        return 0;
    }
    if (startDate==endDate){
        return 1;
    }
    var days=(endDate - startDate)/(1*24*60*60*1000);
    return  days;
}
var d=new Date();
var d2=dateUtils.formatDate(d, 'yyyy-MM-dd');
var days=getDaysBetween(d2,"2021-12-25");
Vue.prototype.days = days;

new Vue({
	router,
	store: store,
	render: h => h(App),
}).$mount('#app')
