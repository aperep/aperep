	
var tasks = [
"гауссовой кривизне",
"минимуму нормальной кривизны",
"средней кривизне",
"нормальной кривизне вдоль биссектрисы угла между главными направлениями",
"углу (в [-π/2,π/2)) между первой координатной кривой (v=const) и главным направлением, соответствующим минимальной главной кривизне,",
"кривизне сечения плоскостью, натянутой на векторы e<sub>1</sub> и e<sub>2</sub>+n, где (e<sub>1</sub>,e<sub>2</sub>) - канонический базис, а n - нормаль к поверхности,",
];


   function set_input(name, value) {
	 $("input[name='"+name+"']").val(value);   
   }
   
	 function toggleTask() {	 
      $('#explanation').toggleClass('hidden');
      $('#functions').toggleClass('hidden');
      $('#students input').val($('#explanation').hasClass('hidden') ? "Показать задание" :"Спрятать задание");
	 }

	 function load_students() {	 
	 var surnameList = $('#surname');
	 surnameList.children().each(function() {if (this.value != '---') this.remove();});
	 //surnameList.append(firstentry);
	 
	 let group = $("#group option:selected").html();
	 set_input("Группа", group);
	 if (group== 'Группа') {
    surnameList.prop( "disabled", true );
	  return;
	 }
	 
   $.each(students[group], function(i,v)
    {
    var li = $('<option></option>').html(v).attr('value', v)
    //console.log(li.html());
        li.appendTo(surnameList);
    });
    surnameList.prop( "disabled", false );
	 }
	
	function hashCode(str) {
  return Math.abs(str.split('').reduce((prevHash, currVal) =>
    ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0));
  }

	 function load_task() {	 
	 let surname =  $('#surname option:selected').html();
	 set_input("ФамилияИмя", surname);
	 let hash = hashCode(surname);
	 surface_num = Math.abs((hash >> 6) % surfaces.length);
	 colorfunc_num = (hash % 64) % tasks.length;
	 //console.log(tasks[colorfunc_num], colorfunc_num, tasks.length);
	 $("#task-func").html(tasks[colorfunc_num]);
	 set_input("Задание", $('#task-func').html());
	 console.log(surname + ' hash ' + hash + ' surface ' + surface_num + ' func ' + colorfunc_num);
	 $("input[name='hide_task']").prop( "disabled", false );
	 $('#paramx').html('x = '+ surfaces[surface_num]['x']);
	 $('#paramy').html('y = '+ surfaces[surface_num]['y']);
	 $('#paramz').html('z = '+ surfaces[surface_num]['z']);
  	initMesh();	 
	 }
