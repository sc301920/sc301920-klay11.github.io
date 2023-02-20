import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-vue/config'

const baseGroupItems = [
  { text: '数据结构', link: '/base/dataStructure/array/index' },
  { text: '算法', link: '/base/algorithm/index' },
  { text: '设计模式', link: '/base/designPattern/工厂模式' },
  { text: '计算机网络', link: '/base/network/网络体系' },
]

const networkItems = [
  { text: '网络体系', link: '/base/network/网络体系' },
  { text: '传输层协议', link: '/base/network/传输层协议' },
  { text: 'HTTP', link: '/base/network/HTTP' },
  { text: 'web安全', link: '/base/network/web安全' },
]

const dataStructureItems = [
  { text: '数组', link: '/base/dataStructure/array/index' },
  { text: '栈', link: '/base/dataStructure/stack/index' },
  { text: '队列', link: '/base/dataStructure/queue/index' },
  { text: '链表', link: '/base/dataStructure/linklist/index' },
  { text: '树', link: '/base/dataStructure/tree/index' },
]

const algorithmItems = [
  { text: '时间复杂度和空间复杂度', link: '/base/algorithm/index' },
  { text: '数组的应用', link: '/base/algorithm/数组的应用' },
  { text: '字符串的应用', link: '/base/algorithm/字符串的应用' },
  { text: '链表的应用', link: '/base/algorithm/链表的应用' },
  { text: '快慢指针和多指针', link: '/base/algorithm/快慢指针和多指针' },
  { text: '特别的链表', link: '/base/algorithm/特别的链表' },
  { text: '栈和队列的应用', link: '/base/algorithm/栈和队列的应用' },
  { text: '递归与回溯思想', link: '/base/algorithm/递归与回溯思想' },
  { text: '二叉树', link: '/base/algorithm/二叉树' },
  { text: '搜索二叉树', link: '/base/algorithm/搜索二叉树' },
  { text: '平衡二叉树', link: '/base/algorithm/平衡二叉树' },
  // { text: '堆结构', link: '/base/algorithm/堆结构' },
  { text: '排序算法', link: '/base/algorithm/排序算法' },
  { text: '动态规划', link: '/base/algorithm/动态规划' },
]
const designPatternItems = [
  { text: '工厂模式', link: '/base/designPattern/工厂模式' },
  { text: '单例模式', link: '/base/designPattern/单例模式' },
  { text: '原型模式', link: '/base/designPattern/原型模式' },
  { text: '装饰器模式', link: '/base/designPattern/装饰器模式' },
  { text: '适配器模式', link: '/base/designPattern/适配器模式' },
  { text: '代理模式', link: '/base/designPattern/代理模式' },
  { text: '策略模式', link: '/base/designPattern/策略模式' },
  // { text: '状态模式', link: '/base/designPattern/状态模式' },
  { text: '迭代器模式', link: '/base/designPattern/迭代器模式' },
  { text: '观察者模式', link: '/base/designPattern/观察者模式' },
]

const FrontGroupItems = [
  { text: 'HTML', link: '/front/html/index' },
  { text: 'CSS', link: '/front/css/index' },
  { text: 'JS', link: '/front/js/数据类型' },
]

const htmlItems = [
  { text: '代码规范', link: '/front/html/index' },
  // { text: '服务器发送事件', link: '/front/html/服务器发送事件' },
  { text: '视频和音频', link: '/front/html/video' },
  // { text: '特殊标签', link: '/front/html/特殊标签' },
  { text: '拖放', link: '/front/html/拖放' },
  { text: '应用程序缓存', link: '/front/html/应用程序缓存' },
  { text: 'canvas', link: '/front/html/canvas' },
  { text: 'iframe', link: '/front/html/iframe' },
  { text: 'svg', link: '/front/html/svg' },
  { text: 'web储存', link: '/front/html/web储存' },
  { text: 'webSocket', link: '/front/html/webSocket' },
  { text: 'webWorkers', link: '/front/html/webWorkers' },
  { text: 'webRTC', link: '/front/html/webRTC' },
  { text: '浏览器工作原理', link: '/front/html/浏览器工作原理' }
]

