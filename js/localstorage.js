// needs rewriting for vegcurious purposes 
if (window.localStorage){
    if ( $( '.thisteam' ).length ) {
        //store team
        var thisteam = $( '.thisteam' ).html();
        localStorage.storedteam = thisteam;
        var teams = [];
        //store child teams
        if ($('#toplevel-groups-list .item-title a').length){
            $('#toplevel-groups-list .item-title a').each(function(i, element) {
                teams.push($(this).html());
            });
        localStorage["teams"] = JSON.stringify(teams);
        } else {
            localStorage.removeItem('teams');
        }
        //store parent team
        if ($('#item-header-content .parent').length){
            var parentteam = $('#item-header-content .parent').html();
            localStorage.parentteam = parentteam;
        } else {
            localStorage.removeItem('parentteam');
        }
    }
    if (localStorage.storedteam){ 
        $( '.myteam' ).append( localStorage.storedteam );
        if (localStorage.parentteam){
            //Signup field replacement
            $( '#gform_1 #field_1_5' ).remove();
        }
        var jointeam = $('.fix .myteam a').html();
        //$( '#gform_1 #field_1_7 input' ).val(jointeam);
        $( '#gform_1 #field_1_9 .gfield_label').append(': <span id="team-name">' + jointeam + '</span>');
        var selectTeams = [];
        selectTeams.push('<option value="' + jointeam + '">teams in ' + jointeam + '...</option>');
        if (localStorage["teams"]) {
            var storedTeams = JSON.parse(localStorage["teams"])
            $.each( storedTeams, function(i, teamName) {
                selectTeams.push('<option value="'+ teamName +'">'+ teamName +'</option>');
            });
        } else {
            $( '#gform_1 #field_1_9 .ginput_container' ).addClass('invisible');
        }
        $('#input_1_9').html(selectTeams.join(''));
    } else {
        $( '#gform_1 #field_1_9' ).remove();
    }
}
