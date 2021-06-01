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
    }) : []
    let points = monotoneCubicInterpolation({data , range: 40})
    return(
        <View style={{...containerStyle}}>
            {/*Chart*/}
            {
                data.length > 0 &&
                    <ChartPathProvider
                        data={{
                            points ,
                            smoothingStrategy : 'bezier'
                        }}
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
                                    backgroundColor : COLORS.transparentBlack
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
                                    }}>


                                    </View>

                                </View>
                            </View>
                        </ChartDot>

                    </ChartPathProvider>
            }

        </View>
    )
}

export default Chart;