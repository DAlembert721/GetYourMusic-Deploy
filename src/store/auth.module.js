// auth.module.js

// Vuex  Authentication Module

import UserDataService from "../services/UserDataService";
import AccountDataService from "../services/AccountDataService";


const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, user) {
            return UserDataService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                });
        },
        logout({commit}) {
            UserDataService.logout();
            commit('logout');
        },
        register({commit}, data) {
            const user = {
                email: data.email,
                password: data.password,
            }
            return UserDataService.register(user).then(
                response => {
                    const account = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phone: data.phone,
                        birthDate: data.birthDate,
                        accountType: data.accountType,
                        districtId: data.districtId
                    }

                    AccountDataService.register(response.data.id, account)
                        .then(response => {
                                commit('registerSuccess');
                                return Promise.resolve(response.data);
                            },
                            error => {
                                commit('registerFailure');
                                UserDataService.delete(response.data.id);
                                return Promise.reject((error));
                            })

                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            )
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }

    }
}