function disableForm($flag) {
	var forms = document.getElementsByClassName("Disable");
	for (i=0; i<forms.length; i++){
		forms[i].disabled = true;
	} 	

	var forms_file = document.getElementsByName("File");
	for (i=0; i<forms_file.length; i++){
		forms_file[i].disabled = false;
	}

	var forms_file = document.getElementsByName("Rackip");
	for (i=0; i<forms_file.length; i++){
		forms_file[i].disabled = false;
	}

	var forms_file = document.getElementsByName("Port");
	for (i=0; i<forms_file.length; i++){
		forms_file[i].disabled = false;
	}
	// alert($flag);
	document.getElementById("device_check_input").value = $flag;

}

function enableForm() {
	var forms = document.getElementsByClassName("Disable");
	for (i=0; i<forms.length; i++){
		forms[i].disabled = false;
	}

	var forms_file = document.getElementsByName("File");
	for (i=0; i<forms_file.length; i++){
		forms_file[i].disabled = true;
	}

	var forms_file = document.getElementsByName("Rackip");
	for (i=0; i<forms_file.length; i++){
		forms_file[i].disabled = true;
	}

	var forms_file = document.getElementsByName("Port");
	for (i=0; i<forms_file.length; i++){
		forms_file[i].disabled = true;
	}
}

function activeForm() {
	var elements = document.getElementsByClassName("nav-link");
	for (var i=0; i<elements.length; i++) {
		if (elements[i].href == document.URL) {
			elements[i].classList.add("active");
			elements[i].parentElement.parentElement.parentElement.classList.add("menu-open");			
		}
	}

}

function color(){
	var elements = document.getElementsByClassName("nav-item");
	for(var i=0;i<elements.length;i++){
		if(elements[i].href == document.URL){
			elements[i]
		}
	}
}

function warningForm() {
	var forms = document.getElementsByClassName("hidden");
	for (i=0; i<forms.length; i++){
		//console.log(forms[i].childNodes[0].innerHTML)
		 if(forms[i].childNodes[0].innerHTML == '0'){
		 	document.getElementById("hidden").style.visibility = "hidden";
		 }
		 else
		 	document.getElementById("hidden").style.visibility = "visible";
	} 	
	
}

function event_show() {
		$.ajax({
            url: 'getAlertRecently',
            success: function(data) {
    			for(var i=0; i<data.length; i++)
	    			if(data[i].status == '1')
	    				document.getElementById("event"+i).innerHTML ="<p hidden=''>" + data[i].eventid + "</p>" + data[i].address + "&ensp; | " + data[i].timestamp;
	                else
	                	document.getElementById("event"+i).innerHTML ="<p hidden=''>" + data[i].eventid + "</p>" + "<strong>" + data[i].address + "&ensp; | " + data[i].timestamp + "</strong>";                       
	         }
        });
}

function notifications_show(){
	$.ajax({
            url: 'showNotifications',
            success: function(data) {
    			for(var i=0; i<data.length; i++)
	    			document.getElementById("event"+i).innerHTML =  data[i].event;
	         }
        });
}

function markNotificationAsRead(){
	$.get('/markAsRead');
}





function warning_home() {							
	
	var elements = document.getElementsByClassName("brand-link");
	for (var i=0; i<elements.length; i++) {
		if (elements[i].href == document.URL) {			
				$.ajax({
                 url: 'getAlertRecently',
                 success: function(data) {
                    for(var i=0; i<data.length; i++)
                    if(data[i].status != '1')	
                    	document.getElementById("event_home"+i).innerHTML ="<strong>" + data[i].address + "  | " + data[i].event + "  | " + data[i].timestamp + "</strong>";
                   	else
                   		document.getElementById("event_home"+i).innerHTML =data[i].address + "  | " + data[i].event + "  | " + data[i].timestamp;
                 }
             });
		}
	}
	
}

function changeFunc() {
	var selectBox = document.getElementById("selectBox");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	if(selectedValue == 2){
		var forms = document.getElementsByClassName("version_3");
		for (i=0; i<forms.length; i++){
			forms[i].disabled = true;
		} 	
		var forms_file = document.getElementsByClassName("version_2");
		for (i=0; i<forms_file.length; i++){
			forms_file[i].disabled = false;
		}
		var version3 = document.getElementsByClassName("hidden3");
		for(i=0; i<version3.length; i++){
			version3[i].style.visibility = "hidden";
		}		
	}
	else{
		var forms = document.getElementsByClassName("version_2");
		for (i=0; i<forms.length; i++){
			forms[i].disabled = true;
		} 	
		var forms_file = document.getElementsByClassName("version_3");
		for (i=0; i<forms_file.length; i++){
			forms_file[i].disabled = false;
		}

		var version3 = document.getElementsByClassName("hidden3");
		for(i=0; i<version3.length; i++){

			version3[i].style.visibility = "visible";
			console.log(version3[i]);
		}
	}
}


