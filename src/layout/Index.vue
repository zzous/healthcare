<template>
    <div class="layout" :style="'min-height:' + state.winH + 'px'">
        <MainHeader />
        <div class="maincontainer">
            <MainMenu
                :menuList="state.menu"
                @gnbOpen="gnbOpen"
            />
            <div class="page_content">
                <pageTabs
                    v-if="state.pageTabs.length > 0"
                    :pageTabs = state.pageTabs
                    @closeTabPage =closeTabPage
                    @isActiveTab="isActiveTab"
                />
                <div class="pageWrap">
                    <Location :pageMeta="state.pageMeta" v-if="state.navigation" />
                    <div class="contentBox">
                        <RouterView />
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">footer</div>
    </div>
</template>
<script>
import { reactive, onMounted, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MainMenu from '@/components/layout/MainMenu.vue';
import MainHeader from '@/components/layout/MainHeader.vue';
import Location from '@/components/layout/Location.vue';
import pageTabs from '@/components/layout/pageTabs.vue';
import { menuList } from '@/data/menu.js';
export default {
    components: { MainMenu, MainHeader, Location, pageTabs },

    setup() {
        const router = useRouter();
        const route = useRoute();
        const state = reactive({
            winH: 0,
            pageMeta: [],
            locations: [],
            navigation: false,
            pageTabs: [],
            menu: menuList,
            currentPage: {}

        });
        watch(() => {
            route;
            //네비게이션 
            state.pageMeta = route.meta.sublocation_depth;
            state.navigation = Object.keys(route.meta).length > 0;
            state.currentPage = {'url': route.path, 'label': route.meta.sublocation_depth};
            // console.log(state.currentPage);
            
            //페이지 탭 열기
            nextTick(() => {
                if (state.navigation) {
                    if (state.pageTabs.length < 20) {
                        let checkItem = (item) => {
                            if (item.label === state.pageMeta[2])
                                return true;
                        };
                        if (!(state.pageTabs.some(checkItem))) {
                            state.pageTabs.map((item, index) => {
                                item.isActive = false;
                            });
                            state.pageTabs.push({'label': state.pageMeta[2], 'url': route.path, isActive: true});
                        }
                    }
                    // 현재 주소에 따른 GNB 활성화 처리
                    state.menu.map((item, index) => {
                        if (item.label === state.currentPage.label[0]) {
                            item.isActive = true;
                            item.depth_sub.map((sub, index) => {
                                if (sub.label === state.currentPage.label[1]) {
                                    sub.isActive = true;
                                    sub.menuitems.map((depth, index) => {
                                        depth.label === state.currentPage.label[2] ? depth.isActive = true : depth.isActive = false;
                                    });
                                } else {
                                    sub.isActive = false;
                                }
                            });
                        } else {
                            item.isActive = false;
                        }
                    });
                    // 현재 주소에 따른 페이지 탭 활성화 처리
                    state.pageTabs.map((item) => {
                        item.label === state.currentPage.label[2] ? item.isActive = true : item.isActive = false;
                    });
                }
            });
        });
        // 높이
        onMounted(() => {
            state.winH = window.innerHeight;
        });
        //페이지 탭 닫기
        const closeTabPage = (index) => {
            if (state.pageTabs.length < 2) {
                router.push('/');
            } else {
                if (state.pageTabs[index].url === route.path)
                    index === 0 ? isActiveTab((index + 1)) : isActiveTab((index - 1));
            }
            state.pageTabs.splice(index, 1);
        };
        //페이지 탭 활성화
        const isActiveTab = (index) => {
            state.pageTabs.map((item) => { item.isActive = false; });
            router.push(state.pageTabs[index].url);
            state.pageTabs[index].isActive = true;
        };

        // GNB 활성화
        const gnbOpen = (depth1, depth2, depth3) => {
            state.menu.forEach((item, index) => {
                //depth1
                if (index === depth1) {
                    if (!item.depth) {
                        //console.log(item.url);
                    }
                    item.isActive = true;
                    //depth2
                    item.depth_sub.forEach((item, i) => {
                        if (i === depth2) {
                            item.isActive = true;
                            //depth3
                            item.menuitems.forEach((item, idx) => {
                                if (idx === depth3) {
                                    item.isActive = true;
                                    router.push(item.url);
                                    //console.log(item.url, router, depth3);
                                } else {
                                    item.isActive = false;
                                }
                            });
                        } else {
                            item.isActive = false;
                        }
                    });
                } else {
                    item.isActive = false;
                }
            });
        };

        
        return {
            MainMenu,
            MainHeader,
            state,
            menuList,
            closeTabPage,
            gnbOpen,
            isActiveTab
        };
    }
};
</script>
<style>
* { box-sizing: border-box; }
.layout { display: flex; flex-direction: column; }
.footer { margin-top: auto; background: #e5e5e5; padding: 30px 0 30px 220px; text-align: left; }
.admin_header { height: 50px; padding: 0 20px; border-bottom: solid 5px #f5f5f6 }
.top_area { display: flex; justify-content: space-between; align-items: center; height: 100% }
.btn { border: solid 1px #d7dade; height: 28px; background: #fff; color: #111111; line-height: 28px; border-radius: 4px; font-size: 13px; padding: 0 20px; text-align: center }
.maincontainer { padding: 0px 0px 0px 200px; }
.admin_menu { width: 200px; height: calc(100% - 50px); background: #f5f5f6; position: fixed; left: 0; top: 50px; padding-top: 30px }
.menu>ul>li { border-bottom: solid 1px #ddd; text-align: left; position: relative; }
.menu>ul>li>span { display: block; font-size: 14px; font-weight: 700; padding: 0px 20px; position: relative; height: 30px; line-height: 30px; }
.menu>ul>li>span:before { content: ""; display: block; width: 3px; height: 3px; background: #111; position: absolute; left: 10px; top: 13px; }
.menu>ul>li>span::after { content: "+"; display: block; position: absolute; right: 20px; top: 0px; font-size: 14px; }
.menu>ul>li>ul { display: none; }
.menu>ul>li>ul>li>span { display: block; height: 22px; padding-left: 22px; font-size: 12px; line-height: 22px; }
.menu>ul>li>ul>li>ul { display: none; }
.menu>ul>li>ul>li>ul>li>span { display: block; height: 22px; padding-left: 34px; font-size: 12px; line-height: 22px; }
.menu>ul>li.isActive>span { color: #60584c; background: #f3f1ea; box-shadow: inset 0 0 5px 0 rgb(0 0 0 / 7%); }
.menu>ul>li.isActive>ul { display: block; }
.menu>ul>li>ul>li.isActive>span { background: #dcd4c3; box-shadow: inset 0 0 5px 0 rgb(0 0 0 / 7%); }
.menu>ul>li>ul>li.isActive>ul { display: block; }
.menu>ul>li>ul>li.isActive>ul>li.isActive>span { color: #f75e5e }
.pagelocationWrap { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.pagetitle { font-size: 20px; font-weight: 700; color: #111 }
.pagelocation {}
.pageWrap{padding:30px;}
.pageTabs{border-bottom:solid 1px #ddd; padding:20px 20px 0 20px;display: flex;}
.labelTabs{border-radius: 5px 5px 0 0; background:#ddd; padding:0 20px 0 10px; line-height:25px;position: relative; text-align: center;}
.labelTabs + .labelTabs{margin-left:3px}
.labelTabs.active{background:#666; color:#fff}
.btn-pageClose{position:absolute; right:10px; top:6px; font-size: 10px;}
</style>