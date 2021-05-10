var debug
// 加载播放器
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 3,
    audio: [/* {name: 'name', artist: 'artist', url: 'url.mp3', cover: 'cover.jpg'} */]
});
// 使用主密钥加密的地址前后缀(json)
var uenc = 'U2FsdGVkX18FflaDlCqlEya6KkG72nPRCVBdcoNOdHBTmT1+SigYsia9zJwKksM33t200HkbdSXp2tCZCpjvXQPiTmxVQ+VYLR+G5IKsIZntpCHhHOWaU8MPvHACiQxSCtYmUmD0Kp5XeMRmXayY/I2X0YVeT/dxWwcPtiHywOct6S5ap19Wsbv0ww6KFYMg+pWxHhDwlrtugYLM91ON509VjnGCYyLxMig1KSf334CrZDRNJ+0qnBioZBFA3ByC6IWSjHXQuE4XAwQ7oC5SjR42L5ylCj5rtNwCDQaEDhEbLL/+a1O2lKjvUI4yL4htQaU2al9a2U4I7a0KoLBMMYxmEA1dUYhTFcCs8j+2T2H5b4LgH4lKWdK6dwshPziEXv/9sGu1f1yv/iWDzjit8/efL4yjlgJOC2MLKAzKus88rOYb24fkDR5GhCNglhs4MZ9DpuhDdt3WFXzZ05vCHvDF0tMY4k+OI86yzxOHdXEiPq2f34oslVuc+pUsrlOcK10vF2QyXJubSQgjJ14+l1rroshXIi0y39PeE8/Rz6YLYASnTjYXGp8ejTAWV6wJoVjUmtPxnDTK2HV+95n+QCDanX7nQhU3KHFoVuT46zmVOKO56vEsXQ/cJrTc50yMgrkB/L8fugLsPVBOmotLykPOfv/QeH0VBNglc6lGO0r0eEXGdGuZcy+/NbDiRSXiXTwwLGb4Px44flmOIYV5MBQGJXr4lDZH3VWS+629o00joeWOu0Teia3+3voA923VSmZy89Q7gJ8KGXWC/HCHZgGQ4qUFrq5S2mz8qe/CJifdEgJty8RKODHZgWPesbncmDfNA1xhpMptKTc0kgoJo3VKaDcs/ZylpWFSoo3b6fSLr/errwEjGfdU4HFD5JICyNXgmcN3GdAo7Uk4iTT1c7z+ymGTGh6+h4bsGLWC2e0umDpcMP28HtvB6OW/xnQaIbMlJS3cQY47a0dAKxFYzkoh88y5rcis8g/P8T1+AXGrTjpTQDWF/W2jrreMRRvw'
var app = new Vue({
    el: "#app",
    data: {
        /** 主密钥 */
        key: '',
        /** 主密钥AES */
        keyaes: ['U2FsdGVkX18NWsyvhkIvPHe+uGhT4Nb5BsJJoQ7nE88=', 'U2FsdGVkX181bmhfuvpR8c08fJ3OhH8qf6aA+sR7xS8='],
        /** 主密钥md5 */
        keymd5: '5e8aa4aa4f6a5cfe4e4849f203d39261',
        /** 解密后的urls */
        urls: [],
        /** 解密密钥 */
        pass: '',
        /** 是否解密 */
        deced: false,
        /** 选择的源 */
        sor: '',
        /** 左侧播放列表 */
        playlists: playlists,
        /** 右侧全部歌曲 */
        songs: [
            { name: 'name', artist: 'artist', url: 'url.mp3', cover: 'cover.jpg', lrc: 'lrc.lrc' }
        ],
        /** 搜索框内容 */
        search: ''
    },
    methods: {
        /** 使用主密钥解密 */
        dec() {
            console.log('PassOK', CryptoJS.HmacMD5(this.key, "ctem049").toString())
            this.urls = JSON.parse(CryptoJS.AES.decrypt(uenc, this.key).toString(CryptoJS.enc.Utf8))
            this.sor = this.urls[0].title
        },
        /** 播放一个列表 */
        play(playlist) {
            if (!this.deced) return false
            var appl = []
            var u = this.urls.filter(v => v.title == this.sor)[0].urls
            playlist.map(v => {
                var k = this.songs.filter(x => x.url == v)[0]
                var s = { name: k.name, artist: k.artist, url: this.getFileUrl(encodeURI(k.url), u), cover: k.cover }
                if (k.lrc != "") { s.lrc = this.getFileUrl(encodeURI(k.lrc), u) }
                appl.push(s)
            })
            ap.list.clear()
            ap.list.add(appl);
        },
        /** 切换列表开关 */
        switchList(pl) {
            pl.expand = !pl.expand
        },
        /** 获取音乐真实地址 */
        getFileUrl(filename, u) {
            var fsuf = filename.split('.').pop()
            var uurl = u.filter(v => v.type == fsuf)[0]
            return uurl.pre + filename + uurl.suf
        },
        /** 单个歌曲操作 */
        songop(action, song) {
            if (!this.deced) return false
            // 获取歌曲信息
            var u = this.urls.filter(v => v.title == this.sor)[0].urls
            var s = { name: song.name, artist: song.artist, url: this.getFileUrl(encodeURI(song.url), u), cover: song.cover }
            if (song.lrc != "") { s.lrc = this.getFileUrl(encodeURI(song.lrc), u) }
            if (action == 'play') {
                var t = ap.list.audios.findIndex(v => v.url == s.url)
                if (t >= 0) {
                    // 已存在，切换到此曲
                    ap.list.switch(t)
                } else {
                    // 添加到列表并播放
                    ap.list.add(s)
                    ap.list.switch(ap.list.audios.length - 1)
                }
                ap.play()
                ap.seek(0)
            }
            else if (action == 'add') {
                ap.list.add(s)
            }
            else if (action == 'down') {
                window.open(s.url)
            }
            else if (action == 'lrc') {
                window.open(s.lrc)
            }
        }
    },
    computed: {
        /** 检测密钥是否正确 */
        passtest() {
            if (this.deced) return true
            this.keyaes.map(v => {
                try { var keyl = CryptoJS.AES.decrypt(v, this.pass).toString(CryptoJS.enc.Utf8) }
                catch (e) { }
                if (CryptoJS.HmacMD5(keyl, "ctem049") == this.keymd5) {
                    // if the key is right
                    this.key = keyl
                    this.dec()
                    this.deced = true
                    this.pass = ''
                    return true
                }
            })
            if (this.deced) return true
            return false
        },
        /** 筛选歌曲 */
        songsFilter() {
            if (this.search == '') return this.songs
            else {
                return this.songs.filter(v => ((v.name.indexOf(this.search) >= 0) || (v.artist.indexOf(this.search) >= 0)))
            }
        }
    },
    mounted() {
        this.songs = songs
    }
});