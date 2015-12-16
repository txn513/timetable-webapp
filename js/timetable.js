$(document).on("pageinit","#index", function(){
	var urlPre = "http://cors.itxti.net/?"; //跨域中转
   var urlPre = "http://cors.itxti.net/?"; //跨域中转
    var url1 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=";
    var url2 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeDataSetByLikeTrainCode?UserID=";
    var url3 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?UserID=";

	$('#submit').on('click', getTrianByCode);

	//function getTrianByName (){}

	function getTrianByCode (){
		 $('#submit').button("option", "disabled", true);

		 $.mobile.loading("show");

		if($("#station-no").val() || ($('#startstation').val() && $('#endstation').val())){
			var _url = url1;
			var _data = {}
			if($("#station-no").val()){
				_url = url2;
				_data.TrainCode = $("#station-no").val();
			}
			else {
				_data.StartStation = $("#search-begin").val();
                _data.ArriveStation = $("#search-end").val();
			}
			$.ajax({
				type: "GET",
				url: urlPre + _url,
				data: _data,
				success: function(data){
					$("#trian-list").html('');
					var list = $("#trian-list");
					var timeTable = $(data).find("TimeTable");
					var trainCode = timeTable.find('TrainCode');
					var firstStation = timeTable.find('FirstStation');
					var lastStation = timeTable.find('LastStation');
					var useDate = timeTable.find('UseDate');
					var startTime = timeTable.find('StartTime');
					var html = '';

					for(var i = 0; i < 10; i++){
						html += "<li><a href='#'><h2>"+ trainCode[i].innerHTML + "次"
						+ "</h2><p>"+ firstStation[i].innerHTML
						+ " - "+ lastStation[i].innerHTML +"</p><p>用时："+ useDate[i].innerHTML 
						+"</p><p class='ui-li-aside'>"+ startTime[i].innerHTML +" 开</p></a></li>";	
					}
					if(html){
						list.html(html);
						list.listview("refresh");
					}
				}
			});
			$.mobile.loading("hide");
			$('#submit').button("option", "disabled", false);

			//return false;
			// $.get(urlPre + _url, _data, function(data){
			// 	console.log(data);
			// });
		}
		else {
			alert("请输入发车站和终点站或输入车次");
		}
	}
});