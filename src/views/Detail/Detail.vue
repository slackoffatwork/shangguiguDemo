<template>
    <!-- 项目的最外层 -->
    <div class="outer">
        <!-- 主要内容区域 -->
        <section class="con">
            <!-- 导航路径区域 -->
            <div class="conPoin">
                <div class="conPoin">
                    <a v-show="categoryView.category1Name">{{ categoryView.category1Name }}</a>
                    <a v-show="categoryView.category2Name">{{ categoryView.category2Name }}</a>
                    <a v-show="categoryView.category3Name">{{ categoryView.category3Name }}</a>
                </div>
            </div>
            <!-- 主要内容区域 -->
            <div class="mainCon">
                <!-- 左侧放大镜区域 -->
                <div class="previewWrap">
                    <!--放大镜效果-->
                    <Zoom :skuImageList="skuImageList" />
                    <!--下方轮播图-->
                    <ImageList :skuImageList="skuImageList" />
                </div>
                <!-- 右侧选择区域布局--右侧数据 -->
                <div class="InfoWrap">
                    <div class="goodsDetail">
                        <h3 class="InfoName">{{ skuInfo.skuDesc }}</h3>
                        <p class="news">{{ skuInfo.skuName }}</p>
                        <div class="priceArea">
                            <div class="priceArea1">
                                <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                                <div class="price">
                                    <i>¥</i>
                                    <em>{{ skuInfo.price }}</em>
                                    <span>降价通知</span>
                                </div>
                                <div class="remark">
                                    <i>累计评价</i>
                                    <em>999</em>
                                </div>
                            </div>
                            <div class="priceArea2">
                                <div class="title">
                                    <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                                </div>
                                <div class="fixWidth">
                                    <i class="red-bg">加价购</i>
                                    <em
                                        class="t-gray">满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em>
                                </div>
                            </div>
                        </div>
                        <div class="support">
                            <div class="supportArea">
                                <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
                                <div class="fixWidth">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
                            </div>
                            <div class="supportArea">
                                <div class="title">配 送 至</div>
                                <div class="fixWidth">广东省 深圳市 宝安区</div>
                            </div>

                        </div>
                    </div>
                    <div class="choose">
                        <div class="chooseArea">
                            <div class="choosed"></div>
                            <dl v-for="(spulist, index) in spuSaleAttrList" :key="spulist.id">
                                <dt class="title">{{ spulist.saleAttrName }}</dt>
                                <dd :class="{red:spuvalue.isChecked==1}" v-for="(spuvalue, index) in spulist.spuSaleAttrValueList"
                                    :key="spuvalue.id" @click="spulistChange(spuvalue, spulist.spuSaleAttrValueList)">
                                    {{ spuvalue.saleAttrValueName }}
                                </dd>
                            </dl>
                        </div>

                        <div class="cartWrap">
                            <div class="controls">
                                <input autocomplete="off" class="itxt" v-model="skuNum" @change="changeskuNum">
                                <a class="plus" @click="skuNum++">+</a>
                                <a class="mins" @click="skuNum > 1 ? skuNum-- : skuNum = 1">-</a>
                            </div>
                            <div class="add">
                                <a @click="addShopcart">加入购物车</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 内容详情页 -->
        <section class="productDetail">
            <aside class="aside">
                <div class="tabWraped">
                    <h4 class="active">相关分类</h4>
                    <h4>推荐品牌</h4>
                </div>
                <div class="tabContent">
                    <div class="tab-pane active">
                        <ul class="partList">
                            <li>手机</li>
                            <li>手机壳</li>
                            <li>内存卡</li>
                            <li>Iphone配件</li>
                            <li>贴膜</li>
                            <li>手机耳机</li>
                            <li>移动电源</li>
                            <li>平板电脑</li>
                        </ul>
                        <ul class="goodsList">
                            <li>
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="@/assets/images/part01.png" />
                                    </div>
                                    <div class="attr">Apple苹果iPhone 6s (A1699) </div>
                                    <div class="price">
                                        <em>¥</em>
                                        <i>6088.00</i>
                                    </div>
                                    <div class="operate">
                                        <a href="javascript:void(0);">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="@/assets/images/part02.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>6088.00</i>
                                        </strong>
                                    </div>
                                    <div class="operate">
                                        <a href="javascript:void(0);">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="@/assets/images/part03.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>6088.00</i>
                                        </strong>
                                    </div>
                                    <div class="operate">
                                        <a href="javascript:void(0);">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="@/assets/images/part02.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>6088.00</i>
                                        </strong>
                                    </div>
                                    <div class="operate">
                                        <a href="javascript:void(0);">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="@/assets/images/part03.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>6088.00</i>
                                        </strong>
                                    </div>
                                    <div class="operate">
                                        <a href="javascript:void(0);">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-pane">
                        <p>推荐品牌</p>
                    </div>
                </div>
            </aside>
            <div class="detail">
                <div class="fitting">
                    <h4 class="kt">选择搭配</h4>
                    <div class="good-suits">
                        <div class="master">
                            <img src="@/assets/images/l-m01.png" />
                            <p>￥5299</p>
                            <i>+</i>
                        </div>
                        <ul class="suits">
                            <li class="suitsItem">
                                <img src="@/assets/images/dp01.png" />
                                <p>Feless费勒斯VR</p>
                                <label>
                                    <input type="checkbox" value="39">
                                    <span>39</span>
                                </label>
                            </li>
                            <li class="suitsItem">
                                <img src="@/assets/images/dp02.png" />
                                <p>Feless费勒斯VR</p>
                                <label>
                                    <input type="checkbox" value="50">
                                    <span>50</span>
                                </label>
                            </li>
                            <li class="suitsItem">
                                <img src="@/assets/images/dp03.png" />
                                <p>Feless费勒斯VR</p>
                                <label>
                                    <input type="checkbox" value="59">
                                    <span>59</span>
                                </label>
                            </li>
                            <li class="suitsItem">
                                <img src="@/assets/images/dp04.png" />
                                <p>Feless费勒斯VR</p>
                                <label>
                                    <input type="checkbox" value="99">
                                    <span>99</span>
                                </label>
                            </li>
                        </ul>
                        <div class="result">
                            <div class="num">已选购0件商品</div>
                            <div class="price-tit">
                                套餐价
                            </div>
                            <div class="price">￥5299</div>
                            <button class="addshopcar">加入购物车</button>
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <ul class="tab-wraped">
                        <li class="active">
                            <a href="###">
                                商品介绍
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                规格与包装
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                售后保障
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                商品评价
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                手机社区
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="one" class="tab-pane active">
                            <ul class="goods-intro">
                                <li>分辨率：1920*1080(FHD)</li>
                                <li>后置摄像头：1200万像素</li>
                                <li>前置摄像头：500万像素</li>
                                <li>核 数：其他</li>
                                <li>频 率：以官网信息为准</li>
                                <li>品牌： Apple</li>
                                <li>商品名称：APPLEiPhone 6s Plus</li>
                                <li>商品编号：1861098</li>
                                <li>商品毛重：0.51kg</li>
                                <li>商品产地：中国大陆</li>
                                <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
                                <li>系统：苹果（IOS）</li>
                                <li>像素：1000-1600万</li>
                                <li>机身内存：64GB</li>
                            </ul>
                            <div class="intro-detail">
                                <img src="@/assets/images/intro01.png" />
                                <img src="@/assets/images/intro02.png" />
                                <img src="@/assets/images/intro03.png" />
                            </div>
                        </div>
                        <div id="two" class="tab-pane">
                            <p>规格与包装</p>
                        </div>
                        <div id="three" class="tab-pane">
                            <p>售后保障</p>
                        </div>
                        <div id="four" class="tab-pane">
                            <p>商品评价</p>
                        </div>
                        <div id="five" class="tab-pane">
                            <p>手机社区</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 猜你喜欢 -->
        <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
                <li class="likeItem">
                    <div class="p-img">
                        <img src="@/assets/images/itemlike01.png" />
                    </div>
                    <div class="attr">
                        <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>3699.00</i>
                    </div>
                    <div class="commit">已有6人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="@/assets/images/itemlike02.png" />
                    </div>
                    <div class="attr">
                        Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4388.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="@/assets/images/itemlike03.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="@/assets/images/itemlike04.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="@/assets/images/itemlike05.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="@/assets/images/itemlike06.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Zoom from './childe/Zoom.vue';
