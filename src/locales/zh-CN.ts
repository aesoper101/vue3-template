import localeLogin from './zh-CN/views/login';

export default {
  ...localeLogin,

  'navbar.action.locale': '切换为中文',
  'locale.ZH': '简体中文',
  'locale.EN': '英文',

  'operation.failed': '操作失败',
  'error.tip': '错误提示',
  'error.message': '操作失败,系统异常!',
  'timeout.message': '登录超时,请重新登录!',
  'api.timeout.message': '接口请求超时,请刷新页面重试!',
  'api.request.failed': '请求出错，请稍候重试',
  'network.exception': '网络异常',
  'network.exception.message': '网络异常，请检查您的网络连接是否正常!',
  'unknown.mistake': '未知错误',

  'network.error.message.400': '无效请求',
  'network.error.message.401': '用户没有权限（令牌、用户名、密码错误）!',
  'network.error.message.403': '用户得到授权，但是访问是被禁止的。!',
  'network.error.message.404': '网络请求错误,未找到该资源!',
  'network.error.message.405': '网络请求错误,请求方法未允许!',
  'network.error.message.408': '网络请求超时!',
  'network.error.message.500': '服务器错误,请联系管理员!',
  'network.error.message.501': '网络未实现!',
  'network.error.message.502': '网络错误!',
  'network.error.message.503': '服务不可用，服务器暂时过载或维护!',
  'network.error.message.504': '网络超时!',
  'network.error.message.505': 'http版本不支持该请求!',

  reLogin: '重新登录',
  'confirm.logout': '确认退出',
  'logged.out.warning': '登录信息已失效，您可以取消留在此页面，或重新登入',
  'do.logged.out.warning': '请确认是否退出登录',
  cancelText: '取消',
  confirmText: '确认',

  userCenter: '用户中心',
  userSettings: '用户设置',
  logout: '登出登录',
};
