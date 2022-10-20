$(window).ready(function(){
    let team1score = 0;
    let team2score = 0;
    let currentPoints = 0;
    let currentModal = "";
    let showAnswer = false;
    let time = 0;
    let closeModal;
    let cardId;
    let ansToo;

    $(".card-number").click(function(){
        ansToo = false;
        closeModal = false;
        showAnswer = false; 
        time = 60;     
        cardId = $(this).attr("id");
        currentModal = "#"+cardId+"-m";
        if(!$(this).hasClass("cardClicked")){   
            $(currentModal).css("display", "flex");          
            timer(time);            
        }
    });  

    function timer(time){
        let timer = setInterval(function(){
            if(time == 0 && showAnswer == false && closeModal == false){   
                $(currentModal+' .seconds').text(time+"s");             
                $(currentModal+" .question").css("display", "none");
                $(currentModal+" .timesUp").css("display", "block");
                if(ansToo == false){
                    $(currentModal+" .btn-steal").removeAttr("disabled");  
                }                
                clearInterval(timer);        
            } else if(showAnswer == true && closeModal == false){
                clearInterval(timer);
            } else if(time > 0 && showAnswer == false && closeModal == false){
                $(currentModal+' .seconds').text(time+"s");
                time--;
            } else if(closeModal == true){
                closeModal = false;
                clearInterval(timer);               
            }           
        }, 1000);
    }

    $(currentModal+" .btn-close").click(function(){  
        closeModal = true;    
        currentPoints = parseInt(currentModal.slice(6,9));
        $(currentModal).css("display", "none");
        $("#"+cardId).addClass("cardClicked");
    }); 

    $(currentModal+" .btn-showAnswer").click(function(){         
        $(currentModal+" .question").css("display", "none");
        $(currentModal+" .timesUp").css("display", "none");
        $(currentModal+" .card-answer").css("display", "block");
        showAnswer = true;
    }); 

    $(currentModal+ " .btn-steal").click(function(){
        ansToo = true;
        $(currentModal+" .question").css("display", "block");
        $(currentModal+" .timesUp").css("display", "none");
        $(currentModal+" .btn-steal").prop("disabled", true); 
        time = 5;
        timer(time);
    });

    
    $("#team1score-btn").click(function(){
        team1score = parseInt($(".team1score").text()) + currentPoints;
        $(".team1score").text(team1score);
        currentPoints = 0;
        currentModal = "";
    })

    $("#team2score-btn").click(function(){
        team2score = parseInt($(".team2score").text()) + currentPoints;
        $(".team2score").text(team2score);
        currentPoints = 0;
        currentModal = "";
    })
    
});
    
