var main = new Vue({
    el: 'main',
    data: {
        pb: 0,
        log: JSON.parse(localStorage['vegLog'])
    },
    computed: {
        stats: function () {
            var counts = [];
            var totalStuff = 0;
            this.log.forEach(function(d) {
                var count = d.stuff.length;
                counts.push(count);
                totalStuff += count;
            });
            return {
                ave: totalStuff/this.log.length,
                pb: Math.max.apply(null, counts)
            };
        },
        completeLog: function() {
            //generate a complete log adding forgotton days and days up to and including yesterday and today
            return this.log;
        }
    },
    methods: {
        updateLog: function() {
            //update the log (omitting forgotten days) and update local storage
            return this.log;
        }
    }
});