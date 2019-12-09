import Axios from 'axios';
import React, {Component} from 'react';
import {
    Box,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@material-ui/core';
import SectionTitle from '../common/SectionTitle';
import Spacer from '../common/Spacer';
import Title from '../common/Title';
import {
    formatTimestamp,
    formatReportSummary
} from "../../functions/formatting";

class Reports extends Component {

    state = {
        reports: []
    }

    constructor(props) {
        super(props);
        this.setReports();
    }

    setReports = () => {
        Axios
            .get("/reports/search")
            .then(response => {
                this.setState({reports: response.data});
            })
    }

    getReports = () => {
        return (
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Configuration</TableCell>
                    <TableCell align="left">Generated at</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="right">View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.reports.map((report, index) => (
                        <TableRow key={report._id}>
                            <TableCell>
                                {report.configurationId}
                            </TableCell>

                            <TableCell>
                                {formatTimestamp(report.generatedAt)}
                            </TableCell>

                            <TableCell>
                                {formatReportSummary(report.summary)}
                            </TableCell>

                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    href={`/reports/${report._id}`}
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
        )
    }

    render() {
        return (
            <Box>
                <Container>
                    <Title title="Reports" />
                    <Spacer />
                    <SectionTitle sectionTitle="Reports" />
                    {this.getReports()}
                </Container>
            </Box>
        )
    }
}

export default Reports;
