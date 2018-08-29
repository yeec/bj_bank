import React, { Component, PropTypes } from "react";

import $ from "jquery";
import Swiper from "./swiper/swiper.min.js";
import "./swiperyangshi.less";
import "./swiper/swiper.min.css";

class Swiperyangshi extends React.Component {
  // static contextTypes = {
  //     history: React.PropTypes.object.isRequired
  // }
  constructor(props) {
    super(props);
    this.state = {
      lunbolist: this.props.lunbolist,
      imgsrcguding: this.props.imgsrcguding
    };
  }

  componentDidMount() {
    // alert("swiper")
    var me = this;
    setTimeout(() => {
      var mySwiper = new Swiper(".swiper-container", {
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        pagination: ".swiper-pagination",
        // paginationHide:true,
        paginationClickable: true,
        // paginationElement:"li",
        observer: true,
        loop: true,
        onClick: function(swiper, e) {
          // alert("swiper.activeIndex"+swiper.activeIndex)//0--3 4---1    3
          var swiperlunbolist = me.props.lunbolist;
          // alert("swiper.length"+swiperlunbolist.length)
          var url = "";
          var paramMap = {};
          if (swiperlunbolist.length > 1) {
            if (swiper.activeIndex == 0) {
              var itemString = JSON.stringify(
                swiperlunbolist[swiperlunbolist.length - 1]
              ).replace(/\"/g, "'");
              bjdevice.doEMPFunction("lunboClick", "", itemString);
              // if (swiperlunbolist[swiperlunbolist.length - 1].DTFlag != "1") {
              //     url = swiperlunbolist[swiperlunbolist.length - 1].DTButtonURL;
              //     paramMap["salesProduct"] = swiperlunbolist[swiperlunbolist.length - 1].salesProduct;
              //     paramMap["codeSearch"] = swiperlunbolist[swiperlunbolist.length - 1].codeSearch;
              //     paramMap["nameSearch"] = swiperlunbolist[swiperlunbolist.length - 1].nameSearch;
              //     paramMap["url"] = swiperlunbolist[swiperlunbolist.length - 1].DTButtonURL;
              // }else{
              //     url = swiperlunbolist[swiperlunbolist.length - 1].htmlUrl;
              // }
              // if(url == "" || url == undefined ){
              //     return;
              // }
              // var flag = swiperlunbolist[swiperlunbolist.length - 1].DTFlag;
              // if (flag != "1"){
              //     var paramStr = JSON.stringify(paramMap).replace(/\"/g,"'");
              //     bjdevice.doEMPFunction("lunboClick","",paramStr);
              // }else{
              //     window.location.href = url;
              // }
            } else if (swiper.activeIndex == swiperlunbolist.length + 1) {
              var itemString = JSON.stringify(swiperlunbolist[0]).replace(
                /\"/g,
                "'"
              );
              bjdevice.doEMPFunction("lunboClick", "", itemString);
              // if (swiperlunbolist[0].DTFlag != "1") {
              //     url = swiperlunbolist[0].DTButtonURL;
              //     paramMap["salesProduct"] = swiperlunbolist[0].salesProduct;
              //     paramMap["codeSearch"] = swiperlunbolist[0].codeSearch;
              //     paramMap["nameSearch"] = swiperlunbolist[0].nameSearch;
              //     paramMap["url"] = swiperlunbolist[0].DTButtonURL;
              // }else{
              //     url = swiperlunbolist[0].htmlUrl;
              // }
              // if(url == "" || url == undefined ){
              //     return;
              // }
              // var flag = swiperlunbolist[0].DTFlag;
              // if (flag != "1"){
              //     var paramStr = JSON.stringify(paramMap).replace(/\"/g,"'");
              //     bjdevice.doEMPFunction("lunboClick","",paramStr);
              // }else{
              //     window.location.href = url;
              // }
            }
          }
        }
        // loopAdditionalSlides:0,
        // observerParents:true,
      });
    }, 500);

    // if(mySwiper.slides.length <= 1){//只有一个锁住
    //     mySwiper.lockSwiper();
    // }
  }
  onClick(item) {
    // alert(srcUrl)
    // if(srcUrl == "" || srcUrl == undefined ){
    //     return;
    // }
    // if (flag != "1"){
    //     var paramStr = JSON.stringify(paramMap).replace(/\"/g,"'");
    //     bjdevice.doEMPFunction("lunboClick","",paramStr);
    // }else{
    //     window.location.href = srcUrl;
    // }
    var itemString = JSON.stringify(item).replace(/\"/g, "'");
    bjdevice.doEMPFunction("lunboClick", "", itemString);
  }
  render() {
    var me = this;
    var swiperlunbo;
    var swiperlunbolist = me.props.lunbolist;
    // alert(JSON.stringify(swiperlunbolist))
    // alert(swiperlunbolist.length)
    console.log(me.props.lunbolist);
    swiperlunbo = swiperlunbolist.map(function(item, key) {
      // alert(JSON.stringify(item));
      // alert(JSON.stringify(item.htmlUrl));  //src={me.state.imgsrcguding + "/" + item.imgUrl}
      // alert(me.state.imgsrcguding + "/" + item.HPImage)
      if (swiperlunbolist.length <= 1) {
        $(".swiper-pagination").css({ display: "none" });
      } else {
        $(".swiper-pagination").css({ display: "block" });
      }
      var url = "";
      var flag = item.DTFlag;
      var paramMap = {};
      if (item.DTFlag != "1") {
        url = item.DTButtonURL;
        paramMap["salesProduct"] = item.salesProduct;
        paramMap["codeSearch"] = item.codeSearch;
        paramMap["nameSearch"] = item.nameSearch;
        paramMap["url"] = item.DTButtonURL;
      } else {
        url = item.htmlUrl;
      }
      // .swiper-pagination
      return (
        <div
          key={key}
          className="swiper-slide"
          onClick={me.onClick.bind(me, item)}
        >
          <img
            className="img-lunbo"
            src={me.props.imgsrcguding + "/" + item.HPImage}
          />
        </div>
      );
    });
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">{swiperlunbo}</div>
        <div className="swiper-pagination" />
      </div>
    );
  }
}

// Swiperyangshi.propTypes = {
//     lunbolist : PropTypes.array,
//     imgsrcguding : PropTypes.string,
// };

// Swiperyangshi.defaultProps = {
//     lunbolist : [],
//     imgsrcguding : ""
// };

// Swiperyangshi.displayName = 'Swiperyangshi';

export default Swiperyangshi;
