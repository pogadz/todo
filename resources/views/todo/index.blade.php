@extends('layouts.main')


@section('content')
<div class="content">
	<div class="wrap">
		<div class="todos-wrap">
			<div class="todos-head clear">
				<h3 class="left">List</h3>
				<select name="todoFilter" class="todoFilter">
					<option value="-1">All</option>
					<option value="0">Active</option>
					<option value="1">Completed</option>
				</select>
				<button class="todo-btn todo-add right"><i class="fas fa-plus"></i> ADD ITEM</button>
			</div>

			<div class="todos">
				<ul>
					<!-- <li>
						<input class="todo-checkbox" id="todo-checkbox-2" type="checkbox" value="value1">
					   						 <label for="todo-checkbox-2">Checkbox</label>
					   					</li> -->
					@if(count($todos) > 0)
						@foreach($todos as $key => $todo)
							<li>
								<div class="todo-item clear" data-index="{{$todo->id}}">
									<div class="todo-item-title todo-item-con">
										<input type="checkbox" id="todo-checkbox-{{$todo->id}}" class="todo-checkbox" {{$todo->is_complete ? 'checked' : ''}}/>
										<label for="todo-checkbox-{{$todo->id}}" class="todo-title-txt">{{$todo->title}}</label>
									</div>
									<div class="todo-details todo-item-con">
										<span class="todo-estimate-txt" data-date="">{{$todo->due_at}}</span>
										<span class="todo-estimate-status"></span>
										<span class="todo-status">{{$todo->is_complete ? 'complete' : ''}}</span>
										
									</div>
									<div class="todo-item-action todo-item-con">
										<a href="#" class="todo-edit">Edit</a>
										<span>|</span>
										<a href="#" class="todo-del">Delete</a>
									</div>
								</div>
								
							</li>
						@endforeach
					@else
						<li>No Data</li>
					@endif
				</ul>

			</div>
		</div>
	</div>
	
</div>

<div class="todo-modal">
	<div class="todo-modal-in">
		<span class="close">x</span>
		<div class="todo-modal-con">
			<form class="todo-form">
				<div class="todo-form-row">
					<label>Title <span class="required">*</span></label>
					<input type="text" name="title" class="todo-title todo-input">
				</div>
				<div class="todo-form-row">
					<label>Estimation</label>
					<input type="text" name="due_at" id="estimate-date" class="todo-estimate todo-input">
				</div>
				<div class="todo-form-row">
					<input type="submit" class="todo-btn todo-submit" value="ADD TO LIST">
				</div>
			</form>
		</div>
	</div>
</div>



@endsection


</body>

</html>

	