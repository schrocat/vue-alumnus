<template>
        <div class="row">
            <div class="col-md-12">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">
                        <li class="active">
                            <a href="#sys" data-toggle="tab">系统用户</a>
                        </li>
                        <li>
                            <a href="#stu" data-toggle="tab">校友用户</a>
                        </li>
                        <li>
                            <a href="#com" data-toggle="tab">企业用户</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="active tab-pane" id="sys">
                            <UserDetail></UserDetail>
                        </div>
                        <div class="tab-pane" id="stu">
                            <Alumnus></Alumnus>
                        </div>
                        <div class="tab-pane" id="com">
                            <Company></Company>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import UserDetail from './system-set/UserDetail'
import Alumnus from './system-set/Alumnus'
import Company from './system-set/Company'
export default {
  name: 'System',
  components: {
    UserDetail: UserDetail,
    Alumnus: Alumnus,
    Company: Company
  }
}
</script>
