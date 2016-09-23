var config = {
    module_id: 1,
    selected_users: []
};

/*For PULSE animation on HOVER over image*/
$("#module1, #module2, #module3, #module4, #preSurveyBtn, #postSurveyBtn, #preTestBtn, #postTestBtn").hover(
    function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated pulse').one(animationEnd, function() {
            $(this).removeClass('animated pulse');
        });
    },
    function() {

    }
);

var module_name;
$('.goback').click(function(e) {
    // $('#moduleDetail').fadeOut('slow', function() {
    //     $('.page-header').html("Fire Department of the City of New York");
    //     $('#modulePage').fadeIn('fast');
    //     try{dataTable.destroy();
    //         dataTable=null
    //     }catch(e){

    //     }
    // });
    window.location.reload()
});


$('#module1').click(function(e) {
    config.module_id = 1;
    config.selected_users = [];
    $('#modulePage').fadeOut('slow', function() {
        module_name = $('#module1').next('h4').html();
        $('.page-header').append('<small> - ' + module_name + '</small>');
        $('#moduleDetail').fadeIn('fast');
        drawGrid(module_1_users);
        // renderRadarChart();
        drawCharts();
    });
});
$('#module2').click(function(e) {
    config.module_id = 2;
    config.selected_users = [];
    $('#modulePage').fadeOut('slow', function() {
        module_name = $('#module2').next('h4').html();
        $('.page-header').append('<small> - ' + module_name + '</small>');
        $('#moduleDetail').fadeIn('fast');
        drawGrid(module_2_users);
        drawCharts();
    });
});
$('#module3').click(function(e) {
    config.module_id = 3;
    config.selected_users = [];
    $('#modulePage').fadeOut('slow', function() {
        module_name = $('#module3').next('h4').html();
        $('.page-header').append('<small> - ' + module_name + '</small>');
        $('#moduleDetail').fadeIn('fast');
        drawGrid(module_3_users);
        drawCharts();
    });
});
$('#module4').click(function(e) {
    config.module_id = 4;
    config.selected_users = [];
    $('#modulePage').fadeOut('slow', function() {
        $('.page-header').append(" - Module 4");
        $('#moduleDetail').fadeIn('fast');
        drawGrid(null);
        drawCharts();
    });
});



var dataTable = null;

function drawGrid(users) {
    // console.log("*******DRAW TABLE**********")
    dataTable = $('#example').DataTable({
        data: users,
        select: {
            style: 'multi'
        },
        buttons: [{
            text: 'Get selected data',
            // action: function () {
            //     var count = table.rows( { selected: true } ).count();

            //     //events.prepend( '<div>'+count+' row(s) selected</div>' );
            // }
        }],
        "columns": [{
            "data": "session_id"
        }, {
            "data": "email"
        }, {
            "data": "last_login"
        }, {
            "data": "pretest"
        }, {
            "data": "posttest"
        }],
        "createdRow": function(row, data, index) {

            //console.log(data)
            if (data.posttest >= 90) {
                $(row).css('color', '#2ecc71');
            } else if (data.posttest >= 80 && data.posttest < 90) {
                $(row).css('color', '#f1c40f');
            } else {
                $(row).css('color', '#c0392b');
            }
        }
    });

    dataTable.on('select', function(e, dt, type, indexes) {
        console.log(config.selected_users);
        if (type === 'row') {
            var session_id = dataTable.rows(indexes).data()[0].session_id;
            var id_list = '';
            config.selected_users.push(session_id);
            $('#selectedIds').val('');
            for (var i = 0; i < config.selected_users.length; i++) {
                id_list += config.selected_users[i] + " ";
            }
            if (id_list == '') {
                $('#selectedIds').val('None');
            } else {
                $('#selectedIds').val(id_list);
            }

        }
    });

    dataTable.on('deselect', function(e, dt, type, indexes) {
        if (type === 'row') {
            var session_id = dataTable.rows(indexes).data()[0].session_id;
            config.selected_users = $.grep(config.selected_users, function(i) {
                return i !== session_id;
            });
            var id_list = '';
            $('#selectedIds').val('');
            for (var i = 0; i < config.selected_users.length; i++) {
                id_list += config.selected_users[i] + " ";
            }
            if (id_list == '') {
                $('#selectedIds').val('None');
            } else {
                $('#selectedIds').val(id_list);
            }


            // $('#selectedIds').append(session_id + "  ");
        }
    });



    var selectItem = function(item) {
        config.selected_users.push(item);
        $('#selectedIds').html('');
        for (var i = 0; i < config.selected_users.length; i++) {
            $('#selectedIds').append(config.selected_users[i].email + " ");
        }
    };

    var unselectItem = function(item) {
        config.selected_users = $.grep(config.selected_users, function(i) {
            return i !== item;
        });

        $('#selectedIds').html('');
        for (var i = 0; i < config.selected_users.length; i++) {
            $('#selectedIds').append(config.selected_users[i].email + " ");
        }
    };


}




