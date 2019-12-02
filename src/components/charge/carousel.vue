<template>
  <div @click="hidePanel" styel="z-index:10000">
    <div class="carousel" v-if="isShow">
      <div
        @click="switchPanel($event)"
        class="carousel-item"
        :style="{transition: 'transform 0.5s ease 0s, opacity 0.5s ease 0s', transform: transform[0], 'z-index': zIndex[0], opacity: opacity[0]}"
      >
        <div class="item-content">
          <img :src="community.content.water">
        </div>
      </div>
      <div
        @click="switchPanel($event)"
        class="carousel-item"
        :style="{transition: 'transform 0.5s ease 0s, opacity 0.5s ease 0s', transform: transform[1], 'z-index': zIndex[1], opacity:opacity[1]}"
      >
        <div class="item-content">
          <img :src="community.content.arrear">
        </div>
      </div>
      <div
        @click="switchPanel($event)"
        class="carousel-item"
        :style="{transition: 'transform 0.5s ease 0s, opacity 0.5s ease 0s', transform:transform[2], 'z-index': zIndex[2],opacity: opacity[2]}"
      >
        <div class="item-content">
          <img :src="community.content.income">
        </div>
      </div>
      <div
        @click="switchPanel($event)"
        class="carousel-item"
        :style="{transition: 'transform 0.5s ease 0s, opacity 0.5s ease 0s', transform:transform[3], 'z-index': zIndex[3], opacity:opacity[3]}"
      >
        <div class="item-content">
          <img :src="community.content.call">
        </div>
      </div>
    </div>
  </div>
</template>


<style   scoped>
.item-content {
  width: 450px;
  height: 286px;
  background-color: #000;
  padding: 0.1rem;
  background: url("../../assets/img/popPanel.png") no-repeat;
  background-size: 100% 100%;
}

.item-content >>> table {
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 0.12rem;
  line-height: 0.16rem;
}
.item-content >>> .title {
  color: #00ddfa;
  font-weight: bold;
  text-align: left;
}
.item-content >>> .panelTitle {
  text-align: center;
  padding: 5px 0;
  font-size: 0.16rem;
}
.item-content >>> .itemTitle {
  color: #00ddfa;
  text-align: left;
  font-size: 0.14rem;
}
.item-content >>> .itemValue {
  color: #edc00c;
  text-align: left;
  font-size: 0.14rem;
}
</style>
<style scoped>
.item-content img{
  width: 100%;
}
.carousel {
  height: 100vh;
  position: relative;
}
.carousel > div {
  color: #fff;
  width: 250px;
  height: 286px;
  position: absolute;
  top: 40%;
  left: 40%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 10vw;
  font-family: sans-serif;
  font-size: 6vw;
}
.carousel .dots {
  position: absolute;
  bottom: 0;
  padding: 5%;
  width: 100%;
}
.carousel .dots .dot {
  background-color: #000;
}
</style>
<script>
export default {
  data() {
    return {
      opacity: ["0.95", "0.95", "1", "0.95"],
      zIndex: [3, 4, 6, 5],
      transform: [
        "translate(-50%, -80%) scale(0.8)",
        "translate(-144.5%, -55%) scale(0.8)",
        "translate(-50%, -30%) scale(1)",
        "translate(44.5%, -55%) scale(0.8)"
      ],
     
    };
  },
  props: {
    community: {
      type: Object,
      default: null
    },
     isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchPanel(e) {
      if (e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      }
      let zIndex = e.currentTarget.style.zIndex;
      if (zIndex == 4 || zIndex == 5) {
        if (zIndex == 4) {
          [this.opacity, this.zIndex, this.transform].forEach((list, index) => {
            let last = list.shift();
            list.push(last);
          });
        } else {
          [this.opacity, this.zIndex, this.transform].forEach((list, index) => {
            let first = list.pop();
            list.unshift(first);
          });
        }
      }
    },
    hidePanel() {
      this.$parent.hidePopCommunity();
      this.$props.isShow = false;
    }
  }
};
</script>