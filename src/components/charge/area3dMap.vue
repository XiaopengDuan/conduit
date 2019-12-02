<template>
<div>
  <img class="dtdu" src="@/assets/img/3DTDU.png" style="z-index:1000" :style="{'right': this.$store.state.app.leftMeunShowFlag ? '1rem' : '5rem'}"/>
</div>
</template>
<script>
var stop = null;
var scene = null;
var modelContainer = null;
var modelContainerMainArea = null;
var clickObjects = [];
var detailClickObjects = [];
var detailModelContainer = null;
var markPanel = [];
var detailMarkPanel = [];
var renderer = null; //渲染器

import * as THREE from "three";
import OrbitControls from "three/examples/js/controls/OrbitControls";
import GLTFLoader from "three/examples/js/loaders/GLTFLoader.js";

import {
  getArrearCommunityMap,
  getWaterMapInfo,
  getCustomerCallMap,
  get13IndexIncomeByRegionStatistics
} from "@/api/chargeWater";
import {
  getArrearCommunityAreaMap,
  getWaterMapAreaInfo,
  getWaterMapAreaInfo2,
  getCustomerCallAreaMap,
  get13IndexIncomeAreaByRegionStatistics
} from "@/api/charge";

export default {
  props: {
    mapType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      container: null, //容器
      camera: null, //摄像机
      labelRenderer: null,
      orbitControls: null,
      glftScale:0.05,
      glftScaleMainArea: 8,

      cellingMaterial: null,
      slideMaterial: null,
      floorMaterial: null,
      raycaster: null,
      showDetailArea: false,
      areaMap: {}
    };
  },
  beforeDestroy() {
    window.cancelAnimationFrame(stop);
    stop = null;

    this.container.removeEventListener("dblclick", this.onMainAreaDbClick);
    this.container.removeEventListener("dblclick", this.onDetailAreaDbClick);

    scene.traverse(object => {
      if (!object.isMesh) return;
      object.geometry.dispose();
      if (object.material.isMaterial) {
        this.cleanMaterial(object.material);
      } else {
        for (const material of object.material) this.cleanMaterial(material);
      }
      object = null;
    });

    renderer.dispose();

    stop = null;
    scene = null;
    modelContainer = null;
    detailModelContainer = null;
    renderer = null; //渲染器

    clickObjects = null;
    markPanel = null;
    detailClickObjects = null;
    detailMarkPanel = null;
  },
  mounted() {
    this.loadMaterial();
    this.init();
    this.animate();
  },
  methods: {
    getApi(type, data) {
      if (type == 1) {
        if (this.mapType == 1) return getArrearCommunityAreaMap();
        if (this.mapType == 2) return getWaterMapAreaInfo();
        if (this.mapType == 3) return getCustomerCallAreaMap();
        if (this.mapType == 4) return get13IndexIncomeAreaByRegionStatistics();
        if (this.mapType == 5) return getWaterMapAreaInfo2();
      }
      if (type == 2) {
        if (this.mapType == 1) return getArrearCommunityMap(data);
        if (this.mapType == 2||this.mapType == 5) return getWaterMapInfo(data);
        if (this.mapType == 3) return getCustomerCallMap(data);
        if (this.mapType == 4) return get13IndexIncomeByRegionStatistics(data);
      }
    },
    //加载材质
    loadMaterial() {
      this.cellingMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1e3b });
      this.floorMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1e3b });
      let loader = new THREE.TextureLoader();
      let slideTexture = loader.load("/static/slide.png");
      slideTexture.wrapS = slideTexture.wrapT = THREE.RepeatWrapping;
      slideTexture.repeat.set(1, 1);
      slideTexture.anisotropy = 16;
      this.slideMaterial = new THREE.MeshBasicMaterial({
        map: slideTexture
      });
    },
    //初始化
    init() {
      clickObjects = [];
      markPanel = [];
      detailClickObjects = [];
      detailMarkPanel = [];

      //容器
      this.container = document.getElementById("container3d"); // this.$refs.container3d;
      this.camera = new THREE.PerspectiveCamera(
        10,
        this.container.clientWidth / this.container.clientHeight,
        1,
        8000
      );
      this.camera.position.set(800, 1200, 1800);
      //场景
      scene = new THREE.Scene();

      //x,y,z
      //scene.add(new THREE.AxesHelper(80));

      //灯光 照射光
      let light = new THREE.DirectionalLight(0xdfebff, 1);
      light.position.set(50, 200, 100);
      light.position.multiplyScalar(1.3);
      light.castShadow = true;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      let distance = 300;
      light.shadow.camera.left = -distance;
      light.shadow.camera.right = distance;
      light.shadow.camera.top = distance;
      light.shadow.camera.bottom = -distance;
      light.shadow.camera.far = 1000;
      scene.add(light);
      // 辅助坐标轴
      // var axisHelper = new THREE.AxisHelper(2500);
      // scene.add(axisHelper);
      // let ambientLight = new THREE.AmbientLight(0xdfebff, 1);  环境光
      // scene.add(ambientLight);

      //渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true ,alpha: true});
      renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.container.appendChild(renderer.domElement);

      //场景控制器
      this.orbitControls = new OrbitControls(this.camera, renderer.domElement);
      this.orbitControls.maxPolarAngle = Math.PI * 0.5;
      this.orbitControls.minDistance = 1000;
      this.orbitControls.maxDistance = 5000;
      window.addEventListener("resize", this.onWindowResize, false);
      this.container.addEventListener(
        "dblclick",
        this.onMainAreaDbClick,
        false
      );

      // let geometry = new THREE.BoxGeometry(20, 20, 20);
      // this.mesh = new THREE.Mesh(geometry, this.redPipleMaterial);
      // scene.add(this.mesh);
      this.raycaster = new THREE.Raycaster();
      this.loadModel();
    },
    //鼠标双击
    onMainAreaDbClick(event) {
      event.preventDefault();
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
      this.raycaster.setFromCamera(mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(clickObjects);
      if (intersects.length > 0) {
        // console.log(123)
        this.swichScence(1, intersects[0].object.tag);
      }
    },
    //加载模型
    loadModel() {
      modelContainer = new THREE.Object3D();
      modelContainer.scale.set(this.glftScale, this.glftScale, this.glftScale);
      modelContainer.name = "modelContainer";
      modelContainer.position.set(-70,0,-30)
      modelContainerMainArea = new THREE.Object3D();
      modelContainerMainArea.scale.set(this.glftScaleMainArea, this.glftScaleMainArea, this.glftScaleMainArea);
      modelContainer.add(modelContainerMainArea);

      scene.add(modelContainer);
      this.getApi(1).then(res => {
        if (res.code == 200) {
          this.areaMap = res.data;
          res.data.forEach(data => {
            this.loadModelMark(
              data.panelUrl,
              new THREE.Vector3(data.x, 1400, data.z)
            );
            this.loadArea(data.street_code, data.baseUrl);
          });
        }
      });
    },
    //加载区域
    loadArea(fileName, imgName) {
      let loader = new GLTFLoader(); /*实例化加载器*/
      var that = this;
      loader.load(
        "/static/" + fileName + ".gltf",
        function(obj) {
          //obj.scene.position.set(0, 0, 0);
          obj.scene.position.x = obj.scene.position.x;
          obj.scene.position.z = obj.scene.position.z ;
          obj.scene.position.y = obj.scene.position.y ;
          let loader = new THREE.TextureLoader();
          let texture = loader.load(imgName);
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(1, 1);
          texture.anisotropy = 16;
          let material = new THREE.MeshBasicMaterial({
            map: texture
          });
          material.transparent = false;
          material.side = THREE.DoubleSide;

          obj.scene.traverse(function(child) {
            if (child.name == "celling") {
              child.material = material;
              child.tag = fileName;
              clickObjects.push(child);
            }
            if (child.name == "slide") {
              child.material = that.slideMaterial;
            }
            if (child.name == "floor") {
              child.material = material;
            }
          });
          obj.scene.name = fileName;
          modelContainerMainArea.add(obj.scene);
        },
        function(xhr) {},
        function(error) {
          // console.log(error);
        }
      );
    },
    //加载标注
    loadModelMark(imgName, position) {
      let loader = new THREE.TextureLoader();
      let texture = loader.load(imgName);
      // let texture = loader.load("/static/gnjd.png");
      // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      texture.anisotropy = 16;
      let material = new THREE.MeshBasicMaterial({
        map: texture
      });
      material.transparent = true;
      material.side = THREE.DoubleSide;

      let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1240, 920, 1),
        material
      );
      // console.log('position-->', position)
      plane.position.set(position.x, 550, position.z);
      plane.tag = "tag_" + imgName;
      modelContainer.add(plane);
      markPanel.push(plane);
      return plane;
    },
    //窗口缩放
    onWindowResize() {
      this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      // renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate: function() {
      // console.log(markPanel)
      if(Array.isArray(markPanel) && this.$route.fullPath.startsWith('/charge')){
        stop = requestAnimationFrame(this.animate);
        if (modelContainer && !this.showDetailArea) {
        // modelContainer.rotation.y += 0.002;
        }
        markPanel.forEach(plane => {
        plane.lookAt(this.camera.position);
        });
        detailMarkPanel.forEach(plane => {
          plane.lookAt(this.camera.position);
        });
        renderer.render(scene, this.camera);
      }else{
        window.cancelAnimationFrame(stop);
        stop = null
      }
    },
    //切换场景
    swichScence(type, data) {
      if (type == 1) {
        //显示详细
        detailModelContainer = null;
        detailClickObjects = [];
        detailMarkPanel = [];

        scene.remove(modelContainer);
        this.container.removeEventListener("dblclick", this.onMainAreaDbClick);
        this.container.addEventListener("dblclick", this.onDetailAreaDbClick);
        this.loadAreaDetail(data);
        this.showDetailArea = true;
      } else {
        scene.remove(detailModelContainer);
        scene.add(modelContainer);
        this.showDetailArea = false;
        this.container.removeEventListener(
          "dblclick",
          this.onDetailAreaDbClick
        );
        this.container.addEventListener("dblclick", this.onMainAreaDbClick);

        this.destroyDetail();
      }
    },
    // 加载区域详细
    loadAreaDetail(tag) {
      this.getApi(2, { street_code: tag }).then(res => {
        if (res.code == 200) {
          this.loadAreaDetailMap(tag);
          
          res.data.forEach(comunity => {
            // console.log('comunity.panelUrl--------->', comunity.panelUrl)
            this.loadAreaDetailMark(
              comunity.panelUrl,
              // "/static/21100406-panel-arrear.png",
              new THREE.Vector3(comunity.x, 800, comunity.y)
            );
          });
        }
      });
    },
    // 加载区域详细地图
    loadAreaDetailMap(street_code) {
      let streetArea = this.areaMap.find(x => x.street_code == street_code);
      let imgName = streetArea.baseUrl;
      if (!detailModelContainer || detailModelContainer == null) {
        detailModelContainer = new THREE.Object3D();
        detailModelContainer.scale.set(
          this.glftScale,
          this.glftScale,
          this.glftScale
        );
        detailModelContainer.name = "detailModelContainer";
      }
      scene.add(detailModelContainer);

      let loader = new GLTFLoader(); /*实例化加载器*/
      var that = this;
      loader.load(
        "/static/" + street_code + "_d.gltf",
        function(obj) {
          //obj.scene.position.set(0, 0, 0);
          obj.scene.position.x = obj.scene.position.x;
          obj.scene.position.z = obj.scene.position.z;
          obj.scene.position.y = obj.scene.position.y;

          let loader = new THREE.TextureLoader();
          let texture = loader.load(imgName);
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(1, 1);
          texture.anisotropy = 16;
          let material = new THREE.MeshBasicMaterial({
            map: texture
          });
          material.transparent = false;
          material.side = THREE.DoubleSide;

          obj.scene.traverse(function(child) {
            if (child.name == "celling") {
              child.material = material;//that.cellingMaterial;
              child.tag = street_code;
              detailClickObjects.push(child);
            }
            if (child.name == "slide") {
              child.material = that.slideMaterial;
            }
            if (child.name == "floor") {
              child.material = material;
            }
          });
          obj.scene.name = street_code;
          detailModelContainer.add(obj.scene);
        },
        function(xhr) {},
        function(error) {
          // console.log(error);
        }
      );
    },
    //加载标注
    loadAreaDetailMark(panelUrl, position) {
      let loader = new THREE.TextureLoader();
      let texture = loader.load(panelUrl);
      // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      texture.anisotropy = 16;
      let material = new THREE.MeshBasicMaterial({
        map: texture
      });
      material.transparent = true;
      material.side = THREE.DoubleSide;

      let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1740, 1420, 1),
        material
      );
      plane.position.set(position.x, position.y, position.z);
      plane.tag = "tag_";
      detailModelContainer.add(plane);
      detailMarkPanel.push(plane);
      return plane;
    },
    //鼠标双击
    onDetailAreaDbClick(event) {
      event.preventDefault();
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
      this.raycaster.setFromCamera(mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(detailClickObjects);
      if (intersects.length > 0) {
        this.swichScence(0);
        // console.log(1234)
      }
    },
    destroyMain() {},
    destroyDetail() {
      while (detailModelContainer.children.length > 0) {
        var currObj = detailModelContainer.children[0];
        detailModelContainer.remove(currObj);
      }
      detailMarkPanel = [];

      // detailModelContainer.children.traverse(object => {
      //   if (!object.isMesh) return;

      //   console.log("dispose geometry!");
      //   object.geometry.dispose();

      //   if (object.material.isMaterial) {
      //     this.cleanMaterial(object.material);
      //   } else {
      //     // an array of materials
      //     for (const material of object.material) this.cleanMaterial(material);
      //   }
      // });
    },
    cleanMaterial(material) {
     // console.log("dispose material!");
      material.dispose();

      // dispose textures
      for (const key of Object.keys(material)) {
        const value = material[key];
        if (value && typeof value === "object" && "minFilter" in value) {
         // console.log("dispose texture!");
          value.dispose();
        }
      }
    }
  }
};
</script>