	
var tasks = [
"гауссовой кривизне",
"минимуму нормальной кривизны",
"средней кривизне",
"нормальной кривизне вдоль биссектрисы угла между главными направлениями",
"углу (в [-π/2,π/2)) между первой координатной кривой (v=const) и главным направлением, соответствующим минимальной главной кривизне,",
"кривизне сечения плоскостью, натянутой на векторы e<sub>1</sub> и e<sub>2</sub>+n, где (e<sub>1</sub>,e<sub>2</sub>) - канонический базис, а n - нормаль к поверхности,",
];

var resolution = 40;

  function changeResolution()
  {
    resolution = $('#resolution').val();
    initMesh();
  }

   function set_input(name, value) {
	 $("input[name='"+name+"']").val(value);   
   }


  function get_input(name) {
	return $("input[name='"+name+"']").val();   
  }
  
   
	 function toggleTask() {	 
      $('#explanation').toggleClass('hidden');
      $('#functions').toggleClass('hidden');
      $('#students input[name="hide_task"]').val($('#explanation').hasClass('hidden') ? "Показать задание" :"Спрятать задание");
	 }

  $('#CAS').change( function () {
    set_input('CAS', $(this).val());
    //console.log('cas change triggered');
    if ($(this).val()=='algebrite') {
      $("input[name='execute']").removeClass('hidden');
      $("#answer").removeClass('hidden');    
      $("#mathjs-info").addClass('hidden');
    } else {
      $("input[name='execute']").addClass('hidden');
      $("#answer").addClass('hidden');
      $("#mathjs-info").removeClass('hidden');
      $('#colorfunc').html('');
      $('#contact-form input[name="Функция"]').val('Без формулы');
    }
    
  });

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

  function selectSurface() {
   
	 surface_num = $('#selectSurface option:selected').val(); //Math.abs((hash >> 6) % surfaces.length);
	 if(surface_num == "---") {
	 $('#paramx').html("Выберите поверхность в верхнем меню");
	 $('#paramy').html("Также можете выбрать детализацию - количество полигонов при отрисовке");
	 $('#paramz').html("");
	  return;
	  }
	 //console.log(surface_num);
	 set_input("Поверхность", surfaces[surface_num]['name']);
	 $('#paramx').html('x = '+ surfaces[surface_num]['x']);
	 $('#paramy').html('y = '+ surfaces[surface_num]['y']);
	 $('#paramz').html('z = '+ surfaces[surface_num]['z']);
  	initMesh();	   
  }

	 function load_task() {	 
	 let surname =  $('#surname option:selected').html();
	 set_input("ФамилияИмя", surname);
	 let hash = hashCode(surname);
	 //console.log(tasks[colorfunc_num], colorfunc_num, tasks.length);
	 colorfunc_num = (hash % 64) % tasks.length;
	 //surface_num = Math.abs((hash >> 6) % surfaces.length);
	 $("#task-func").html(tasks[colorfunc_num]);
	 set_input("Задание", $('#task-func').html());
	 //console.log(surname + ' hash ' + hash + '\n surface ' + surfaces[surface_num]['name'] + ' func ' + colorfunc_num);
	 $("input[name='hide_task']").prop( "disabled", false );
	 $("#selectSurface").prop( "disabled", false );
	 $("#resolution").prop( "disabled", false );
	 surfaces.forEach(function callback(currentValue, index, array) {
	   let option = $("<option></option>").html(currentValue['name']).val(index);
    $("#selectSurface").append(option);
    });
	 }

  
   $('#contact-form').formcache();
   //$('#identity-form').formcache();

  $("#load").click(function () {
   let group = get_input('Группа');
   let surname = get_input('ФамилияИмя');
   let task = get_input('Задание');
   let CAS = get_input('CAS');
   let solution = get_input('Решение');
   let surface = get_input('Поверхность');
   let comment = get_input('Комментарий');
   let func = get_input('Функция');
   $('select[id="group"] option[value="'+group+'"]').prop('selected',true);
   if(group != '---') load_students();
   $('select[id="surname"] option[value="'+surname+'"]').prop('selected',true);
   if (surname != '---') load_task();
   let surface_num = $('#selectSurface option:contains("'+surface+'")').val();
   //console.log(surface_num);
   $('select[id="selectSurface"] option[value="'+surface_num+'"]').prop('selected',true);
   if (surface != '---')  selectSurface();
   $('#CAS').val(CAS);  
   $( "#CAS" ).trigger("change" );
   $('#terminal').val(solution);
   $('#comment').val(comment);   
   $('#colorfunc').html(func);
   $('#load').remove();
   if($('#explanation').hasClass('hidden')) toggleTask();
  });

    $("#terminal").on('input',function(e){
          	 set_input("Решение", e.target.value);
          	    $('#load').remove();
    });


