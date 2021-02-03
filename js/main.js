var app = new Vue({
    el: '#app',
    data: { data: data, logor: true },
    methods: {
        daf(value, fmt = 'yyyy.MM.dd') {
            return new Date(value).format(fmt);
        },
        /**
         * 计算日期颜色饱和度
         * @returns {number} 0%~100%
         */
        cacColor(date) {
            var now = Date.parse(data.updateTime);
            var d = Date.parse(date);
            var time = Math.log(now - d);
            // 18 ~ 24
            if (time <= 18) {
                return '100%'
            } else if (time >= 24) {
                return '0%'
            } else {
                var t = 100 - (time - 18) / 6 * 100;
                return Math.floor(t).toString() + '%';
            }
        },
        cacStyle(date) {
            return `hsl(200,${this.cacColor(date)},50%)`;
        }
    },
    filters: {
        daf(value, fmt = 'yyyy.MM.dd') {
            return new Date(value).format(fmt);
        }
    }
})