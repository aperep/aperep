math.import({
  d: math.derivative
});


	class Surface {
  
  
  constructor() {
      var umin = surfaces[surface_num]['umin'];
      var umax = surfaces[surface_num]['umax'];
      var unum =  resolution; //surfaces[surface_num]['unum'];
      var vmin = surfaces[surface_num]['vmin'];
      var vmax = surfaces[surface_num]['vmax'];
      var vnum = resolution; //surfaces[surface_num]['vnum'];
      var func = surfaces[surface_num]['func'];
      this.x = Parser.parse(surfaces[surface_num]['x']).toJSFunction( ['u','v'] );
      this.y = Parser.parse(surfaces[surface_num]['y']).toJSFunction( ['u','v'] );
      this.z = Parser.parse(surfaces[surface_num]['z']).toJSFunction( ['u','v'] );
      this.coords = (u, v) => new Vector(this.x(u,v), this.y(u,v), this.z(u,v));
		this.vertices = [];
		this.faces = [];
		this.u = [];
		this.v = [];
    let u = iu => umin + (umax-umin)*iu/(unum-1);
    let v = iv => vmin + (vmax-vmin)*iv/(vnum-1);
    let index = (iu, iv) => iu*vnum + iv;
    let push_square = (x1, y1) => {
        let x2 = (x1+1)%unum;
        let y2 = (y1+1)%vnum;
				this.faces.push(index(x1, y1));
				this.faces.push(index(x1, y2));
				this.faces.push(index(x2, y2));
				this.faces.push(index(x1, y1));
				this.faces.push(index(x2, y2));
				this.faces.push(index(x2, y1));
    }
		for (let iu = 0; iu < unum; iu++) {
				for (let iv = 0; iv < vnum; iv++) {
				  this.vertices.push(this.coords( u(iu), v(iv) ));
				  this.u.push(u(iu));
				  this.v.push(v(iv));
					push_square(iu, iv);
				}
				
		}
		
  }
  
  get mesh() {
    return {
			"v": this.vertices,
			"f": this.faces
		};
  }

  color() {
     let colorfunc;
     if ($('#CAS').val()=='algebrite') 
     { let f = $('#colorfunc').html(); 

       colorfunc = (u, v) => {
          let fuv = f.replace(/\bv\b/g, '('+v.toString()+')').replace(/\bu\b/g, '('+u.toString()+')');
          try {
            var result = parseFloat(Algebrite.float(fuv));
          } catch (err) {console.log("Error " + err);}
          return result;}
     
     } else {
       let deriv = ['x','y','z'].map(x => derivatives(x, surfaces[surface_num]['x'], 2)).join('');
              //console.log(deriv);


       let textToExecute = deriv + $('#terminal').val() + '\nf';
       //console.log(textToExecute);
       var code = math.compile(textToExecute);
       colorfunc = (u, v) => { let res = code.eval({u: u, v: v})['entries']; //console.log(res, res.length); 
          return res[res.length-1];}
     }
     return (v) => colorfunc(this.u[v.index], this.v[v.index]);
  }
}

function derivatives(label, formula, depth) {
    if(depth<0) return '';
    return label+'='+formula+'\n'
      +derivatives(label+'u', math.derivative(formula,"u"), depth-1)
      +derivatives(label+'v', math.derivative(formula,"v"), depth-1);
  };

