import React from 'react'
import './carehealth.less'
import $ from 'jquery'
import MenuCard from '../../components/business/carehealth/Bjyinhang-menu-card'
import JianKangCePing from '../../components/business/carehealth/jiankangceping'
import JianKangCePingList from '../../components/business/carehealth/jiankangcepinglist'
import JianKangZhiShiList from '../../components/business/carehealth/jianKangzhishilist'
import BaoXianList from '../../components/business/carehealth/baoxianlist'

// import ScrollList from '../component/ScrollList'
// import IScroll from '../../node_modules/iscroll/build/iscroll-probe'
function format_Money(totIncome){
     
     var income=String(totIncome);
     var number =income.indexOf('.');
     var digit_num=".00";
     if (number > -1) {
         income = totIncome.substring(0,number-1);
         digit_num=totIncome.substring(number,totIncome.length);
         if (digit_num.length == 2) {
             digit_num = digit_num +"0";
         }else if (digit_num.length ==1) {
             digit_num = digit_num +"00";
         }
     }

     var amtLen = income.length;
     if (amtLen <= 3 ){
         income = income+digit_num;
     }else if (amtLen > 3 && amtLen <= 6){
         income = income.substring(0,amtLen-3)+","+income.substring(amtLen-3,amtLen)+digit_num;
     }else if (amtLen > 6 && amtLen <= 9 ){
         income = income.substring(0,amtLen-6)+","+income.substring(amtLen-6,amtLen-4)+","+income.substring(amtLen-3,amtLen)+digit_num;
     }else if (amtLen > 9 && amtLen <= 12){ 
         income = income.substring(0,amtLen-9)+","+income.substring(amtLen-9,amtLen-7)+","+income.substring(amtLen-6,amtLen-4)+","+income.substring(amtLen-3,amtLen)+digit_num;
     }else{
         income = income.substring(0,amtLen-12)+","+income.substring(amtLen-12,amtLen-10)+","+income.substring(amtLen-9,amtLen-7)+","+income.substring(amtLen-6,amtLen-4)+","+income.substring(amtLen-3,amtLen)+digit_num;
     }
     return income;
 }
