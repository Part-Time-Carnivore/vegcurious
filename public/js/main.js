var main = new Vue({
    el: 'main',
    data: {
        log: [],
        completeLog: [
            {date: yesterday, stuff: []}, 
            {date: today, stuff: []}
        ],
        stuff: veg
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
        }
    },
    created: function() {
        
        // sort stuff
        this.stuff.sort(compare);
        
        // check for log in local storage
        if (window.localStorage && localStorage.vegLog) {
            // set log using stored data
            this.log = JSON.parse(localStorage['vegLog']);
            
            // create logArray from log plus missing days
            var logArray = [];
            var thisDay = new Date();
            var prevDay = new Date();
            function missingDay(prevDay, thisDay) {
                // while there is a gap between thisDay and prevDay
                while (prevDay < thisDay - day) {
                    
                    // update prev day to next day
                    prevDay = new Date(prevDay.getTime() + day);
                    missingDate = prevDay.toISOString().split('T')[0];
                    
                    // add missing day
                    logArray.unshift({date: missingDate, stuff: []});
                }
            }
            this.log.forEach(function(d) {
                // set this day to each day in log and fill in missing days
                thisDay = new Date(d.date);
                missingDay(prevDay, thisDay);
                
                // once any missing days have been added, add this day
                logArray.unshift({date: d.date, stuff: d.stuff});
                
                // update prevDay for next loop
                prevDay = thisDay;
            });
            
            // set this day to today fill in missing days up to today
            thisDay = new Date();
            missingDay(prevDay, thisDay);
            
            // set copleteLog
            this.completeLog = logArray;
        }
    },
    methods: {
        updateLog: function() {
            
            //update the log (omitting forgotten days) and update local storage
            return this.completeLog;
        }
    }
});