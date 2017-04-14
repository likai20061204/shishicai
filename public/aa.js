$(function(){

	document.onkeydown = function (e) {
      if (!e) e = window.event;
      if ((e.keyCode || e.which) == 13) {
          console.log(22);
      }
  }

	//初始化数据
	initData();

	//添加数据
	$('#addData').live('click',function(){
		$('#add').submit();
	});

	//删除数据
	$('[_name="de"]').live('click',function(){
		var _id = $(this).attr('data-id');
		$.post('http://localhost:3000/delData',{id:_id},function(res){
			if(res == 'yes'){
				initData();
			}
		})
	})

	

})


//渲染数据到页面
function initData(){
	$.ajax({
		url: 'http://localhost:3000/initData',
		dataType: "jsonp",
		data: {aa:'dsadas'},
		type: 'POST',
		jsonpCallback: 'callback', 
		success: function (data) {
			var data = JSON.parse(data);
			var res = data.msg;
			var str = `<tr>
									<th>序号</th>
									<th>第一位</th>
									<th>第二位</th>
									<th>第三位</th>
									<th>第四位</th>
									<th>第五位</th>
									<th>操作</th>
								</tr>`;
			var len = res.length;
			for(var i = 0; i < len; i++){
				str += `<tr>
					<td>0</td>
					<td>${res[i].num1}</td>
					<td>${res[i].num2}</td>
					<td>${res[i].num3}</td>
					<td>${res[i].num4}</td>
					<td>${res[i].num5}</td>
					<td><a href="javascript:;" data-id="${res[i].id}" _name="de">删除</a></td>
				</tr>`
			}
			$('#lblResponse').html('').append(str);
			var len = $('#lblResponse tr').length;
			for(var i = 0; i < len; i++){
				$('#lblResponse tr').eq(i).find('td').eq(0).html(i);
			}
			isGood(4);
			$('#list').scrollTop(0);
		}
	});
	$('[name="shuzi"]').focus();


}


//判断是否可以
function isGood(number){
	var len = $('#lblResponse tr').length;

	if(!number){

		for(var j = 1; j < 6; j++){

			var ji = 0;
			var ou = 0;
			var per = 0;

			for(var i = 1; i < len; i++){
				var item = $('#lblResponse tr').eq(i).find('td').eq(j);
				var val = item.html();
				// console.log(val)
				if(val > 4)
					ji++;
				else{
					ou++;
				}
				per = (ji/(ji+ou)).toFixed(2);

				if(per > 0.55){
					item.html(`<span style="color:blue">${val}x</span>`);
				}
				if(per < 0.45){
					item.html(`<span style="color:blue;">${val}d</span>`);
				}
				console.log(per)
			}
		}
	}else{
		var ji = 0;
		var ou = 0;
		var per = 0;

		for(var i = 1; i < len; i++){
			var item = $('#lblResponse tr').eq(i).find('td').eq(number);
			var val = item.html();
			// console.log(val)
			if(val > 4)
				ji++;
			else{
				ou++;
			}
			per = (ji/(ji+ou)).toFixed(2);

			if(per > 0.55){
				item.html(`<span style="color:blue">${val}x</span>`);
			}
			if(per < 0.45){
				item.html(`<span style="color:blue;">${val}d</span>`);
			}
			console.log(per)
		}
	}

	

	
}