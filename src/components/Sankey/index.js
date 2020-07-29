import React, { Component } from 'react'
import SankeyChart from './SankeyChart.js'
import ReactDOM from "react-dom";
import * as d3 from "d3";
import plotData from './plotdata'

export class SankeyMain extends Component {
    state = { data: plotData, width: 0, height: 0 };
    svgRef = React.createRef();
    componentDidMount() {
        // d3.json("/data.json").then(data =>
        //     this.setState({ data })
        // );
        this.measureSVG();
        window.addEventListener("resize", this.measureSVG);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.measureSVG);
    }

    measureSVG = () => {
        const { width, height } = this.svgRef.current.getBoundingClientRect();

        this.setState({
            width,
            height
        });
    };

    render() {
        const {
            data,
            width,
            height
        } = this.state;
        console.log("sankey", data);
        return (
            <>
                <svg width="100%" height="500" ref={this.svgRef} style={{ backgroundColor: 'white' }}>
                    {data && (
                        <SankeyChart data={data} width={width} height={height} />
                    )}
                </svg>
            </>
        )
    }
}

export default SankeyMain;
