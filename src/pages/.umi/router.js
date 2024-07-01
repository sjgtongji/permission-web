import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/jigangsun/permission-web/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
              LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                .default,
            })
          : require('../user/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/jigangsun/permission-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
          LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/SecurityLayout').default,
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
              LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/BasicLayout').default,
        routes: [
          {
            path: '/',
            redirect: '/welcome',
            exact: true,
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Welcome" */ '../Welcome'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Welcome').default,
            exact: true,
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Admin" */ '../Admin'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Admin').default,
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Admin" */ '../Welcome'),
                      LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Welcome').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/jigangsun/permission-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__ListTableList" */ '../ListTableList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../ListTableList').default,
            exact: true,
          },
          {
            name: 'projects.projects',
            icon: 'table',
            path: '/projects',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__projectList" */ '../projectList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../projectList').default,
            exact: true,
          },
          {
            name: '菜单管理',
            icon: 'smile',
            path: '/menus',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__menuList" */ '../menuList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../menuList').default,
            exact: true,
          },
          {
            name: '角色管理',
            icon: 'smile',
            path: '/roles',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__roleList" */ '../roleList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../roleList').default,
            exact: true,
          },
          {
            name: '用户管理',
            icon: 'smile',
            path: '/users',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__usersList" */ '../usersList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../usersList').default,
            exact: true,
          },
          {
            name: '门店管理',
            icon: 'smile',
            path: '/stores',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__storeList" */ '../storeList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../storeList').default,
            exact: true,
          },
          {
            name: '角色管理',
            icon: 'smile',
            path: '/dkroles',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dkRoleList" */ '../dkRoleList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../dkRoleList').default,
            exact: true,
          },
          {
            name: '用户管理',
            icon: 'smile',
            path: '/dkusers',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dkUserList" */ '../dkUserList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../dkUserList').default,
            exact: true,
          },
          {
            name: '菜单管理',
            icon: 'smile',
            path: '/dkmenus',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dkMenuList" */ '../dkMenuList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../dkMenuList').default,
            exact: true,
          },
          {
            name: '商品类别管理',
            icon: 'smile',
            path: '/catagory',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dkCatagoryList" */ '../dkCatagoryList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../dkCatagoryList').default,
            exact: true,
          },
          {
            name: '商品管理',
            icon: 'smile',
            path: '/goods',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dkGoodsList" */ '../dkGoodsList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../dkGoodsList').default,
            exact: true,
          },
          {
            name: '会员管理',
            icon: 'smile',
            path: '/member',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dkMemberList" */ '../dkMemberList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../dkMemberList').default,
            exact: true,
          },
          {
            name: '球台管理',
            icon: 'smile',
            path: '/table',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dkTableList" */ '../dkTableList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../dkTableList').default,
            exact: true,
          },
          {
            name: '会员充值管理',
            icon: 'smile',
            path: '/recharge',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dkRecharge" */ '../dkRecharge'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../dkRecharge').default,
            exact: true,
          },
          {
            name: '开台管理',
            icon: 'smile',
            path: '/order',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dkTableManage" */ '../dkTableManage'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../dkTableManage').default,
            exact: true,
          },
          {
            name: '空白页面',
            icon: 'smile',
            path: '/emptypage',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__EmptyPage" */ '../EmptyPage'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../EmptyPage').default,
            exact: true,
          },
          {
            name: 'list.basic-list',
            icon: 'table',
            path: '/listbasiclist',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__ListBasicList__model.js' */ '/Users/jigangsun/permission-web/src/pages/ListBasicList/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__ListBasicList" */ '../ListBasicList'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../ListBasicList').default,
            exact: true,
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/jigangsun/permission-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/jigangsun/permission-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('/Users/jigangsun/permission-web/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/jigangsun/permission-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
