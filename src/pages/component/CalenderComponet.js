/**
 * 日历组件
 */
import React, { Component } from 'react';
import{
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions
}  from 'react-native';

import moment from 'moment';
import lodash from 'lodash';
import PropTypes from 'prop-types';


const width=Dimensions.get('window').width
const height=Dimensions.get('window').height

class Index extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            tmpDataSources:[],
            myMonth:moment(new Date()).format('YYYY年MM月'),
        }
    }

    render() {
        return(
            <View style={{paddingHorizontal:width*0.05,backgroundColor:this.props.bgColor?this.props.bgColor:"#rgba(155, 100, 200, 0.5)",paddingBottom:10}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingVertical:10}}>
                    <View style={{width:width*0.5,height:50,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:16,color:this.props.dayColor?this.props.dayColor:"#fff"}}>{this.state.myMonth}</Text>
                    </View>
                    <TouchableOpacity onPress={this.left} style={styles.leftIcon}>
                        <Text style={{color:this.props.dayColor?this.props.dayColor:"#fff",fontSize:16}}>&#60;&#60;</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.right} style={styles.rightIcon}>
                        <Text style={{color:this.props.dayColor?this.props.dayColor:"#fff",fontSize:16}}>&#62;&#62;</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',paddingBottom:10}}>
                    <Text style={[styles.line,{color:this.props.headTextColor}]}>一</Text>
                    <Text style={[styles.line,{color:this.props.headTextColor}]}>二</Text>
                    <Text style={[styles.line,{color:this.props.headTextColor}]}>三</Text>
                    <Text style={[styles.line,{color:this.props.headTextColor}]}>四</Text>
                    <Text style={[styles.line,{color:this.props.headTextColor}]}>五</Text>
                    <Text style={[styles.line,{color:this.props.headTextColor}]}>六</Text>
                    <Text style={[styles.line,{color:this.props.headTextColor}]}>日</Text>
                </View>
                <View style={{color:this.props.bgColor}}>
                    <ListView  dataSource={this.state.dataSource}
                               pageSize={7}
                               contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',width:width}}
                               renderRow={(rowData,sectionId,rowId) =>
                                   <View style={styles.row}>
                                       {
                                           rowData.isSelected?
                                           <TouchableOpacity
                                               onPress={()=>this.myClickDate(rowId)}
                                               style={[styles.littleRow,{backgroundColor:this.props.activeBgColor}]}>
                                               <Text style={{color:this.props.activeTextColor}}>{rowData.id}</Text>
                                           </TouchableOpacity>
                                               :
                                           <TouchableOpacity
                                               onPress={()=>this.myClickDate(rowId)}
                                               style={[styles.littleRow]}>
                                               <Text style={{color:this.props.textColor}}>{rowData.id}</Text>
                                           </TouchableOpacity>
                                       }
                                   </View>
                               }
                    />
                </View>
            </View>
        )
    }
    componentDidMount(){
        this.monthDay(moment(new Date()).format('YYYY-MM-DD'))
    }
    monthDay=(date)=> {
        var daysArr =[];
        var currentWeekday = moment(date).date(1).weekday(); // 获取当月1日为星期几
        var currentMonthDays = moment(date).daysInMonth(); // 获取当月天数
        if(currentWeekday==0){ //如果是0的话就是周日
            currentWeekday=7;
        }
        for(var i=1;i<currentWeekday;i++){
            daysArr.push({id:''})
        }
        var YYMM=moment(date,'YYYY-MM-DD').format('YYYYMM')
        var nowDate=moment(new Date()).format('YYYYMMDD');
        for(var i=1;i<=currentMonthDays;i++){
            var myDate=moment(YYMM+i,'YYYYMMD').format('YYYYMMDD')
            console.log(moment(nowDate).diff(myDate,'days')==0,moment(new Date).date())
            if(moment(new Date).date()===moment(myDate,'YYYYMMDD').date()){
                daysArr.push({id:i,isSelected:true})
            }else{
                daysArr.push({id:i})
            }
        }
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(daysArr),
            tmpDataSources:daysArr
        })
    }
    left=()=>{
        this.setState({
            myMonth: moment(this.state.myMonth, 'YYYY年MM月').subtract('month', 1).format('YYYY年MM月')
        })
        this.monthDay(moment(this.state.myMonth,'YYYY年MM月').subtract('month',1).format('YYYY-MM-DD'))
    }
    right=()=>{
        this.setState({
            myMonth: moment(this.state.myMonth, 'YYYY年MM月').add('month', 1).format('YYYY年MM月')
        })
        this.monthDay(moment(this.state.myMonth,'YYYY年MM月').add('month',1).format('YYYY-MM-DD'))
    }
    myClickDate=(index)=>{
        let {tmpDataSources}=this.state;
        tmpDataSources.forEach((item)=>{
            item.isSelected=false;
        })
        tmpDataSources[index].isSelected=true;
        tmpDataSources[index].myMonth=this.state.myMonth;
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(lodash.cloneDeep(tmpDataSources)),
            tmpDataSources
        })
        console.log(tmpDataSources,moment(new Date()).day())
        // alert(JSON.stringify(this.state))
        this.props.callback(tmpDataSources[index]);


    }

}
const styles = StyleSheet.create({
    line:{
        flex:1,
        textAlign:'center',
        color:'#rgba(155, 100, 200, 0.5)'
    },
    row:{
        width:width*0.9/7,
        height:width*0.9/7,
        alignItems:'center',
        justifyContent:'center',
    },
    littleRow:{
        width:width*0.1,
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:width*0.2,

    },
    leftIcon:{
        backgroundColor:'#rgba(155,155,200,0.5)',
        // borderWidth:1,
        borderRightColor:'#rgba(155, 100, 200, 0)',
        borderRightWidth:1,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,
        justifyContent:'center',
        alignContent:'center',
        height:30,
        width:width*0.15,
        alignItems:'center',justifyContent:'center',
    },
    rightIcon:{
        backgroundColor:'#rgba(155,155,200,0.5)',
        
        // borderWidth:1,
        // borderColor:'#FFFFFF',
        borderTopRightRadius:15,
        borderBottomRightRadius:15,
        justifyContent:'center',
        alignContent:'center',
        height:30,
        width:width*0.15,
        alignItems:'center',justifyContent:'center',
    }
})
Index.defaultProps={
    bgColor:'#rgba(155, 100, 200, 0.5)',
    headTextColor:'#fffcf7',
    textColor:'#fff',
    activeBgColor:'#fff',
    activeTextColor:'#ff6060'
}
Index.PropTypes={
    bgColor:PropTypes.string.isRequired,
    headTextColor:PropTypes.string.isRequired,
    textColor:PropTypes.string.isRequired,
    activeBgColor:PropTypes.string.isRequired,
    callback:PropTypes.func.isRequired
}

export default Index