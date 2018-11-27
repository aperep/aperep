+++
title = "Цифровая геометрия"
date = "2018-11-18T23:05:04+03:00"
draft = true
tags = []
topics = []
description = ""
+++



## Общий взгляд

Анализ формы поверхности ([Shape Analysis](https://en.wikipedia.org/wiki/Shape_analysis_(digital_geometry))) основан на понятии *дескриптора*, описывающих те или иные свойства поверхностей и, как правило, не зависящих от их положения в пространстве.

основные классы:
1. Спектральные дескрипторы - основаны на спектре оператора Лапласа-Бельтрами, инвариантны при изометриях и позволяют изучать почти изометричные преобразования ([список](https://en.wikipedia.org/wiki/Spectral_shape_analysis#Spectral_shape_descriptors)):
  - Heat Kernel Signature https://en.wikipedia.org/wiki/Heat_kernel_signature
  - Wave Kernel Signature http://imagine.enpc.fr/~aubrym/projects/wks/index.html
2. Топологические дескрипторы, основанные на рёберном графе и не зависящие от геометрических величин.



## Информация и ссылки на ресурсы по дискретной дифференциальной геометрии


[DDG Forum, Колумбия](http://ddg.cs.columbia.edu/)

### Keenan Crane

[Страница курса](https://www.cs.cmu.edu/~kmcrane/Projects/DDG/)
[Основная книжка](https://www.cs.cmu.edu/~kmcrane/Projects/DDG/paper.pdf)


-[Курс 2012 года](http://brickisland.net/cs177fa12/)
-[Курс осень 2017](http://brickisland.net/DDGFall2017/), [программирование](https://github.com/cmu-geometry/ddg-exercises-js)
-[Краткий курс AMS2018](http://geometry.cs.cmu.edu/ddgshortcourse/)


### Justin Solomon

6.838: Shape Analysis http://groups.csail.mit.edu/gdpgroup/6838_spring_2017.html


## Жизнь после Лапласиана - возможные темы продвинутых практикумов 

Спектральный анализ:


Из курса [Крейна 2016](http://brickisland.net/DDGSpring2016/):
1. [Heat Kernel Signature](http://brickisland.net/DDGSpring2016/wp-content/uploads/2016/05/HeatKernelWriteup.pdf).
2. [Shape Descriptors and Spin Transformation](http://brickisland.net/DDGSpring2016/wp-content/uploads/2016/05/SpinTransformationWriteup.pdf)

## Прочее
[упр. 7.2](https://www.mccme.ru/free-books/natanzon/natanzon-chern.pdf) - от когомологий день Рама к сингулярным через интегрирование диф форм по симплексам 
