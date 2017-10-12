
var surface_num = 0;
var surfaces = [{ // from K3DSurf
       x : "(2+cos(u))*cos(v)",
       y : "(2+cos(u))*sin(v)",
       z : "sin(u)",
       umin : 0,
       umax : 2*Math.PI,
       unum : 40,
       vmin : 0,
       vmax : 2*Math.PI,
       vnum : 40,
       name : 'torus',
},{
       x : "cos(u) / (sqrt(2) + sin(v))",
       y : "1 / (sqrt(2) + cos(v))",
       z : "sin(u) / (sqrt(2) + sin(v))",
       umin : 0,
       umax : 2*Math.PI,
       unum : 40,
       vmin : 0,
       vmax : 2*Math.PI,
       vnum : 40,
       name : 'limpet_torus',
},{
       x : " cos(u)*cos(v)+sin((sin(u)+1)*2*PI) ",
       y : " 4*sin(u) ",
       z : "cos(u)*sin(v)+cos((sin(u)+1)*2*PI) ",
       umin : -Math.PI/2,
       umax : Math.PI/2,
       unum : 40,
       vmin : 0,
       vmax : 2*Math.PI,
       vnum : 40,
       name : 'pseudosphere',
},{
       x : "cos(u)*cos(v)*sin(u)",
       y : "sin(u)*sin(v)*sin(u)",
       z : "sin(u)*sin(v)*cos(u)",
       umin : -Math.PI/2,
       umax : 0,
       unum : 40,
       vmin : 0,
       vmax : 2*Math.PI,
       vnum : 40,
       name : 'sphere_7',
},{
       x : "cos(u)*cos(v)",
       y : "sin(u)*sin(v)*cos(v)",
       z : "cos(u)*sin(v)",
       umin : -Math.PI/2,
       umax : Math.PI/2,
       unum : 40,
       vmin : 0,
       vmax : 2*Math.PI,
       vnum : 40,
       name : 'sphere_3',
},{
       x : "cos(u)*sin(2*v)",
       y : "sin(v)",
       z : "sin(u)*sin(2*v)",
       umin : 0,
       umax : 2*Math.PI,
       unum : 40,
       vmin : -Math.PI/2,
       vmax : Math.PI/2,
       vnum : 40,
       name : 'eight',
},{
       x : "cos(u) *(3  *cos(v) - cos(3  *v))",
       y : "3  *sin(v) - sin(3 * v)",
       z : "sin(u)  *(3  *cos(v) - cos(3 * v))",
       umin : 0,
       umax : 2*Math.PI,
       unum : 40,
       vmin : -Math.PI/2,
       vmax : Math.PI/2,
       vnum : 40,
       name : 'kidney',
},{
       x : "sin(u) / (sqrt(2) + cos(v))",
       y : "cos(u-2*PI/3) / (sqrt(2) + cos(v-2*PI/3))",
       z : "sin(u+2*PI/3) / (sqrt(2) + cos(v+2*PI/3))",
       umin : -Math.PI,
       umax : Math.PI,
       unum : 40,
       vmin : -Math.PI,
       vmax : Math.PI,
       vnum : 40,
       name : 'triaxial_hexatorus',
},{
       x : "sin(v/2)* sin(u) + cos(v/2) *sin(2* u)",
       y : "(2 + cos(v/2)* sin(u) - sin(v/2)* sin(2 *u))* cos(v)",
       z : "(2 + cos(v/2)* sin(u) - sin(v/2)* sin(2 *u))* sin(v)",
       umin : 0,
       umax : 2*Math.PI,
       unum : 40,
       vmin : 0,
       vmax : 2*Math.PI,
       vnum : 40,
       name : 'klein_2',
/*},{
       x : "cos(u+v)/(sqrt(2.)+cos(v-u))",
       y : "sin(v-u)/(sqrt(2.)+cos(v-u))",
       z : "sin(u+v)/(sqrt(2.)+cos(v-u))",
       umin : 0,
       umax : Math.PI,
       unum : 40,
       vmin : 0,
       vmax : 2*Math.PI,
       vnum : 40,
       name : 'cliffordtorus',*/
},{
       x : "2/3* (cos(u)* cos(2*v) + sqrt(2)* sin(u)* cos(v))* cos(u) / (sqrt(2) - sin(2*u)* sin(3*v))",
       y : "sqrt(2)* cos(u)* cos(u) / (sqrt(2) - sin(2*u)* sin(3*v))",
       z : "2/3* (cos(u)* sin(2*v) - sqrt(2)* sin(u)* sin(v))* cos(u) / (sqrt(2) - sin(2*u)* sin(3*v))",
       umin : 0,
       umax : Math.PI,
       unum : 40,
       vmin : 0,
       vmax : Math.PI,
       vnum : 40,
       name : 'boy',
},{
       x : "(2 + cos(u))*(v/3 - sin(v))",
       y : "(2 + cos(u + 2*PI / 3))*(cos(v) - 1) ",
       z : "(2 + cos(u - 2*PI / 3))*(cos(v) - 1) ",
       umin : -Math.PI,
       umax : Math.PI,
       unum : 40,
       vmin : -2*Math.PI,
       vmax : 2*Math.PI,
       vnum : 40,
       name : 'bent_horns',
},{
       x : "(2 + sin(u) *sin(v)) *sin(3*v/2)",
       y : "cos(u) *sin(v) + 2 *v/PI - 2",
       z : "(2 + sin(u) *sin(v)) *cos(3*v/2)",
       umin : 0,
       umax : 2*Math.PI,
       unum : 40,
       vmin : 0,
       vmax : 2*Math.PI,
       vnum : 40,
       type : 'croissant',
},{
       x : "1/2*sin(2*u)*sin(v)^2",
       y : "1/2*cos(u)*sin(2*v)",
       z : "1/2*sin(u)*cos(2*v)",
       umin : 0,
       umax : Math.PI,
       unum : 40,
       vmin : -Math.PI/2,
       vmax : Math.PI/2,
       vnum : 40,
       name : 'roman',
},{
       x : "(sin(2 * u) * cos(v) * cos(v))",
       y : "(cos(u) * sin(2 * v))",
       z : "(sin(u) * sin(2 * v))",
       umin : -Math.PI/2,
       umax : Math.PI/2,
       unum : 40,
       vmin : -Math.PI/2,
       vmax : Math.PI/2,
       vnum : 40,
       name : 'steiner',
},{
       x : "(sin(u) * sin(2 * v) / 2)",
       y : "(cos(2 * u) * cos(v) * cos(v))",
       z : "(sin(2 * u) * cos(v) * cos(v))",
       umin : -Math.PI/2,
       umax : Math.PI/2,
       unum : 40,
       vmin : -Math.PI/2,
       vmax : Math.PI/2,
       vnum : 40,
       name : 'crosscap',
},{
       x : "cos(u)*cos(v)*sin(u)",
       y : "sin(u)*sin(v)*sin(u)",
       z : "cos(u)*sin(v)*cos(u)",
       umin : -Math.PI/2,
       umax : 0,
       unum : 40,
       vmin : 0,
       vmax : 2*Math.PI,
       vnum : 40,
       name : 'sphere_8',
},]
