/*Function to shuffle elements of an array*/
function Shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};



var QuizHelper = {
    track_PRESURV_answers : [-1, -1, -1, -1, -1, -1, -1],
    track_POSTSURV_answers : [-1, -1, -1, -1, -1, -1, -1],
    track_PRETEST_answers : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    track_POSTTEST_answers : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    PRESURV_flag: false,
    PRESURV_counter: 1,
    POSTSURV_flag: false,
    POSTSURV_counter: 1,

    PRETEST_flag: false,
    POSTTEST_flag: false,
    PRETEST_counter: 1,
    POSTTEST_counter: 1,

    SURV_data: [
        "1)I have a very good understanding of what a wind-driven high-rise fire is.",
        "2)I have a very good understanding of how a wind-driven high-rise fire develops.",
        "3)I am NOT very confident in my ability to fight a wind-driven high-rise fire.",
        "4)I am NOT yet adequately trained in using specialized equipment for fighting wind-driven high-rise fires in the field.",
        "5)I have a very good understanding of the tactics for fighting wind-driven high-rise fires.",
        "6)I am concerned that if I faced a wind-driven high-rise fire in the field, I would not be able to respond successfully.",
        "7)On approaching a fire in my vehicle, I recognize the signs that tell me if this is a wind-driven fire."
    ],



    PRETEST_data: [{
        "question": "1)Which statement about size-up at a wind-driven high-rise fire is incorrect?",
        "options": [
            "a)In a building with scissor-type stairs, the apartment and stairway layout should be surveyed on the floor below the fire",
            "b)Size-up should include whether duplex apartments are present",
            "c)Length, size, and configuration of the public hallways are part of the size-up",
            "d)Checking the layout of the apartment below the fire apartment will be beneficial if possible",
            "e)The number of apartments per floor is a factor in size-up"
        ]
    }, {
        "question": "2)Which of the following ventilation profiles would indicate a wind-driven fire?<br><br><br>1. Flames lapping out of the top half of the window, auto exposing the apartment above<br>2. Heavy smoke leaving the window and immediately moving vertically<br>3. Fire venting sideways out of a window<br>4. Fire visible in an apartment, but not venting<br>5. Nothing visible from the exterior",
        "options": [
            "a)1,2",
            "b)1,3",
            "c)3,5",
            "d)1,4",
            "e)3,4"
        ]
    }, {
        "question": "3)Where should wind conditions be assessed to determine whether wind will be a factor at a fire?",
        "options": [
            "a)Based on the weather report received at the start of the tour",
            "b)The floor above the fire, assessed by the “floor above” team",
            "c)The street level upon arrival",
            "d)Fire visible in an apartment, but not venting",
            "e)During response"
        ]
    }, {
        "question": "4)Which of the following describes a correct way to control a 'flow path'?",
        "options": [
            "a)Closing the door to the fire apartment and the stairways on the fire floor",
            "b)Opening as many doors as possible will give multiple outlets for the fire,removing the flow path",
            "c)There is no way for members on scene to control a flow path",
            "d)Early ventilation be a high priority",
            "e)None of the above"
        ]
    }, {
        "question": "5)Which statement properly describes the movement of smoke and heat at a fire in a building?",
        "options": [
            "a)Smoke and heat always rise in the building",
            "b)Smoke and heat always move to the exterior of the building",
            "c)Smoke and heat always move from a higher pressure zone to a lower pressure zone",
            "d)Smoke and heat movement is not predictable"
        ]
    }, {
        "question": "6)Which of the following statements about wind blowing into a fire apartment window is incorrect?",
        "options": [
            "a)If the outside temperature is below freezing, the wind will cool the fire, reducing the danger to firefighters",
            "b)The wind is pressurizing the fire area",
            "c)The wind may over-pressurize the fire area, causing flames to occasionally vent out the window",
            "d)The situation may require alternative strategies and tactics in order to extinguish the fire"
        ]
    }, {
        "question": "7)When presented with wind blowing into a vented fire apartment window and the need to commence operations on the fire floor, which option is the best choice?",
        "options": [
            "a)Deploy a wind control device (WCD) over the open window",
            "b)Wait for the wind to die down",
            "c)Vent the remaining windows in the fire apartment from above",
            "d)Begin normal firefighting operations",
            "e)None of the above"
        ]
    }, {
        "question": "8)Which statement about the fireproof curtain (wind control device) is correct?",
        "options": [
            "a)The curtain is composed of material designed not to burn",
            "b)There are ropes attached to all 4 corners",
            "c)The curtain is approximately 6’ x 8’",
            "d)All of the above are correct",
            "e)None of the above are correct"
        ]
    }, {
        "question": "9)Which of the following statements about deploying the fireproof curtain (wind control device) is correct?",
        "options": [
            "a)Two firefighters are required to carry the curtain",
            "b)The member must fully vent the window above with the 6’ hook",
            "c)The member must have his or her face piece on when deploying the curtain,  and should not lean out of the window",
            "d)All of the above",
            "e)None of the above"
        ]
    }, {
        "question": "10)Which statement about positive pressure ventilation is correct?",
        "options": [
            "a)It uses the same concept as the SCBA face piece: the higher pressure inside the face piece does not allow contaminants to enter",
            "b)The goal is to make the stairwell a higher pressure zone than the fire",
            "c)It can be used to remove smoke from a stairwell",
            "d)All of the above"
        ]
    }, {
        "question": "11)When properly employed, positive pressure ventilation will result in which of the following?",
        "options": [
            "a)Increased visibility in the stairwell",
            "b)Increased heat in the stairwell",
            "c)Toxic smoke in the stairwell",
            "d)All of the above",
            "e)None of the above"
        ]
    }, {
        "question": "12)What is the proper angle for the positive pressure ventilation (PPV) fan to be set at?",
        "options": [
            "a)45 degrees",
            "b)80 degrees",
            "c)90 degrees",
            "d)100 degrees",
            "e)None of the above"
        ]
    }, {
        "question": "13)What is the main advantage of using positive pressure ventilation (PPV) fan(s) to pressurize the attack stairway?",
        "options": [
            "a)PPV eliminates wind from entering the apartment",
            "b)Fleeing occupants are comforted by the flow of air as they exit",
            "c)PPV increases visibility and reduces temperatures in the stairwell",
            "d)PPV draws the fire to the stairway",
            "e)None of the above"
        ]
    }, {
        "question": "14)Which of the following statements regarding the use of the high-rise nozzle is correct?",
        "options": [
            "a)The high-rise nozzle should only be used as a last resort after all other options have been exhausted",
            "b)The high-rise nozzle must be hooked into the window on the fire floor from below",
            "c)If no spotter is present, the officer should utilize the sound the stream is making to help determine proper placement and direction of the stream",
            "d)The proper pressure to supply the nozzle is 50 psi at the standpipe outlet"
        ]
    }, {
        "question": "15)Which of the following statements about using the high-rise nozzle is correct?",
        "options": [
            "a)The preferred spray is a fog pattern into the bottom of the window",
            "b)The stream should be deflected against the spandrel wall for optimal extinguishment",
            "c)The stream should be directed off the ceiling of the fire apartment",
            "d)The stream will have to be operated for 15 minutes to 30 minutes to have any noticeable effect on the fire"
        ]
    }],

	POSTTEST_data: [{
        "question": "1)Which statement about wind-driven high-rise fires in high-rise multiple dwellings is correct?",
        "options": [
            "a)The effects of wind are not a concern on lower floors",
            "b)These fires only occur during colder weather",
            "c)Most wind-driven fires occur at waterfront buildings",
            "d)None of the above"
        ]
    },{
		"question": "2)Which statement about traditional firefighting procedures used to combat high-rise multiple dwelling fires is correct?",
        "options": [
            "a)In most cases, traditional procedures will be effective in safely extinguishing a wind-driven fire",
            "b)Advancing two 2 1⁄2” hose lines in unison is a proven and effective tactic in high-rise multiple dwelling fires",
            "c)Normal procedures, with the exception of ventilation of the fire apartment, are effective",
            "d)The best procedure is to conduct traditional procedures with a heightened reliance on having an escape route for operating teams",
			"e)None of the above"
		]
	},{
       	"question": "3)Which of the following best describes a normal ventilation profile of a fire not being affected by wind?",
        "options": [
            "a)Fire venting up and out of the window continuously",
            "b)Fire visible in an apartment with window failure, but no smoke or fire exiting the window",
            "c)Intermittent fire and smoke leaving a window in a sideways direction",
            "d)Both A and B",
			"e)Both A and C"
		]
	},{
			"question": "4)Which statement below best describes the concept of “flow path”?",
			"options": [
            "a)Fire always takes the path of least resistance",
            "b)Smoke and heat always move from low pressure zones to higher pressure zones",
            "c)Smoke and heat always move from higher pressure zones to lower pressure zones",
            "d)Smoke and heat always move towards an open outside window",
			"e)None of the above"
		]
	},{
		"question": "5)You are presented with a fire in an apartment in which the window has failed. The apartment door to the hallway is closed, as are the stairway doors to the public hallway. Which of the following information provided?",
        "options": [
            "a)The fire apartment and the public hallway are the high pressure zones",
            "b)There will be no high pressure zone",
            "c)The fire apartment, public hallway, and stairway are the high pressure zones",
            "d)The fire apartment is the high pressure zone",
		]
	},{
		"question": "6)Which of the following is a correct tactic to eliminate the wind-driven effect on the fire?",
        "options": [
            "a)Close the lobby door of the building",
            "b)Cover the outlet with a fire window blanket",
            "c)Use negative pressure ventilation",
            "d)Cover the fire apartment window(s) with a wind control device",
		]
	},{
		"question": "7)What is the responsibility of the “floor above” team when deploying a wind control device?",
        "options": [
            "a)Secure the bottom of the curtain",
            "b)Determine the need for wind control device deployment",
            "c)Guide the positioning “floor below” team",
            "d)Deploy the device to cover the affected window",
			"e)None of the above"
		]
	},{
		"question": "8)Which of the following is a correct statement regarding opening (venting) the bulkhead (roof top) door to a stairway during a wind-driven fire?",
        "options": [
            "a)A firefighter should be sent to open the bulkhead as soon as possible during a wind-driven fire",
            "b)Opening the bulkhead door is preferred in the attack stair, but not the evacuation stair",
            "c)Opening the bulkhead door is essential when using positive pressure ventilation (PPV) tactics",
            "d)Opening the bulkhead door gives fleeing occupants a safe path to the roof",
			"e)None of the above"
		]
	},{
		"question": "9)During deployment of a wind control device, the “floor below” team has specific duties. Which of the following is not one of these duties?",
        "options": [
            "a)They proceed to the floor below with forcible entry tools and a hook",
            "b)They are responsible for securing the bottom ropes or straps of the device once it is in place",
            "c)They should gain entry to the area directly below the fire",
            "d)They must bring the high-rise nozzle"
		]
	},{
		"question": "10)Which statement about where to place positive pressure ventilation fans at a fire in a high-rise residential building is correct?",
        "options": [
            "a)Two fans must always be used",
            "b)The first fan should be at the base of the building",
            "c)The second fan should be at the top of the building",
            "d)The second fan should be placed in the stairway in front of the first fan"
		]
	},{
		"question": "11)You are assigned to place a second fan into operation at a high-rise residential fire. The first fan is operating in the lobby, blowing air into stairwell A. The fire is located on the 28th floor. Where is the proper location for you to place this fan?",
        "options": [
            "a)Next to the first fan in the lobby",
            "b)On the 14th floor in the stairway",
            "c)On the 25th floor, blowing into the A stairwell",
            "d)In the lobby, blowing into the B stairwell",
			"e)None of the above"
		]
	},{
		"question": "12)How far away from the stairwell door should you place a positive pressure ventilation (PPV) fan in order to effectively pressurize the stairwell?",
        "options": [
            "a)1 to 3 feet",
            "b)4 to 6 feet",
            "c)As close as possible",
            "d)Just inside the stairwell",
			"e)Placement has no effect on performance"
		]

	},{

		"question": "13)Which of the following statements regarding positive pressure ventilation (PPV) is correct?",
        "options": [
            "a)PPV creates a higher pressure zone in the stairwell, driving away heat and smoke",
            "b)PPV should not be used until the fire is declared under control",
            "c)PPV is able to remove smoke from the stairwell by lowering the pressure in the stairwell",
            "d)PPV can only be accomplished using fire department fans"
		]
	},{
		"question": "14)Which of the following statements about the use of the high-rise nozzle (HRN) is correct?",
        "options": [
            "a)The preferred position of the high-rise nozzle is the floor above thr fire",
            "b)The stream from the high-rise nozzle must strike the spandrel wall to break up the stream in order to effectively extinguish the fire",
            "c)The HRN knocks down the fire remotely",
            "d)The HRN must be hoisted up the outside of the building"
		]
	},{
		"question": "15)An engine company assigned to deploy and operate the high-rise nozzle should take which of the following tools to complete their assignment? 1. The high-rise nozzle 2. Standpipe kit and rolled lengths of hose 3. Hydrant wrench 4. Forcible entry tools 5. Pressurized water fire extinguisher",
        "options": [
            "a)1,4 and 5",
            "b)3,4 and 5",
            "c)1,2 and 3",
            "d)1,2 and 4",
			"e)2,3 and 4"
			]
	}]


};





