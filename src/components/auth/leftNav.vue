<template>
  <!--左边菜单-->
  <div class="left">
    <ul class="left-menu">

      <li v-if="$store.state.user.menuPerms.includes('AUTH.USER')" :class="{'active':$route.fullPath.startsWith('/auth/user')}" @click="highLight(1)">
        <router-link to="/auth/user/list">
          <i>
            <img src="../../assets/img/icon_monitor.png" />
          </i>
          <span class="text">用户管理</span>
        </router-link>
      </li>
      <li v-if="$store.state.user.menuPerms.includes('AUTH.ROLE')" :class="{'active':$route.fullPath.startsWith('/auth/role')}" @click="highLight(2)">
        <router-link to="/auth/role/list">
          <i>
            <img src="../../assets/img/icon_monitor.png" />
          </i>
          <span class="text">角色管理</span>
        </router-link>
      </li>
      <li v-if="$store.state.user.menuPerms.includes('AUTH.MENU')" :class="{'active':$route.fullPath.startsWith('/auth/menu')}" @click="highLight(3)">
        <router-link to="/auth/menu/list">
          <i>
            <img src="../../assets/img/icon_monitor.png" />
          </i>
          <span class="text">菜单管理</span>
        </router-link>
      </li>
    </ul>
  </div>
  <!--左边菜单//-->
</template>
<script>
  export default {
    props: ['menuIndex', 'clickmenuIndex'],
    data() {
      return {
        // menuIndex: getstore('menuIndex') ? Number(getstore('menuIndex')) : 1
      };
    },
    methods: {
      highLight: function(index) {
        // setstore('menuIndex', index)
        this.clickmenuIndex(index)
        // this.menuIndex = index
      }
    }
  };
</script>
