<template>
  <div>
    <van-cell-group>
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        ref="pullrefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell
            v-for="(item, index) in articleList"
            :key="index"
            :title="item.title"
            value="内容"
            label="描述信息"
          /> -->
          <ArticleItem
            v-for="(item, index) in articleList"
            :key="index"
            :article="item"
          ></ArticleItem>
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
// let ele = null
// let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        // 若数据已全部加载完毕 则直接将 finished 设置为 true
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        // 数据更新完毕后 将loading 设置为false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      console.log('刷新成功')
      // 防止用户把加载更多搞结束了
      this.finished = false
      // 重新加载数据
      this.loading = true
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  mounted () {
    // 组件最终渲染成html dom, $el就是渲染好的根标签
    // console.log(this.$refs.pullrefresh)
    // ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      // scrollTop = this.scrollTop
    })
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