function changeFunc_Type(){
	var selectBox = document.getElementById("selectBox_Type");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	if(selectedValue == 'rack'){
		document.getElementById("select_rack").hidden = true;
	}
	else{
		document.getElementById("select_rack").hidden = false;
	}
	if(selectedValue == 'Computer'){
		document.getElementById("select_computer").hidden = false;
	}
	else{
		document.getElementById("select_computer").hidden = true;
		document.getElementById("select_modsecurity").hidden = true;
	}
}

function changeCom_Type(){
	var selectBox = document.getElementById("select_computer_type");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	if(selectedValue == 0){
		document.getElementById("select_modsecurity").hidden = true;
	}
	else{
		document.getElementById("select_modsecurity").hidden = false;
	}
}

// Create new Organization Unit
function newOU(){
   var  selectBox = document.getElementById("selectBoxOU");
   var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   if(selectedValue === "1") {
       document.getElementById("newElementOU").innerHTML = "<br>" +
           "<input class='form-control Disable' name='newOrganizationUnit' " + "placeholder='Nhập đơn vị công tác' " +
		   "required=''>";
       document.getElementById("newElementOU").style.visibility = "visible";
   }
   else{
       document.getElementById("newElementOU").style.visibility = "hidden";
   }
}

function export_data(i){
	$.get('exportdata',function Download_data(){
	document.getElementById("Download"+i).click();
	});
}


// function update_notifications(){
// 	$.ajax({
//         url: 'updateNotificaion',
//         success: function(data) {
// 			if(data.event != 0){
// 				document.getElementById("count_event").classList.add("badge-accent");
// 				document.getElementById("count_event").innerHTML = data.event;
// 			}
// 			if(data.firewall != 0){
// 				document.getElementById("count_firewall").classList.add("badge-accent");
// 				document.getElementById('count_firewall').innerHTML = data.firewall;
// 			}
// 			if(data.system != 0){
// 				document.getElementById("count_system").classList.add("badge-accent");
// 				document.getElementById("count_system").innerHTML = data.system;
// 			}
//         }
//     });
// }

function events_show(){
	$.ajax({
        url: 'showevents',
        success: function(data) {
        	var elements = [];
	        var count = 0;
		        for(var i=0; i<data.length; i++){
			        elements[i] = document.createElement("div");
				    elements[i].id = "notification" + i;
				    var div = document.getElementById("DATA");
			        div.appendChild(elements[i]);
				    document.getElementById("notification" + i).innerHTML = "<div class='dropdown-divider'></div>" +
					    "<a href=''><p class='dropdown-item'>" +
					    "<i class='fa fa-exclamation-triangle' style='color: #ff0000;'></i> " +
					    "<span class='text-muted text-sm' >" + data[i].event + "<small class='float-sm-right' style='margin-top: 22px;'><i>"+ data[i].created_at + "</i></smaill></span>" +
					    "</p></a>";
					if(count++ == 5) break;
		        }; 	
		}
	});
}

function system_event_show(){
		$.ajax({
        url: 'showNotifications',
        success: function(data) {
	        	var elements = [];
	        	var count = 0;
		        for(var i=0; i<data.length; i++){
		        	data[i].data = JSON.parse(data[i].data);
			        elements[i] = document.createElement("div");
				    elements[i].id = "notification_2" + i;
				    var div = document.getElementById("DATA1");
			        div.appendChild(elements[i]);
				    document.getElementById("notification_2" + i).innerHTML = "<div class='dropdown-divider'></div>" +
					    "<a href=''><p class='dropdown-item'>" +
					    "<i class='fa fa-exclamation-triangle' style='color: #ff0000;'></i> " +
					    "<span class='text-muted text-sm' > " + data[i].data + "<small class='float-sm-right' style='margin-top: 22px;'><i>"+ data[i].created_at +"</i></small></span>" +
					    "</p></a>";
					if(count++ == 5) break;
		        	}; 	
        }
    	});  
}

function system_event_anomaly_show(){
	$.ajax({
        url: 'showEventsAnomaly',
        success: function(data) {
        	var elements = [];
	        var count = 0;
		        for(var i=0; i<data.length; i++){
			        elements[i] = document.createElement("div");
				    elements[i].id = "notification" + i;
				    var div = document.getElementById("DATA2");
			        div.appendChild(elements[i]);
				    document.getElementById("notification" + i).innerHTML = "<div class='dropdown-divider'></div>" +
					    "<a href=''><p class='dropdown-item'>" +
					    "<i class='fa fa-exclamation-triangle' style='color: #ff0000;'></i> " +
					    "<span class='text-muted text-sm' >" + data[i].event + "<small class='float-sm-right' style='margin-top: 22px;'><i>"+ data[i].created_at + "</i></smaill></span>" +
					    "</p></a>";
					if(count++ == 5) break;
		        }; 	
		}
	});
}

