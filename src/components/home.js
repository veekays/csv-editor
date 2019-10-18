import React, { Component } from 'react';
import CSVReader from 'react-csv-reader'
import Pagination from "react-js-pagination";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            csvData: [],
            activePage: 1
        };
        this.headingData = []
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    handleForce = data => {
        let fileData = data.splice(0, 1);
        if (fileData.length > 0) {
            this.headingData = fileData.reduce((a, b) => {
                return a.concat(b);
            }, []);
        }
        this.setState({
            csvData: data
        })
    };

    handleExport() {
        let dataToExport = [this.headingData, ...this.state.csvData]
        let csvContent = "data:text/csv;charset=utf-8,";
        dataToExport.forEach(function (rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link);
        link.click();
    }

    handleDataChange(rowIndex, colIndex, data) {
        let reportData = this.state.csvData
        reportData[rowIndex][colIndex] = data.target.innerHTML
    }

    handleDelete(index) {
        let data = this.state.csvData
        data.splice(index, 1)
        this.setState({
            csvData: data
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Select CSV file</h1>
                    <CSVReader
                        cssClass="react-csv-input"
                        onFileLoaded={this.handleForce}
                    />

                    {
                        this.headingData.length > 0 &&
                        <button className="btn btn-raised btn-info mb-3 float-right" onClick={this.handleExport.bind(this)}>Export</button>
                    }{
                        this.headingData.length > 0 &&
                        <table className="table table-striped d-block overflow-auto">
                            <thead>
                                <tr>
                                    {
                                        this.headingData.map((item, i) => {
                                            return <th key={i} scope="col">{item}</th>
                                        })
                                    }
                                    <th key="001" scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.csvData.map((res, i) => {
                                        return (
                                            <tr key={i} id={`tableRow${i}`}>
                                                {
                                                    res.map((item, index) => {
                                                        return <td key={index}> <div id={`tableColoum${i}${index}`} suppressContentEditableWarning={true} contentEditable={true} onInput={this.handleDataChange.bind(this, i, index)}>{item}</div></td>
                                                    })
                                                }
                                                {
                                                    res.length > 1 ?
                                                        <td><input type="button" className="btn btn-danger" value={'Delete'} onClick={this.handleDelete.bind(this, i)} /></td> : null

                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    }
                    {/* {
                        this.headingData.length > 0 && */}
                    <div className="pagination-container">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={this.state.csvData.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                  />
                  </div>
                  {/* } */}
                </div>
            </div>

        );
    }
}

export default Home;