// Chart.defaults.global.legend.display = false;


function drawCharts() {
    drawSurveyCharts();
    drawTestCharts();
    drawRecursiveChart();
}


$('#updateChart').click(function() {
    drawCharts();

})

function drawSurveyCharts() {
    var session_id = -1;

    if (config.selected_users.length <= 0) {
        session_id = -1;
    } else {
        session_id = config.selected_users.toString()
    }

    var PRESURV_global_avg_response = [];
    var PRESURV_dept_avg_response = [];
    var PRESURV_selected_avg_response = [];
    var POSTSURV_global_avg_response = [];
    var POSTSURV_dept_avg_response = [];
    var POSTSURV_selected_avg_response = [];


    $.post('php/getsurvey.php', {
        session_id: session_id,
        module_id: config.module_id
    }, function(response4) {

        var response4 = JSON.parse(response4);
        console.info("*** SURVEY RESPONSES *** ");
        console.log(response4);
        $.each(response4, function(key, val) {

            switch (val.type) {
                case "PRESURV":
                    PRESURV_global_avg_response.push(parseInt(val.global_avg_response));
                    PRESURV_dept_avg_response.push(parseInt(val.dept_avg_response));
                    PRESURV_selected_avg_response.push(parseInt(val.selected_avg_response));
                    break;
                case "POSTSURV":
                    POSTSURV_global_avg_response.push(parseInt(val.global_avg_response));
                    POSTSURV_dept_avg_response.push(parseInt(val.dept_avg_response));
                    POSTSURV_selected_avg_response.push(parseInt(val.selected_avg_response));
                    break;
            }
        });


        $('#radar1').highcharts({
            credits: {
                enabled: false
            },

            chart: {
                polar: true,
                type: 'area'
            },

            title: {
                useHTML: true,
                text: '<a href="data/pretest.pdf" target="_blank" style="font-size:14px">Pre Survey</a>',
                margin: 0
            },

            pane: {
                size: '70%'
            },

            xAxis: {
                categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
                tickmarkPlacement: 'on',
                lineWidth: 0,
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                max: 10,
                tickInterval: 2

            },

            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },

            legend: {
                enabled: false,
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },

            series: [{
                name: 'Selected',
                data: PRESURV_selected_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[3],
                fillOpacity: 0.2

            }, {
                name: 'Department',
                data: PRESURV_dept_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[4],
                fillOpacity: 0.2
            }, {
                name: 'Global',
                data: PRESURV_global_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[5],
                fillOpacity: 0.2
            }]

        });

        /*END of PRE SURVEY*/

        $('#radar2').highcharts({
            credits: {
                enabled: false
            },
            chart: {
                polar: true,
                type: 'area'
            },

            title: {
                useHTML: true,
                text: '<a href="data/pretest.pdf" target="_blank" style="font-size:14px">Post Survey</a>',
                margin: 0
            },

            pane: {
                size: '70%'
            },

            xAxis: {
                categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
                tickmarkPlacement: 'on',
                lineWidth: 0,
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                max: 10,
                tickInterval: 2

            },

            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },

            legend: {
                enabled: false,
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },

            series: [{
                name: 'Selected',
                data: POSTSURV_selected_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[3],
                fillOpacity: 0.2

            }, {
                name: 'Department',
                data: POSTSURV_dept_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[4],
                fillOpacity: 0.2
            }, {
                name: 'Global',
                data: POSTSURV_global_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[5],
                fillOpacity: 0.2
            }]

        });
        /*END of POST SURVEY*/



    });

}

