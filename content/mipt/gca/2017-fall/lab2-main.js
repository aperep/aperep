		if (!Detector.webgl) Detector.addGetWebGLMessage();

		let input = document.getElementById("fileInput");
		let renderer = undefined;
		let camera = undefined;
		let controls = undefined;
		let showWireframe = false;
		let scene = undefined;
		let threeMesh = undefined;
		let threeGeometry = undefined;
		let wireframe = undefined;

		let positions = undefined;
		let uvs = undefined;
		let normals = undefined;
		let colors = undefined;
		let indices = undefined;

		let memoryManager = new EmscriptenMemoryManager();
		let mesh = undefined;
		let geometry = undefined;
		let meanCurvatureFlow = undefined;
		let laplacian = undefined;
		let h = 0.002;

		let filename = "bunny.obj";

		const ORANGE = new Vector(1.0, 0.5, 0.0);

//GUI.TEXT_CLOSED = 'Close';
//GUI.TEXT_OPEN = 'Open';

function integrate() {
					laplacian.integrate(h);
					memoryManager.deleteExcept([]);
					updateMesh();
				}

var gui = undefined;
var studentsList=undefined;
var fields = {
        "Загрузить": function() {load(); gui.updateDisplay();},
			  "Группа": "---",
			  "Студент": "---",
        "Открыть задание": function() {
          document.getElementById('overlay').style.display = 'block';
        },
				"Load Mesh": function() {
					input.click();
				},
				"Скачать": function() {
					exportFile(MeshIO.writeOBJ({
						"v": positions,
						"vt": uvs,
						"vn": normals,
						"f": indices
					}));
				},
				"Method": "MCF",
				"Time Step": h,
				"Преобразовать": integrate,
				"Сбросить": function() {initMesh(bunny);},
				"Отобразить сетку": showWireframe
			};


		init();
		animate();

		function init() {
			let container = document.createElement("div");
			document.body.appendChild(container);

			initRenderer(container);
			initGUI();
			initCamera();
			initScene();
			initLights();
			initMesh(bunny);
			initControls();
			addEventListeners();
		}

		function initRenderer(container) {
			renderer = new THREE.WebGLRenderer({
				antialias: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);
		}


		function initGUI() {
		  gui = new dat.GUI();


      let who = gui.addFolder("Авторизация");
      who.closed=false;
			who.add(fields, "Группа", ["---", "594", "595", "596", "597", "599"]).onChange(load_students);
			studentsList = who.add(fields, "Студент", [fields["Студент"]]).onChange(load_task);


			gui.add(fields, "Открыть задание");

			let surf = gui.addFolder("Поверхность");
			surf.add(fields, "Сбросить");
			surf.add(fields, "Преобразовать");
			surf.open();
      surf.add(fields, "Скачать");
			surf.add(fields, "Отобразить сетку").onChange(toggleWireframe).listen();
		}

		window.onload = function() {
			input.addEventListener("change", function(e) {
				let file = input.files[0];
				filename = file.name;

				if (filename.endsWith(".obj")) {
					let reader = new FileReader();
					reader.onload = function(e) {
						initMesh(reader.result);
					}

					reader.onerror = function(e) {
						alert("Unable to load OBJ file");
					}

					reader.readAsText(file);

				} else {
					alert("Please load an OBJ file");
				}
			});
		}

		function exportFile(text) {
			let element = document.createElement("a");
			element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
			element.setAttribute("download", filename);

			element.style.display = "none";
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		}

		function updateMesh() {
			for (let v of mesh.vertices) {
				let i = v.index;

				let position = geometry.positions[v];
				positions[3 * i + 0] = position.x;
				positions[3 * i + 1] = position.y;
				positions[3 * i + 2] = position.z;

				let normal = geometry.vertexNormalEquallyWeighted(v);
				normals[3 * i + 0] = normal.x;
				normals[3 * i + 1] = normal.y;
				normals[3 * i + 2] = normal.z;
			}

			threeGeometry.attributes.position.needsUpdate = true;
			threeGeometry.attributes.normal.needsUpdate = true;
			wireframe.geometry = new THREE.WireframeGeometry(threeGeometry);
		}

		function updateTimeStep(value) {
			h = value;
		}

		function toggleWireframe(checked) {
			showWireframe = checked;
			if (showWireframe) threeMesh.add(wireframe);
			else threeMesh.remove(wireframe);
		}

		function initCamera() {
			const fov = 45.0;
			const aspect = window.innerWidth / window.innerHeight;
			const near = 0.1;
			const far = 1000;
			const eyeZ = 3.5;

			camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
			camera.position.z = eyeZ;
		}

		function initScene() {
			scene = new THREE.Scene();
			scene.background = new THREE.Color(0xffffff);
		}

		function initLights() {
			let ambient = new THREE.AmbientLight(0xffffff, 0.35);
			camera.add(ambient);

			let point = new THREE.PointLight(0xffffff);
			point.position.set(2, 20, 15);
			camera.add(point);

			scene.add(camera);
		}

		function initMesh(text) {
			let polygonSoup = MeshIO.readOBJ(text);
			mesh = new Mesh();
			if (mesh.build(polygonSoup)) {
				// remove any previously loaded mesh from scene
				scene.remove(threeMesh);
				memoryManager.deleteExcept([]);

				// create geometry object
				geometry = new Geometry(mesh, polygonSoup["v"]);

				// create a THREE.js mesh (and geometry) object
				initThreeMesh();
				scene.add(threeMesh);

				// initialize mean curvature flows
				meanCurvatureFlow = new MeanCurvatureFlow(geometry);
				laplacian = new Laplacian(geometry);

				// update metadata
				let element = document.getElementById("meta");
				element.textContent = "";

			} else {
				alert("Unable to build halfedge mesh");
			}
		}

		function initThreeMesh() {
			// create geometry object
			threeGeometry = new THREE.BufferGeometry();

			// fill position, normal and color buffers
			let V = mesh.vertices.length;
			positions = new Float32Array(V * 3);
			normals = new Float32Array(V * 3);
			colors = new Float32Array(V * 3);
			for (let v of mesh.vertices) {
				let i = v.index;

				let position = geometry.positions[v];
				positions[3 * i + 0] = position.x;
				positions[3 * i + 1] = position.y;
				positions[3 * i + 2] = position.z;

				let normal = geometry.vertexNormalEquallyWeighted(v);
				normals[3 * i + 0] = normal.x;
				normals[3 * i + 1] = normal.y;
				normals[3 * i + 2] = normal.z;

				colors[3 * i + 0] = ORANGE.x;
				colors[3 * i + 1] = ORANGE.y;
				colors[3 * i + 2] = ORANGE.z;
			}

			// fill index buffer
			let F = mesh.faces.length;
			indices = new Uint32Array(F * 3);
			for (let f of mesh.faces) {
				let i = 0;
				for (let v of f.adjacentVertices()) {
					indices[3 * f.index + i++] = v.index;
				}
			}

			// set geometry
			threeGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
			threeGeometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
			threeGeometry.addAttribute("normal", new THREE.BufferAttribute(normals, 3));
			threeGeometry.addAttribute("color", new THREE.BufferAttribute(colors, 3));

			// create material
			let threeMaterial = new THREE.MeshPhongMaterial({
				vertexColors: THREE.VertexColors,
				polygonOffset: true,
				polygonOffsetFactor: 1,
				polygonOffsetUnits: 1,
				side: THREE.DoubleSide
			});

			// create wireframe
			wireframe = new THREE.LineSegments();
			wireframe.geometry = new THREE.WireframeGeometry(threeGeometry);
			wireframe.material = new THREE.LineBasicMaterial({
				color: 0x000000,
				linewidth: 0.75
			});

			// create mesh
			threeMesh = new THREE.Mesh(threeGeometry, threeMaterial);

			// toggle wireframe
			toggleWireframe(showWireframe);
		}

		function initControls() {
			controls = new THREE.TrackballControls(camera, renderer.domElement);
			controls.rotateSpeed = 5.0;
		}

		function addEventListeners() {
			window.addEventListener("resize", onWindowResize, false);
		}

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
			controls.handleResize();
			render();
		}

		function animate() {
			requestAnimationFrame(animate);
			controls.update();
			render();
		}

		function render() {
			renderer.render(scene, camera);
		}
