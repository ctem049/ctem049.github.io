var debug
// 加载播放器
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    // lrcType: 3,
    audio: [/* {name: 'name', artist: 'artist', url: 'url.mp3', cover: 'cover.jpg'} */]
});
// 使用主密钥加密的地址前后缀(json)
var uenc = 'U2FsdGVkX188RHqfd4WPXBGnBO6UccRJNs1nTJdTesAATRSjWm49jYR9M6Olyhg7hkTKizOvKm7zFbgLtW4OsGjOSvVqRivhlMk60ZcNxt/tlU7kJFBrMxGbCp5/Hmk+NNhzgjfpeyyb62q5n2UTbQoZcaNIn+Plgt3mnlffygg398w3g3GpYstpQVl3OEKI/qCIoRbKHA5qC6eTW9L6XeXz30tcL3uzSnHdIDmdwPO+SoWt6xNzGQJpO3s1kqnrY5FQ8HRT5EieJDeexjQv4iKLN8oLAuy8wX6DLNROBF0v3fxqMhINb5MueUR7kfoDzvnpDPknFG9KaBrt/EhM8Q1pzwg5chIwIAJHhGsXoi5G0W7tZRYWxlgvQ1zwLqFg8FhG4o+V8ZU/MbRViUVnLsQ0jooVOV4lBxCWqBlGzaf/JQgihY7bMjHcOVB6q+bLiiVvYvnFSRPPP74TuFSxLhFRMjfEITZ8QIIMIwFVWcxRBykooPzLbjMDBW3gKtFnBv/W9mTagioo+l+vOFHqRY+6wvcbWsCe+gdkYxJcs8Sj9ElZwTzjIkErVRVEYdV/HSBlNQCJGl3/3wGWQ9aZ1meIOr+/2smop2QeeZxjGsXhPtkAmaVHJieDNMax3Rm80h/yRWc2cuf5nf6ZXgUqHx7U1+bSsGGE7HxXX90jTQF6FzjBbpSYJEPx5k3e9qD7DpBwbmfKZZ9Pzj3uqcYt9+N6HtpVzhz+N8nm+KIvNj3kpjQCL9CMV9QA/EXntYbBFd8Loh3CWHNXAIGgJJsjgZDhZ1Ry4De3uI6+g9bE7JNz/SLeN20KbTqyvqjdk7GN+J0hwa1+0a+3kJ3pwdvvUW4glCTlZmza57ac9P3YFWZZWwwJzeg7I0/26jiS6JD3'
var app = new Vue({
    el: "#app",
    data: {
        /** 主密钥 */
        key: '',
        /** 主密钥AES */
        keyaes: ['U2FsdGVkX1/qa5HqCSdaIEWPElruyFynRhFmEBhVeeE=', 'U2FsdGVkX19hTCkEb5fCD4XWAbcOKGP8ZUWnr2wGPHM='],
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
            if (song.lrc != "") { song.lrc = this.getFileUrl(encodeURI(song.lrc), u) }

            if (action == 'play') {
                // 添加到列表并播放
                ap.list.add(s)
                ap.list.switch(ap.list.audios.length - 1)
                ap.play()
                ap.seek(0)
            }
            else if (action = 'add') {
                ap.list.add(s)
            }
            else if (action = 'down') {
                window.open(s.url)
            }
            else if (action = 'lrc') {
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
                return this.songs.filter(v =>
                    (v.name.indexOf(this.search) >= 0)
                    || (v.artist.indexOf(this.search) >= 0)
                )
            }
        }
    },
    mounted() {
        this.songs = songs
    }
});