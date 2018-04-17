import * as THREE from 'three'

export default scene => {

	//切图在scene中的大小
	const tileSize = 50;
	//地图切片服务地址
	const serverURL = "http://c.tile.osm.org/";
	//设置中心经纬度
	const centerLng = 0
		, centerLat = 0;

	const lng = 114.399288
		, lat = 30.525391;

	const webMercator = LonLat2WebMercator(lng,lat);
	const tilePos = WebMercator2Tileimage(webMercator.x,webMercator.y);

	loadMap(tilePos.tileinfo.x,tilePos.tileinfo.y);
	/**
	 * WGS84z转web墨卡托
	 * @param lng
	 * @param lat
	 * @returns {{x: number, y: number|*}}
	 * @constructor
	 */
	function LonLat2WebMercator(lng,lat) {
		var x = (lng / 180.0) * 20037508.3427892;
		var y;
		if (lat > 85.05112) {
			lat = 85.05112;
		}
		if (lat < -85.05112) {
			lat = -85.05112;
		}
		y = (Math.PI / 180.0) * lat;
		var tmp = Math.PI / 4.0 + y / 2.0;
		y = 20037508.3427892 * Math.log(Math.tan(tmp)) / Math.PI;
		var result = {
			x: x,
			y: y
		};
		return result;
	}

	//Web墨卡托转成tile上的像素坐标，返回像素坐标，以及tile编号，在所在tile上的偏移
	function WebMercator2Tileimage(x, y) {
		//对于第18级地图, 对于我国而言
		var level = 18;
		var r = 20037508.3427892;
		y = r - y;
		x = r + x;
		var size = Math.pow(2, level) * 256;
		var imgx = x * size / (r * 2);
		var imgy = y * size / (r * 2);
		//当前位置在全球切片编号
		var col = Math.floor(imgx / 256);
		var row = Math.floor(imgy / 256);
		console.log("col", col, "row", row);
		//当前位置对应于tile图像中的位置
		var imgdx = imgx % 256;
		var imgdy = imgy % 256;

		//像素坐标
		var position = {
			x: imgx,
			y: imgy
		};
		//tile编号
		var tileinfo = {
			x: col,
			y: row,
			level: 18
		};
		//在所在tile上的偏移
		var offset = {
			x: imgdx,
			y: imgdy
		};

		var result = {
			position: position,
			tileinfo: tileinfo,
			offset: offset
		};
		return result;
	}

	//经纬度到tile，再到WebGL坐标
	function LonLat2WebGL(lng, lat) {
		var webMercator = LonLat2WebMercator(lng, lat);
		var tilePos = WebMercator2Tileimage(webMercator.x, webMercator.y).position;

		var centerWM = LonLat2WebMercator(centerLng, centerLat);
		var centerTP = WebMercator2Tileimage(centerWM.x, centerWM.y);
		//相对偏移修正（以centerLng,centerLat所在点tile中心点为原点，导致的偏移）
		var x = (tilePos.x - centerTP.position.x + (centerTP.offset.x - 256 / 2)) * tileSize / 256;
		var y = (tilePos.y - centerTP.position.y + (-centerTP.offset.y + 256 / 2)) * tileSize / 256;

		var result = {
			x: x,
			y: y
		};
		return result;
	}

	/**
	 * 加载一个切图
	 * @param {Object} xno tile编号x
	 * @param {Object} yno tile编号y
	 * @param {Object} callback
	 */
	function loadImageTile(xno, yno, callback) {
		var level = 18;
		var url = serverURL + level + "/" + xno + "/" + yno + ".png";
		var loader = new THREE.TextureLoader();
		//跨域加载图片
		loader.crossOrigin = true;
		loader.load(url, function(texture) {
			console.log("loaded tile");
			var geometry = new THREE.PlaneGeometry(tileSize,tileSize,1);
			var material = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
				side: THREE.DoubleSide//双面显示
			});
			var mesh = new THREE.Mesh(geometry,material);
			callback(mesh);
		});
	}

	/**
	 * 将加载的切图放到scene
	 * @param {Object} mesh
	 * @param {Object} x坐标  WebGL坐标
	 * @param {Object} y坐标
	 */
	function addTileToScene(mesh, x, y) {
		//mesh的中心位置
		mesh.position.x = x;
		mesh.position.y = y;
		scene.add(mesh);
	}
	/**
	 * 辅助函数，用于计算tile应该放在何处
	 * @param {Object} dx  tile间相对位置，也就是编号差
	 * @param {Object} dy
	 */
	function addTileToSceneHelper(dx, dy) {
		var x = tileSize * dx;
		var y = -tileSize * dy;
		return function(mesh) {
			addTileToScene(mesh, x, y)
		};
	}
	/**
	 * 加载地图
	 * @param {Object} centerX 地图中间的切图编号
	 * @param {Object} centerY 地图中间的切图编号
	 */
	function loadMap(centerX, centerY) {
		var radius = 7;
		for (var i = centerX - radius; i <= centerX + radius; i++) {
			for (var j = centerY - radius; j <= centerY + radius; j++) {
				console.log("try to load",i,j,i-centerX,j-centerY);
				if(i-centerX == 0 && j-centerY == 0){

				}else {
					loadImageTile(i, j, addTileToSceneHelper(i - centerX, j - centerY));
				}
			}
		}
	}
	/**
	 * 标记出当前位置
	 * @param {Object} x webGL坐标
	 * @param {Object} y
	 */
	function markCurrentPosition(x, y) {
		var geometry = new THREE.SphereGeometry(10,30,30);
		var material = new THREE.MeshBasicMaterial({
			color: 0xff0000
		});
		var mesh = new THREE.Mesh(geometry,material);
		mesh.position.x = x;
		mesh.position.y = y;
		scene.add(mesh);

	}
	function update(time) {

	}
	return {
		update
	}
}