function users_activity(){
	if(document.getElementById("check_tab_user").value == 0){
		$("#check_tab_user").val("1");
		document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("main").style.marginRight = "250px";
		$.ajax({
			url: 'users-activity',
			success: function(data) {
				console.log(data);
				var elements = [];
					for(var i=0; i<data.length; i++){
						elements[i] = document.createElement("div");
						elements[i].id = "notification" + i;
						var div = document.getElementById("users_activity");
						div.appendChild(elements[i]);
						if(data[i].activity == 'online'){
						document.getElementById("notification" + i).innerHTML = "<div class='user_search'><div class='dropdown-divider'></div>" +
							"<a href=''><p class='dropdown-item'>" +
							"<i class='fa fa-circle' style='color: #04B404; font-size: 10px; width : 15px;'></i> " +
							"<span class='text-muted' >" + data[i].name + "<small class='float-sm-right' style='color: #04B404;'><i>"+ data[i].activity + "</i></small></span>" +
							"</p></a></div>";
						}
						else{
							document.getElementById("notification" + i).innerHTML = "<div class='user_search'><div class='dropdown-divider'></div>" +
							"<a href=''><p class='dropdown-item'>" +
							"<span class='text-muted text-sm' style='margin-left: 8%;'>" + data[i].name + "</span>" +
							"</p></a></div>";
						}
					}; 	
			}
		});
	}
	else{
		$("#check_tab_user").val("0");
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("main").style.marginRight = "0";
	}
}

function loading() {
  document.getElementById("background-loading").classList.add("background-load");
  document.getElementById("gif_load").removeAttribute("hidden");
}

function pagingDeviceList(value) {
	window.location = 'getdevicelistpaging/'+value;
}


// function temperature information
function getTemperatureInfomation(){
	var rackid = $("#rackid").text();
	$.ajax({
			url: 'monitor/'+rackid,
			success: function(data) {
				printData(data);		
			}
		});
}

function printData(data){
	console.log(data);
	if($("#check_hum_temp").val() == 0){
		$("#hum_temp").css("display", "block");
		$("#check_hum_temp").val(1);
	}
	else{
		$("#hum_temp").css("display", "none");
		$("#check_hum_temp").val(0);
	}

	for(i=0; i<10; i++){
		if (typeof data[i] == "undefined")
			data[i]= {"id":null,"rackid":null,"ip":null,"temp":0,"humid":0,"created_at":null,"updated_at":null};
	}
	
	var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Nhiệt độ và độ ẩm"
	},
	toolTip: {
		shared: true
	},
	axisX: {
		title: "Thời gian",
		suffix : ""
	},
	axisY: {
		title: "Độ ẩm",
		titleFontColor: "#4F81BC",
		suffix : " %",
		lineColor: "#4F81BC",
		tickColor: "#4F81BC"
	},
	axisY2: {
		title: "Nhiệt độ",
		titleFontColor: "#C0504E",
		suffix : " độ C",
		lineColor: "#C0504E",
		tickColor: "#C0504E"
	},
	data: [{
		type: "spline",
		name: "Độ ẩm",
		xValueFormatString: "#### sec",
		yValueFormatString: "#,##0.00 %",
		dataPoints: [
			{ label: data[9].created_at, x: 0 , y: data[9].humid },
			{ label: data[8].created_at, x: 5 , y: data[8].humid },
			{ label: data[7].created_at, x: 10 , y: data[7].humid },
			{ label: data[6].created_at, x: 15 , y: data[6].humid },
			{ label: data[5].created_at, x: 20 , y: data[5].humid },
			{ label: data[4].created_at, x: 25 , y: data[4].humid },
			{ label: data[3].created_at, x: 30 , y: data[3].humid },
			{ label: data[2].created_at, x: 35 , y: data[2].humid },
			{ label: data[1].created_at, x: 40 , y: data[1].humid },
			{ label: data[0].created_at, x: 45 , y: data[0].humid }
		]
	},
	{
		type: "spline",  
		axisYType: "secondary",
		name: "Nhiệt độ",
		yValueFormatString: "#,##0.# độ C",
		dataPoints: [
			{ label: data[9].created_at, x: 0 , y: data[9].temp },
			{ label: data[8].created_at, x: 5 , y: data[8].temp },
			{ label: data[7].created_at, x: 10 , y: data[7].temp },
			{ label: data[6].created_at, x: 15 , y: data[6].temp },
			{ label: data[5].created_at, x: 20 , y: data[5].temp },
			{ label: data[4].created_at, x: 25 , y: data[4].temp },
			{ label: data[3].created_at, x: 30 , y: data[3].temp },
			{ label: data[2].created_at, x: 35 , y: data[2].temp },
			{ label: data[1].created_at, x: 40 , y: data[1].temp },
			{ label: data[0].created_at, x: 45 , y: data[0].temp }
		]
	}]
});
chart.render();
}



activeForm();
warningForm();
warning_home();
//update_notifications();

