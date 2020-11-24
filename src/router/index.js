import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

import Profile from '../views/Profile.vue';

import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';

import UsersIndex from '../views/UsersIndex.vue';
import UsersShow from '../views/UsersShow.vue';
import UsersEdit from '../views/UsersEdit.vue';

import VideoGamesIndex from '../views/VideoGamesIndex.vue';
import VideoGamesNew from '../views/VideoGamesNew.vue';
import VideoGamesShow from '../views/VideoGamesShow.vue';
import VideoGamesEdit from '../views/VideoGamesEdit.vue';

import CartridgesIndex from '../views/CartridgesIndex.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: Home },

  { path: '/profile', name: 'profile', component: Profile },
  
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login},
  { path: '/logout', name: 'logout', component: Logout },

  { path: '/users', name: 'users-index', component: UsersIndex },
  { path: '/users/:id', name: 'users-show', component: UsersShow },
  { path: '/users/:id/edit', name: 'users-edit', component: UsersEdit },

  { path: '/video_games', name: 'video-games-index', component: VideoGamesIndex },
  { path: '/video_games/new', name: 'video-games-new', component: VideoGamesNew },
  { path: '/video_games/:id', name: 'video-games-show', component: VideoGamesShow },
  { path: '/video_games/:id/edit', name: 'video-games-edit', component: VideoGamesEdit },

  { path: '/cartridges', name: 'cartridges-index', component: CartridgesIndex },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
