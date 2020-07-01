/* var data = {
    updateTime: '2020-06-30',
    content: [{
        title: '最近在看',
        type: 'video',
        list: [
            { content: `(直播) <a href="https://www.huya.com/lastpriest" target="_blank">老中医 @虎牙</a> 炉石传说`, updateTime: '2020-06-30' },
            { content: `(直播) <a href="https://live.bilibili.com/528" target="_blank">痒局长 @Bilibili</a> 绝地求生 狼人杀`, updateTime: '2020-06-30' },
            { content: `(直播) <a href="https://live.bilibili.com/462" target="_blank">老骚豆腐 @Bilibili</a> 第五人格 狼人杀`, updateTime: '2020-06-28' },
            { content: `(直播) <a href="https://live.bilibili.com/6" target="_blank">LPL @Bilibili</a> 英雄联盟`, updateTime: '2020-06-30' },
        ]
    },
    {
        title: '最近在听',
        type: 'music',
        list: [
            { content: `<a href="https://y.qq.com/n/yqq/song/001jyikY2o3FrL.html" target="_blank">椎名豪, 中川奈美 - 竈門炭治郎のうた</a>`, updateTime: '2020-06-28' }
        ]
    },
    {
        title: '最近在玩',
        type: 'game',
        list: [
            { content: `<a href="https://lol.qq.com" target="_blank">英雄联盟</a> League of Legends`, updateTime: '2020-06-30' },
            { content: `<a href="https://mc.163.com" target="_blank">我的世界</a> Minecraft`, updateTime: '2020-06-24' },
            { content: `<a href="https://store.steampowered.com/app/493340/Planet_Coaster/" target="_blank">过山车之星</a> Planet Coaster`, updateTime: '2020-06-08' },
            { content: `<a href="https://sc2.blizzard.cn/" target="_blank">星际争霸2</a> Starcraft II`, updateTime: '2019-12-25' },
        ]
    },
    {
        title: '最近在读',
        type: 'game',
        list: [
            { content: `<a href="https://mp.weixin.qq.com/s/mI_zTi8xFIYoZVlY6oQJtw" target="_blank">家庭的未来：从社会原子化到社会化抚养</a>`, updateTime: '2020-06-30' }
        ]
    }
    ]
} */

/* md to json */
var mddata = `- updateTime: 2020-06-30

# 最近在看

- type: video

* [2020-06-30] (直播) [老中医 @虎牙](https://www.huya.com/lastpriest) 炉石传说
* [2020-06-30] (直播) [痒局长 @Bilibili](https://live.bilibili.com/528) 绝地求生 狼人杀
* [2020-06-28] (直播) [老骚豆腐 @Bilibili](https://live.bilibili.com/462) 第五人格 狼人杀
* [2020-06-28] (直播) [LPL @Bilibili](https://live.bilibili.com/6) 英雄联盟

# 最近在听

- type: music

* [2020-06-28] [椎名豪, 中川奈美 - 竈門炭治郎のうた](https://y.qq.com/n/yqq/song/001jyikY2o3FrL.html)

# 最近在玩

- type: game

* [2020-06-30] [英雄联盟](https://lol.qq.com) League of Legends
* [2020-06-24] [我的世界](https://mc.163.com) Minecraft
* [2020-06-08] [过山车之星](https://store.steampowered.com/app/493340/Planet_Coaster) Planet Coaster
* [2019-12-25] [星际争霸](https://sc2.blizzard.cn) StarCraft II

# 最近在读

- type: text

* [2020-06-30] [家庭的未来：从社会原子化到社会化抚养](https://mp.weixin.qq.com/s/mI_zTi8xFIYoZVlY6oQJtw)`;

function getData() {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "./md/data.md", false); // 同步请求
    oReq.send(null);//发送数据需要自定义，这里发送的是JSON结构
    var result = oReq.responseText;//响应结果
    return result;
}

var md = markdownit();
function toJSO(mddata) {
    var data = {};
    var parse = md.parse(mddata, {});
    var _this = data;
    var type = '';
    var block = {};
    // console.log('parse',parse);
    for (var i = 0; i < parse.length; i++) {
        var o = parse[i];

        // 属性处理 '- attr: value'
        if (o.type == 'bullet_list_open' && o.markup == '-') {
            // 进入属性处理
            type = 'attr';
        }
        if (o.type == 'inline' && type == 'attr') {
            // 获取属性和值
            var t = o.content.split(': ', 2);
            // console.log('attr:value',t);
            _this[t[0]] = t[1];
        }
        if (o.type == 'bullet_list_close' && o.markup == '-') {
            // 退出属性处理
            type = '';
        }

        // 块处理 '# title'
        if (o.type == 'heading_open' && o.markup == '#') {
            // 退出上一个块
            if (Object.keys(block).length != 0) // 上一个块非空
            {
                _this = data; // 如需实现多层嵌套，需修改此部分逻辑
                _this.content.push(block);
            }
            // 进入下一个块
            if (!_this.content) _this.content = [];
            block = {};
            _this = block;
            // 进入标题处理
            type = 'title';
        }
        if (o.type == 'inline' && type == 'title') {
            // 写入标题
            _this['title'] = o.content;
        }
        if (o.type == 'heading_close' && type == 'title') {
            // 退出标题处理
            type = '';
        }

        // 列表处理 '* [updateTime] content'
        if (o.type == 'bullet_list_open' && o.markup == '*') {
            // 进入列表处理
            _this['list'] = [];
            type = 'list';
        }
        if (o.type == 'inline' && type == 'list') {
            // 写入列表内容
            var reg = /\[(.+?)\]/;
            var upT = o.content.match(reg)[1];
            var con = md.renderInline(o.content.replace(reg, '').replace(/(^\s*)|(\s*$)/g, ""));
            _this['list'].push({
                content: con,
                updateTime: upT
            });
        }
        if (o.type == 'bullet_list_close' && o.markup == '*') {
            // 退出列表处理
            type = '';
        }

    }

    _this = data;
    if (_this.content) if (Object.keys(block).length != 0) // 上一个块非空
    {
        _this.content.push(block);
        block = {};
    }
    return data;
}

var data = toJSO(mddata);
console.log(data);