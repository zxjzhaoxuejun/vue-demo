<template>
  <div>
    <div class="shop-info">
      <img src="./../../../assets/imgs/1.jpg" alt="tu" class="img" />
      <div class="shop-text">
        <div>选择类型：</div>
        <div>库存：0</div>
      </div>
    </div>
    <div class="shop-attr" v-for="(item,index) in list" :key="item.id">
      <p class="attr-name">【{{item.goodsSpecName}}】</p>
      <div class="attr-val">
        <span
          class="attr-item"
          v-for="(reds,idx) in item.goodsSpecVals"
          :key="reds.id"
          :class="[selectArr[index]===reds.goodsSkuSpecValName?'active':'',reds.stock===0?'none':'']"
          @click="checkItem(reds,index,idx)"
        >{{reds.goodsSkuSpecValName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { skuSpec, skuList } from "./../../../../public/data";

export default {
  data() {
    return {
      list: skuSpec,
      selectArr: []
    };
  },
  created() {
    skuSpec.forEach(item => {
      item.goodsSpecVals.forEach(i => {
        this.$set(i, "children", []);
        skuList.forEach(list => {
          if (list.skuName.includes(i.goodsSkuSpecValName)) {
            i.children.push(list.skuName);
          }
        });
      });
    });
  },
  mounted() {
    console.log(this.list);
  },
  methods: {
    checkItem(reds, index, idx) {
      if (reds.stock === 0) return; // 判断库存为0时返回
      if (this.selectArr[index] === reds.goodsSkuSpecValName) {
        // 再次点击时取消选中
        this.$set(this.selectArr, index, "");
        this.formData.skuId = ""; // 清空将要传给后台的skuId
      } else {
        this.$set(this.selectArr, index, reds.goodsSkuSpecValName);
      }

      if (this.selectArr.length === this.list.length) {
        // 选取了所有的规格时 拿去skuId
        let str = this.selectArr.join("_");
        // 所有规格都选了时，进行匹配skuId，此处数据用于传给后台
        skuList.forEach(item => {
          // 匹配skuId
          if (item.skuName === str) {
            console.log(`匹配skuId:${item.id}`);
          }
        });
      }

      //根据我们拿到的组合进行查询库存
      this.getCli(reds.children);
      console.log(reds, index, idx);
    },
    getStock(skuName) {
      for (let a in skuSpec) {
        // 我们拼接的数组，见第三张图
        for (let b in skuSpec[a].goodsSpecVals) {
          // 对每项Spu中children进行循环，若此children中包含skuName，则返回当前组合的库存到当前Spu中
          // 例如点击红色时，遍历匹配到红色_5.5寸，红色库存则为红色_5.5寸的库存 300,5.5寸此时库存也为300。以此类推可以得出6.0寸的库存。
          if (skuSpec[a].goodsSpecVals[b].children.indexOf(skuName) !== -1) {
            for (let i in skuList) {
              if (skuList[i].skuName === skuName) {
                skuSpec[a].goodsSpecVals[b].stock = skuList[i].stock;
                // return skuList[i].stock;
              }
            }
          }
        }
      }
      console.log(skuSpec);
    },
    getCli(skuArr) {
      console.log(skuArr);
      for (let i = 0; i < skuArr.length; i++) {
        for (let j = 0; j < skuList.length; j++) {
          if (skuList[j].skuName === skuArr[i]) {
            console.log("匹配", skuList[j].skuName);
            // return skuList[j].skuName;
            let stock = this.getStock(skuList[j].skuName);
            console.log(stock);
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.shop-info {
  display: flex;

  .img {
    width: 120px;
    height: 120px;
  }

  .shop-text {
    text-align: left;
    font-size: 14px;
    color: #323232;
  }
}

.shop-attr {
  margin-top: 10px;

  .attr-name {
    font-weight: 500;
  }

  .attr-item {
    padding: 6px;
    background: #dedede;
    border-radius: 4px;
    margin: 0 4px;
    font-size: 12px;
    color: #323232;
  }

  .active {
    background: #409eff;
    color: #fff;
  }
}
</style>
