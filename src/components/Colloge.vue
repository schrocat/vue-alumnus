<template>
    <div class="row">
        <div class="col-md-12">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active">
                            <!-- <router-link to="/system/user" data-toggle="tab">系统用户</router-link> -->
                        <a href="#aca" data-toggle="tab">院结构管理</a>
                    </li>
                    <li>
                            <!-- <router-link to="/system/user" data-toggle="tab">校友用户</router-link> -->
                        <a href="#mjo" data-toggle="tab">系结构管理</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="active tab-pane" id="aca">
                      <Academy></Academy>
                    </div>
                    <div class="tab-pane" id="mjo">
                      <Major></Major>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Academy from './system-set/Academy'
import Major from './system-set/Major'
export default {
  name: 'Colloge',
  components: {
    Academy: Academy,
    Major: Major
  }
}
</script>
