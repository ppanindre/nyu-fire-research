

var AliveHelper = {
    min_frame: 0,
    max_frame: 0,
	clock_flag: false,
	score_div: null,
	fire_val:60,
	fire_init: false,
	enable_register: 1,
	existing_user_email: "",
	new_user_email: "",
	curr_user_email: "",
	dpt:"",
	userType:"",
	unq:"",

	getDepartments : function(){
		$("#department").append('<select id="dd" style="width: 265px; height: 34px; border-radius: 0px; font-size: 16px; font-family: Arial" autofocus><option selected >Select your department</option></select>');
		$.post("php/dpt.php", {}, function(d) {
			//console.log(d);
			dpt=JSON.parse(d);
			//console.log(dpt);
			$.each(dpt, function(index, value) {
				//console.log(value.departmentID, value.departmentName);
				$('#dd').append($('<option>').text(value.departmentName).attr('value', value.departmentID));
			});
		});
	},

	defaultText : function(){
		var emailText = 'Enter your email address';
		var uidText = 'Enter your unique ID';

		$('#unique_id_inputField').val(uidText);
		$('#email_new_inputField').val(emailText);
		$('#email_existing_inputField').val(emailText);

		$('#unique_id_inputField').blur(function(){
			if ($(this).val().length == 0){
				$(this).val(uidText);
			}
		});
		$('#unique_id_inputField').focus(function(){
			if ($(this).val() == uidText){
				$(this).val('');
			}
			$('#correct_4c').hide();
			$('#wrong_4c').hide();
		});
		$('#email_new_inputField').blur(function(){
			if ($(this).val().length == 0){
				$(this).val(emailText);
			}
		});
		$('#email_new_inputField').focus(function(){
			if ($(this).val() == emailText){
				$(this).val('');
			}
			$('#correct_4c').hide();
			$('#wrong_4c').hide();
		});
		$('#email_existing_inputField').blur(function(){
			if ($(this).val().length == 0){
				$(this).val(emailText);
			}
		});
		$('#email_existing_inputField').focus(function(){
			if ($(this).val() == emailText){
				$(this).val('');
			}
			$('#correct_1c').hide();
			$('#wrong_1c').hide();
			$('#correct_2c').hide();
			$('#wrong_2c').hide();
			$('#correct_3c').hide();
			$('#wrong_3c').hide();
		});
	},

	existingEmailValid : function(){
		try {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var email_existing = $('#email_existing_inputField').val();
			AliveHelper.existing_user_email = email_existing;
			if(!regex.test(email_existing)){
				console.log("Invalid email");
				$('#wrong_4c').show();
				$('#correct_4c').hide();
				return false;
			} else {
				console.log("Valid email");
				$('#correct_4c').show();
				$('#wrong_4c').hide();
				return true;
			}
		} catch(e) {
			console.log(e);
			return false;
		}
	},

	uidValid : function(){
		var uid = $('#unique_id_inputField').val();
		if(uid.toString().trim()=='' || uid.toString().trim()=='Enter your unique ID'){
			$('#wrong_2c').show(); $('#correct_2c').hide(); return false;
		}else{
			$('#wrong_2c').hide(); $('#correct_2c').show(); return true;
		}
	},

	newEmailValid : function(){
		try {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var email_new = $('#email_new_inputField').val();
			AliveHelper.new_user_email = email_new;
			if(!regex.test(email_new)){
				console.log("Invalid email");
				AliveHelper.enable_register=0;
				$('#wrong_3c').show();
				$('#correct_3c').hide();
				return false;
			} else {
				console.log("Valid email");
				$('#correct_3c').show();
				$('#wrong_3c').hide();
				return true;
				/* $.post( "php/checkemail.php", { email: email_new}, function( data ) {
					if(data=="true"){
						enable_register=0;
						$('#wrong_3c').show();
						$('#correct_3c').hide();
						return false;
					} else {
						enable_register=1;
						$('#correct_3c').show();
						$('#wrong_3c').hide();
						return true;
					}
				}); */
			}
		} catch(e) {
			alert("There seems to be some problem with your internet connection.");
			console.log(e);
			return false;
		}
	},

	departmentValid : function(){
		var dpt = $('#dd option:selected').text();
		if(dpt=="" || dpt=='Select your department'){
			$('#wrong_1c').show(); $('#correct_1c').hide(); return false;
		}else{
			$('#wrong_1c').hide(); $('#correct_1c').show(); return true;
		}
	},

	scrollTOC : function(slide_number){	
		console.log('adding click lister to TOC for scrolling..')
		$('div[id^=cpTOCNav]').click(function(){
			var id = $(this).attr('id');
			$('#'+ id)[0].scrollIntoView();
		});
	},
	
	initVideo : function() {
		if (AliveHelper.videoStart === null) {
			setTimeout(function() {
				AliveHelper.videoStart = cpInfoCurrentFrame
			}, 2000);
		} else {
			cpCmndGotoFrameAndResume = AliveHelper.videoStart;
		}
	},

    init: function() {
		cpCmndTOCVisible = true;
		$('#toc').hide();
		
        $("#score_container").html('<div style="color:#FFF; text-align:center;"><h4 style="margin:0 0 0 0"><div id="score_container"></div></h4></div>');
        setTimeout(function() {
            $("body").append('<!-- Email the admin Modal --> <div class="modal fade" id="emailadmin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">Send email to admin</h4> </div> <div class="modal-body"> <div><textarea id="admin_message" class="form-control" placeholder="Enter your message..." rows="5"></textarea></div> <br> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button id="send_admin_email" type="button" class="btn btn-primary btn-post-topic">Send</button> </div> </div> </div> </div>');
            $("body").append(' <!-- FAQ Modal --> <div class="modal fade" id="faqmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">Frequently Asked Questions</h4> </div> <div class="modal-body"> <div> <h4 class="text-danger">What is Fire?</h4> Fire is a gas phase chemical reaction with a rapid oxidation process that gives off heat and light. <br> <br> <h4 class="text-danger">What is "Fire Dynamics?" </h4> Fire dynamics is the study of how fires start, spread, and develop . It combines ma fire science, and materials science, as well as disciplines of mechanical engineerin understand how they all interact to affect fire behavior. <br> <br> <h4 class="text-danger">What is the "Fire Triangle?" </h4> The fire triangle is a simple model for understanding fire behavior that illustrates the three elements that a fire needs to ignite: heat, fuel, and oxygen. <br> <br> <h4 class="text-danger">What is the "Fire Tetrahedron?" </h4> The fire tetrahedron constitutes the addition of a component, the chemical chain reaction, to the three already present in the fire triangle. If you do not have this uninhibited chemical reaction, you can get a flash but you cannot have sustained flaming. <br> <br> <h4 class="text-danger">How do we measure fire? </h4> Temperature , heat energy, heat release rate, and heat flux are the units of measurement for fire. • Temperature is measure of the molecular activity of solids, liquids, and gases • Heat energy is needed to change the temperature of an object • Heat release rate is a measure of how much energy is being generated by the fire every second • Heat flux is the amount of energy per unit area that hits the surface <br> <br> <h4 class="text-danger">What are mechanisms of heat transfer? </h4> Heat only gets transferred in one direction - from hot to cold. There are three mech convection, and radiation. • Radiation is the heat transfer by electromagnetic waves • Convection is the heat transfer by the movement of liquids or gasses • Conduction is the heat transfer within solids or between contacting solids Once your PPE is exposed to the cumulative effects of radiant, convective, and conductive heat that lead to flashover, you have only seconds to survive. <br> <br> <h4 class="text-danger">How does heat transfer through gear? </h4> Loose fitting and uncompressed gear takes advantage of the insulation properties of air, so keeping it puffed as much as possible will slow down the rate of heat transfer to your skin. If your gear is compressed, you may not have any air gaps, and heat transfers very quickly with minor loss. This stresses the importance of getting your gear off if you want to cool down. <br> <br> <h4 class="text-danger">What is pyrolysis? </h4> Pyrolysis is the heating of a solid causing it to break down into flammable gas - vapors of unburnt hydroc <br> <br> <h4 class="text-danger">What is heat of combustion? </h4> Heat of comoustion describes the chemical potential energy per unit mass of a fuel. <br> <br> <h4 class="text-danger">How does oxygen impact fire behavior? </h4> When you enrich the environment with oxygen, the fire spread accelerates. When 1 slows down. Without oxygen, heat cannot be produced. <br> <br> <h4 class="text-danger">Does venting cool the fire? </h4> Venting does not always equal cooling. In fact, increasing the availability of oxygen release rate of a fire. <br> <br> <h4 class="text-danger">Does fire double in size every minute? </h4> No. Growth of a fire in a compartment is a function of fuel properties, fuel quantity, compartment geometry, location of fire, and ambient conditions. <br> <br> <h4 class="text-danger">What is flashover? </h4> Flashover is the transition phase in the development of a compartment fire in which surfaces exposed to the thermal radiation from fire gases in excess of 1100°F reach ignition temperature almost simultaneously and the compartment becomes involved in fire from floor to ceiling. <br> <br> <h4 class="text-danger">What is a flow path? </h4> The flow path is the volume between an inlet and an outlet that allows the movement of heat and smoke from the higher pressure within the fire area toward the lower pressure areas accessible via doors and window openings. <br> <br> <h4 class="text-danger">How does wind impact the fire behavior? </h4> In addition to providing the fresh air (oxygen), wind entering the fire apartment drives the fire from the fire location (high-pressure zone) to other parts of the structure (low-pressure zones). Based on varying building configurations, it can create several flow paths within a structure. Operations conducted in the flow path, between the fire and the where the fire wants to go, will place the firefighters at significant risk due to the increased flow of fire, heat, and smoke toward their position. </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div>');

            if (app_environment == "TESTING") {
                return 0;
            }

            $('#send_admin_email').click(function() {
                console.log("Sending Admin Email");
                var to = "waqid7@gmail.com";
                var message = $('#admin_message').val();
                message = "Email: " + email + " Message: " + message;
                $.post('php/mail.php', {
                    email: to,
                    message: message
                });
                $('#emailadmin').modal('hide');
            });
        }, 1000);
		$('.tocExpandCollapse').hide();
		$('#expandIcon').hide();
		$('#gestureIcon').hide();
		$('#tocFooter').hide();
		this.scrollTOC();
    },

    register: function() {
        if (app_environment == "TESTING") {
            return 0;
        }
		
        try {//consider------->
			var dptId = $('#dd option:selected').val();
			var unqId=$('#unique_id_inputField').val();
			AliveHelper.dpt=dptId;
			AliveHelper.unq=unqId;
			AliveHelper.userType='L';
			var a=AliveHelper.departmentValid(),b=AliveHelper.uidValid(),c=AliveHelper.newEmailValid();
            if (AliveHelper.enable_register == 1 && a && b && c) {
                var email = AliveHelper.new_user_email;
                $('#my_notes_email').val(email);
				
				$.post("php/login.php", {
					email: email,
					user_id: 'L',
					department: dptId,
					unique_id: unqId
				}, function(d) {
					AliveHelper.curr_user_email = email;
					console.log(d);
					var obj = $.parseJSON(d);
					if (!obj.status) {
						console.log("Creating new session");
						$.post("php/register.php", {
							module_id: 1,
							email: email,
							dept: dptId,
							unique_id: unqId,
							user_id: 'L'
						}, function(data) {
							cpCmndGotoSlideAndResume = 4;
							console.log(data);
							var obj = $.parseJSON(data);
							if (obj.status) {
								session_id = obj.session_id;
							}
						});
					} else {
						session_id = obj.session_id;
						if(dptId==obj.department && unqId==obj.unique_id){
							$.confirm({
								text: "Do you want to resume the training?",
								confirm: function(button) {
									rdcmndGotoSlide = obj.restore_slide? obj.restore_slide: 4;
									score = parseInt(obj.score);
								},
								cancel: function(button) {
									console.log("Creating new session");
									$.post("php/register.php", {
										module_id: 1,
										email: obj.email,
										dept: obj.department,
										unique_id: obj.unique_id,
										user_id:obj.user_id
									}, function(data) {
										cpCmndGotoSlideAndResume = 4;
										console.log(data);
										var obj = $.parseJSON(data);
										if (obj.status) {
											session_id = obj.session_id;
										}
									});
								},
								confirmButton: "Yes, Resume my training",
								cancelButton: "No, Start from beginning",
								post: true,
								confirmButtonClass: "btn-danger",
								cancelButtonClass: "btn-default",
								dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
							});
						}
						else{
							console.log("Creating new session");
							$.post("php/register.php", {
								module_id: 1,
								email: obj.email,
								dept: dptId,
								unique_id: unqId,
								user_id:'L'
							}, function(data) {
								cpCmndGotoSlideAndResume = 4;
								console.log(data);
								var obj = $.parseJSON(data);
								if (obj.status) {
									session_id = obj.session_id;
								}
							});
						}
					}
				});
            } else {
                $.confirm({
                    text: "Please verify your details",
                    confirm: function(button) {
                        // delete();
                    },
                    confirmButton: "OK",
                    post: true,
                    confirmButtonClass: "btn-danger",
                    cancelButtonClass: "btn-default hidden",
                    dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
                });
            }
        } catch (e) {
			console.log(e)
            $.confirm({
                text: "Please verify your details",
                confirm: function(button) {
                    // delete();
                },
                confirmButton: "OK",
                post: true,
                confirmButtonClass: "btn-danger",
                cancelButtonClass: "btn-default hidden",
                dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
            });
            console.log(e);
        }
    },

    login: function() {
        if (app_environment == "TESTING") {
            return 0;
        }
		AliveHelper.dpt='DNR';
		AliveHelper.unq='UNR';
		AliveHelper.userType='R';
        try {
            $.post("php/login.php", {
                email: AliveHelper.existing_user_email,
				user_id: 'R',
				department: 'DNR',
				unique_id: 'UNR'
            }, function(data) {
				AliveHelper.curr_user_email = AliveHelper.existing_user_email;
                console.log(data);
                var obj = $.parseJSON(data);
                if (!obj.status) {
					var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					var email_existing = $('#email_existing_inputField').val();
					AliveHelper.existing_user_email = email_existing;
					if(!regex.test(email_existing)){
						console.log("Invalid email");
						$('#wrong_4c').show();
						$('#correct_4c').hide();
					} else {
						$('#wrong_4c').hide();
						console.log("Creating new session");
						$.post("php/register.php", {
							module_id: 1,
							email: AliveHelper.existing_user_email,
							dept: 'DNR',
							unique_id: 'UNR',
							user_id:'R'
						}, function(data) {
							//cpCmndNextSlide = true;
							cpCmndGotoSlideAndResume=3
							console.log(data);
							var obj = $.parseJSON(data);
							if (obj.status) {
								session_id = obj.session_id;
							}
						});
					}
                } else {
                    session_id = obj.session_id;
                    $.confirm({
                        text: "Do you want to resume the training?",
                        confirm: function(button) {
                            rdcmndGotoSlide = obj.restore_slide?obj.restore_slide:3;
                            score = parseInt(obj.score);
                        },
                        cancel: function(button) {
                            console.log("Creating new session");
                            $.post("php/register.php", {
                                module_id: 1,
                                email: obj.email,
                                dept: obj.department,
                                unique_id: obj.unique_id,
								user_id:obj.user_id
                            }, function(data) {
                                //cpCmndNextSlide = true;
								cpCmndGotoSlideAndResume=3
                                console.log(data);
                                var obj = $.parseJSON(data);
                                if (obj.status) {
                                    session_id = obj.session_id;
                                }
                            });
                        },
                        confirmButton: "Yes, Resume my training",
                        cancelButton: "No, Start from beginning",
                        post: true,
                        confirmButtonClass: "btn-danger",
                        cancelButtonClass: "btn-default",
                        dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
                    });
                }
            });
        } catch (e) {
            alert("There seems to be some problem with your internet connection.");
            console.log(e);
        }
    },

    hideTOC: function() {
        //cpCmndTOCVisible = false;
		$('.tocExpandCollapse').hide();
        $('#toc').hide();
    },

    showTOC: function() {
       //cpCmndTOCVisible = true;
       // $('.tocExpandCollapse').show();
	   $('#toc').show();
    },

    saveRestorePoint: function() {
        if (app_environment == "TESTING") {
            return 0;
        }
        $.post("php/update_restore.php", {
            session_id: session_id,
            restore_slide: cpInfoCurrentSlideIndex
        });
    },

    initSlideWindow: function() {
        AliveHelper.min_frame = cpInfoCurrentFrame;
        AliveHelper.max_frame = cpInfoCurrentFrame;
    },

    initNotesWidget: function() {
		console.log("Initializing notes widget.");
        $('#notes_section').html('<div height="50px"><b>Notes</b><br><br><textarea id="my_notes" class="form-control" placeholder="Enter your notes here" rows="7" cols="31" resize="none"></textarea><input type="email" align="left" size="30" class="form-control" id="my_notes_email" placeholder="Enter your email address"> </div> </div> <center><button id="email_notes" type="button" align="center" class="btn-block  btn-post-topic">Send</button></center>');
        if (app_environment == "TESTING") {
            return 0;
        }
        $('#email_notes').click(function() {
            console.log("Emailing notes");
            var to = $('#my_notes_email').val();
            var notes = $('#my_notes').val();
            $.post('php/mail.php', {
                email: to,
                notes: notes
            });
        });
    },

    initClockWidget: function() {
		$('#clock_container_title').html('TIMER');
		if(!AliveHelper.clock_flag){
			AliveHelper.clock_flag = true;	
			var startclock = moment().startOf('day');
			var clock = $('#clock_container');
			function tick(t) {
				startclock = moment(t).add(1, 'seconds');
				clock.html("<p style='font-size:16px;color:#fff'>" + startclock.format("HH:mm:ss") + "</p>");
			}
			setInterval(function() {
				tick(startclock);
			}, 1000);
		}
    },

/*     initQuestionSlide: function(quest) {
        setTimeout(function() {
            if (QS["q"+quest+"_a"] == 1 || QS["q"+quest+"_b"] == 1 || QS["q"+quest+"_c"] == 1 || QS["q"+quest+"_d"] == 1) {
                cpCmndPause = true;
                rdcmndPause = true;
            } else {
                cpCmndResume = true;
                rdcmndResume = true;
            }
        }, 100);
    },*/
 
    initFire: function(){
		try{
			AliveHelper.playPauseVideoOnClick();
		}catch(e){
			console.log('initFire error: '+e);
		}
		AliveHelper.videoStart = null;
		try{
			//AliveHelper.scrollTOCToSlide(cpInfoCurrentSlideIndex);
		}catch(e){
			console.log(e);
		}
		AliveHelper.initSlideWindow();
		if(AliveHelper.fire_init) { return 0; }
		setTimeout(function(){
			$('#controlPanel').fire({
				speed: 20,
				fireTransparency: AliveHelper.fire_val,
				maxPow: 5,
				gravity: 25,
				flameWidth: 4,
				flameHeight: 1,
				fadingFlameSpeed: 2
		});

		$('#controlPanel').append('<div id="logo"></div><div class="controlDiv"><button title="Rewind" class="rewindBtn controlBtn"></button><button title="Pause" class="pauseBtn controlBtn"></button><button title="Play" class="playBtn controlBtn"></button><button title="Forward" class="forwardBtn controlBtn"></button><button title="Refresh" class="refreshBtn controlBtn"></button><button title="Email" class="mailBtn controlBtn"></button><button title="FAQ" class="faqBtn controlBtn"></button><button title="Print" class="printBtn controlBtn"></button></div>');

		$(function() {
			$( document ).tooltip();
		});

		$('.printBtn').click(function(){
			playIt();
			setTimeout(function(){
				window.focus();
				window.print();
				/* html2canvas($('body'),{
					onrendered: function (canvas) {                     
						var imgString = canvas.toDataURL("image/png");
						window.open(imgString);                  
					}
				}); */
			},100);
		});

		$('.refreshBtn').click(function(){
			playIt();
			setTimeout(function(){
				cpCmndGotoSlide=cpInfoCurrentSlideIndex;
				cpCmndResume=true;
			},100);
		});

		$('.faqBtn').click(function(){
			playIt();
			setTimeout(function(){
				$('#faqmodal').modal('show');
			},100);
		});

		$('.mailBtn').click(function(){
			playIt();
			setTimeout(function(){
				$('#emailadmin').modal('show');
			},100);
		});

		$('.rewindBtn').click(function(){
			playIt();
			setTimeout(function(){
				AliveHelper.rewindSlide();
			},100);
		});

		$('.pauseBtn').click(function(){
			playIt();
			$('.playBtn').show();
			$('.pauseBtn').hide();
			setTimeout(function(){
				cpCmndPause=true;
			},100);
		});

		$('.playBtn').click(function(){
			playIt();
			$('.playBtn').hide();
			$('.pauseBtn').show();
			setTimeout(function(){
				cpCmndResume=true;
			},100);
		});

		$('.forwardBtn').click(function(){
			playIt();
			setTimeout(function(){
				AliveHelper.forwardSlide();
			},100);
		});

		function playIt()
		{
		   var snd = new Audio("ar/Mouse.mp3");
		   snd.play();
		}

		AliveHelper.fire_init=true;
		},1000);
	},

	saveResponse: function(type, quest, ans, sc) {
        console.log("Score:"+ sc)
		if(sc==25)
		{
			if(AliveHelper.fire_val<100){
				AliveHelper.fire_val = AliveHelper.fire_val+5;
				console.log("Decrease fire. Set transparency: "+AliveHelper.fire_val);
				$('.fireJqueryPlugin0Canvas0').fire('change',{fireTransparency: AliveHelper.fire_val});
			}
		}
		else
		{
			if(AliveHelper.fire_val>30)
			{
				console.log("Decrease Fire");
				AliveHelper.fire_val = AliveHelper.fire_val-5;
				console.log("Increase fire. Set transparency: "+AliveHelper.fire_val);
				$('.fireJqueryPlugin0Canvas0').fire('change',{fireTransparency: AliveHelper.fire_val});
			}
		}

		if (app_environment == "TESTING") {
            return 0;
        }

        $.post("php/quiz.php", {
            session_id: session_id,
            type: type,
            question: quest,
            answer: ans,
            score: sc
        }, function(response) {
            if (response) {
                score += sc;
                $('#score_container').addClass('animated wobble');
                $('#score_container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                    function() {
                        AliveHelper.score_div.update(score);
                    });
                setTimeout(function() {
                    $('#score_container').removeClass('animated wobble');
                }, 2000);
            } else {
                //do nothing
            }
        });
    },

    initScoreWidget: function() {
		$('#score_container_title').html('SCORE');
        AliveHelper.score_div = new CountUp("score_container", score, score, 0, 2);
        AliveHelper.score_div.start();
    },

    initMultiple: function(){
        AliveHelper.showTOC();
        AliveHelper.saveRestorePoint();
        AliveHelper.initNotesWidget();
        AliveHelper.initClockWidget();
        AliveHelper.initScoreWidget();
    },

	rewindSlide: function(){
		if(cpInfoCurrentFrame > AliveHelper.max_frame){
			console.log("Setting max_frame : "+ cpInfoCurrentFrame);
			AliveHelper.max_frame = cpInfoCurrentFrame;
		}
		else {
			//do nothing
		}
		var prev_frame = cpInfoCurrentFrame-500;
		if(prev_frame>AliveHelper.min_frame){
			console.log("Going back to : "+ prev_frame);
			cpCmndGotoFrameAndResume = prev_frame;
		}
		else{
			console.log("Going back to : "+ AliveHelper.min_frame);
			cpCmndGotoFrameAndResume = AliveHelper.min_frame;
		}
	},

	forwardSlide:function(){
		if(cpInfoCurrentFrame > AliveHelper.max_frame){
			console.log("Setting max_frame : "+ cpInfoCurrentFrame);
			AliveHelper.max_frame = cpInfoCurrentFrame;
		}
		else {
			//do nothing
		}
		var next_frame = cpInfoCurrentFrame+500;
		if(next_frame < AliveHelper.max_frame){
			console.log("Going forward to : "+ next_frame);
			cpCmndGotoFrameAndResume = next_frame;
		}
		else {
			cpCmndGotoFrameAndResume = AliveHelper.max_frame;
		}
	},
	
	playPauseVideoOnClick :function(){
		$('[id^=SlideVideo_].cp-frameset').click(function(e){
		console.log("clicking video object");
		AliveHelper.togglePlayPause();
		return false;
		});
		
	},
	
	togglePlayPause: function(){
		if(cpCmndResume){
			cpCmndPause = true;
			$('.playBtn').show();
			$('.pauseBtn').hide();
		}else{
			cpCmndResume = true;
			$('.playBtn').hide();
			$('.pauseBtn').show();
		}
	},
	
}