import React from 'react'
import './formpage.less'
function getRequest(){
        var url = location.href;
        var theRequest = new Object();
        if(url.indexOf("?") !== -1){
          var paramStr = url.split("?")[1];
          //paramStr = decodeURIComponent(paramStr.split("=")[1]);
          // alert(paramStr);
          var paramList = paramStr.split("&");
          //var params = {};
          for(var i = 0; i < paramList.length; i++){
            var param = paramList[i].split("=");
            theRequest[param[0]] = unescape(param[1]);
          }
        }
        return theRequest;
    }   
class Formpage extends React.Component {
    static contextTypes = {
        history: React.PropTypes.object.isRequired
    }
    constructor() {
        super();
        this.state = {
            // tableList : [],
           
        }
    }
    //初始化
    componentDidMount(){
        document.getElementById("formId").submit();
    }
    
    componentWillMount(){
       
    }
    render() {
        var me = this;
        var Req = new Object();
        Req = getRequest();
        var data = Req["data"];
        //data.signCertId = Req["signCertId"];
        //data.language = Req["language"];
        //data.insCode = Req["insCode"];
        //data.idType = Req["idType"];
        //data.idNum = Req["idNum"];
        //var dataJson =JSON.stringify(data);
        //alert(dataJson)
        alert("signature:"+Req["signature"]);
        var signature = encodeURI(Req["signature"]);
        alert("signature:"+signature);
        alert("data:"+data);
        return (
            <div className="formbg-item">
                <form action="https://marketing-test.unionpayintl.com/gmpapp/validate.do" method = "post" id="formId">
                    <input type="hidden" id="signature" value={signature} name="signature"/>
                    <input type="hidden" id="data" value={data} name="data"/>
                </form>
            </div>
        )
       
    }
}
export default Formpage
