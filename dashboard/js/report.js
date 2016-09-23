$(document).ready(function(){
    $('#downloadReport').click(function(){

        $.post('php/getsurveyreport.php', {module_id: 1} ,function(response) {
            var data=[];
            if (response.charAt(response.length - 3) == ',') {
                response = response.substr(0, response.length - 3) + "]";
            }
            var response = JSON.parse(response);
            // console.log(response);
            $.each(response, function(key, val) {
                var ans = val.answers.split(',');
                data.push({
                    "name":val.name,"email":val.email,"last_login":val.last_login,
                    "pre_q1": ans[0],"pre_q2": ans[1],"pre_q3": ans[2],"pre_q4": ans[3],"pre_q5": ans[4],"pre_q6": ans[5],"pre_q7": ans[6],
                    "post_q1": ans[7],"post_q2": ans[8],"post_q3": ans[9],"post_q4": ans[10],"post_q5": ans[11],"post_q6": ans[12],"post_q7": ans[13]
                })

                // console.log(data)
                
            });

            JSONToCSVConvertor(data, "PreSurvey_Report","Survey");
        });

        $.post('php/gettestreport.php', {module_id: 1} ,function(response) {
            var data=[];
            if (response.charAt(response.length - 3) == ',') {
                response = response.substr(0, response.length - 3) + "]";
            }
            var response = JSON.parse(response);
            // console.log(response);
            $.each(response, function(key, val) {
                var ans = val.answers.split(',');
                data.push({
                    "name":val.name,"email":val.email,"last_login":val.last_login,
                    "pre_q1": ans[0],"pre_q2": ans[1],"pre_q3": ans[2],"pre_q4": ans[3],"pre_q5": ans[4],"pre_q6": ans[5],"pre_q7": ans[6],
                    "post_q1": ans[7],"post_q2": ans[8],"post_q3": ans[9],"post_q4": ans[10],"post_q5": ans[11],"post_q6": ans[12],"post_q7": ans[13]
                })

                // console.log(data)
                
            });

            JSONToCSVConvertor(data, "PreTest_Report","Test");
        });

        $.post('php/getrqreport.php', {module_id: 1} ,function(response) {
            var data=[];
            if (response.charAt(response.length - 3) == ',') {
                response = response.substr(0, response.length - 3) + "]";
            }
            var response = JSON.parse(response);
            // console.log(response);
            $.each(response, function(key, val) {
                var ans = val.attempts.split('*');
                data.push({
                    "name":val.name,"email":val.email,"last_login":val.last_login,
                    "rq_q1": ans[0],"rq_q2": ans[1],"rq_q3": ans[2],"rq_q4": ans[3]
                })

                // console.log(data)
                
            });

            JSONToCSVConvertor_recursive(data, "Recursive_Report");
        });

    });
});

function JSONToCSVConvertor(JSONData, ReportTitle, Type) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = 'Name,Email,Last Login,Pre '+Type+',,,,,,,Post '+Type+'\r\n,,,Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q1,Q2,Q3,Q4,Q5,Q6,Q7\r\n';
    
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "ALIVE_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}




function JSONToCSVConvertor_recursive(JSONData, ReportTitle) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = 'Name,Email,Last Login,Recursive Scenario\r\n,,,Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9,Q10\r\n';
    
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "ALIVE_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}