import React from "react";

import {
    View,
    Text
} from "react-native";
import {
    ChartDot,
    ChartPath ,
    ChartPathProvider,
    ChartXLabel ,
    ChartYLabel,
    monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";

import moment from "moment";
import {SIZES , COLORS , FONTS} from "../constants";

const Chart = ({containerStyle , chartPrices})=> {
    //points

    let startUnixTimestamp = moment().subtract(7 , 'day').unix()

    let data = chartPrices ? chartPrices?.map((item , index) => {

        return {
            x: startUnixTimestamp + (index + 1) * 3600,
            y: item
        }
        console.log(index)
    }) : []

    // let data = [
    //     {x: 1453075200, y: 1.47}, {x: 1453161600, y: 1.37},
    //     {x: 1453248000, y: 1.53}, {x: 1453334400, y: 1.54},
    //     {x: 1453420800, y: 1.52}, {x: 1453507200, y: 2.03},
    //     {x: 1453593600, y: 2.10}, {x: 1453680000, y: 2.50},
    //     {x: 1453766400, y: 2.30}, {x: 1453852800, y: 2.42},
    //     {x: 1453939200, y: 2.55}, {x: 1454025600, y: 2.41},
    //     {x: 1454112000, y: 2.43}, {x: 1454198400, y: 2.20},
    // ];


    let points = monotoneCubicInterpolation({data , range: 40})

    const formatUSD = value =>{
        'worklet';
        if (value === ''){
            return '';
        }

        return `$${Number(value).toFixed(2)}`
    }

    const formatDateTime = value =>{
        'worklet';
        if (value === ''){
            return '';
        }
        var selectedDate = new Date(value * 1000);

        let date = `0${selectedDate.getDate()}`.slice(-2);
        let month = `0${selectedDate.getMonth() + 1}` .slice(-2);
        return `${date} / ${month}`
    }

    const formatNumber = (value , roundingPoint) => {
        if (value > 1e9){
            return `${(value / 1e9).toFixed(roundingPoint)}B`
        }else if (value > 1e6) {
            return `${(value / 1e6).toFixed(roundingPoint)}M`
        }else if (value > 1e3) {
            return `${(value / 1e3).toFixed(roundingPoint)}K`
        }else {
            return value.toFixed(roundingPoint)
        }
    }

    const getYAxisLabelValues = () => {
        if (chartPrices != undefined)
        {
            let minValue = Math.min(...chartPrices)
            let maxValue = Math.max(...chartPrices)

            let midValue = (minValue + maxValue) / 2

            let higherMidValue = (maxValue + midValue) / 2
            let lowerMidValue = (minValue + midValue) / 2

            let roundingPoint = 2

            return [
                formatNumber(maxValue , roundingPoint),
                formatNumber(higherMidValue , roundingPoint),
                formatNumber(lowerMidValue , roundingPoint),
                formatNumber(minValue , roundingPoint),
            ]
        }else {
            return []
        }
    }
    return(
        <View style={{...containerStyle }}>

            {/*Y Axios Label*/}
            <View
                style={{
                    position : 'absolute',
                    left : SIZES.padding ,
                    top : 0 ,
                    bottom : 0 ,
                    justifyContent : 'space-between',
                }}
            >
                {/*getYAxisLabelValues*/}

                {
                    getYAxisLabelValues().map((item , index) => {
                        return(
                            <Text
                                key={index}
                                style={{
                                    color:COLORS.lightGray3 ,
                                    ...FONTS.body4,
                                }}
                            >
                                {item}
                            </Text>
                        )
                    })
                }


            </View >
            {/*Chart*/}
            {
                data.length > 0 &&
                    <ChartPathProvider
                        data={{ points, smoothingStrategy: 'bezier' }}
                    >
                        <ChartPath
                            height = {150}
                            width = {SIZES.width}
                            stroke = {COLORS.lightGreen}
                            strokeWidth = {2}
                        />

                        <ChartDot

                        >
                            <View
                                style={{
                                    position : 'absolute',
                                    left : -35,
                                    width: 80 ,
                                    alignItems : 'center' ,
                                    backgroundColor : COLORS.transparentBlack,
                                    borderRadius:8
                                }}
                            >
                                {/*Dot*/}
                                <View
                                    style={{
                                        alignItems : 'center',
                                        justifyContent : 'center',
                                        width: 25 ,
                                        height : 25 ,
                                        borderRadius : 15 ,
                                        backgroundColor : COLORS.white ,

                                    }}
                                >
                                    <View style={{
                                        width : 15 ,
                                        height : 15 ,
                                        borderRadius : 10 ,
                                        backgroundColor : COLORS.lightGreen,
                                    }}/>




                                </View>
                                {/*Y-Label*/}
                                <View style={{alignItems:'center'}}>
                                    <ChartYLabel
                                        format={formatUSD}
                                        style={{
                                            color:COLORS.white,
                                            ...FONTS.body5
                                        }}
                                    />
                                </View>
                                <View style={{marginTop : -30}}>
                                    {/*X-Label*/}
                                    <ChartXLabel
                                        format={formatDateTime}
                                        style={{
                                            color:COLORS.lightGray3,
                                            ...FONTS.body5,
                                        }}
                                    />
                                </View>



                            </View>
                        </ChartDot>

                    </ChartPathProvider>
            }

        </View>
    )
}

export default Chart;