var survey_question = Shuffle(QuizHelper.SURV_data);
var pre_test = Shuffle(QuizHelper.PRETEST_data);
var post_test=Shuffle(QuizHelper.POSTTEST_data);


function initQuestions(type, quest) {
    console.log("Initializing " + type + " --> " + quest);

    var quest_ele, option_ele;

    /* var survey_options = '<table class="survey-table" style="text-align: center;"> <tr> <td><input type="radio" name="survey" value="1"><span>1</span></td> <td><input type="radio" name="survey" value="2"></td> <td><input type="radio" name="survey" value="3"></td> <td><input type="radio" name="survey" value="4"></td> <td><input type="radio" name="survey" value="5"></td> <td><input type="radio" name="survey" value="6"></td> <td><input type="radio" name="survey" value="7"></td> <td><input type="radio" name="survey" value="8"></td> <td><input type="radio" name="survey" value="9"></td> <td><input type="radio" name="survey" value="10"></td> </tr> <tr> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> <td>6</td> <td>7</td> <td>8</td> <td>9</td> <td>10</td> </tr> </table>'; */
    /* var survey_options = "<div class='options'>";
		for (var i = 1; i <= 10; i++) {
			survey_options += '<input type="radio" name="survey" value="' + i + '" style="display:table;"> <span vertical-align:middle>' + i + '</span>';
		}
		survey_options += "</div>"; */
	var survey_options = "<div class='options'><table><tr>";
		for (var i = 1; i < 10; i++) {
			survey_options += '<td><input type="radio" name="survey" value="' + i + '" style="display:table; margin-left:80px"> <span vertical-align:middle style="margin-left:80px">' + i + '</span></td>';
		}
		survey_options += "</tr></table></div>";
	var quest_num = null;

    switch (type) {
        case "PRESURV":
            quest_ele = "#" + type + "_quest";
            $(quest_ele).html("<div class='question'>" + quest + ". " + (survey_question[quest - 1]).substr(2) + "</div><br>" + survey_options);
            quest_num = (survey_question[quest - 1]).substr(0, 1);
            break;
        case "POSTSURV":

            quest_ele = "#" + type + "_quest";
            $(quest_ele).html("<div class='question'>" + quest + ". " + (survey_question[quest - 1]).substr(2) + "</div><br>" + survey_options);
            quest_num = (survey_question[quest - 1]).substr(0, 1);
            break;

        case "PRETEST":
				var len = pre_test[quest - 1].options.length;
				var opt = (pre_test[quest - 1].options);
				var test_options = "<div class='options'>";
				for (var i = 0; i < len; i++) {
					test_options += '<input type="radio" name="answer" value="' + (opt[i]).substr(0, 1) + '"> <span>' + (opt[i]).substr(2) + '</span></br>';
				}
				test_options += "</div>";

            quest_ele = "#" + type + "_quest";
            if ((pre_test[quest - 1].question).substr(1, 1) == ")") {
                $(quest_ele).html("<div class='question'>" + quest + ". " + (pre_test[quest - 1].question).substr(2) + "</div><br>" + test_options);
                quest_num = (pre_test[quest - 1].question).substr(0, 1);
            } else {
                $(quest_ele).html("<div class='question'>" + quest + ". " + (pre_test[quest - 1].question).substr(3) + "</div><br>" + test_options);
                quest_num = (pre_test[quest - 1].question).substr(0, 2);
            }
            break;

        case "POSTTEST":
				var lenpost=post_test[quest - 1].options.length;
				var optpost = (post_test[quest - 1].options);
				var test_options_post = "<div class='options'>";
				for (var i = 0; i < lenpost; i++) {
					test_options_post += '<input type="radio" name="answer" value="' + (optpost[i]).substr(0, 1) + '"> <span>' + (optpost[i]).substr(2) + '</span></br>';
				}
				test_options_post += "</div>";


			quest_ele = "#" + type + "_quest";
            if ((post_test[quest - 1].question).substr(1, 1) == ")") {
                $(quest_ele).html("<div class='question'>" + quest + ". " + (post_test[quest - 1].question).substr(2) + "</div><br>" + test_options_post);
                quest_num = (post_test[quest - 1].question).substr(0, 1);
            } else {
                $(quest_ele).html("<div class='question'>" + quest + ". " + (post_test[quest - 1].question).substr(3) + "</div><br>" + test_options_post);
                quest_num = (post_test[quest - 1].question).substr(0, 2);
            }

            break;
    }


 	var radioele = "#" + type + "_quest input:radio";
    var $radioele = $(radioele);
    $radioele.click(function() {

		$(this).prop('checked',true);
        $('#' + type + '_blockc').hide();
        var val = $(this).val();

        switch (type) {
            case "PRESURV":
                QuizHelper.PRESURV_flag = true;
                QuizHelper.track_PRESURV_answers[quest_num - 1] = val;
                break;
            case "POSTSURV":
                QuizHelper.POSTSURV_flag = true;
                QuizHelper.track_POSTSURV_answers[quest_num - 1] = val;
                break;
            case "PRETEST":
                QuizHelper.PRETEST_flag = true;
                QuizHelper.track_PRETEST_answers[quest_num - 1] = val;
                break;
            case "POSTTEST":
                QuizHelper.POSTTEST_flag = true;
                QuizHelper.track_POSTTEST_answers[quest_num - 1] = val;
                break;
        }
        console.log("Actual Question Number: " + quest_num + " --- Selected choice: " + val);
        setTimeout(function() {
            $radioele.filter('[value=' + val + ']').prop('checked', true);
        }, 50);
    });


    //var ele3 = "#" + type + "_quest input:radio";
 	var radiospanele =  "#" + type + "_quest .options span";
    var $radiospanele = $(radiospanele);
    $radiospanele.click(function() {
		var val = $(this).prev('input:radio').val();
		$(this).prev('input:radio').prop('checked',true);
        $('#' + type + '_blockc').hide();
        //var val = $(this).val();

        switch (type) {
            case "PRESURV":
                QuizHelper.PRESURV_flag = true;
                QuizHelper.track_PRESURV_answers[quest_num - 1] = val;
                break;
            case "POSTSURV":
                QuizHelper.POSTSURV_flag = true;
                QuizHelper.track_POSTSURV_answers[quest_num - 1] = val;
                break;
            case "PRETEST":
                QuizHelper.PRETEST_flag = true;
                QuizHelper.track_PRETEST_answers[quest_num - 1] = val;
                break;
            case "POSTTEST":
                QuizHelper.POSTTEST_flag = true;
                QuizHelper.track_POSTTEST_answers[quest_num - 1] = val;
                break;
        }
        console.log("Actual Question Number: " + quest_num + " --- Selected choice: " + val);
        setTimeout(function() {
            $radiospanele.filter('[value=' + val + ']').prop('checked', true);
        }, 50);
    });




    $('.survey-table td').css('padding', '0 10px 0 10px');
    $('.survey-table td').css('color', '#fff');
    $('.survey-table input[type=radio]').css('-webkit-appearance', 'radio');
    $('.survey-table ').css('margin', '0 auto');
    $(quest_ele).css('color', '#fff');
    $('.options').css('color', '#fff');
    $('.options input[type=radio]').css('-webkit-appearance', 'radio');
    $(quest_ele).css('text-align', 'left !important');
    $('.question').css('font-size', '1.5em');
    $('#' + type + '_quest').find('*').css('font-size', '30px');


}



function goToNextQuestion(type) {
    console.log("GO TO NEXT SLIDE")
    var arrlen;
    switch(type){
      case "PRESURV" : arrlen = QuizHelper.SURV_data.length; break;
      case "POSTSURV" : arrlen = QuizHelper.SURV_data.length; break;
      case "PRETEST" : arrlen = QuizHelper.PRETEST_data.length; break;
      case "POSTTEST" : arrlen = QuizHelper.POSTTEST_data.length; break;
    }

    if (QuizHelper[type + "_flag"]) {
        QuizHelper[type + "_flag"] = false;
        if (QuizHelper[type + "_counter"] < arrlen) {

            QuizHelper[type + "_counter"]++;

            $('#' + type + '_blockc').show();

            initQuestions(type, QuizHelper[type + "_counter"]);

        } else {

            cpCmndNextSlide = true;

        }

    } else {

        /*do nothing*/

    }
}
