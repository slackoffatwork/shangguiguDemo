<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartValue, index) in cartValue" :key="cartValue.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="(cartValue.isChecked == 1)"
              @change="changeisChecked(cartValue, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartValue.imgUrl">
            <div class="item-msg">{{ cartValue.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartValue.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a @click="handler('minus', -1, cartValue)" class="mins">-</a>
            <input autocomplete="off" type="text" :value="cartValue.skuNum"
              @change="handler('change', $event.target.value * 1, cartValue)" minnum="1" class="itxt">
            <a @click="handler('add', 1, cartValue)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartValue.skuPrice * cartValue.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartBySkuId(cartValue)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="(allisCheck&&cartValue.length>0)" @change="changeChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalnumber}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from "lodash/throttle"

export default {
  name: 'ShopCart',
  data() {
    return {

    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    //封装请求方法
    getDate() {
      this.$store.dispatch('getCartList')
    },
    // 商品个数的变化 添加节流函数
    handler: throttle(async function (type, disNum, cart) {
      // type区别按钮的身份 disNum变化量 cart商品的详细信息
      // 向服务器发请求
      switch (type) {
        case "add":
          // 带给服务器的变化量
          disNum = 1
          break;
        case "minus":
          // 带给服务器的变化量
          // 注意判断商品的数量大于1
          disNum = cart.skuNum > 2 ? disNum = -1 : disNum = 0
          break;
        case "change":
          // if(isNaN(disNum) || disNum<1){
          //  disNum = 0
          // }else{
          //  disNum = parseInt(disNum) - cart.skuNum
          // }
          // 带给服务器的变化量 判断输入数据是否合法
          disNum = (isNaN(disNum) || disNum < 1) ? 0 : parseInt(disNum) - cart.skuNum
          break;
      }
      // 判断是否修改成功
      try {
        await this.$store.dispatch('addUpateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 在次发送请求
        this.getDate()
      } catch (error) {
        alert(error.message)
      }
    }, 500),
    // 删除
    async deleteCartBySkuId(cart) {
      try {
        // 触发删除接口 向数据库发送id
        await this.$store.dispatch('deleteCartBySkuId', cart.skuId)
        // 更新数据
        this.getDate()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改商品勾选状态
    async changeisChecked(cart, event) {
      try {
        // 判断勾选状态 1 勾选 0 未勾选
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updateCheckedById', { skuId: cart.skuId, isChecked })
        this.getDate()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除已选中商品
    async deleteCheckedCart() {
      try {
        await this.$store.dispatch('deleteCheckedCart')
        this.getDate();
      } catch (error) {
        alert(error.message)
      }
    },
    async changeChecked(event) {
      try {
        // 获取当前全选框的checked
        let checked = event.target.checked ? '1' : '0'
        // 派发action
        await this.$store.dispatch('updateAllCheckedCart', checked)
        this.getDate()
      } catch (error) {
        alert(error.message)
      }

    },
  },
  computed: {
    // 获取购物车数据
    ...mapGetters(['cartList']),
    // 购物车数据
    cartValue() {
      return this.cartList.cartInfoList || []
    },
    // 购买商品的总价格
    totalPrice() {
      let temp = 0
      this.cartValue.forEach(item => {
        if(item.isChecked)
        temp += item.skuNum * item.skuPrice
      })
      return temp
    },
    totalnumber(){
      let temp = 0
      this.cartValue.forEach(item=>{
        if(item.isChecked){
          temp += item.skuNum
        }
      })
      return temp
    },
    // 计算全选
    allisCheck() {
      return this.cartValue.every(item => item.isChecked == 1)
    }

  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }


        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>