function drawTestCharts() {

    var session_id = -1;

    var PRETEST_global_avg_response = [];
    var PRETEST_dept_avg_response = [];
    var PRETEST_selected_avg_response = [];
    var POSTTEST_global_avg_response = [];
    var POSTTEST_dept_avg_response = [];
    var POSTTEST_selected_avg_response = [];

    var obj = {
        PRETEST: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        POSTTEST: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    };


    if (config.selected_users.length <= 0) {
        session_id = -1;
    } else {
        session_id = config.selected_users.toString()
    }
    //var session_id = $('input[type="search"]').val();

    $.post('php/gettest.php', {
        session_id: session_id,
        module_id: config.module_id
    }, function(response1) {
        $.post('php/getanswers.php', {
            session_id: session_id,
            module_id: config.module_id
        }, function(response2) {


            var response2 = JSON.parse(response2);
            console.info("*** TEST RESPONSE ***");
            console.log(response2);
            $.each(response2, function(key, val) {
                // console.log(val.type+" "+val.question+" "+val.answer)
                if(val.answer != -1) { // skip answers wuth -1
                obj[val.type][val.question - 1][val.answer] = {};
                obj[val.type][val.question - 1][val.answer]["S"] = val.selected_count > 0 ? val.selected_count : 0;
                obj[val.type][val.question - 1][val.answer]["D"] = val.department_count > 0 ? val.department_count : 0;
                obj[val.type][val.question - 1][val.answer]["G"] = val.global_count > 0 ? val.global_count : 0;
                obj[val.type][val.question - 1]["correct_answer"] = val.correct_answer;
            }
            });

            // console.log(obj);
        });

        if (response1.charAt(response1.length - 3) == ',') {
            response1 = response1.substr(0, response1.length - 3) + "]";
        }
        var response1 = JSON.parse(response1);

        $.each(response1, function(key, val) {

            switch (val.type) {
                case "PRETEST":
                    val.global == "" ? PRETEST_global_avg_response.push(0) : PRETEST_global_avg_response.push(parseInt(val.global));
                    val.department == "" ? PRETEST_dept_avg_response.push(0) : PRETEST_dept_avg_response.push(parseInt(val.department));
                    val.selected == "" ? PRETEST_selected_avg_response.push(0) : PRETEST_selected_avg_response.push(parseInt(val.selected));
                    break;
                case "POSTTEST":
                    val.global == "" ? POSTTEST_global_avg_response.push(0) : POSTTEST_global_avg_response.push(parseInt(val.global));
                    val.department == "" ? POSTTEST_dept_avg_response.push(0) : POSTTEST_dept_avg_response.push(parseInt(val.department));
                    val.selected == "" ? POSTTEST_selected_avg_response.push(0) : POSTTEST_selected_avg_response.push(parseInt(val.selected));
                    break;
            }
        });



        $('#radar3').highcharts({
            credits: {
                enabled: false
            },
            chart: {
                polar: true,
                type: 'area'
            },

            title: {
                useHTML: true,
                text: '<a href="data/pretest.pdf" target="_blank" style="font-size:14px">Pre Test</a>',
                margin: 0
            },

            pane: {
                size: '70%'
            },

            xAxis: {
                categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15'],
                tickmarkPlacement: 'on',
                lineWidth: 0,
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                max: 100,
                //tickInterval: 20

            },

            tooltip: {
                shared: true,
                useHTML: true,
                formatter: function() {



                        var point_0_x = this.points[0] ? this.points[0].x : "-";
                        var point_1_x = this.points[1] ? this.points[1].x : "-";
                        var point_2_x = this.points[2] ? this.points[2].x : "-";
                        var point_0_y = this.points[0] ? this.points[0].y : "-";
                        var point_1_y = this.points[1] ? this.points[1].y : "-";
                        var point_2_y = this.points[2] ? this.points[2].y : "-";
                        var point_0_series_name = this.points[0] ? this.points[0].series.name : '-';
                        var point_1_series_name = this.points[1] ? this.points[1].series.name : '-';
                        var point_2_series_name = this.points[2] ? this.points[2].series.name : '-';
                        var point_0_series_color = this.points[0] ? this.points[0].series.color : '-';
                        var point_1_series_color = this.points[1] ? this.points[1].series.color : '-';
                        var point_2_series_color = this.points[2] ? this.points[2].series.color : '-';

                        var question = '<b>' + point_0_x + '</b></br>';
                        var seleted_name = '<span style="color:' + point_0_series_color + '">' + point_0_series_name + '</span>';
                        var department_name = '<span style="color:' + point_1_series_color + '">' + point_1_series_name + '</span>';
                        var global_name = '<span style="color:' + point_2_series_color + '">' + point_2_series_name + '</span>';

                        var selected = seleted_name + ': ' + point_0_y + '%</br>';
                        var department = department_name + ': ' + point_1_y + '%</br>';
                        var global = global_name + ': ' + point_2_y + '%</br>';

                        var q = point_0_x.substr(1) - 1;
                        var color = {}
                        color[obj.PRETEST[q].correct_answer] = '#2ecc71';
                        // console.log(color)
                        var table = '<table class="polarTable">' +
                            '<tr> <th></th>' +
                            '<th style="text-align:center;color:' + point_0_series_color + '">S</th>' +
                            '<th style="text-align:center;color:' + point_1_series_color + '">D</th>' +
                            '<th style="text-align:center;color:' + point_2_series_color + '">G</th>' +
                            '<tr style="color:' + color.a + '"> <td>a</td> <td>' + (obj.PRETEST[q].a ? obj.PRETEST[q].a.S : 0) + '</td> <td>' + (obj.PRETEST[q].a ? obj.PRETEST[q].a.D : 0) + '</td> <td>' + (obj.PRETEST[q].a ? obj.PRETEST[q].a.G : 0) + '</td> </tr>' +
                            '<tr style="color:' + color.b + '"> <td>b</td> <td>' + (obj.PRETEST[q].b ? obj.PRETEST[q].b.S : 0) + '</td> <td>' + (obj.PRETEST[q].b ? obj.PRETEST[q].b.D : 0) + '</td> <td>' + (obj.PRETEST[q].b ? obj.PRETEST[q].b.G : 0) + '</td> </tr>' +
                            '<tr style="color:' + color.c + '"> <td>c</td> <td>' + (obj.PRETEST[q].c ? obj.PRETEST[q].c.S : 0) + '</td> <td>' + (obj.PRETEST[q].c ? obj.PRETEST[q].c.D : 0) + '</td> <td>' + (obj.PRETEST[q].c ? obj.PRETEST[q].c.G : 0) + '</td> </tr>' +
                            '<tr style="color:' + color.d + '"> <td>d</td> <td>' + (obj.PRETEST[q].d ? obj.PRETEST[q].d.S : 0) + '</td> <td>' + (obj.PRETEST[q].d ? obj.PRETEST[q].d.D : 0) + '</td> <td>' + (obj.PRETEST[q].d ? obj.PRETEST[q].d.G : 0) + '</td> </tr>' +
                            '<tr style="color:' + color.e + '"> <td>e</td> <td>' + (obj.PRETEST[q].e ? obj.PRETEST[q].e.S : 0) + '</td> <td>' + (obj.PRETEST[q].e ? obj.PRETEST[q].e.D : 0) + '</td> <td>' + (obj.PRETEST[q].e ? obj.PRETEST[q].e.G : 0) + '</td> </tr>' +
                            '</table>';
                        return question + selected + department + global + '</br>' + table;

                    }
                    // pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/><br/>'
            },

            legend: {
                enabled: false,
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },

            series: [{
                name: 'Selected',
                data: PRETEST_selected_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[3],
                fillOpacity: 0.2

            }, {
                name: 'Department',
                data: PRETEST_dept_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[4],
                fillOpacity: 0.2
            }, {
                name: 'Global',
                data: PRETEST_global_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[5],
                fillOpacity: 0.2
            }]

        });

        /*END of PRE TEST*/



        $('#radar4').highcharts({
            credits: {
                enabled: false
            },
            chart: {
                polar: true,
                type: 'area'
            },

            title: {
                useHTML: true,
                text: '<a href="data/pretest.pdf" target="_blank" style="font-size:14px">Post Test</a>',
                margin: 0
            },

            pane: {
                size: '70%'
            },

            xAxis: {
                categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15'],
                tickmarkPlacement: 'on',
                lineWidth: 0,
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                max: 100,
                //tickInterval: 25

            },

            tooltip: {
                shared: true,
                useHTML: true,
                formatter: function() {

                        var point_0_x = this.points[0] ? this.points[0].x : "-";
                        var point_1_x = this.points[1] ? this.points[1].x : "-";
                        var point_2_x = this.points[2] ? this.points[2].x : "-";
                        var point_0_y = this.points[0] ? this.points[0].y : "-";
                        var point_1_y = this.points[1] ? this.points[1].y : "-";
                        var point_2_y = this.points[2] ? this.points[2].y : "-";
                        var point_0_series_name = this.points[0] ? this.points[0].series.name : '-';
                        var point_1_series_name = this.points[1] ? this.points[1].series.name : '-';
                        var point_2_series_name = this.points[2] ? this.points[2].series.name : '-';
                        var point_0_series_color = this.points[0] ? this.points[0].series.color : '-';
                        var point_1_series_color = this.points[1] ? this.points[1].series.color : '-';
                        var point_2_series_color = this.points[2] ? this.points[2].series.color : '-';

                        var question = '<b>' + point_0_x + '</b></br>';
                        var seleted_name = '<span style="color:' + point_0_series_color + '">' + point_0_series_name + '</span>';
                        var department_name = '<span style="color:' + point_1_series_color + '">' + point_1_series_name + '</span>';
                        var global_name = '<span style="color:' + point_2_series_color + '">' + point_2_series_name + '</span>';

                        var selected = seleted_name + ': ' + point_0_y + '%</br>';
                        var department = department_name + ': ' + point_1_y + '%</br>';
                        var global = global_name + ': ' + point_2_y + '%</br>';


                        var q = point_0_x.substr(1) - 1;
                        var color = {}
                        color[obj.POSTTEST[q].correct_answer] = '#2ecc71';
                        // console.log(color)
                        var table = '<table class="polarTable">' +
                            '<tr> <th></th>' +
                            '<th style="text-align:center;color:' + point_0_series_color + '">S</th>' +
                            '<th style="text-align:center;color:' + point_1_series_color + '">D</th>' +
                            '<th style="text-align:center;color:' + point_2_series_color + '">G</th>' +
                            '<tr style="color:' + color.a + '"> <td>a</td> <td>' + (obj.POSTTEST[q].a ? obj.POSTTEST[q].a.S : 0) + '</td> <td>' + (obj.POSTTEST[q].a ? obj.POSTTEST[q].a.D : 0) + '</td> <td>' + (obj.PRETEST[q].a ? obj.PRETEST[q].a.G : 0) + '</td> </tr>' +
                            '<tr style="color:' + color.b + '"> <td>b</td> <td>' + (obj.POSTTEST[q].b ? obj.POSTTEST[q].b.S : 0) + '</td> <td>' + (obj.POSTTEST[q].b ? obj.POSTTEST[q].b.D : 0) + '</td> <td>' + (obj.PRETEST[q].b ? obj.PRETEST[q].b.G : 0) + '</td> </tr>' +
                            '<tr style="color:' + color.c + '"> <td>c</td> <td>' + (obj.POSTTEST[q].c ? obj.POSTTEST[q].c.S : 0) + '</td> <td>' + (obj.POSTTEST[q].c ? obj.POSTTEST[q].c.D : 0) + '</td> <td>' + (obj.PRETEST[q].c ? obj.PRETEST[q].c.G : 0) + '</td> </tr>' +
                            '<tr style="color:' + color.d + '"> <td>d</td> <td>' + (obj.POSTTEST[q].d ? obj.POSTTEST[q].d.S : 0) + '</td> <td>' + (obj.POSTTEST[q].d ? obj.POSTTEST[q].d.D : 0) + '</td> <td>' + (obj.PRETEST[q].d ? obj.PRETEST[q].d.G : 0) + '</td> </tr>' +
                            '<tr style="color:' + color.e + '"> <td>e</td> <td>' + (obj.POSTTEST[q].e ? obj.POSTTEST[q].e.S : 0) + '</td> <td>' + (obj.POSTTEST[q].e ? obj.POSTTEST[q].e.D : 0) + '</td> <td>' + (obj.PRETEST[q].e ? obj.PRETEST[q].e.G : 0) + '</td> </tr>' +
                            '</table>';
                        return question + selected + department + global + '</br>' + table;

                    }
                    // pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/><br/>'
            },

            legend: {
                enabled: false,
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },

            series: [{
                name: 'Selected',
                data: POSTTEST_selected_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[3],
                fillOpacity: 0.2

            }, {
                name: 'Department',
                data: POSTTEST_dept_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[4],
                fillOpacity: 0.2
            }, {
                name: 'Global',
                data: POSTTEST_global_avg_response,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[5],
                fillOpacity: 0.2
            }]

        });

        /*END of POST TEST*/

        // console.log(PRETEST_selected_avg_response)
        // console.log(PRETEST_dept_avg_response)
        // console.log(PRETEST_global_avg_response)
        // console.log(POSTTEST_selected_avg_response)
        // console.log(POSTTEST_dept_avg_response)
        // console.log(POSTTEST_global_avg_response)
    });
    // console.log(session_id)


}


