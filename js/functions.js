 
    
        $(document).ready(function(){
        
          var weight = 0;
          var SecOne = 0;
          var SecTwo = 0;
          var nomogram = 'standard';
          $("#results").hide();
          $("#IIRate").hide();
          
         $.post("com/tracking.cfc?method=forTracking&returntype=JSON", function(data){
  
         });
            
//        set Tabs  

          $('#adjRateTabs a').click(function (e) {
            e.preventDefault()
           $(this).tab('show')
          });
            
          function getValues() { 
              // ParseValues make sure they are # & not strings 
              var weight = parseInt( $('#weight').val(),10); // tell parseInt to use decimal (base 10)
              var SecOne = parseInt( $('#SecOne').val(),10);
              var SecTwo = parseInt( $('#SecTwo').val(),10);
              var nomogram = $('#type').val();
             
                  if ( isNaN(weight) || isNaN(SecOne) || isNaN(SecTwo) || nomogram == 'select') {

                $("#IIRate").hide();
                $("#results").hide();
                  
                  }else{
                      calculate(weight,nomogram,SecOne,SecTwo);
                     
                  }
            
              }
          
          $('#weight').blur(function() {
              var weight = $(this).val();
             if ( $('[name="weight"]').val() == ""){
                 $(this).addClass(' ui-state-error');
                 $(this).attr('placeholder','Weight Required');
             }else{
                parseInt(weight);
                getValues();    
             }
              
            });
          
          $('#SecOne').blur(function() {
              var SecOne = $(this).val();
              if (( $(this).val() =="") || ( isNaN($(this).val()) ) ) {
                  $(this).attr('placeholder','Secs Required');
              }else{
                 parseInt(SecOne);
                 getValues();
                }
              
            });
          
          $('#SecTwo').blur(function() {
              var SecTwo = $(this).val();
            
              if ( $('#calculator').validator('validate').has('.has-error').length) { // if there are errors
          
           var  mainErrors = '<div class="alert alert-danger" style="margin-top:10px;" role="alert"><strong>Cheese and Crackers</strong> it appers that you didn\'t fill out all the required fields</div>';
           $('.FormErrors').html(mainErrors).fadeIn("slow");
           $('#ErrorAlerts').html(mainErrors);
           $('#error').modal('show');
              // if ( $(this).val() == "" ){
              //      $(this).addClass(' ui-state-error');
              //     $(this).attr('placeholder','Secs Required');
              
              }else{
                parseInt(SecTwo);
                getValues();
              }
            });
          
//            $("#type").select({
//                multiple: false,
//                header: "Select an option",
//                noneSelectedText: "Select an Option",
//                minWidth:255,
//                selectedList: 1
//            });
            
            
    //     Get nomogram value From Drop Down
        $('#type').change(function(){
            if ($(this).val() == "select" ) {
             
              // $(this).addClass(' ui-state-error');
              var mainErrors = '<div class="alert alert-danger" style="margin-top:10px;" role="alert"><strong>Cheese and Crackers</strong> Please select a nomogram!</div>';
                $('.FormErrors').html(mainErrors);
                $('#ErrorAlerts').html(mainErrors);
                $('#error').modal('show');
               $("#results").hide();
                $("#IIRate").hide();
           }else{
      
                var nomogram = $(this).find("option:selected").text();
                getValues();
         
            }
            
        }); // End of change function
            
           
       
        // calculate function
        calculate = function(weight,nomogram,SecOne,SecTwo) {
          // alert('weight'+weight+'nomo '+nomogram+' aPTT '+aPTT+'target'+targetaPTT);
           
             // Get higher Target --- This was removed and replaced with just SecTwo as of 01-31-2013
               // if (SecTwo > 90) {
                   // var halfRate = SecTwo;
               // }else{
                   // var halfRate = 90;
               // }   
               
                // initial infusion rate
              
               // aPTT(sec)
               var aPTT_R1 = "&#8804; "+(SecOne - 1);
               var aPTT_R2 = SecOne + " to " + SecTwo + " (Target)";
               var aPTT_R3 = SecTwo+1 + " to "+ (SecTwo+30); 
               var aPTT_R4 = SecTwo+31 + " to "+ (SecTwo+59);
               var aPTT_R5 =  "&#8805; "+(SecTwo+60);
               
               $(".aPTT_R1").html(aPTT_R1);
               $(".aPTT_R2").html(aPTT_R2);
               $(".aPTT_R3").html(aPTT_R3);
               $(".aPTT_R4").html(aPTT_R4);
               $(".aPTT_R5").html(aPTT_R5);
               
               // If SecTwo is gt 90 throw dialog

               if (SecTwo > 90) {
               //  $(function() {
               //   $("#confirmBox").dialog({
               //       modal:true,
               //       width:430,
               //       buttons: {
               //           Ok: function() {
               //               $(this).dialog("close");
               //           }
               //       }
               //   });
                  
               // });   
               var mainErrors = '<div class="alert alert-danger" style="margin-top:10px;" role="alert"><strong>Notice!</strong> Please note the aPTT Target has exceeded 90 sec!</div>';
                $('.FormErrors').html(mainErrors);
                $('#ErrorAlerts').html(mainErrors);
                $('#error').modal('show');
             }  
            
            if (nomogram == 'hepatic') {
             
            $("#results").show();
             var infusionRate = "<p> 0.5 mcg/kg/min ( "+(weight * 0.5 * 60/1000)+" mL\/hr ); <\/span> check aPTT 2 hrs after start of infusion, then adjust rate of infusion as follows:<\/p>";
                
                $(".IIRate").html(infusionRate);
                $("#IIRate").show();
                $("#rate-1").addClass("active");
               // Infusion Rates
               var IRC_R1 = "Increase rate by 0.1 mcg/kg/min (by " +(weight* 0.1 * 60/1000).toFixed(1)+ " mL\/hr)";
               var IRC_R2 = "Continue at current rate";
               var IRC_R3 = "Decrease rate by  0.1  mcg/kg/min (by " + (weight* 0.1 * 60/1000).toFixed(1) + " mL\/hr)";
               var IRC_R4 = "Hold infusion for 2 hrs, then resume at half current rate";
               var IRC_R5 = "Hold infusion for 2 hrs, then resume at half current rate when aPTT < "+ SecTwo +" sec";
               
               $("#IRC_R1").html(IRC_R1);
               $("#IRC_R2").html(IRC_R2);
               $("#IRC_R3").html(IRC_R3);
               $("#IRC_R4").html(IRC_R4);
               $("#IRC_R5").html(IRC_R5);
               
               //Check next aPTT
               var cNext_R1 = "4 hrs after rate change";
               var cNext_R2 = "4 hrs from last aPTT; after 2 consecutive aPTTs within target range, check aPTT every 12 hrs";
               var cNext_R3 = cNext_R1;
               var cNext_R4 = cNext_R1;
               var cNext_R5 = "Repeat every 2 hrs until aPTT < "+ SecTwo +" sec, then follow nomogram.";
               
               $("#cNext_R1").html(cNext_R1);
               $("#cNext_R2").html(cNext_R2);
               $("#cNext_R3").html(cNext_R3);
               $("#cNext_R4").html(cNext_R4);
               $("#cNext_R5").html(cNext_R5);
               
                
                
            }else if (nomogram == 'standard'){ // Standard area all Calcs will be here
             
                $("#results").show();
               var infusionRate = "<p> 2 mcg/kg/min ( "+(weight * 2 * 60/1000)+" mL\/hr ); <\/span> check aPTT 2 hrs after start of infusion, then adjust rate of infusion as follows:";
               
               $(".IIRate").html(infusionRate);
                $("#IIRate").show(); 
                $("#rate-1").addClass("active");
               // Infusion Rates
               var IRC_R1 = "Increase rate by 0.5 mcg/kg/min (by "+(weight* 0.5 * 60/1000).toFixed(1)+ " mL\/hr)";
               var IRC_R2 = "Continue at current rate";
               var IRC_R3 = "Decrease rate by 0.5 mcg/kg/min (by "+(weight* 0.5 * 60/1000).toFixed(1)+ " mL\/hr)";
               var IRC_R4 = "Hold infusion for 1 hr, then resume at half current rate";
               var IRC_R5 = "Hold infusion for 1 hr, then resume at half current rate when aPTT < "+ SecTwo +" sec";
               
               $("#IRC_R1").html(IRC_R1);
               $("#IRC_R2").html(IRC_R2);
               $("#IRC_R3").html(IRC_R3);
               $("#IRC_R4").html(IRC_R4);
               $("#IRC_R5").html(IRC_R5);
               
               //Check next aPTT
               var cNext_R1 = "4 hrs after rate change";
               var cNext_R2 = "4 hrs from last aPTT; after 2 consecutive aPTTs within target range, check aPTT every 12 hrs";
               var cNext_R3 = cNext_R1;
               var cNext_R4 = cNext_R1;
               var cNext_R5 = "Repeat every 1 hr until aPTT < "+ SecTwo +" sec, then follow nomogram.";
               
               $("#cNext_R1").html(cNext_R1);
               $("#cNext_R2").html(cNext_R2);
               $("#cNext_R3").html(cNext_R3);
               $("#cNext_R4").html(cNext_R4);
               $("#cNext_R5").html(cNext_R5);
               
             //  alert(IRC_R1);
            }else{

              var mainErrors = '<div class="alert alert-danger" style="margin-top:10px;" role="alert"><strong>Cheese and Crackers</strong> Please select a nomogram!</div>';
                $('.FormErrors').html(mainErrors);
                $('#ErrorAlerts').html(mainErrors);
                $('#error').modal('show');

            }
            
            
        }; // End Calculate
        
           
    });  // End DocReady     
        
 