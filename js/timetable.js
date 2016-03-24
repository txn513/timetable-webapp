$(document).on("pageinit","#index", function(){
	//var urlPre = "cors.io/?u=http://"; //跨域中转
 	var urlPre = "http://cors.itxti.net/?"; //跨域中转
    // var url1 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=";
    // var url2 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeDataSetByLikeTrainCode?UserID=";
    var url3 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?UserID=";
    var url1 = 'http://op.juhe.cn/onebox/train/query_ab?';
    var url2 = 'http://op.juhe.cn/onebox/train/query?'; //车次查询
    var openId = '6482d314c0bf550a94dec520496c6460';
	$('#submit').on('click', getTrianList);
	$('#trian-list').on('click','a',getTrianDetail);

	//获取列车列表
	function getTrianList (){
		 // $('#submit').button("option", "disabled", true);

		 var interval = setInterval(function(){
		 	$.mobile.loading("show");
		 	clearInterval(interval);
		 },1);

		if($("#station-no").val() || ($('#startstation').val() && $('#endstation').val())){
			var _url = url1;
			var _data = {}
			_data.key = openId;
			
			if(($('#startstation').val() && $('#endstation').val())) {
				_data.from = $("#startstation").val();
                _data.to = $("#endstation").val();
			}
			else{
				_url = url2;
				// _data.TrainCode = $("#station-no").val();
				_data.train = $("#station-no").val();
				
			}
			$.ajax({
				type: "GET",
				url: _url,
				data: _data,
				dataType: "jsonp",
				jsonp: 'callback',
				jsonpCallback: 'trianList',
				success: function(data){
					console.log(data);
					var result = data.result.list;
					var len = result.length;
					$("#trian-list").html('');
					var list = $("#trian-list");
					// var timeTable = $(data).find("TimeTable");
					// var trainCode = timeTable.find('TrainCode');
					// var firstStation = timeTable.find('FirstStation');
					// var lastStation = timeTable.find('LastStation');
					// var useDate = timeTable.find('UseDate');
					// var startTime = timeTable.find('StartTime');
					var html = '';

					// for(var i = 0; i < 10; i++){
					// 	html += "<li><a href='#detail'" + " data-no='"+ trainCode[i].innerHTML  +"'><h2>"+ trainCode[i].innerHTML + "次"
					// 	+ "</h2><p>"+ firstStation[i].innerHTML
					// 	+ " - "+ lastStation[i].innerHTML +"</p><p>用时："+ useDate[i].innerHTML 
					// 	+"</p><p class='ui-li-aside'>"+ startTime[i].innerHTML +" 开</p></a></li>";	
					// }
					var trianList = "<li><a data-transition='slidedown' href='#detail'" + " data-no='"+ result.train_no  +"'><h2>"+ result.train_no + "次"
								+ "</h2><p>"+ result.start_station
								+ " - "+ result.end_station +"</p><p>用时："+ result.run_time 
								+"</p><p class='ui-li-aside'>"+ result.start_time +" 开</p></a></li>";
		
					if(len){
						if(len>10){
							for(var i = 0; i < 10; i++){
								html += "<li><a data-transition='slidedown' href='#detail'" + " data-no='"+ result[i].train_no  +"'><h2>"+ result[i].train_no + "次"
								+ "</h2><p>"+ result[i].start_station
								+ " - "+ result[i].end_station +"</p><p>用时："+ result[i].run_time 
								+"</p><p class='ui-li-aside'>"+ result[i].start_time +" 开</p></a></li>";
							}
						}
						else{
							for(var i = 0; i < len; i++){
								html += "<li><a data-transition='slidedown' href='#'" + " data-no='"+ result[i].train_no  +"'><h2>"+ result[i].train_no + "次"
								+ "</h2><p>"+ result[i].start_station
								+ " - "+ result[i].end_station +"</p><p>用时："+ result[i].run_time 
								+"</p><p class='ui-li-aside'>"+ result[i].start_time +" 开</p></a></li>";
							}
						}
					}
					else {
						html = trianList;
					}
					if(html){
						list.html(html);
						list.listview("refresh");
					}
				}
				// error: function(){
				// 	alert('为找到车次')；
				// }
			});
			 var interval2 = setInterval(function(){
			 	$.mobile.loading("hide");
			 	clearInterval(interval2);
			 },1);
			// $('#submit').button("option", "disabled", false);
		}
		else {
			 var interval2 = setInterval(function(){
			 	$.mobile.loading("hide");
			 	clearInterval(interval2);
			 },1);
			alert("请输入发车站和终点站或输入车次");
		}
	}

	function getTrianDetail(){
		$.mobile.loading("show");
		var trainCode = $(this).attr('data-no');
		var _url = url2;
		var _data = {};
		_data.key = openId;
		_data.train = trainCode;



		$.ajax({
				type: "GET",
				url: _url,
				data: _data,
				dataType: "jsonp",
				jsonp: 'callback',
				jsonpCallback: 'trianList',
				success: function(data){
					console.log(data);
					
					$('#detail').find('.ui-content h2').html(trainCode + '次');
		 			var tbody = $('#table-list tbody');
		 			var theadTr = $('#table-list thead tr');
					var result = data.result.list;
					var priceList = result.price_list.item;

					var priceN ='';
					var priceP ='';

					if(Object.prototype.toString.call(priceList) === '[object Array]'){
						$.each(priceList, function(index, obj){
							priceN += '<th>'+ obj.price_type +'</th>';
							priceP += '<td>'+  '¥ ' + obj.price +'</td>';
						});
					}
					else {
						priceN = '<th>'+ priceList.price_type +'</th>';
						priceP = '<td>'+  '¥ ' + priceList.price +'</td>';
					}

					var _html = '<tr><td>'+ result.train_type +'</td>' 
					+ '<td>'+ result.start_station + '</td>' 
					+ '<td>'+ result.end_station + '</td>' 
					+ '<td>'+ result.start_time +'</td>' 
					+ '<td>'+ result.end_time +'</td>' 
					+ '<td>'+ result.run_time +'</td>' 
					+ '<td>'+ result.run_distance +'</td>' 
					+ priceP + '</tr>';
					
					theadTr.append(priceN);
					tbody.html(_html);
					//tbody.append(_html);   
					$('#table-list').table('refresh');
					$.mobile.changePage('#detail');
				}
				// error: function(){
				// 	alert('为找到车次')；
				// }
			});

		// var _data = {}
		// if(trainCode){
		// 	var _url = url3;
		// 	_data.TrainCode = trainCode;
		// }
		// $.ajax({
		// 	type: 'get',
		// 	data: _data,
		// 	url: urlPre + _url,
		// 	success: function(data){
		// 		console.log(data);
		// 		$('#detail').find('.ui-content h2').html(trainCode + '次');
		// 		var tbody = $('#table-list tbody');
		// 		tbody.html('');
		// 		$(data).find('TrainDetailInfo').each(function(index){
		// 			var trainIndex = index + 1;
		// 			var _html = '<tr><th>'+ trainIndex +'</th><td>'+ $(this).find('TrainStation').text() + '</td>' +
		// 			'<td>'+ $(this).find('ArriveTime').text() + '</td>' +
		// 			'<td>'+ $(this).find('StartTime').text() + '</td></tr>'
		// 			tbody.append(_html);   
		// 		});

		// 	}
		// });
		 var interval2 = setInterval(function(){
		 	$.mobile.loading("hide");
		 	clearInterval(interval2);
		 },1);

	}
});