import ImageList from './childe/ImageList.vue'
import { mapGetters } from 'vuex';


export default {
    name: "Detail",
    components: { Zoom, ImageList },
    data() {
        return {
            // 购买个数
            skuNum: 1
        }
    },
    mounted() {
        // 发送请求获取商品id
        this.$store.dispatch("getDetailInof", this.$route.params.skuId);
    },
    computed: {
        ...mapGetters(['categoryView', 'skuInfo', 'spuSaleAttrList']),
        // 优化数据 防止可能未空数组的报错
        skuImageList() {
            return this.skuInfo.skuImageList || []
        }
    },
    methods: {
        // 商品详情属性排它操作   未实现
        spulistChange(spuvalue, arr) {
            arr.forEach(item => {
                item.isChecked = '0'
            });
            spuvalue.isChecked = '1'
        },
        // 优化商品输入的值
        changeskuNum(event) {
            let value = event.target.value
            if (isNaN(value) || value < 1) {
                this.skuNum = 1
            } else {
                this.skuNum = parseInt(value)
            }
        },
        async addShopcart() {
            // 发请求
            // 根据vuex判断是否添加成功W
            try {
                await this.$store.dispatch('addUpateShopCart', { skuId: this.$route.params.skuId, skuNum: this.skuNum })
                // 路由跳转
                this.$router.push({name: 'addCartSuccess',query:{skuNum:this.skuNum}})
                // 数据传递 本地存储 有上限5M 一直存在||会话存储 会话存在数据存在
                // 我们选中会话存储 把对象封装成JSON数据
                sessionStorage.setItem('SKUINFO',JSON.stringify(this.skuInfo))
            } catch (error) {
                alert(error.message)
            }
        }
    }

}

</script>

<style scoped>
.active {
    background-color: white;
}
.red{
    color: red
}

@import url('@/assets/css/detail.css');
@import url('@/assets/css/all.css');
@import url('@/assets/css/reset.css');
</style>