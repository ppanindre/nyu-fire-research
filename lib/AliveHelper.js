var AliveHelper = {
    progressBar: null,
    isProgressBarInit: false,
    currentProgress: 0,
    RECURSIVE_SCENARIOS: 25,
    min_frame: 0,
    max_frame: 0,
    clock_flag: false,
    score_div: null,
    fire_val: 60,
    fire_init: false,
    enable_register: 1,
    existing_user_email: '',
    new_user_email: '',
    curr_user_email: '',
    dpt: '',
    userType: '',
    unq: '',
    activeTOCBackgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAAoCAYAAADXGucZAAABHklEQVR4Xu3TQRHAMAwDwRhN+BNs+uhMQeTWDLSyZu/9rLVmOQIEbhU4Y+i3disXgV/A0D0DgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgLf0GdmAmFFJFAVOC+JomIkoN4ptQAAAABJRU5ErkJggg==")',

    getDepartments: function() {
        $("#department").append('<select id="dd" style="width: 265px; height: 34px; border-radius: 0px; font-size: 16px; font-family: Arial" autofocus><option selected >Select your department</option></select>');
        $.post("php/dpt.php", {}, function(d) {
            //console.log(d);
            dpt = JSON.parse(d);
            //console.log(dpt);
            $.each(dpt, function(index, value) {
                //console.log(value.departmentID, value.departmentName);
                $('#dd').append($('<option>').text(value.departmentName).attr('value', value.departmentID));
            });
        });
    },

    defaultText: function() {
        var emailText = 'Enter your email address';
        var uidText = 'Enter your unique ID';

        $('#unique_id_inputField').val(uidText);
        $('#email_new_inputField').val(emailText);
        $('#email_existing_inputField').val(emailText);

        $('#unique_id_inputField').blur(function() {
            if ($(this).val().length == 0) {
                $(this).val(uidText);
            }
        });
        $('#unique_id_inputField').focus(function() {
            if ($(this).val() == uidText) {
                $(this).val('');
            }
            $('#correct_4c').hide();
            $('#wrong_4c').hide();
        });
        $('#email_new_inputField').blur(function() {
            if ($(this).val().length == 0) {
                $(this).val(emailText);
            }
        });
        $('#email_new_inputField').focus(function() {
            if ($(this).val() == emailText) {
                $(this).val('');
            }
            $('#correct_4c').hide();
            $('#wrong_4c').hide();
        });
        $('#email_existing_inputField').blur(function() {
            if ($(this).val().length == 0) {
                $(this).val(emailText);
            }
        });
        $('#email_existing_inputField').focus(function() {
            if ($(this).val() == emailText) {
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

    existingEmailValid: function() {
        try {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var email_existing = $('#email_existing_inputField').val();
            AliveHelper.existing_user_email = email_existing;
            if (!regex.test(email_existing)) {
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
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    uidValid: function() {
        var uid = $('#unique_id_inputField').val();
        if (uid.toString().trim() == '' || uid.toString().trim() == 'Enter your unique ID') {
            $('#wrong_2c').show();
            $('#correct_2c').hide();
            return false;
        } else {
            $('#wrong_2c').hide();
            $('#correct_2c').show();
            return true;
        }
    },

    newEmailValid: function() {
        try {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var email_new = $('#email_new_inputField').val();
            AliveHelper.new_user_email = email_new;
            if (!regex.test(email_new)) {
                console.log("Invalid email");
                AliveHelper.enable_register = 0;
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
        } catch (e) {
            alert("There seems to be some problem with your internet connection.");
            console.log(e);
            return false;
        }
    },

    departmentValid: function() {
        var dpt = $('#dd option:selected').text();
        if (dpt == "" || dpt == 'Select your department') {
            $('#wrong_1c').show();
            $('#correct_1c').hide();
            return false;
        } else {
            $('#wrong_1c').hide();
            $('#correct_1c').show();
            return true;
        }
    },

    scrollTOC: function(slide_number) {
        var activeTOCContainer = $('#toc .tocEntryContainerStyle').filter(function() {
            return $(this).css('background-image') == AliveHelper.activeTOCBackgroundImage;
        });

        // var tocItem = activeTOCContainer.children('div[id^=cpTOCNav]');
        activeTOCContainer[0].scrollIntoView();


        // $('#'+ id)[0].scrollIntoView();
        // console.log('adding click lister to TOC for scrolling..')
        // $('div[id^=cpTOCNav]').click(function(){
        // 	var id = $(this).attr('id');
        // 	$('#'+ id)[0].scrollIntoView();
        // });
    },

    initVideo: function() {
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
            $("body").append('  <!-- FAQ Modal --> <div class="modal fade" id="faqmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">Frequently Asked Questions</h4> </div> <div class="modal-body"> <div> <h4 class="text-danger">What is a “high-rise”?</h4> The most commonly accepted definition of a high-rise is any building structure out of the reach of fire department ladders. </br></br><h4 class="text-danger">Is wind direction an important factor in wind-impacted high-rise fires?</h4> Wind blowing into an open window in the fire apartment will drastically change conditions and will require alternate tactics. </br></br><h4 class="text-danger">Is full PPE including SCBA required when using wind-impacted high-rise firefighting procedures? </h4> Full bunker gear and SCBA shall be worn when operating at wind-impacted fires. </br></br><h4 class="text-danger">How long will a fire blanket withstand a fire prior to failure?</h4> The fire blanket can sustain temperatures of 1800° Fahrenheit for approximately 20 minutes. </br></br><h4 class="text-danger">How are PPV fans powered?</h4> There are two types of PPV fans: a) Fuel-based (Gas Operated); b) Electric. For stairwell pressurization, gas operated fans are used due to their ability to create higher positive pressure inside stairwells, relative to electric fans. The gas powered PPV fans carried by Ventilation Support Units and High Rise Units move three times more air than the standard electric fans carried by ladder companies. </br></br><h4 class="text-danger">What is the use of electric PPV fans?</h4> Generally, electric PPV fans are used to clear carbon monoxide inside the stairwell. </br></br><h4 class="text-danger">When supplying the high-rise nozzle what pressure should it be supplied with when three lengths are being used? </h4> When supplying three lengths, the inline pressure gauge should read 70 psi with water flowing. </br></br><h4 class="text-danger">Do these firefighting procedures make a difference in a standard attack strategy?</h4> Yes. Certain fire departments have rewritten their standard firefighting procedures and codes after this research was published. Please contact the training / chief operations bureau for more details. </br></br><h4 class="text-danger">Have these firefighting procedures been implemented in a real-life fire?</h4> Yes. The following are examples of FDNY’s implementation of these tactics in real-life: </br></br>a) Bronx Box 4482 Co-Op City - February, 2009 </br><span>• Fire in apartment on 26th floor in 32-story building </br></span><span>• Blanket deployment </span></br></br>b) 14-story fireproof multiple dwelling - April, 2009 </br><span>• Fire in apartment on 10th floor </br></span><span>• Blanket deployment </span></br></br>c) Riverdale, The Bronx - May, 2009 </br><span>• 21-story fireproof multiple dwelling </br></span><span>• Blanket deployment </span></br></br>d) Upper East Side of Manhattan - June, 2009 </br><span>• Upper floor of high-rise fireproof multiple dwelling </br></span><span>• KO curtain deployment </span></br></br>e) Brooklyn - June, 2010 </br><span>• Basement fire in one-story, large commercial building </br></span><span>• PPV fan deployment </span></br></br>And multiple occasions during the winter of 2010-2011. </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div>');

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
        // this.scrollTOC();
    },

    register: function() {
        if (app_environment == "TESTING") {
            return 0;
        }

        try { //consider------->
            var dptId = $('#dd option:selected').val();
            var unqId = $('#unique_id_inputField').val();
            AliveHelper.dpt = dptId;
            AliveHelper.unq = unqId;
            AliveHelper.userType = 'L';
            var a = AliveHelper.departmentValid(),
                b = AliveHelper.uidValid(),
                c = AliveHelper.newEmailValid();
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
                        if (dptId == obj.department && unqId == obj.unique_id) {
                            $.confirm({
                                text: "Do you want to resume the training?",
                                confirm: function(button) {
                                    rdcmndGotoSlide = obj.restore_slide ? obj.restore_slide : 4;
                                    AliveHelper.currentProgress = parseFloat(obj.progress ? obj.progress : 0);
                                    score = parseInt(obj.score);
                                },
                                cancel: function(button) {
                                    console.log("Creating new session");
                                    $.post("php/register.php", {
                                        module_id: 1,
                                        email: obj.email,
                                        dept: obj.department,
                                        unique_id: obj.unique_id,
                                        user_id: obj.user_id
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
                        } else {
                            console.log("Creating new session");
                            $.post("php/register.php", {
                                module_id: 1,
                                email: obj.email,
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
        AliveHelper.dpt = 'DNR';
        AliveHelper.unq = 'UNR';
        AliveHelper.userType = 'R';
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
                console.log(obj);
                if (!obj.status) {
                    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    var email_existing = $('#email_existing_inputField').val();
                    AliveHelper.existing_user_email = email_existing;
                    if (!regex.test(email_existing)) {
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
                            user_id: 'R'
                        }, function(data) {
                            //cpCmndNextSlide = true;
                            cpCmndGotoSlideAndResume = 3
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
                            rdcmndGotoSlide = obj.restore_slide ? obj.restore_slide : 3;
                            AliveHelper.currentProgress = parseFloat(obj.progress ? obj.progress : 0);
                            score = parseInt(obj.score);
                        },
                        cancel: function(button) {
                            console.log("Creating new session");
                            $.post("php/register.php", {
                                module_id: 1,
                                email: obj.email,
                                dept: obj.department,
                                unique_id: obj.unique_id,
                                user_id: obj.user_id
                            }, function(data) {
                                //cpCmndNextSlide = true;
                                cpCmndGotoSlideAndResume = 3

                                var obj = $.parseJSON(data);
                                console.log(obj);
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
        var currentProgress = AliveHelper.getProgress();
        if (app_environment == "TESTING") {
            return 0;
        }
        console.log("Trying to save restore point: ",cpInfoCurrentSlideIndex, currentProgress);
        $.post("php/update_restore.php", {
            session_id: session_id,
            restore_slide: cpInfoCurrentSlideIndex,
            progress: currentProgress
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
        if (!AliveHelper.clock_flag) {
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

    initFire: function() {
        //init progress bar
        try{
          if(!AliveHelper.isProgressBarInit){
            AliveHelper.initProgressBar();
            AliveHelper.isProgressBarInit = true;
          }
        }catch(e){
          console.error(e);
        }
        //trying to scroll TOC
        try {
            setTimeout(function() {
                AliveHelper.scrollTOC();
            }, 500);
        } catch (e) {
            console.error("TOC Scroll error: " + e);
        }
        try {
            AliveHelper.playPauseVideoOnClick();
        } catch (e) {
            console.log('initFire error: ' + e);
        }
        AliveHelper.videoStart = null;
        try {
            //AliveHelper.scrollTOCToSlide(cpInfoCurrentSlideIndex);
        } catch (e) {
            console.log(e);
        }
        AliveHelper.initSlideWindow();
        if (AliveHelper.fire_init) {
            return 0;
        }
        setTimeout(function() {
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
                $(document).tooltip();
            });

            $('.printBtn').click(function() {
                playIt();
                setTimeout(function() {
                    window.focus();
                    window.print();
                    /* html2canvas($('body'),{
                    	onrendered: function (canvas) {
                    		var imgString = canvas.toDataURL("image/png");
                    		window.open(imgString);
                    	}
                    }); */
                }, 100);
            });

            $('.refreshBtn').click(function() {
                playIt();
                setTimeout(function() {
                    cpCmndGotoSlide = cpInfoCurrentSlideIndex;
                    cpCmndResume = true;
                }, 100);
            });

            $('.faqBtn').click(function() {
                playIt();
                setTimeout(function() {
                    $('#faqmodal').modal('show');
                }, 100);
            });

            $('.mailBtn').click(function() {
                playIt();
                setTimeout(function() {
                    $('#emailadmin').modal('show');
                }, 100);
            });

            $('.rewindBtn').click(function() {
                playIt();
                setTimeout(function() {
                    AliveHelper.rewindSlide();
                }, 100);
            });

            $('.pauseBtn').click(function() {
                playIt();
                $('.playBtn').show();
                $('.pauseBtn').hide();
                setTimeout(function() {
                    cpCmndPause = true;
                }, 100);
            });

            $('.playBtn').click(function() {
                playIt();
                $('.playBtn').hide();
                $('.pauseBtn').show();
                setTimeout(function() {
                    cpCmndResume = true;
                }, 100);
            });

            $('.forwardBtn').click(function() {
                playIt();
                setTimeout(function() {
                    AliveHelper.forwardSlide();
                }, 100);
            });

            function playIt() {
                var snd = new Audio("ar/Mouse.mp3");
                snd.play();
            }

            AliveHelper.fire_init = true;
        }, 1000);
    },

    saveResponse: function(type, quest, ans, sc) {
        console.log("Score:" + sc)
        if (sc == 25) {
            if (AliveHelper.fire_val < 100) {
                AliveHelper.fire_val = AliveHelper.fire_val + 5;
                console.log("Decrease fire. Set transparency: " + AliveHelper.fire_val);
                $('.fireJqueryPlugin0Canvas0').fire('change', {
                    fireTransparency: AliveHelper.fire_val
                });
            }
        } else {
            if (AliveHelper.fire_val > 30) {
                console.log("Decrease Fire");
                AliveHelper.fire_val = AliveHelper.fire_val - 5;
                console.log("Increase fire. Set transparency: " + AliveHelper.fire_val);
                $('.fireJqueryPlugin0Canvas0').fire('change', {
                    fireTransparency: AliveHelper.fire_val
                });
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

                var rqPercent = 0;
                if(AliveHelper.userType == 'L'){
                  rqPercent = 50/AliveHelper.RECURSIVE_SCENARIOS;
                }else if(AliveHelper.userType == 'R'){
                  rqPercent = 100/AliveHelper.RECURSIVE_SCENARIOS;
                }

                //if the user answered correctly and it got saved into DB, update the progress bar
                if(type=='RQ' && sc==25){
                   AliveHelper.updateProgressBar(rqPercent);
                }else if(type=='PRESURV' && quest==1){
                  // AliveHelper.updateProgressBar(10);
                }else if(type=='PRETEST' && quest==1){
                  AliveHelper.updateProgressBar(10);
                }else if(type=='POSTSURV' && quest==1){
                  // AliveHelper.updateProgressBar(10);
                }else if(type=='POSTTEST' && quest==1){
                  // AliveHelper.updateProgressBar(10);
                }



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

    initMultiple: function() {
        AliveHelper.showTOC();
        AliveHelper.saveRestorePoint();
        AliveHelper.initNotesWidget();
        AliveHelper.initClockWidget();
        AliveHelper.initScoreWidget();
    },

    rewindSlide: function() {
        if (cpInfoCurrentFrame > AliveHelper.max_frame) {
            console.log("Setting max_frame : " + cpInfoCurrentFrame);
            AliveHelper.max_frame = cpInfoCurrentFrame;
        } else {
            //do nothing
        }
        var prev_frame = cpInfoCurrentFrame - 500;
        if (prev_frame > AliveHelper.min_frame) {
            console.log("Going back to : " + prev_frame);
            cpCmndGotoFrameAndResume = prev_frame;
        } else {
            console.log("Going back to : " + AliveHelper.min_frame);
            cpCmndGotoFrameAndResume = AliveHelper.min_frame;
        }
    },

    forwardSlide: function() {
        if (cpInfoCurrentFrame > AliveHelper.max_frame) {
            console.log("Setting max_frame : " + cpInfoCurrentFrame);
            AliveHelper.max_frame = cpInfoCurrentFrame;
        } else {
            //do nothing
        }
        var next_frame = cpInfoCurrentFrame + 500;
        if (next_frame < AliveHelper.max_frame) {
            console.log("Going forward to : " + next_frame);
            cpCmndGotoFrameAndResume = next_frame;
        } else {
            cpCmndGotoFrameAndResume = AliveHelper.max_frame;
        }
    },

    playPauseVideoOnClick: function() {
        $('[id^=SlideVideo_].cp-frameset').click(function(e) {
            console.log("clicking video object");
            AliveHelper.togglePlayPause();
            return false;
        });

    },

    togglePlayPause: function() {
        if (cpCmndResume) {
            cpCmndPause = true;
            $('.playBtn').show();
            $('.pauseBtn').hide();
        } else {
            cpCmndResume = true;
            $('.playBtn').hide();
            $('.pauseBtn').show();
        }
    },

    initProgressBar: function() {
        $('#tocTitle').append('<div id="progressBar" style="padding:1%; width:20%; height:100%; position:relative; float:right;"></div>')
        var bar = new ProgressBar.Circle(progressBar, {
          color: '#4178E8',
          trailColor: '#000',
          strokeWidth: 5,
          trailWidth: 1,
          easing: 'easeInOut',
          duration: 1400,
          text: {
            autoStyleContainer: false
          },
          from: { color: '#4178E8', width: 5 },
          to: { color: '#4178E8', width: 5 },
          // Set default step function for all animate calls
          step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText('0%');
            } else {
              circle.setText(value+'%');
            }

          }
        });
        bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        bar.text.style.fontSize = '1.5rem';
        $('.progressbar-text').css('top', '50%');
        bar.animate(AliveHelper.currentProgress); // Number from 0.0 to 1.0
        AliveHelper.progressBar = bar;

    },

    updateProgressBar(increment){
      console.log('updating progress by ',increment);
      var currentValue = parseFloat(AliveHelper.progressBar.value().toFixed(2));
      var newValue = currentValue + (increment/100);
      AliveHelper.progressBar.animate(newValue);
      setTimeout(function(){
        AliveHelper.saveRestorePoint();
      },1000);
    },

    getProgress(){
      try{
          return  parseFloat(AliveHelper.progressBar.value().toFixed(2));
      }catch(e){
          return 0;
      }

    }
}
