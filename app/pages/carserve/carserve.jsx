import React from 'react'
import './carserve.less'
import MenuCard from '../../components/business/carehealth/Bjyinhang-menu-card'
import Button from "components/base/button";
import List from '../../components/business/carehealth/Bjyinhang-menu-card-list'

class Carserve extends React.Component {
    // static contextTypes = {
    //     history: React.PropTypes.object.isRequired
    // }
    constructor() {
        super();
        this.state = {
            // tableList : [],
            holderboxStyle : { display: 'block' },
            holderboxStyles : { display: 'block' },
            headerneirong : ""
        }
    }
    //初始化
    componentDidMount(){
        // var tableList = [
        // {
        //     text:"加油站查询",
        //     texturl:"https://testopen.chediandian.com/bjbank/gas-station-list"
        // },{
        //     text:"停车场查询",
        //     texturl:"https://open.chediandian.com/bjbank/gas-station-list"
        // },{
        //     text:"4S店查询",
        //     texturl:"https://open.chediandian.com/bjbank/fours-list"
        // }]
        // this.setState({
        //     tableList : tableList
        // });
    }
    gotoWHPage = jyType => {
        var service = "";
        var ewpType = "";
        //洗车服务
        if(jyType === "qichefuwu"){
            service = "https://open.chediandian.com/member/login?ApiKey=b9cbf6a267d1ddad23d366a239fdd600&ApiSt=1530752867&ApiSign=6d85032115e5b35984d3c26ca8eaf287&ReturnUrl=http%3A%2F%2Ft.cn%2FRdyuJpJ&openid=";
            ewpType = "beidongdenglu";
        }
        //汽车保险
        if(jyType === "qichebaoxian"){
            var service = "https://open.chediandian.com/member/login?ApiKey=b9cbf6a267d1ddad23d366a239fdd600&ApiSt=1530752867&ApiSign=6d85032115e5b35984d3c26ca8eaf287&ReturnUrl=http%3A%2F%2Fins.chediandian.com%2Fhome%2Fh5ul%2F%3Frefcode%3Dbjbank&openid=";
            ewpType = "beidongdenglu";
        }
        //汽车贷款
        if(jyType === "qichedaikuan"){
            ewpType = "qichedaikuan";
            service = "";
        }
        //美容养护
        if(jyType === "meirongyanghu"){
            service = "https://open.chediandian.com/member/login?ApiKey=b9cbf6a267d1ddad23d366a239fdd600&ApiSt=1530752867&ApiSign=6d85032115e5b35984d3c26ca8eaf287&ReturnUrl=http%3A%2F%2Ft.cn%2FRDEJ0zz&openid=";
            ewpType = "beidongdenglu";
        }
        //到店保养
        if(jyType === "daodianbaoyang"){
            service = "https://open.chediandian.com/member/login?ApiKey=b9cbf6a267d1ddad23d366a239fdd600&ApiSt=1530752867&ApiSign=6d85032115e5b35984d3c26ca8eaf287&ReturnUrl=http%3A%2F%2Ft.cn%2FRdy3Pcw&openid=";
            ewpType = "beidongdenglu";
        }
        //道路救援
        if(jyType === "daolujiuyuan"){
            service = "https://open.chediandian.com/member/login?ApiKey=b9cbf6a267d1ddad23d366a239fdd600&ApiSt=1530752867&ApiSign=6d85032115e5b35984d3c26ca8eaf287&ReturnUrl=http%3A%2F%2Ft.cn%2FRdymjqW&openid=";
            ewpType = "beidongdenglu";
        }
        //违章查询
        if(jyType === "weizhangchaxun"){
            service = "https://open.chediandian.com/member/login?ApiKey=b9cbf6a267d1ddad23d366a239fdd600&ApiSt=1530752867&ApiSign=6d85032115e5b35984d3c26ca8eaf287&ReturnUrl=http%3A%2F%2Fopen.chediandian.com%2FTrafficViolation%2FIndex&openid=";
            ewpType = "beidongdenglu";
        }
        //加油卡充值--ewp
        if(jyType === "jiayoukachongzhi"){
            ewpType = "jiayoukachongzhi";
            service = "";
        }
        //加油站查询--ewp
        if(jyType === "jiayouzhan"){
            ewpType = "no_login";
            service = "https://open.chediandian.com/bjbank/gas-station-list";
        }
        //4s店查询--ewp
        if(jyType === "4sdian"){
            ewpType = "no_login";
            service = "https://open.chediandian.com/bjbank/fours-list";
        }
        //停车场查询--ewp
        if(jyType === "tingchechang"){
            ewpType = "no_login";
            service = "https://open.chediandian.com/bjbank/parking-list";
        }
        bjdevice.doEMPFunction(ewpType,jyType,service);
    }

    render() {
        var me = this;
        // var tableLists;
        // tableLists = me.state.tableList.map(function(item,key){
        //     console.log(item);
        //     return<CarServebtList key={key} clickhandle={me.onClick.bind(me,item.texturl)} texturl={item.texturl} text={item.text}/>
        // })
        return (
            <div>
                <div className="rit-qichefuwu">
                    <div className="rit-qichefuwu-banner qiche"></div>
                    <div className="rit-qichefuwu-box">
                        <MenuCard fage="1"  click1={this.gotoWHPage.bind(this,"qichefuwu")} 
                         click2={this.gotoWHPage.bind(this,"qichebaoxian")} 
                         click3={this.gotoWHPage.bind(this,"qichedaikuan")} 
                         click4={this.gotoWHPage.bind(this,"meirongyanghu")} 
                         click5={this.gotoWHPage.bind(this,"daodianbaoyang")} 
                         click6={this.gotoWHPage.bind(this,"daolujiuyuan")} />
                    </div>
                    <div className="rit-qichefuwu-button">
                        <div className="rit-qichefuwu-button-box">
                            <Button type="primary">违章查询</Button>
                            {/* <Button title="违章查询" classs="blue" clickhandle={this.gotoWHPage.bind(this,"weizhangchaxun")}/> */}
                            <div className="rit-qichefuwu-button-box-mging"></div>
                            <Button title="加油卡充值" classs="white" clickhandle={this.gotoWHPage.bind(this,"jiayoukachongzhi")}/>
                        </div>
                    </div>
                    {/*<CarServebt>{tableLists}</CarServebt> */}
                     <div className="rit-qichefuwu-list"> 
                        <List onClicks={this.gotoWHPage.bind(this,"jiayouzhan")} text="加油站查询"/>
                        <List onClicks={this.gotoWHPage.bind(this,"tingchechang")} text="停车场查询"/>
                        <List onClicks={this.gotoWHPage.bind(this,"4sdian")} text="4S店查询"/> 
                     </div>
                </div>
            </div>
            
        )
    }
}
export default Carserve
