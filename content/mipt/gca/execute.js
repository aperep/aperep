
	    function execute () {
	    if ($('#CAS').val()=='algebrite')
        { execute_algebrite(); }
      else
        { alert('Для math.js не требуется поиск формулы'); }
  }

	    function execute_algebrite() {
        try {
          var textToBeExecuted = $('#terminal').val();
          var result;
          if (/Algebrite\.[a-z]/.test(textToBeExecuted) || /;[ \t]*$/.test(textToBeExecuted)) {
            result = eval(textToBeExecuted);
          }
          else {
            Algebrite.run("clearall\nPI=pi");
            Algebrite.run($('#paramx').html());
            Algebrite.run($('#paramy').html());
            Algebrite.run($('#paramz').html());
            result = Algebrite.run(textToBeExecuted);
          }
          console.log(result);
          $('#colorfunc').html(Algebrite.run('f'));
        	 set_input("Функция", $('#colorfunc').html());
        	 set_input("Решение", $('#terminal').val());
        }
        catch (err) {
          var errDesc = err;
          console.log("Error " + errDesc);
          $('#colorfunc').html('<h4>Ошибка!<\/h4><code>' + errDesc + '<\/code>')
        }
    }    
    

