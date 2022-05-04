var app = new Vue({
    el: '#y-container',
    data: {
        logor: false,
        mcontent: [
            {
                type: '流行',
                songs: [
                    {
                        name: '温泉',
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000vKMVO0srdMF_1.jpg',
                        url: 'https://y.qq.com/n/yqq/song/001KQ3zX0N2rVR.html'
                    },
                    {
                        name: '美人鱼',
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000y5gq7449K9I_1.jpg',
                        url: 'https://y.qq.com/n/yqq/song/002ASCKm3ROw7t.html'
                    },
                    {
                        name: '天下',
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000pVkCf3KsUQ9_1.jpg',
                        url: 'https://y.qq.com/n/yqq/song/00041h1u3kgquE.html'
                    },
                    {
                        name: '下雪的季节',
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001631yH0x0x1z_1.jpg',
                        url: 'https://y.qq.com/n/yqq/song/003jfrVm0z7H1i.html'
                    },
                    {
                        name: '追',
                        img: 'https://p1.music.126.net/Ax-zrmAPBrASWxT92t3fdw==/109951164000242827.jpg',
                        url: 'https://music.163.com/#/song?id=1358848433'
                    },
                ]
            },
            
            {
                type: '中国风',
                songs: [
                    {
                        name: '大鱼',
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004Y7V4s3ug4cC_1.jpg',
                        url: 'https://y.qq.com/n/yqq/song/004OQ5Mt0EmEzv.html'
                    },
                    {
                        name: '烟花易冷',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000000bviBl4FjTpO_1.jpg',
                        url: 'https://y.qq.com/n/ryqq/songDetail/004emQMs09Z1lz'
                    },
                    {
                        name: '庐州月',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000002CJON012PxwU_1.jpg',
                        url: 'https://y.qq.com/n/ryqq/songDetail/001LuLtP1LqITK'
                    },
                    {
                        name: '赤伶',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000003SElah4eQ41c_2.jpg',
                        url: 'https://y.qq.com/n/ryqq/songDetail/000yIhWc01tTEv'
                    },
                    {
                        name: '寻常歌',
                        img: 'http://p1.music.126.net/gg8utJDUGHfbyVd3tKXV_w==/109951164640667962.jpg',
                        url: 'https://music.163.com/#/song?id=1383011136'
                    }
                ]
            },
            
            {
                type: '二次元',
                songs: [
                    {
                        name: 'ゆりゆららららゆるゆり大事件',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000003HNbwr0HJP5H_1.jpg',
                        url: 'https://y.qq.com/n/ryqq/songDetail/001wVIRv0rmoUb'
                    },
                    {
                        name: '有你的江湖',
                        img: 'http://p1.music.126.net/HOQbKmwbX7rj_6R9Pcpm_Q==/109951162891624643.jpg',
                        url: 'https://music.163.com/#/song?id=469440680'
                    },
                    {
                        name: 'カナリア',
                        img: 'http://p2.music.126.net/9EphnmdLmzBeUS0J4sSvfw==/109951163521761071.jpg',
                        url: 'https://music.163.com/#/song?id=1305367564'
                    },
                    {
                        name: '気ままな天使たち',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000003aEE9y2gyoHL_1.jpg',
                        url: 'https://y.qq.com/n/ryqq/songDetail/004EWcMb44h3tm'
                    },
                    {
                        name: 'only my railgun',
                        img: 'https://p2.music.126.net/pviFxK7sGSdu3xmWRt9Lgw==/109951166296227310.jpg',
                        url: 'https://music.163.com/#/song?id=725692'
                    },
                    {
                        name: 'world.execute (me) ;',
                        img: 'http://p1.music.126.net/-OxCLbGs-JxKtPaBCo1yuw==/18801648835570109.jpg',
                        url: 'https://music.163.com/#/song?id=435278010'
                    }
                ]
            }
        ],
        s2tab: 1
    },
    methods: {
        daf(value, fmt = 'yyyy.MM.dd') {
            return new Date(value).format(fmt)
        },
        s2tabswitch(tab) {
            this.s2tab = tab
        }
    }
})