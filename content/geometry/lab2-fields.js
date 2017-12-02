	
var tasks = [
"сглаживание через метод котангенсов",
];

var resolution = 40;

  function changeResolution()
  {
    resolution = $('#resolution').val();
    initMesh();
  }

   function set_input(name, value) {
   if (name =="Задание")	$('#Задание').html(value);
   $("input[name='"+name+"']").val(value);   
   }


  function get_input(name) {
  //if (name =="Задание") return	$('#Задание').html(value);
	return $("input[name='"+name+"']").val();   
  }
  
   
function load_students() {	 
	 let group = fields['Группа'];
   console.log('load_students', group)
	 set_input("Группа", group);
	 //console.log(students[fields["Группа"]])
	 if (group== '---') updateDatDropdown(studentsList , ['---']);    
   else updateDatDropdown(studentsList , ['---'].concat(students[group]));    
	 }

function updateDatDropdown(target, list){   
    innerHTMLStr = "";
    if(list.constructor.name == 'Array')
        for(var i=0; i<list.length; i++) innerHTMLStr += "<option value='" + list[i] + "'>" + list[i] + "</option>";            
    if(list.constructor.name == 'Object')
        for(var key in list) innerHTMLStr += "<option value='" + list[key] + "'>" + key + "</option>";    
    if (innerHTMLStr != "") target.domElement.children[0].innerHTML = innerHTMLStr;
}

function hashCode(str) {
  console.log('hash',str)
  return Math.abs(str.split('').reduce((prevHash, currVal) =>
    ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0));
  }


function load_task() {	 
	 let surname =  fields['Студент'];
	 set_input("ФамилияИмя", surname);
	 let hash = hashCode(surname);
	 //console.log(tasks[colorfunc_num], colorfunc_num, tasks.length);
	 let task_num = (hash % 64) % tasks.length;
	 //surface_num = Math.abs((hash >> 6) % surfaces.length);
	 //$("#task-func").html(tasks[task_num]);
	 set_input("Задание", tasks[task_num]);
	 //console.log(surname + ' hash ' + hash + '\n surface ' + surfaces[surface_num]['name'] + ' func ' + colorfunc_num);
	 //$("input[name='hide_task']").prop( "disabled", false );
	 //$("#selectSurface").prop( "disabled", false );
	 //$("#resolution").prop( "disabled", false );
	 //surfaces.forEach(function callback(currentValue, index, array) {
	 //  let option = $("<option></option>").html(currentValue['name']).val(index);
   // $("#selectSurface").append(option);
   // });
	 }

  
   $('#contact-form').formcache();
   //$('#identity-form').formcache();

function load() {
   fields['Группа'] = get_input('Группа');
   if(fields['Группа'] != '---') load_students();
   fields['Студент'] = get_input('ФамилияИмя');
   if (fields['Студент'] != '---') load_task();
//   gui.updateDisplay();
   //let task = get_input('Задание');
   //let solution = get_input('Решение');
   //let surface = get_input('Поверхность');
   //let comment = get_input('Комментарий');
   //let func = get_input('Функция');
   //$('select[id="group"] option[value="'+group+'"]').prop('selected',true);
   //$('select[id="surname"] option[value="'+surname+'"]').prop('selected',true);
   //let surface_num = $('#selectSurface option:contains("'+surface+'")').val();
   //console.log(surface_num);
   //$('select[id="selectSurface"] option[value="'+surface_num+'"]').prop('selected',true);
   //if (surface != '---')  selectSurface();
   //$('#terminal').val(solution);
   //$('#comment').val(comment);   
   //$('#load').remove();
}

//$("#terminal").on('input',function(e){
//          	 set_input("Решение", e.target.value);
//          	    $('#load').remove();
//});



