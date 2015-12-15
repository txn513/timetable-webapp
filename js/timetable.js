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