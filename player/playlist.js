/**
 * 获取songs.txt和playlist.md得到列表
 * 列表格式：
 * songs = [
 * {name: '歌名', artist: '艺术家', url: '文件名', lrc:'歌词文件名', cover: '封面url'}
 * playlists = []
 * ]
 */

var playlistmd = `# 2010b

银临、云の泣 - 锦鲤抄.flac
李荣浩 - 不将就.flac
许美静 - 城里的月光.flac
周深 - 大鱼.flac

# test xu

许嵩 - 我乐意.flac
许嵩 - 我们的恋爱是对生命的严重浪费.flac`

var songstxt = `许嵩 - 惊鸿一面.flac
许嵩 - 想象之中Imagination.flac
许嵩 - 我乐意.flac
许嵩 - 我们的恋爱是对生命的严重浪费.flac
许嵩 - 我想牵着你的手.flac
许嵩 - 摆脱.flac`

// 获取songs.txt
function getSongs() {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "./songs.txt?" + new Date().getTime(), false);
    oReq.send(null);
    var result = oReq.responseText;
    return result;
}
try {
    var result = getSongs();
    if (result) {
        songstxt = result;
    }
} catch (e) {
    console.log(e);
}
// 分割为songs
var songs = [{ name: 'name', artist: 'artist', url: 'url.mp3', cover: 'cover.jpg', lrc: 'lrc.lrc' }] // songs模板
songs = songscomp(songstxt)
function songscomp(songstxt) {
    var songs = []
    songstxt.split('\n').forEach(v => {
        var sp = v.split(/ - |\./) // 0歌手 1歌名 2后缀
        var artist = sp[0].replace(/、/g, ',')
        var name = sp[1]
        var sp2 = v.split('.')
        sp2[sp2.length - 1] = 'lrc'
        var lrc = sp2.join('.')
        var cover = '' // 暂不解决cover
        songs.push({ name: name, artist: artist, url: v, cover: cover, lrc: lrc })
    })
    return songs
}

// 获取playlist.md
function getPlaylist() {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "./playlist.md?" + new Date().getTime(), false); // 同步请求
    oReq.send(null);//发送数据需要自定义，这里发送的是JSON结构
    var result = oReq.responseText;//响应结果
    return result;
}
try {
    var result = getPlaylist();
    if (result) {
        playlistmd = result;
    }
} catch (e) {
    console.log(e);
}
// 1 按行分割
var mdsplit = playlistmd.split('\n')
var playlists = [{
    name: 'plname', content: ['filename']
}]
// 2 分割为播放列表
playlists = mdcomp(mdsplit)
function mdcomp(mdsplit) {
    var inlist = false
    var intable = false
    var tablestart = true
    var keys = []
    var values = []
    var list = {}
    var lists = []
    mdsplit.forEach(v => {
        if (v.startsWith('# ')) {
            if (inlist) {
                lists.push(list)
            }
            inlist = true
            list = { name: v.slice(2), content: [] }
        }
        if (v.indexOf('.') >= 0) {
            list.content.push(v)
        }
    })
    lists.push(list)
    return lists
}