class CareHealth extends React.Component {
    // static contextTypes = {
    //     history: React.PropTypes.object.isRequired
    // }
    constructor() {
        super();
        this.state = {
            pingceList : [],
            disabled : false,
            yunyingceList : [],
            baoxianList : [],
            imgUrl : "",
            baoxianimg : ""
            
            
        }
    }
    //初始化调用ewp 查询健康测评及健康小知识
    componentDidMount(){
        // bjdevice.doEMPFunction("cxmb1100","7","");
        setTimeout(() => {
            this.setState({
                imgUrl : pingceList["imgUrl"],
                pingceList : pingceList["hot_msglist"]
            });
            // bjdevice.doEMPFunction("cxmb1100","8","");
            setTimeout(() => {
                // alert("yunyingceList"+JSON.stringify(yunyingceList))
                // alert("hot_msglist"+JSON.stringify(yunyingceList["hot_msglist"]))
                this.setState({
                    imgUrl : yunyingceList["imgUrl"],
                    yunyingceList : yunyingceList["msg_konwledge"]
                });
                $(".rit-guanaijiankang-bg").css({"height":"100%"});
            }, 500);

        }, 500);

        // bjdevice.doEMPFunction("baoxian","12","");
        setTimeout(() => { 
            // alert("setTimeout"+JSON.stringify(baoxianMsg))
            var zongbaoxianlists = [];
            var imgUrlbaoxian = baoxianMsg["imgUrl"];
            // alert("imgUrlbaoxian"+JSON.stringify(imgUrlbaoxian))
            var baoxianlist1 = baoxianMsg["msglist"];
            // alert("baoxianlist1"+JSON.stringify(baoxianlist1))
            var baoxianlist2 = baoxianMsg["list2"];//nianxian
            // alert("baoxianlist2"+JSON.stringify(baoxianlist2))
            var baoxianlist4 = baoxianMsg["account"];//tupian
            //alert("baoxianlist4"+JSON.stringify(baoxianlist4))

            var zongbaoxianlists = [];
            for (var i = 0; i < baoxianlist1.length; i++) {//用第一组list作参照
                var zongbaoxianlisttip = {};
                // var aa = "";
                var bb = "";//保年限
                var cc = "";//图片
                var productFeaturea = "";
                var LogCompany = "";
                var PicNamea = "";
                for (var j = 0; j < baoxianlist2.length; j++) {//循环第二组找到对应的值
                    if(baoxianlist1[i].CodeProductBusi == baoxianlist2[j].CodeProductBusi){
                        if(baoxianlist2[j].ParamsName == undefined){//找不到值的时候置为空
                            bb = "";
                        }else{
                            bb = baoxianlist2[j].ParamsName;
                        }
                    }
                }
                for (var x = 0; x < baoxianlist4.length; x++) {//循环第三组找到对应的值
                    if(baoxianlist1[i].CodeProductBusi == baoxianlist4[x].CodeProductBusi){
                        if(baoxianlist4[x].uploadFilePic == undefined){
                            cc = "";
                        }else{
                            cc = baoxianlist4[x].uploadFilePic;
                        }
                        productFeaturea = baoxianlist4[x].productFeature;////产品特点         list4   大病险才安心               
                        LogCompany = baoxianlist4[x].LogCompany;//公司log图片名 
                        PicNamea = baoxianlist4[x].PicName;//公司log图片名
                        //alert(baoxianlist4[x].logCompany);
                    }
                }
                zongbaoxianlisttip.StartPrem = format_Money(baoxianlist1[i].StartPrem/100);//保额
                zongbaoxianlisttip.AppAge = baoxianlist1[i].AppAge;//投保年龄
                zongbaoxianlisttip.ParamsName = bb;//保年限
                zongbaoxianlisttip.uploadFilePic = cc;//图片
                // zongbaoxianlisttip.from = dd;
                zongbaoxianlisttip.NameProduct = baoxianlist1[i].NameProduct;//保险名字           泰康月行无忧   list1    
                zongbaoxianlisttip.CodeProductBusi = baoxianlist1[i].CodeProductBusi;//id          id
                zongbaoxianlisttip.NoCompany = baoxianlist1[i].NoCompany;//编号            list1    
                zongbaoxianlisttip.RiskType = baoxianlist1[i].RiskType;   //数字    list1             
                zongbaoxianlisttip.RelaCodeFlag = baoxianlist1[i].RelaCodeFlag;//code标示 
                zongbaoxianlisttip.ArbitNameInput = baoxianlist1[i].ArbitNameInput;  //N  
                zongbaoxianlisttip.DisputedFlagInput = baoxianlist1[i].DisputedFlagInput;  //N 
                zongbaoxianlisttip.AppntSalaryInput = baoxianlist1[i].AppntSalaryInput;   //N  
                zongbaoxianlisttip.NoCompanyName = baoxianlist1[i].NoCompanyName;  //保险公司名 
                zongbaoxianlisttip.AmntFlag = baoxianlist1[i].AmntFlag;   //1   list1             
                zongbaoxianlisttip.VPU = baoxianlist1[i].VPU;  //0   list1              
                zongbaoxianlisttip.FileSysVar2 = baoxianlist1[i].FileSysVar2;      //list1          
                zongbaoxianlisttip.FileSysVar3 = baoxianlist1[i].FileSysVar3;       //list1           
                zongbaoxianlisttip.FileSysVar6 = baoxianlist1[i].FileSysVar6;      //list1
                zongbaoxianlisttip.productFeature = productFeaturea || "";////产品特点         list4   大病险才安心               
                zongbaoxianlisttip.LogCompany = LogCompany || "";//公司log图片名             
                zongbaoxianlisttip.PicName = PicNamea || "";//公司log图片名                  list4     。jpg      
                zongbaoxianlisttip.imgUrl = imgUrlbaoxian;//4.0保险图片路径 
                zongbaoxianlists.push(zongbaoxianlisttip);//赋值
            }
            console.log(zongbaoxianlists)
            // alert("zongbaoxianlists"+JSON.stringify(zongbaoxianlists))
            this.setState({
                baoxianList : zongbaoxianlists,//接口返回的数据处理之后的
                baoxianimg : imgUrlbaoxian
            });
            
        }, 500);
     }
   
