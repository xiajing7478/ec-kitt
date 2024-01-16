<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import bwPowerSet from './index'
// 商品数据
const goods = ref({})
let pathMap = {} // 数据获取完毕生成路径字典
const getGoods = async () => {
  // 1135076  初始化就有无库存的规格
  // 1369155859933827074 更新之后有无库存项（蓝色-20cm-中国）
  const res = await axios.get(
    'http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074'
  )
  goods.value = res.data.result
  pathMap = getPathMap()
  initDisabledState(goods.value.specs, pathMap)
}
onMounted(() => getGoods())

const changeSku = (item, val) => {
  if (val.disabled) return
  if (val.selected) {
    val.selected = false
  } else {
    item.values.map((val) => {
      return (val.selected = false)
    })
    val.selected = true
    console.log('item', item)
  }

  updateDisabledState(goods.value.specs, pathMap)

  // 产出SKU对象数据
  const index = getSelectedValues(goods.value.specs).findIndex((value) => value === undefined)
  if (index <= -1) {
    const key = getSelectedValues(goods.value.specs).join('-')
    const skuIds = pathMap[key]

    const skuObj = goods.value.skus.find((sku) => sku.id === skuIds[0])
    console.log('当前的skuObj', skuObj)
  }
}

// 获取选中匹配数组 ['黑色',undefined,undefined]
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((value) => value.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}

const updateDisabledState = (specs, pathMap) => {
  // 约定：每一个按钮的状态由自身的disabled进行控制
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    item.values.forEach((val) => {
      if (val.selected) return
      const _seletedValues = [...selectedValues]
      _seletedValues[i] = val.name
      const key = _seletedValues.filter((value) => value).join('-')
      // 路径字典中查找是否有数据 有-可以点击 没有-禁用
      val.disabled = !pathMap[key]
    })
  })
}

// 初始化禁用状态
const initDisabledState = (specs, pathMap) => {
  // 1.遍历specs
  specs.forEach((spec) => {
    // 2.遍历specs中的values
    spec.values.forEach((val) => {
      //路径字典中查找是否有数据 有-可以点击 没有-禁用
      val.disabled = !pathMap[val.name]
    })
  })
}

// 生成有效路径字典对象
const getPathMap = () => {
  const pathMap = {}
  // 1.根据skus字段生成有效的sku数据
  const effectiveSkus = goods.value.skus.filter((sku) => sku.inventory > 0)
  // console.log('effectiveSkus', effectiveSkus)
  // 2.根据有效的Sku集合使用powerSet算法得到所有子集 [1,2] => [[1], [2], [1,2]]
  effectiveSkus.forEach((sku) => {
    //  2.1 获取可选规格值数组
    const selectedValArr = sku.specs.map((spec) => spec.valueName)
    console.log('selectedValArr', selectedValArr)
    // 2.2 获取可选值数组的子集
    const valueArrPowerSet = bwPowerSet(selectedValArr)
    console.log('valueArrPowerSet', valueArrPowerSet)
    // 3. 根据子集生成路径字典对象
    // 3.1 遍历子集 往pathMap中插入数据
    valueArrPowerSet.forEach((valueArr) => {
      // 根据Arr得到字符串的key，约定使用-分割 ['蓝色'，'美国'] => '蓝色-美国'
      const key = valueArr.join('-')
      if (pathMap[key]) {
        // 3.2 如果pathMap中已经存在key，只需要往key对应的数组中添加sku即可
        pathMap[key].push(sku.id)
      } else {
        // 3.3 如果pathMap中不存在key，需要初始化一个数组，然后往数组中添加sku
        pathMap[key] = [sku.id]
      }
    })
  })
  console.log('pathMap', pathMap)
  return pathMap
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img
            @click="changeSku(item, val)"
            :class="{ selected: val.selected, disabled: val.disabled }"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
          />
          <!-- 文字类型规格 -->
          <span
            @click="changeSku(item, val)"
            :class="{ selected: val.selected, disabled: val.disabled }"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
