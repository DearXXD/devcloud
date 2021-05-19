import { productRoutes, devflowRoutes, resourceRoutes, constantRoutes } from '@/router'
import { getSubSystem, setSubSystem } from '@/utils/auth'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  subSystem: getSubSystem()
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_SUB_SYSTEM: (state, sub) => {
    state.subSystem = sub
  }
}

const actions = {
  generateRoutes({ commit }, { roles, sub }) {
    if (!sub) {
      sub = state.subSystem
    }
    let accessedRoutes
    switch (sub) {
      case 'develop':
        if (roles.includes('supper')) {
          accessedRoutes = devflowRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(devflowRoutes, roles)
        }
        break
      case 'resource':
        if (roles.includes('supper')) {
          accessedRoutes = resourceRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(resourceRoutes, roles)
        }
        break
      case 'eventbox':
        break
      default:
        sub = 'product'
        if (roles.includes('supper')) {
          accessedRoutes = productRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(productRoutes, roles)
        }
        break
    }

    setSubSystem(sub)

    return new Promise(resolve => {
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_SUB_SYSTEM', sub)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
