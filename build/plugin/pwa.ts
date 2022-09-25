import { VitePWA } from 'vite-plugin-pwa';

export default function pwa() {
  return VitePWA({
    includeAssets: ['favicon.svg'],
    manifest: false,
    registerType: 'autoUpdate',
    workbox: {
      runtimeCaching: [
        // {
        //   urlPattern: /someInterface/i, // 接口缓存 此处填你想缓存的接口正则匹配
        //   handler: 'CacheFirst',
        //   options: {
        //     cacheName: 'interface-cache',
        //   },
        // },
        {
          urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts静态资源缓存
          handler: 'CacheFirst',
          options: {
            cacheName: 'js-css-cache',
          },
        },
        {
          urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
          },
        },
      ],
    },
  });
}
