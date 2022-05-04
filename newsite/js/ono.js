var app = new Vue({
    el: '#y-container',
    data: {
        logor: false,
        
    },
    methods: {
        daf(value, fmt = 'yyyy.MM.dd') {
            return new Date(value).format(fmt);
        }
    }
})