const cssItems = [
  // { text: '代码规范', link: '/front/css/index' },
  { text: '兼容性', link: '/front/css/兼容性' },
  { text: '回流重绘', link: '/front/css/回流重绘' },
  { text: '盒模型', link: '/front/css/盒子模型' },
  { text: '样式计算', link: '/front/css/样式计算' },
  { text: '文字布局', link: '/front/css/文字布局' },
  { text: '函数计算', link: '/front/css/函数计算' },
  { text: '选择器', link: '/front/css/选择器' },
  { text: '背景和遮罩', link: '/front/css/背景和遮罩' },
  { text: '阴影和滤镜', link: '/front/css/阴影和滤镜' },
  { text: '动画', link: '/front/css/动画' },
  { text: '预处理语言', link: '/front/css/预处理语言' },
]

const jsItems = [
  { text: '数据类型', link: '/front/js/数据类型' },
  { text: '声明提升', link: '/front/js/声明提升' },
  { text: '作用域', link: '/front/js/作用域' },
  { text: '块作用域', link: '/front/js/块作用域' },
  { text: '闭包', link: '/front/js/闭包' },
  { text: '执行上下文栈', link: '/front/js/执行上下文栈' },
  { text: 'this', link: '/front/js/this' },
  { text: '内存管理', link: '/front/js/内存管理' },
  { text: '事件循环机制', link: '/front/js/事件循环机制' },
  { text: 'promise', link: '/front/js/promise' },
  { text: '面向对象', link: '/front/js/面向对象' },
  { text: '类', link: '/front/js/类' },
  { text: '浏览器的工作原理', link: '/front/js/浏览器的工作原理' },
  { text: 'http缓存', link: '/front/js/http缓存' },
  { text: '前端缓存', link: '/front/js/前端缓存' },
  { text: '监视api', link: '/front/js/监视api' },
  { text: 'blob', link: '/front/js/blob' },
  { text: '全局api', link: '/front/js/全局api' },
  { text: '特殊的函数', link: '/front/js/特殊的函数' },
  { text: '异步编程', link: '/front/js/异步编程' },
  { text: '事件流', link: '/front/js/事件流' },
]
const projectItems = [
  { text: 'vite', link: '/工程化/vite/index' },
]

/**
 * @type {import('vitepress-theme-vue').SidebarGroup}
 */
const baseSidebar = [
  { text: '数据结构', items: dataStructureItems },
  { text: '算法', items: algorithmItems },
  { text: '设计模式', items: designPatternItems },
  { text: '计算机网络', items: networkItems },
]

const frontSidebar = [
  { text: 'html', items: htmlItems },
  { text: 'css', items: cssItems },
  { text: 'js', items: jsItems },
]

const projectSidebar = [
  { text: 'vite', items: projectItems },
]
/**
 * @type {import('vitepress-theme-vue').MultiSidebarConfig}
 */
const sidebar = {
  '/base': baseSidebar,
  '/front': frontSidebar,
  '/工程化':projectSidebar
}

/**
 * @type {import('vitepress-theme-vue').NavItem}
 */
const nav = [
  {
    text: '🍓编程基础',
    items: [
      { text: '', items: baseGroupItems },
    ],
    activeMatch: `^/base/`
  },
  {
    text: '🍉前端三剑客',
    items: [
      { text: '', items: FrontGroupItems },
    ],
    activeMatch: `^/front/`
  },
  {
    text: '😾前端工程化',
    items: [
      { text: '', items: projectItems },
    ],
    activeMatch: `^/工程化/`
  }
]

export default defineConfig({
  extends: baseConfig,
  lang: 'en-US',
  title: 'Blog',
  description: 'klay11’s Blog',
  head: [
    ['link', { rel: 'icon', href: '', type: 'image/svg+xml' }]
  ],
  srcDir: 'docs',
  lastUpdated: true,
  themeConfig: {
    navLogo: '/avatar.jpg',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sc301920'
      }
    ],
    nav,
    sidebar,
    docFooter: { prev: '上一篇', next: '下一篇' }
  }
})
