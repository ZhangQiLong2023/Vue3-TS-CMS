<template>
  <div class="ql-table">
    <!-- 给table页面添加一个header 用于显示新增按钮和用户列表 -->
    <div class="header">
      <!-- 用户决定是什么样的 -->
      <slot name="header">
        <div class="title">{{ title }}</div>
      </slot>
      <div class="handler">
        <slot name="headerHandler"></slot>
      </div>
    </div>
    <el-table :data="listData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" v-if="showSelectColumn" width="80px" align="center">
      </el-table-column>
      <el-table-column
        v-if="showIndexColum"
        type="index"
        label="序号"
        align="center"
        width="80px"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <!-- <el-table-column prop="item.name" label="用户名" min-width="180" /> -->
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 插槽  scope.row 就是当前行的数据 -->
          <template #default="scope">
            <!-- scope.row[propItem.prop] 就想当与是 scope.row[name、realname]  -->
            <!-- <el-button>{{ scope.row[propItem.prop] }}</el-button> --->
            <!-- 但是默认情况下，我们有的数据是不需要成为按钮的，有的数据则需要是按钮样式，怎么做呢？插槽 -->
            <!--插槽名字不能写死，因为只是想改某几列，固定找到某一列的插槽，在 user 中 propList 中添加 slotName -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 给 ql-table 添加一个分页的功能 -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :small="small"
          layout="total, sizes, prev,pager,next,jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      require: true
    },
    propList: {
      type: Array,
      require: true
    },
    //是否显示序号列，默认不显示
    showIndexColum: {
      type: Boolean,
      default: false
    },
    // 是否显示选中按钮
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // ql-table title标题
    title: {
      type: String,
      default: ''
    },
    // 数据总数
    listCount: {
      type: Number,
      require: true
    },
    // 从 page-content 中接收书双向绑定传入的数据
    page: {
      type: Object,
      // 给一个默认值
      default: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 当选中按钮生效的时候，触发的事件
    const handleSelectionChange = (value: any) => {
      // console.log(value)  // 获取到的数据
      // 当选中的数据发送到上一层，对数据进行处理
      emit('selectionChange', value)
    }
    // 当页码发生变化
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    // 页大小发生变化
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}
.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