    gotoWHPage = jyType => {
        var service = "";
        var ewpType = "";
        //健康咨询
        if(jyType === "jiankangzixun"){
            service = "https://www.chunyuyisheng.com";
            ewpType = "no_login";
        }
        //体检预约
        if(jyType==="tijianyuyue_weijiang"){
            var channel_number = "jd20180713004129";
            var jump_type = "4";
            var columnid = "BJDZ001";
            service = "http://test.zbt.jiangxindaojia.com/zbtapi/api/homePage/entrance?jump_type="+jump_type+"&columnid="+columnid+"&channel_number="+channel_number+"&basic_data=";
            ewpType = "beidongdenglu";
        }
        //运动场馆预约
        if(jyType === "yundongchangguanyuyue"){
            var service = "http://m.p-ubit.com/Application/MobileCustom/sitemain_bjelec.html?comId=24&openId="
            ewpType = "beidongdenglu";
        }
        //绿色食品-密农商城
        if(jyType === "minongshangcheng"){
            service = "https://h5.youzan.com/v2/feature/hFpVUiPdt5"
            ewpType = "no_login";
        }
        bjdevice.doEMPFunction(ewpType,jyType,service);
        
    }
    gotoEwpPage = jyType => {
        bjdevice.doEMPFunction(jyType,"","");
    }
    onClick = item =>{
        var itemString = JSON.stringify(item).replace(/\"/g,"'");
        bjdevice.doEMPFunction("lunboClick","health_eval",itemString);
        //window.location.href = srcUrl;
    }
    onClicks = item =>{
        var itemString = JSON.stringify(item).replace(/\"/g,"'");
        bjdevice.doEMPFunction("lunboClick","health_knowledge",itemString);
        //window.location.href = srcUrl;
    } 
    onClicklist = item =>{
        var list = JSON.stringify(item).replace(/\"/g,"'");
        bjdevice.doEMPFunction("baoxian_click",list,"");
    } 
    render() {
        var me = this;
        var pingceLists;
        var pingceListszhishi;
        var baoxianLists;
        pingceLists = me.state.pingceList.map(function(item,key){
           
            return<JianKangCePingList key={key} clickhandle={me.onClick.bind(me,item)} srcUrl={item.DTButtonURL} imgUrl={me.state.imgUrl + "/"+item.HPImage}/>
        })
        pingceListszhishi = me.state.yunyingceList.map(function(item,key){
            return<JianKangZhiShiList key={key} handleClick={me.onClicks.bind(me,item)}  imgUrl={me.state.imgUrl + "/"+item.HPImage} headertitle={item.HPTitle}/>
        })
       
        baoxianLists = me.state.baoxianList.map(function(item,key){

        {/* 保险列表中 从接口获取的数据  图片 钱 年龄 期限  其中接口字段图片链接和期限需要按照接口文档改 目前走的假数据*/} 

            return<BaoXianList key={key} handleClick={me.onClicklist.bind(me,item)} imgUrl={me.state.baoxianimg + "/"+item.uploadFilePic} money={item.StartPrem} age={item.AppAge} qixian={item.ParamsName} />
        })

        return (
            <div style={{background:"#fff",paddingBottom:"0.5rem"}}>
                <div className="rit-guanaijiankang">
                    <div className="rit-qichefuwu-banners"></div>
                    <div className="rit-qichefuwu-box">
                        <MenuCard fage="3" click31={this.gotoEwpPage.bind(this,"yiliaofuwu")} 
                        click32={this.gotoWHPage.bind(this,"jiankangzixun")} 
                        click33={this.gotoWHPage.bind(this,"tijianyuyue_weijiang")} 
                        click34={this.gotoWHPage.bind(this,"yundongchangguanyuyue")} 
                        click35={this.gotoEwpPage.bind(this,"guibinfuwu")} 
                        click36={this.gotoWHPage.bind(this,"minongshangcheng")} />
                    </div>
                    <div className="ryt-pingce">
                        <div className="ryt-pingce-box">
                            <div className="ryt-pingce-box-left">健康测评</div>
                        </div>
                    </div>
                    
                    <JianKangCePing>{pingceLists}</JianKangCePing>
                    <div className="mage-higths"></div>
                    <div className="ryt-pingce">
                        <div className="ryt-pingce-box">
                            <div className="ryt-pingce-box-left">健康小知识</div>
                            {/* <div className="ryt-pingce-box-right">更多</div>
                            <div className="ryt-pingce-box-pic"></div> */}
                        </div>
                    </div>
                    <JianKangCePing>{pingceListszhishi}</JianKangCePing>
                   <div className="mage-higths"></div>
                    <div className="ryt-pingce">
                        <div className="ryt-pingce-box">
                            <div className="ryt-pingce-box-left">为您保障</div>
                            <div className="ryt-pingce-box-right" onClick={this.gotoEwpPage.bind(this,"moreInsurance")}>更多</div>
                            <div className="ryt-pingce-box-pic"></div>
                        </div>
                    </div>
                    <div className="rit-lc">{baoxianLists}</div>
                    
                </div>
            </div>
        )
    }
}
export default CareHealth
