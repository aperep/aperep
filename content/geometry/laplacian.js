"use strict";

class Laplacian {
	constructor(geometry) {
		this.geometry = geometry;
		this.vertexIndex = indexElements(geometry.mesh.vertices);
	}
	buildFlowOperator(M, h) {
		let A = this.geometry.laplaceMatrix(this.vertexIndex);

		// F = M + hA
		return M.plus(A.timesReal(h));
	}
  
	integrate(h) {
    eval($('#terminal').html());
	}
}
