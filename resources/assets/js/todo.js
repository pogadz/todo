$(function(){

	var body = $('body'),
		todoUrl = '',
		todoModal = $('.todo-modal'),
		todoListWrap = $('.todos ul'),
		todoTitle = $('.todo-title'),
		todoEstimate = $('.todo-estimate'),
		isEdit = false;
		
	init();

	$('.todo-add').on('click', function(){
		isEdit = false;
		clear();
		modal();
	});

	$(document).on('click', '.close', function(){
		modal(false);
		todoTitle.removeClass('required');
	});

	$(document).on('change', '.todo-checkbox', function(){
		var self = $(this);

		$.ajax({
			method: 'POST',
			url: 'api/todos/complete/' + self.closest('.todo-item').data('index'),
			data: JSON.stringify({is_complete: self.is(':checked') ? 1 : 0}),
			contentType: 'application/json'
		}).then(function(res){
			var todoParent = $('.todo-item[data-index="'+res.id+'"]');
			todoParent.find('.todo-status').text(res.is_complete ? 'complete' : '');
		});
	});	

	$(document).on('change', '.todoFilter', function(){
		var self = $(this),
			state = '';

		switch(self.val()){
			case '-1':
				state = '';
				break;
			case '0':
				state = 'active';
				break;
			case '1':
				state = 'complete'
				break;
		}
		$.ajax({
			method: 'GET',
			url: 'api/todos/'+state,
			contentType: 'application/json'
		}).then(function(res){
			var items = '';

			if(res){
				$.each(res, function(i, item){
					items += renderList(item)
				});
				todoListWrap.html(res.length ? items : '<li>No Data</li>');
			}
		});
	});	


	$(document).on('click', '.todo-edit', function(e){
		e.preventDefault();
		isEdit = true;
		todoUrl = 'api/todos/' + $(this).closest('.todo-item').data('index');
		$.ajax({
			method: 'GET',
			url: todoUrl,
			dataType: 'json'
		}).then(function(res){
			console.log(res);
			if(res){
				todoTitle.val(res.title);
				todoEstimate.val(res.due_at);
				todoModal.data('index', res.id);
				modal();
			}
		});
		
	});

	$(document).on('click', '.todo-submit', function(e){
		var data = {
			title: todoTitle.val(),
			due_at: todoEstimate.val() ?  formatDate(todoEstimate.val()) : moment().format('YYYY-MM-DD')
		}

		e.preventDefault();

		todoUrl = 'api/todos/'+(isEdit ? todoModal.data('index') : '');

		if(data.title){
			$.ajax({
				type: (isEdit ? 'PATCH': 'POST'),
				url: todoUrl,
				data: data,
				dataType: 'json'
			}).then(function(res){
				var items = '';

				if(res){
					if(isEdit){
						var todoParent = $('.todo-item[data-index="'+res.id+'"]');
						if(res.title){
							todoParent.find('.todo-title-txt').text(res.title);
						}

						if(res.due_at){
							todoParent.find('.todo-estimate-txt').text(res.due_at);
							todoParent.find('.todo-estimate-status').text(isDueDate(res.due_at) ? 'due' : '');
						}
					}else{
						$.each(res, function(i, item){
							items += renderList(item)
						});

						todoListWrap.html(res.length ? items : '<li>No Data</li>');
					}

					modal(false);
					reset();

				}
				todoTitle.removeClass('required');
			});
			
		}else{
			todoTitle.addClass('required');
		}
		

	});

	$(document).on('click', '.todo-del', function(e){
		e.preventDefault();
		todoUrl = 'api/todos/'+$(this).closest('.todo-item').data('index');
		$.ajax({
			type: 'DELETE',
			url: todoUrl,
			contentType: 'application/json'
		}).then(function(res){
			var items = '';

			if(res){
				$.each(res, function(i, item){
					items += renderList(item)
				});
				todoListWrap.html(res.length ? items : '<li>No Data</li>');
				modal(false);
			}
		});
	});

	function init(){

		$('#estimate-date').datetimepicker({
			format:'m/d/Y',
			timepicker: false,
			scrollMonth : false,
			scrollInput : false
		});
		
		$('.todo-estimate-txt').each(function(){
			var self = $(this);
			self.closest('.todo-details').
				find('.todo-estimate-status').
				text(isDueDate(self.text()) ? 'due': '');

		});
	}

	function modal(close){
		body[(close || (arguments.length > 0)) ? 'removeClass' : 'addClass']('modal');
	}

	function clear(){
		todoTitle.add(todoEstimate).val('');
	}

	function reset(){
		clear();
		$('.todoFilter').val('-1');
	}

	function formatDate(val){
		return moment(val, 'MM/DD/YYYY').format("YYYY-MM-DD");
	}

	function isDueDate(date){
		var now = moment().endOf('day').format('YYYY-MM-DD'),
			date = moment(date, 'MM/DD/YYYY').format('YYYY-MM-DD');

		return moment(now).isAfter(date);
	}

	function renderList(data){
		return '<li><div class="todo-item clear" data-index="'+data.id+'"><div class="todo-item-title todo-item-con"> <input type="checkbox" id="todo-checkbox-'+data.id+'" class="todo-checkbox"' + (data.is_complete ? "checked" : "") +'/><label for="todo-checkbox-'+data.id+'" class="todo-title-txt">'+data.title+'</label></div><div class="todo-details todo-item-con"><span class="todo-estimate-txt">'+data.due_at+'</span> <span class="todo-estimate-status">'+(isDueDate(data.due_at) ? 'due': '')+'</span> <span class="todo-status">'+(data.is_complete ? 'complete' : '')+'</span></div><div class="todo-item-action todo-item-con"><a href="#" class="todo-edit">Edit</a><span> | </span><a href="#" class="todo-del">Delete</a></div></div></li>';
	}

});