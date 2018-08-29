import React from "react";
import Card from "../../components/business/carehealth/Bjyinhang-lc-card";
import Swiperye from "../../components/business/carehealth/Swiperyangshi";
// import Swiperye from "../../../node_modules/swiper/dist/js/swiper.min.js";
// import '../../../node_modules/swiper/dist/css/swiper.min.css';

import Jsrsasign from "jsrsasign";
import Crypto from "crypto";

import "./lovepay.less";
function format_Money(totIncome) {
  var income = String(totIncome);
  var number = income.indexOf(".");
  var digit_num = ".00";
  if (number > -1) {
    income = totIncome.substring(0, number - 1);
    digit_num = totIncome.substring(number, totIncome.length);
    if (digit_num.length == 2) {
      digit_num = digit_num + "0";
    } else if (digit_num.length == 1) {
      digit_num = digit_num + "00";
    }
  }

  var amtLen = income.length;
  if (amtLen <= 3) {
    income = income + digit_num;
  } else if (amtLen > 3 && amtLen <= 6) {
    income =
      income.substring(0, amtLen - 3) +
      "," +
      income.substring(amtLen - 3, amtLen) +
      digit_num;
  } else if (amtLen > 6 && amtLen <= 9) {
    income =
      income.substring(0, amtLen - 6) +
      "," +
      income.substring(amtLen - 6, amtLen - 4) +
      "," +
      income.substring(amtLen - 3, amtLen) +
      digit_num;
  } else if (amtLen > 9 && amtLen <= 12) {
    income =
      income.substring(0, amtLen - 9) +
      "," +
      income.substring(amtLen - 9, amtLen - 7) +
      "," +
      income.substring(amtLen - 6, amtLen - 4) +
      "," +
      income.substring(amtLen - 3, amtLen) +
      digit_num;
  } else {
    income =
      income.substring(0, amtLen - 12) +
      "," +
      income.substring(amtLen - 12, amtLen - 10) +
      "," +
      income.substring(amtLen - 9, amtLen - 7) +
      "," +
      income.substring(amtLen - 6, amtLen - 4) +
      "," +
      income.substring(amtLen - 3, amtLen) +
      digit_num;
  }
  return income;
}
class Lovepay extends React.Component {
  // static contextTypes = {
  //     history: React.PropTypes.object.isRequired
  // }
  //构造函数
  constructor() {
    super();
    this.state = {
      lilvList: [],
      riskLevelName: [],
      lastBenchmark: [],
      lastBenchmarkdian: [],
      // daifaList:daifaList,
      ceshiff: "1111",
      lunbolist: [],
      imgsrcguding: "",
      imgbaoxian: "", //图片路径
      appAge: "",
      age: "",
      startPrem: ""
    };
  }
  componentWillMount() {
    // var crypto = require('crypto');
    // var fs = require('fs');
    // var sign = crypto.createSign('RSA-SHA256');
    // var privateKey = fs.readFileSync('./ycg.pfx').toString();
    // var s = fs.ReadStream(./file1.txt);
    // sign=sign.update(s)

    //     var signture = sign.sign(privateKey);
    //     console.log(signture);

    bjdevice.doEMPFunction("cxmb1100","5","");//头部轮播图
    setTimeout(() => {
      // alert("daifaList"+JSON.stringify(daifaList))
      // alert("imgUrl"+daifaList["imgUrl"])
      // alert("hot_msglist"+JSON.stringify(daifaList["hot_msglist"]))
      this.setState({
        imgsrcguding: daifaList["imgUrl"],
        lunbolist: daifaList["hot_msglist"]
      });
    }, 500);
    bjdevice.doEMPFunction("lilv","11","");
    setTimeout(() => {
      // alert("lilvList"+JSON.stringify(lilvList))
      // alert("riskLevelName"+JSON.stringify(lilvList[0]["riskLevelName"]))
      // alert("lastBenchmark"+JSON.stringify(lilvList[0]["lastBenchmark"]))
      var riskLevelName = lilvList[0]["riskLevelName"];
      var lastBenchmark = lilvList[0]["lastBenchmark"];
      var a = lastBenchmark.indexOf(".");
      var b = lastBenchmark.substring(0, a);
      var c = lastBenchmark.substring(a, lastBenchmark.length);
      // if(b != "" && b != undefined){
      this.setState({
        lilvList: lilvList,
        riskLevelName: riskLevelName,
        lastBenchmark: b,
        lastBenchmarkdian: c
        // daifaList : daifaList
      });
      // }else{
      //     this.setState({
      //         lilvList : lilvList,
      //         riskLevelName : riskLevelName,
      //         lastBenchmark : c,
      //         lastBenchmarkdian : ""
      //         // daifaList : daifaList
      //     });
      // }
    }, 500);
    //bjdevice.doEMPFunction("cxbxis0011","14","");//保险信息
    setTimeout(() => {
      // alert("insurance"+JSON.stringify(insurance))
      // alert("imgUrl"+JSON.stringify(insurance["imgUrl"]))
      // alert("list"+JSON.stringify(insurance["list"]))
      // alert("list1"+JSON.stringify(insurance["list1"]))
      // alert("list2"+JSON.stringify(insurance["list2"]))
      // alert("account"+JSON.stringify(insurance["account"]))
      var zongbaoxianlists = [];
      var imgUrl_baoxian = insurance["imgUrl"];
      // alert(imgUrl_baoxian)
      var baoxianlist = insurance["list"]; //产品列表
      var baoxianlist1 = insurance["list1"];
      var baoxianlist2 = insurance["list2"]; //保险期间选项
      var baoxianlist4 = insurance["account"]; //产品特点
      //alert("baoxianlist4"+JSON.stringify(baoxianlist4))
      for (var i = 0; i < baoxianlist.length; i++) {
        //用第一组list作参照
        // alert(baoxianlist1.length)
        // alert(baoxianlist[i].CodeProductBusi)
        var zongbaoxianlisttip = {};
        // var aa="";
        var bb = "";
        var productFeature = "";
        var logCompany = "";
        var PicName = "";
        var uploadFilePic = "";
        var dd = "";
        //list2 "保险期间->保障期限" 选项列表
        for (var j = 0; j < baoxianlist2.length; j++) {
          //循环第二组找到对应的值
          if (
            baoxianlist[i].CodeProductBusi == baoxianlist2[j].CodeProductBusi
          ) {
            // alert(baoxianlist[i].CodeProductBusi)
            if (baoxianlist2[j].ParamsName == undefined) {
              //找不到值的时候置为空
              bb = "";
            } else {
              bb = baoxianlist2[j].ParamsName; //保险期限
            }
          }
        }

        //list3 手机银行/公司log和产品特点MB3061
        for (var x = 0; x < baoxianlist4.length; x++) {
          //循环第三组找到对应的值
          if (
            baoxianlist[i].CodeProductBusi == baoxianlist4[x].CodeProductBusi
          ) {
            // alert(baoxianlist[i].CodeProductBusi)
            // alert(baoxianlist4[x].uploadFilePic)
            if (baoxianlist4[x].ProductFeature == undefined) {
              productFeature = "";
            } else {
              productFeature = baoxianlist4[x].ProductFeature; //产品特点
            }
            if (baoxianlist4[x].LogCompany == undefined) {
              logCompany = "";
            } else {
              logCompany = baoxianlist4[x].logCompany; //产品特点
            }
            if (baoxianlist4[x].PicName == undefined) {
              PicName = "";
            } else {
              PicName = baoxianlist4[x].PicName; //产品特点
            }
            if (baoxianlist4[x].uploadFilePic == undefined) {
              uploadFilePic = "";
            } else {
              uploadFilePic = baoxianlist4[x].uploadFilePic; //产品特点
            }
          }
        }
        // alert(baoxianlist[i].NameProduct)
        zongbaoxianlisttip.name = baoxianlist[i].NameProduct; //保险名字
        zongbaoxianlisttip.appAge = baoxianlist[i].AppAge; //投保年龄
        zongbaoxianlisttip.startPrem = format_Money(baoxianlist[i].StartPrem); //投保金额
        zongbaoxianlisttip.age = bb; //保障年限
        zongbaoxianlisttip.productFeature = productFeature; ////产品特点
        zongbaoxianlisttip.logCompany = logCompany; //公司log图片名
        zongbaoxianlisttip.PicName = PicName; //公司log图片名
        zongbaoxianlisttip.imgUrl = imgUrl_baoxian + "/" + uploadFilePic; //4.0保险图片路径
        //alert(imgUrl_baoxian +".."+ uploadFilePic)
        zongbaoxianlists.push(zongbaoxianlisttip); //赋值
      }
      //alert("zongbaoxianlists"+JSON.stringify(zongbaoxianlists))

      this.setState({
        imgbaoxian: zongbaoxianlists[0]["imgUrl"], //图片路径
        appAge: zongbaoxianlists[0]["appAge"],
        age: zongbaoxianlists[0]["age"],
        startPrem: zongbaoxianlists[0]["startPrem"]
      });
      //alert("imgbaoxian"+this.state.imgbaoxian)
    }, 500);
  }
  gotoEwpPage = jyType => {
    bjdevice.doEMPFunction(jyType, "", "");
  };
  gotoWHPage = jyType => {
    // bjdevice.doEMPFunction(jyType,"","");
    // setTimeout(() => {
    //     var sign =`   lm, md5.substring(8,24);
    // }, 300);
    if (jyType === "chunyu2") {
      ceshitz();
      //window.location.href="http://m.p-ubit.com/Application/MobileCustom/siteindex.html?vers=1.0&wechat_id=o2MrGjuOrLVeEX3I64T_smod_KBM";
      //window.location.href = "https://www.baidu.com";
    }
    if (jyType === "qiche") {
      //window.location.href = "http://wxpay.wxutil.com/mch/pay/h5.v2.php"
      window.location.href = "http://219.237.75.67:8896/#/carserve";
    }
  };
  render() {
    return (
      <div className="rit-dfgz">
        <Swiperye
          lunbolist={this.state.lunbolist}
          imgsrcguding={this.state.imgsrcguding}
        />
        <div className="rit-circular-menu-hight" />
        <div className="rit-circular-menu-box">
          <div
            className="rit-circular-menu"
            onClick={this.gotoEwpPage.bind(this, "gongzichaxun")}
          >
            <div className="rit-circular-gongzi" />
            <div className="rit-circular-title">工资查询</div>
            <div className="rit-circular-ms">秒查工资明细</div>
          </div>
          <div
            className="rit-circular-menu"
            onClick={this.gotoEwpPage.bind(this, "yibaofuwu")}
          >
            <div className="rit-circular-yibao" />
            <div className="rit-circular-title">医保服务</div>
            <div className="rit-circular-ms">到账转入工资卡</div>
          </div>
          <div
            className="rit-circular-menu"
            onClick={this.gotoEwpPage.bind(this, "lingqulipin")}
          >
            <div className="rit-circular-lipin" />
            <div className="rit-circular-title">领取礼品</div>
            <div className="rit-circular-ms">我的专属好礼</div>
          </div>
        </div>
        <div className="rit-lc">
          <div className="rit-lc-box">
            <div className="rit-lc-titile">
              <div className="rit-lc-titile-left">薪升值</div>
              <div className="rit-lc-titile-right">为工资增值</div>
            </div>
          </div>
        </div>
        <div
          className="bj-card-list"
          onClick={this.gotoEwpPage.bind(this, "licaigoumai")}
        >
          {/*.rit-li-card-buttom-cp-left-bafenb  百分比的样式*/}
          <Card
            title={"远见薪满益足DTG01170302"}
            data={this.state.riskLevelName}
            lastBenchmark={this.state.lastBenchmark}
            lastBenchmarkdian={this.state.lastBenchmarkdian}
          />
        </div>
        <div className="ryt-higth" />
        <div className="ryt-jxb-dhy">
          <div
            className="ryt-jxb-dhy-left"
            onClick={this.gotoEwpPage.bind(this, "jingxibao")}
          >
            <div className="ryt-jxb-dhy-left-bf-jingxibao" />
            <div className="ryt-jxb-dhy-left-bf-tex">
              <div className="ryt-jxb-dhy-left-title">京喜宝</div>
              <div className="ryt-jxb-dhy-left-miaosu">1分起购，快速赎回</div>
            </div>
          </div>
          <div className="ryt-jxb-dhy-boder" />
          <div
            className="ryt-jxb-dhy-left"
            onClick={this.gotoEwpPage.bind(this, "dinghuiying")}
          >
            <div className="ryt-jxb-dhy-left-bf-dinghuiying" />
            <div className="ryt-jxb-dhy-left-bf-tex">
              <div className="ryt-jxb-dhy-left-title">定惠盈</div>
              <div className="ryt-jxb-dhy-left-miaosu">智能储蓄，定活两便</div>
            </div>
          </div>
        </div>
        <div className="rit-lc">
          <div className="rit-lc-box">
            <div className="rit-lc-titile">
              <div className="rit-lc-titile-left">薪助力</div>
              <div className="rit-lc-titile-right">一键申请贷款</div>
            </div>
          </div>
        </div>
        <div
          className="bj-card-list"
          onClick={this.gotoEwpPage.bind(this, "xiaofeidai")}
        >
          <Card fages="1" title={"消费贷（装修、休闲、旅游、教育、买车…）"} />
        </div>
        <div className="ryt-higth" />

        <div className="rit-lc">
          <div className="rit-lc-box">
            <div className="rit-lc-titile">
              <div className="rit-lc-titile-left">薪保障</div>
              <div className="rit-lc-titile-right">为您贴心保障</div>
            </div>
          </div>
          <div
            className="rit-lc-xbz-card img"
            onClick={this.gotoEwpPage.bind(this, "xinbaozhang")}
          >
            <div className="rit-lc-xbz-card-bg">
              <img
                className="ryt-jiankuang-baoxian-imgss"
                src={this.state.imgbaoxian}
              />
            </div>
            <div className="rit-lc-xbz-card-list">
              <div className="rit-lc-xbz-card-list-li">
                <div className="rit-lc-xbz-card-list-li-top">
                  {this.state.startPrem}元
                </div>
                <div className="rit-lc-xbz-card-list-li-buttom">
                  最低投保保额
                </div>
              </div>
              <div className="rit-lc-xbz-card-list-li">
                <div className="rit-lc-xbz-card-list-li-top-black">
                  {this.state.appAge}
                </div>
                <div className="rit-lc-xbz-card-list-li-buttom">投保年龄</div>
              </div>
              <div
                className="rit-lc-xbz-card-list-li"
                style={{ borderRight: "none" }}
              >
                <div className="rit-lc-xbz-card-list-li-top-black">
                  {this.state.age}
                </div>
                <div className="rit-lc-xbz-card-list-li-buttom">投保期限</div>
              </div>
            </div>
          </div>
        </div>
        <div className="ryt-higth" />
        <div className="rit-lc">
          <div className="rit-lc-box">
            <div className="rit-lc-titile">
              <div className="rit-lc-titile-left">薪免费</div>
              <div className="rit-lc-titile-right">爱薪卡专享</div>
            </div>
            <div className="rit-lc-titile-aixinka">
              <div className="rit-lc-titile-aixinka-box">
                <div className="rit-lc-titile-aixinka-box-left">
                  <div className="rit-lc-titile-aixinka-box-left-text">
                    免收年费、挂失换卡工本费
                  </div>
                  <div className="rit-lc-titile-aixinka-box-left-text">
                    免收同城、异地跨行取款手续费各两次/月
                  </div>
                </div>
                <div className="rit-lc-titile-aixinka-box-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="rit-lc">
          <div className="rit-lc-box">
            <div className="rit-lc-titile">
              <div className="rit-lc-titile-left">薪安全</div>
            </div>
          </div>
          <div className="xanquan">
            <div className="xanquan-box">
              <div
                className="xanquan-box-left"
                onClick={this.gotoEwpPage.bind(this, "duanxintianshi")}
              >
                <div className="xanquan-box-left-bg left" />
                <div className="xanquan-box-left-text">
                  <div className="xanquan-box-left-text-title">短信天使</div>
                  <div className="xanquan-box-left-text-tixing">
                    工资到账 免费提醒
                  </div>
                </div>
              </div>
              <div
                className="xanquan-box-left"
                onClick={this.gotoEwpPage.bind(this, "atmpos")}
              >
                <div className="xanquan-box-left-bg right" />
                <div className="xanquan-box-left-text">
                  <div className="xanquan-box-left-text-title">ATM/POS管理</div>
                  <div className="xanquan-box-left-text-tixing">
                    取钱消费 限额设置
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Lovepay;