function drawRecursiveChart() {
    var session_id = -1;


    if (config.selected_users.length <= 0) {
        session_id = -1;
    } else {
        session_id = config.selected_users.toString()
    }

    var question_arr = [];
    var global_arr = [];
    var department_arr = [];
    var selected_arr = [];

    $.post('php/getrecursive.php', {
        session_id: session_id,
        module_id: config.module_id
    }, function(response) {
        console.info("*** RECURSIVE SCENARIO RESPONSE ***");
            console.log(response);

        var response = JSON.parse(response);

        // console.log(response)

        $.each(response, function(key, val) {

            question_arr.push('Q' + parseInt(val.question));
            global_arr.push(parseInt(val.global_percentage));
            department_arr.push(parseInt(val.department_percentage));
            selected_arr.push(parseInt(val.selected_percentage));
        });
        // console.log(question_arr)
        // console.log(global_arr)
        // console.log(department_arr)
        // console.log(selected_arr)




        $('#radar5').highcharts({
            credits: {
                enabled: false
            },
            chart: {
                polar: true,
                type: 'area'
            },

            title: {
                useHTML: true,
                // text: '',
                text: '<a href="data/pretest.pdf" target="_blank" style="font-size:14px">Recursive Scenario</a>',
                margin: 0
            },

            pane: {
                // size: '70%'
            },

            xAxis: {
                categories: question_arr,
                tickmarkPlacement: 'on',
                lineWidth: 0,
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                max: 100,
                // tickInterval: 2

            },

            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
            },

            legend: {
                enabled: false,
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },

            series: [{
                name: 'Global',
                data: global_arr,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[5],
                fillOpacity: 0.2
            }, {
                name: 'Department',
                data: department_arr,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[4],
                fillOpacity: 0.2
            }, {
                name: 'Selected',
                data: selected_arr,
                pointPlacement: 'on',
                color: Highcharts.getOptions().colors[3],
                fillOpacity: 0.2

            }]

        });

        /*END of RECURSIVE SCENARIO*/




    });
}
