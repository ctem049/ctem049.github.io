var debug
// 加载播放器
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 3,
    audio: [/* {name: 'name', artist: 'artist', url: 'url.mp3', cover: 'cover.jpg'} */]
});
// 使用主密钥加密的地址前后缀(json)
var uenc = 'U2FsdGVkX18bpPWeHcecY+Xm7EZVa7aEcYM1RSwCyVME9Nk6iuG6cIrYZL4l1kZ3hFoZcBJKRjs1DBf0LZgegubSuVU2VFxEY3/b6ysBwMBZyX270+hNiXEW6zqkc3gP4gD4U89q8Szv/QquDj/Kv0YD4PkRJvHMy3drKnVSSY5Qcl1nrQa5M6Q0IXF7hgclc9c+VxY5U20hyAXB78cTawgZGAgnO3X3IJfR9KIHfI81KuEQZvMhMdM2kjUSwzyYMLwp2IA4/zRM6WMPjUBPxdiIv0cWydpbqwE77DHbiSrpuR/tDOcV/jLhVzCGJhHUrrFUr91nvf9nxPzHUPHVQ3lGfadAYheCdgQrhipqpv6UjmqD/rCU7k6NrMPYdz3ody3kR/SDLzLpC2bGRSw++rI5u64bZarBSm/Kjx3ETAz+cT7k5YfOnT0+DwQAkyZ5UiB/RY2pA3180H5LEDdrQ0F6rJTTjLlbwO1gc+oYnaRrQWuanlOVpWTf79S/zgtchJWc2n4+WaAeqmkBl35K2IkXycSPmsjYYs9aeozPSnc0QqFmNloT7pzI3wB8l/2dWfvAttMBCrWm5IqWYN+2IOdnZuU/ArQdp4X8Y64q1jUX26pNxgGWofvjlWiJ4XFq/i1/YWwB/aTPelLJdsCeJTrLASn5WH1varz1PXJQ/OKQflP61kUO1D9yBfz29vIRn1zGenURvzAvnsQ0Iq13ibzOFWZ7KeGZhemv2tQ0Y3wDa0YRkqNQMXIbVmYzoaHZ0AwVEtiw5rGClELd8o63HVFmP8nhlpLauDa/uCFFa3He9z3yersBfQfI67lKQuREh4W10AbSyFiAHLYo1Ub7sJ79brBT3sAqVlGd3Lk6bt4dE8Exf+DwgkSWVshipeF9D29z34BM6gWejDLwWUeTFX1zxd2M9bBYaS30r/ZPmZZLQRHKQImgmDA0lv8SUE7+b/42qN1M4nyeIgjchiZFv/4Ix+hC1lAx+E39qmqo3Klqa+g0fD41Qlcnwq6VAEnoTMye/WFjTdn5RCGU55Ypmg=='
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