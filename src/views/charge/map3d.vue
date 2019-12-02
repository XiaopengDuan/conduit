<template>
<div style="height:100%;">
  <div class="map3d" id="map3d"></div>
</div>
</template>
<style scoped>
.map3d{width: 100%;;height: 100%;}
</style>>
<script>
import * as maptalks from "maptalks";
import "maptalks/dist/maptalks.css";
import * as THREE from "three";
import { ThreeLayer } from "maptalks.three";
//let geojson = require("@/views/charge/geojson.js");
export default {
  name: "map3d",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
   // this.initThreeJsLayer();
  },
  methods: {
    //初始化地图
    initMap: function() {
       if (this.map) {
        this.map.remove();
      }
      this.map = new maptalks.Map("map3d", {
        center: [123.203978, 41.214225],
        zoom: 14,
        pitch: 60,
        minZoom: 1,
        maxZoom: 19,
        spatialReference: {
          projection: "baidu"
        },
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate:
            "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1&ak=murqvIRayvQcLVNIhWYLRNHl30mlMwiA",
          subdomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          attribution: "&copy; sunray",
          cssFilter: "sepia(20%) invert(90%)"
        })
      });
    },
    initThreeJsLayer: function() {
      var features = [];

      featuresdata.forEach(function(b) {
        features = features.concat(b);
      });

      // the ThreeLayer to draw buildings
      var threeLayer = new ThreeLayer("t", {
        drawImmediate: true,
        forceRenderOnMoving: true,
        forceRenderOnRotating: true
      });
      threeLayer.prepareToDraw = function(gl, scene, camera) {
        var me = this;
       this. initLight(gl, scene, camera);

        features.forEach(function(g) {
          var heightPerLevel = 10;
          var levels = g.properties.LOUCENG || 3;
          if (g.geometry.coordinates) {
            var color = getColor(levels);

            var m = new THREE.MeshPhongMaterial({
              color: color,
              opacity: 0.8
            });

            try {
              var mesh = me.toExtrudeMesh(
                maptalks.GeoJSON.toGeometry(g),
                levels * heightPerLevel,
                m,
                levels * heightPerLevel
              );
              if (Array.isArray(mesh)) {
                scene.add.apply(scene, mesh);
              } else {
                scene.add(mesh);
              }
            } catch (e) {
              // console.log(e);
              // console.log(g.id);
            }
          } else {
            // console.log(g.id + " coordinates==null");
          }
        });
      };
      threeLayer.addTo(map);
    },
    initLight: function(gl, scene, camera) {
      var color = new THREE.Color("#FFF");

      //光照
      var light = new THREE.PointLight(color);
      light.intensity = 0.5;
      //var light = new THREE.PointLight(0x8C8A90);
      camera.add(light);

      // lights
      scene.add(new THREE.AmbientLight(0xe6e0e7));
      var light = new THREE.DirectionalLight(0x002348, 1);
      light.position.set(0, 500, 0);
      light.position.multiplyScalar(1.3);
      light.castShadow = true;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      var d = 300;
      light.shadow.camera.left = -d;
      light.shadow.camera.right = d;
      light.shadow.camera.top = d;
      light.shadow.camera.bottom = -d;
      light.shadow.camera.far = 1000;
      scene.add(light);
    },
    getColor: function(level) {
      if (level < 4) {
        return "#BFBDB7";
      } else if (level >= 2 && level <= 5) {
        return "#BFBDB7";
      } else {
        return "#DED8E0";
      }
    }
  }
};
</script>