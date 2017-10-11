var $contactForm = $('#contact-form');
$contactForm.submit(function(e) {
	e.preventDefault();
	function makeinput(name, value)
	{
	  return "<input type=\"hidden\" name=\"" + name + "\" value=\"" + value + "\">";
	}
	let form = $(this);
	form.append(	makeinput("_subject", "Решение первой лабораторной") );
	form.append(	makeinput("Функция", $("#colorfunc").html() ) );
	form.append(	makeinput("Решение", $("#terminal").html() ) );
	form.append(	makeinput("Фамилия Имя", $("#surname option:selected").html() ) );
	form.append(	makeinput("Группа", $("#group option:selected").html() ) );
	console.log(form.serialize());
	$.ajax({
		url: '//formspree.io/perepeal+mipt-lab@gmail.com',
		method: 'POST',
		data: $(this).serialize(),
		dataType: 'json',
		beforeSend: function() {
			$contactForm.append('<span class="alert alert--loading">Отправляем решение…</span>');
		},
		success: function(data) {
			$contactForm.find('.alert--loading').hide();
			$contactForm.append('<span class="alert alert--success">Решение отправлено!</span>');
		},
		error: function(err) {
			$contactForm.find('.alert--loading').hide();
			$contactForm.append('<span class="alert alert--error">Ошибка, сообщение не отправлено.</span>');
		}
	});
});

// https://gist.github.com/edmundojr/975b08c39ab0a7a1b514