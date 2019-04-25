// global variables
day = 24*60*60*1000;
today = new Date().toISOString().split('T')[0];
yesterday = new Date((new Date().valueOf() - day)).toISOString().split('T')[0];

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
    methods: {
        updateLog: function() {
            
            //update the log (omitting forgotten days) and update local storage
            return this.completeLog;
        },
        initSelectize: function () {
            $('select').selectize({
                closeAfterSelect: true,
                plugins: ['remove_button'],
                onItemAdd:function() {
                $('.selectize-dropdown').addClass('hidden');
                }
            });
            $('.selectize-dropdown').addClass('hidden');
        },
        dayNames: function() {
            // replace date for today and yesterday
            $('main label:first-of-type time').html('Today');
            $('main label:nth-of-type(2) time').html('Yesterday');
            $('main label:nth-of-type(n+3):nth-of-type(-n+7) time').each(function(){
                var d = new Date($(this).html());
                var weekday = new Array(7);
                weekday[0] = 'Sunday';
                weekday[1] = 'Monday';
                weekday[2] = 'Tuesday';
                weekday[3] = 'Wednesday';
                weekday[4] = 'Thursday';
                weekday[5] = 'Friday';
                weekday[6] = 'Saturday';
                var dayName = weekday[d.getDay()];
                $(this).html(dayName);
            });
        }
    },
    created: function() {
        
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
    mounted: function () {
        this.dayNames();
        this.initSelectize();
        // only show options when text is entered
        $('main input').on('input change focus blur', function(){
            $('main input:focus').closest('.items')
                .addClass('highlight')
                .closest('label').siblings().find('.items')
                .removeClass('highlight');
            // show dropdown if there is text in input
            if ($(this).val().length > 0) {
                $('.selectize-dropdown').removeClass('hidden');
            } else {
                $('.selectize-dropdown').addClass('hidden');
            }
        });
    }
});