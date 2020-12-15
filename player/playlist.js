var playlistmd = `# 2010b

|artist|name|filename|lyric|cover|
|-----|-----|-----|-----|-----|
|银临,云の泣|锦鲤抄|银临、云の泣 - 锦鲤抄.flac|银临、云の泣 - 锦鲤抄.lrc|https://y.gtimg.cn/music/photo_new/T002R300x300M000001ojbuJ1JoQA1_1.jpg|
|李荣浩|不将就|李荣浩 - 不将就.flac|||
|许美静|城里的月光|许美静 - 城里的月光.flac|||
|周深|大鱼|周深 - 大鱼.flac|||
|司南|冬眠|司南 - 冬眠.flac|||
|欧得洋|孤单北半球|欧得洋 - 孤单北半球.flac|||
|王菲|红豆|王菲 - 红豆.flac|||
|霍尊|卷珠帘|霍尊 - 卷珠帘.flac|||
|梁静茹|暖暖|梁静茹 - 暖暖.flac|||
|王力宏|你不知道的事|王力宏 - 你不知道的事.flac|||
|孙燕姿|逆光|孙燕姿 - 逆光.flac|||
|桃十五&徐秉龙|青柠|徐秉龙、桃十五 - 青柠.flac|||
|林俊杰|她说|林俊杰 - 她說.flac|||
|许嵩/刘美麟|温泉|许嵩、刘美麟 - 温泉.flac|||
|周杰伦&温岚|屋顶|周杰伦、温岚 - 屋顶.flac|||
|杨沛宜|左手右手|杨沛宜 - 左手右手.flac|||`

// 获取playlist.md
function getPlaylist() {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "./playlist.md?"+new Date().getTime(), false); // 同步请求
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

var mdsplit = playlistmd.split('\n')
var playlists = [{
    name: 'plname', content: [
        { artist: '', name: '', filename: '', lyric: '', cover: '' }
    ]
}]

// md分割为播放列表
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
        if (v.startsWith('|')) {
            intable = true
            if (tablestart) {
                values = v.split('|')
                values.shift(1)
                var content = {}
                keys.forEach((v,i)=>{
                    content[v] = values[i]
                })
                // console.log(keys,values,content)
                list.content.push(content)
            } else {
                if (v.startsWith('|-')) {
                    tablestart = true
                } else {
                    keys = v.split('|').filter(Boolean)
                    // console.log('keys', keys, v)
                }
            }
        } else {
            tablestart = false
            intable = false
        }
    })
    lists.push(list)
    return lists
}