import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/common/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/keyauth/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/keyauth/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/password-reset',
    component: () => import('@/views/keyauth/login/password-reset'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/common/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/common/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/keyauth/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      },
      {
        hidden: true,
        path: 'init',
        component: () => import('@/views/keyauth/profile/initial'),
        name: 'SubAccountInit',
        meta: {
          title: '????????????'
        }
      }
    ]
  }
]

/**
 * productRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const productRoutes = [
  {
    path: '/product',
    component: Layout,
    redirect: '/product/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/product/index'),
        name: 'ProductDashboard',
        meta: { title: '??????', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/sub',
    alwaysShow: true,
    name: 'SubAccount',
    meta: {
      title: '????????????',
      icon: 'account',
      roles: ['supper', 'domain_admin', 'org_admin']
    },
    children: [
      {
        path: 'department',
        component: () => import('@/views/keyauth/department'),
        name: 'DepartmentList',
        meta: {
          title: '????????????'
        }
      },
      {
        hidden: true,
        path: 'department/:id',
        component: () => import('@/views/keyauth/department/detail'),
        name: 'DepartmentDetail',
        meta: {
          title: '????????????'
        }
      },
      {
        path: 'sub',
        component: () => import('@/views/keyauth/sub-account/index'),
        name: 'SubAccountList',
        meta: {
          title: '????????????'
        }
      },
      {
        hidden: true,
        path: 'sub/:account',
        component: () => import('@/views/keyauth/sub-account/detail'),
        name: 'SubAccountDetail',
        meta: {
          title: '????????????'
        }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: '????????????',
      icon: 'permission',
      roles: ['supper', 'domain_admin', 'perm_admin']
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/keyauth/role'),
        name: 'RoleList',
        meta: {
          title: '????????????'
        }
      },
      {
        hidden: true,
        path: 'role/:id',
        component: () => import('@/views/keyauth/role/detail'),
        name: 'RoleDetail',
        meta: {
          title: '????????????'
        }
      },
      {
        hidden: true,
        path: 'create-role',
        component: () => import('@/views/keyauth/role/create'),
        name: 'CreateRole',
        meta: {
          title: '????????????'
        }
      },
      {
        path: 'namespace',
        component: () => import('@/views/keyauth/namespace'),
        name: 'NamespaceList',
        meta: {
          title: '????????????'
        }
      },
      {
        hidden: true,
        path: 'namespace/:id',
        component: () => import('@/views/keyauth/namespace/detail'),
        name: 'NamespaceDetail',
        meta: {
          title: '????????????'
        }
      },
      {
        path: 'tag',
        component: () => import('@/views/keyauth/tag'),
        name: 'TagList',
        meta: {
          title: '????????????'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * productRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const devflowRoutes = [
  {
    path: '/develop',
    component: Layout,
    redirect: '/develop/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/develop/index'),
        name: 'DevelopDashboard',
        meta: { title: '??????', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/sub',
    alwaysShow: true,
    name: 'SubAccount',
    meta: {
      title: '????????????',
      icon: 'account',
      roles: ['supper', 'domain_admin', 'org_admin']
    },
    children: [
      {
        path: 'department',
        component: () => import('@/views/keyauth/department'),
        name: 'DepartmentList',
        meta: {
          title: '????????????'
        }
      },
      {
        hidden: true,
        path: 'department/:id',
        component: () => import('@/views/keyauth/department/detail'),
        name: 'DepartmentDetail',
        meta: {
          title: '????????????'
        }
      },
      {
        path: 'sub',
        component: () => import('@/views/keyauth/sub-account/index'),
        name: 'SubAccountList',
        meta: {
          title: '????????????'
        }
      },
      {
        hidden: true,
        path: 'sub/:account',
        component: () => import('@/views/keyauth/sub-account/detail'),
        name: 'SubAccountDetail',
        meta: {
          title: '????????????'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * productRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const resourceRoutes = [
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/resource/index'),
        name: 'ResourceDashboard',
        meta: { title: '????????????', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/resource/base',
    component: Layout,
    redirect: '/resource/base/host',
    alwaysShow: true,
    name: 'SubAccount',
    meta: {
      title: '????????????',
      icon: 'account',
      roles: ['supper', 'domain_admin', 'org_admin']
    },
    children: [
      {
        path: 'host',
        component: () => import('@/views/keyauth/department'),
        name: 'HostList',
        meta: {
          title: '????????????'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
