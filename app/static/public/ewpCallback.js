var md5 = "";
var pingceList = "";
var cstId = "";
var daifaList = "";
var yunyingceList="";
var lilvList = "";
var baoxianList = "";
var baoxianList1="";
var baoxianList2 = "";
var baoxianList3 = "";
var baoxianList4 = "";
var baoxianMsg = "";
var exchangeRateList = "";
var insurance = "";

//ewp回调h5方法，state自定义事件标志；empData  ewp传送来的参数
function empCallback(state,empData){

    //等于1时，调用返回事件 
    if(state=="1"){
        var firsturl = window.location.href;
        var checkiframe = document.getElementById("h5urlid");
        var allH5Url = "https://www.baidu.com/";
        var checkIframeUrl = checkiframe.contentWindow.window.location;
        if(checkIframeUrl!=undefined || checkIframeUrl!=null || checkIframeUrl!=""){
            if(allH5Url.indexOf(checkIframeUrl)!=-1){
                document.getElementById("h5urlid").style.display="none";
                document.getElementById("appdiv").style.display="";
                window.location.href=firsturl;
            }else{
                history.back();
            }
        }else{
            //爱薪计划首页，返回app
            if(firsturl.indexOf("lovepay")!=-1){
                bjdevice.doEMPFunction("back_to_mobile","","");
            }else if(firsturl.indexOf("carserve")!=-1){//汽车服务首页，返回app
                bjdevice.doEMPFunction("back_to_mobile","",""); 
            }else if(firsturl.indexOf("carehealth")!=-1){//关爱健康首页，返回app
                bjdevice.doEMPFunction("back_to_mobile","","");
            }else if(firsturl.indexOf("overseasfinance")!=-1){//出国金融首页，返回app
                bjdevice.doEMPFunction("back_to_mobile","","");
            }else{
                //不是首页返回上一层
                window.history.go(-1);
            }
        }
        
    }else if(state=="2"){
        //登录返回指定登录地址---还需完善
        window.location.href="http://10.160.2.60:8896/#/carserve";
    }else if(state=="5"){
        //健康测评List返回
        var json_list = JSON.parse(empData.data);
        daifaList = json_list["return"];
        // alert("empCallback"+JSON.stringify(daifaList))
    }else if(state=="7"){
        //健康测评List返回
        var json_list = JSON.parse(empData.data);
        pingceList = json_list["return"];
    }else if(state=="0"){
        //md5加密返回，页面直接用即可
        md5 = empData.data;
    }else if(state=="31"){
        //等会回调，传回客户id
        cstId = empData.data;
    }else if(state=="11"){
        //等会回调，传回客户id
        //健康测评List返回
        var json_list = JSON.parse(empData.data);
        // alert("json_list"+JSON.stringify(json_list))
        lilvList = json_list["return"]["msglist"];
        // alert("empCallback"+JSON.stringify(lilvList))
        
    }else if(state=="8"){
        //等会回调，传回客户id
        //健康测评List返回
        var json_list = JSON.parse(empData.data);
        // alert("健康测评List返回"+JSON.stringify(json_list))
        yunyingceList = json_list["return"];
    }else if(state=="12"){
        //等会回调，传回客户id
        //保险List返回
        var json_list = JSON.parse(empData.data);
        // alert("保险List返回"+JSON.stringify(json_list))
        baoxianMsg = json_list["return"];
        // alert("保险List返回baoxianMsg"+JSON.stringify(baoxianMsg))
        // alert("empData.data"+empData.data);
        // var data = empData.data.replace("\n","");
        // alert("data"+data);
        // var json_lit = JSON.parse(data);
        // alert("(empData.data12"+JSON.stringify(json_list))
        // baoxian_msg = json_lit["return"];
        // baoxianList = json_list["return"]["msglist"];
        // baoxianList1 = json_list["return"]["list1"];
        // baoxianList2 = json_list["return"]["list2"];
        // baoxianList3 = json_list["return"]["list3"];
        // baoxianList4 = json_list["return"]["account"];
    }
    else if(state=="13"){
        //等会回调，传回客户id
        // alert(empData.data)
        var json_list = JSON.parse(empData.data);
        exchangeRateList = json_list["return"]["exchange_msglist"];
        // alert(JSON.stringify(exchangeRateList))
    }
    else if(state=="14"){
        //等会回调，传回客户id
        var json_list = JSON.parse(empData.data);
        // alert("json_list14"+JSON.stringify(json_list))
        insurance = json_list["return"];
        // alert("insurance"+JSON.stringify(insurance))
    }
}
function ceshitz(){
    window.location.href = "https://wxpay.wxutil.com/mch/pay/h5.v2.php"
}
/**
*
* Secure Hash Algorithm (SHA256)
* http://www.webtoolkit.info/
*
* Original code by Angel Marin, Paul Johnston.
*
**/
function SHA256(s){
  var chrsz = 8;
  var hexcase = 0;
  function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
  function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
  function R (X, n) { return ( X >>> n ); }
  function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
  function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
  function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
  function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
  function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
  function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
  function core_sha256 (m, l) {
    var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
    var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >> 9) << 4) + 15] = l;
    for ( var i = 0; i<m.length; i+=16 ) {
      a = HASH[0];
      b = HASH[1];
      c = HASH[2];
      d = HASH[3];
      e = HASH[4];
      f = HASH[5];
      g = HASH[6];
      h = HASH[7];
      for ( var j = 0; j<64; j++) {
        if (j < 16) W[j] = m[j + i];
        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
        T2 = safe_add(Sigma0256(a), Maj(a, b, c));
        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
      }
      HASH[0] = safe_add(a, HASH[0]);
      HASH[1] = safe_add(b, HASH[1]);
      HASH[2] = safe_add(c, HASH[2]);
      HASH[3] = safe_add(d, HASH[3]);
      HASH[4] = safe_add(e, HASH[4]);
      HASH[5] = safe_add(f, HASH[5]);
      HASH[6] = safe_add(g, HASH[6]);
      HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
  }
  function str2binb (str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
    }
    return bin;
  }
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  function binb2hex (binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
      hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8 )) & 0xF);
    }
    return str;
  }
  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}


