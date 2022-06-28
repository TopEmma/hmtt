<template>
  <div>
    <div class="banner loggedIn" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>头条</p>
          <p>{{ userInfo.art_count }}</p>
        </li>
        <li>
          <p>粉丝</p>
          <p>{{ userInfo.fans_count }}</p>
        </li>
        <li>
          <p>关注</p>
          <p>{{ userInfo.follow_count }}</p>
        </li>
        <li>
          <p>获赞</p>
          <p>{{ userInfo.like_count }}</p>
        </li>
      </ul>
    </div>
    <div class="banner BeforeLogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <!-- <van-grid-item icon="star-o" text="收藏" /> -->
      <!-- <van-grid-item icon="underway-o" text="历史" /> -->
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon> <i class="toutiao toutiao-lishi"></i> </template>
      </van-grid-item>
    </van-grid>

    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <van-button
      class="logout"
      type="default"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'Mine',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res', res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗？' })
        this.$store.commit('setUser', {})
      } catch (err) { console.log(err) }
    }
  },
  computed: { ...mapState(['user']) },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.banner {
  width: 750px;
  height: 401px;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.BeforeLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
    // background-color: #ffffff;
    // border: solid 2px #ffffff;
  }
  p {
    // width: 145px;
    // height: 28px;
    // font-family: MicrosoftYaHei;
    font-size: 28px;
    font-weight: normal;
    // font-stretch: normal;
    // letter-spacing: 1px;
    color: #ffffff;
    padding: 0;
    margin: 0;
  }
}
.loggedIn {
  padding-top: 116px;
  .avatar {
    padding: 0 32px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 55px;
  }
  .button {
    width: 116px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 16px;
    font-size: 20px;
    font-weight: normal;
    color: #666666;
  }
  .left {
    display: flex;
    align-items: center;
    span {
      margin-left: 22px;
      font-size: 30px;
      font-weight: normal;
      color: #ffffff;
    }
  }
}
.list {
  display: flex;
  li {
    flex: 1;
    text-align: center;
    p {
      color: #ffffff;
      &:nth-child(1) {
        font-size: 36px;
      }
      &:nth-child(2) {
        font-size: 23px;
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/.van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  padding: 9px 0;
  background-color: #f5f7f9;
}
.logout {
  color: red;
}
</style>
