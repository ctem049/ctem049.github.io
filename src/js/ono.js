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
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000vKMVO0srdMF_1.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/yqq/song/001KQ3zX0N2rVR.html'
                    },
                    {
                        name: '和光同尘',
                        img: 'https://p2.music.126.net/hM4falj0j0VhoCjk7u7Ddw==/109951165545333405.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=1804844437'
                    },
                    {
                        name: '美人鱼',
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000y5gq7449K9I_1.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/yqq/song/002ASCKm3ROw7t.html'
                    },
                    {
                        name: '天下',
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000pVkCf3KsUQ9_1.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/yqq/song/00041h1u3kgquE.html'
                    },
                    {
                        name: '下雪的季节',
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001631yH0x0x1z_1.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/yqq/song/003jfrVm0z7H1i.html'
                    },
                    {
                        name: '追',
                        img: 'https://p1.music.126.net/Ax-zrmAPBrASWxT92t3fdw==/109951164000242827.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=1358848433'
                    },
                    {
                        name: '红玫瑰',
                        img: 'http://p2.music.126.net/WJgLE2ImnLgqPPLQSlF7iQ==/114349209289440.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=65126'
                    },
                    {
                        name: '关键词',
                        img: 'https://p2.music.126.net/CKcTyKux_UTt0sO_5VWR9w==/16561943649388272.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=40147554'
                    },
                    {
                        name: '就差一点点',
                        img: 'http://p1.music.126.net/wZtz9KJcInYduyXjXLrLog==/109951163106300650.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=529814453'
                    },
                ]
            },

            {
                type: '中国风',
                songs: [
                    {
                        name: '大鱼',
                        img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004Y7V4s3ug4cC_1.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/yqq/song/004OQ5Mt0EmEzv.html'
                    },
                    {
                        name: '烟花易冷',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000000bviBl4FjTpO_1.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/ryqq/songDetail/004emQMs09Z1lz'
                    },
                    {
                        name: '庐州月',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000002CJON012PxwU_1.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/ryqq/songDetail/001LuLtP1LqITK'
                    },
                    {
                        name: '赤伶',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000003SElah4eQ41c_2.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/ryqq/songDetail/000yIhWc01tTEv'
                    },
                    {
                        name: '寻常歌',
                        img: 'http://p1.music.126.net/gg8utJDUGHfbyVd3tKXV_w==/109951164640667962.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=1383011136'
                    },
                    {
                        name: '牵丝戏',
                        img: 'https://p1.music.126.net/Nd86SOcyCxU5Qu7jdZn_MQ==/7725168696876736.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=30352891'
                    },
                    {
                        name: '吹灭小山河',
                        img: 'http://p1.music.126.net/taWBQliW8wLh_pqXElAeww==/109951164923015271.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=1412559986'
                    },
                    {
                        name: '年轮',
                        img: 'http://p1.music.126.net/5D4hfLdRezRlax4OWiPgnw==/2899412164997218.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=32619064'
                    }
                ]
            },

            {
                type: '二次元',
                songs: [
                    {
                        name: 'ゆりゆららららゆるゆり大事件',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000003HNbwr0HJP5H_1.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/ryqq/songDetail/001wVIRv0rmoUb'
                    },
                    {
                        name: '有你的江湖',
                        img: 'http://p1.music.126.net/HOQbKmwbX7rj_6R9Pcpm_Q==/109951162891624643.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=469440680'
                    },
                    {
                        name: 'カナリア',
                        img: 'http://p2.music.126.net/9EphnmdLmzBeUS0J4sSvfw==/109951163521761071.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=1305367564'
                    },
                    {
                        name: '気ままな天使たち',
                        img: 'https://y.qq.com/music/photo_new/T002R300x300M000003aEE9y2gyoHL_1.jpg?max_age=2592000',
                        url: 'https://y.qq.com/n/ryqq/songDetail/004EWcMb44h3tm'
                    },
                    {
                        name: 'only my railgun',
                        img: 'https://p2.music.126.net/pviFxK7sGSdu3xmWRt9Lgw==/109951166296227310.jpg?max_age=2592000',
                        url: 'https://music.163.com/#/song?id=725692'
                    },
                    {
                        name: '勾指起誓',
                        img: 'http://p1.music.126.net/eMyCr0gv0kPGlew9XTNjyA==/109951163944178164.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=1345872140'
                    },
                    {
                        name: 'world.execute (me) ;',
                        img: 'http://p1.music.126.net/-OxCLbGs-JxKtPaBCo1yuw==/18801648835570109.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=435278010'
                    },
                    {
                        name: 'アイの庭',
                        img: 'http://p1.music.126.net/FiMHky6tkpWlxyXWvSJNhA==/913694162681970.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=565845'
                    },
                    {
                        name: '「交织together」',
                        img: 'http://p2.music.126.net/JBo0QEBpHlzUNpTd5P4zuw==/109951162861954189.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=460478768'
                    },
                    {
                        name: 'Bad Apple!!',
                        img: 'http://p2.music.126.net/NpC1cmlGABqAXyG6x9nENg==/109951166027157822.jpg?param=130y130',
                        url: 'https://music.163.com/#/song?id=22645196'
                    }
                ]
            }
        ],
        s2tab: 1,
        s3tab: 1,
        s4tab: 1,
        currentSection: 1,
        targetSection: 1,
        scrolling: false,
        timeId: 0,
        lastScrolling: window.pageYOffset,
        touchx: 0,
        touchy: 0,
        isTop: true,
        yss: []
    },
    methods: {
        daf(value, fmt = 'yyyy.MM.dd') {
            return new Date(value).format(fmt)
        },
        s2tabswitch(tab) {
            this.s2tab = tab
        },
        s3tabswitch(dir) {
            var SL = this.$refs.ys3container.scrollLeft
            var i = 1
            for (i = 1; i < 3; i++) {
                var OL = this.$refs[`ys3t${i}`].offsetLeft
                if ((SL - OL) < 2 && (SL - OL) > -2) break
            }
            i = i + dir
            if ((i < 1) || (i > 2)) {
                return
            }
            this.$refs[`ys3t${i}`].scrollIntoView()
        }
        ,
        s4tabswitch(tab) {
            this.s4tab = tab
        },
        scrollToTop() {
            // window.requestAnimationFrame()
            // 滚动检测
            var scrollTop = this.$refs.ycontainer.scrollTop
            if (scrollTop == 0) {
                this.isTop = true
            } else {
                this.isTop = false
            }
            // 菜单透明度
            var topOT = this.$refs.ys1.offsetTop
            var topSH = this.$refs.ys1.scrollHeight
            if (scrollTop < topSH) {
                var o = (scrollTop - topOT) / topSH
                // console.log(o)
                this.$refs.ymenu.style.opacity = o
            } else {
                this.$refs.ymenu.style.opacity = 1
            }
            for (var i = 1; i < 5; i++) {
                // var offsetTop = document.getElementById(`y-s${i}`).offsetTop
                // var scrollHeight = document.getElementById(`y-s${i}`).scrollHeight
                // console.log(i, scrollTop, offsetTop, scrollHeight)
                var offsetTop = this.$refs[`ys${i}`].offsetTop
                // if (((scrollTop - offsetTop) < 1) && ((offsetTop - scrollTop) < 1)) {
                if (scrollTop == offsetTop) {
                    // console.log(offsetTop,scrollTop)
                    this.scrollTo(i)
                    break
                }
            }
        },
        scrollTo(i) {
            this.currentSection = i
            this.targetSection = i
            // console.log('scrolling', i)
        },
        scrollSetTo(i) {
            if ((i < 1) || (i > 4)) {
                return
            }
            // this.currentSection = i
            // console.log('scrolling to ', i)
            this.targetSection = i
            this.$refs[`ys${i}`].scrollIntoView()
        }
    },
    mounted() {
        this.$refs.ycontainer.addEventListener("scroll", this.scrollToTop, true)
        this.$refs.ycontainer.addEventListener(
            "wheel",
            (e) => {
                e.preventDefault()
                // console.log('cwheel,prevent', e)
                if (this.targetSection != this.currentSection) return
                // console.log('cwheel,prevent not return')
                if (e.deltaY > 0) {
                    this.scrollSetTo(this.currentSection + 1)
                } else if (e.deltaY < 0) {
                    this.scrollSetTo(this.currentSection - 1)
                }
            }, { passive: false }
        )

        for (var i = 1; i < 4; i++) {
            this.$refs[`ys2t${i}`].addEventListener(
                "wheel",
                (e) => {
                    var CH = e.currentTarget.clientHeight
                    var ST = e.currentTarget.scrollTop
                    var SH = e.currentTarget.scrollHeight
                    // console.log(e.deltaY, CH, ST, SH)
                    if (!(e.deltaY < 0 && ST == 0)) {
                        if (!(e.deltaY > 0 && ((CH + ST - SH) < 2) && ((CH + ST - SH) > -2))) {
                            if (this.currentSection == 2) {
                                // console.log('stop')
                                e.stopPropagation()
                                return
                            }
                        } else {
                            this.scrollToTop()
                        }
                    } else {
                        this.scrollToTop()
                    }
                    e.preventDefault()
                }, { passive: false }
            )
        }

        /* window.addEventListener('touchstart',(e)=>{
            this.touchx = e.changedTouches[0].pageX;
            this.touchy = e.changedTouches[0].pageY;
        }) */
        /* window.addEventListener('touch', () => {
            clearTimeout(timeId);
            timeId = setTimeout(() => {
                this.scrollToTop();
            }, 100);
        }) */
    }
})

