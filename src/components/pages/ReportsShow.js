import Axios from 'axios';
import React, {Component} from 'react';
import {
    Box,
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography
} from '@material-ui/core';
import {
    ExpandMore
} from '@material-ui/icons'

import SectionTitle from '../common/SectionTitle';
import Spacer from '../common/Spacer';
import Title from '../common/Title';
import {
    formatReportSummary,
    formatTimestamp
} from '../../functions/formatting';

class ReportsShow extends Component {

    state = {
        reportId: "",
        report: null
    }

    constructor(props) {
        super(props);
        this.setReport(this.props.match.params.id);
    }

    setReport = async (reportId) => {
        let response = await Axios.get(`/reports/${reportId}/get`);
        let report = response.data;
        console.log(report);
        let newState = {
            reportId: reportId,
            report: report
        }
        this.setState(newState);
        
    }

    render() {
        return (
            <Box>
                <Container>
                    <Title title="Report Details" />
                    <Spacer />
                    {this.state.report ? (
                        <div>
                            <Typography variant="body1">
                                Configuration: {this.state.report.configurationId}
                            </Typography>
                            <Typography variant="body1">
                                Generated at: {formatTimestamp(this.state.report.generatedAt)}
                            </Typography>
                            <Typography variant="body1">
                                Summary: {formatReportSummary(this.state.report.summary)}
                            </Typography>
                            <Spacer />
                            <Typography variant="h2">
                                Groups
                            </Typography>
                            <Spacer />
                            {this.state.report.groups.map((group, index) => {
                                return (
                                    <div>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                            >
                                                <Typography variant="h3">{group.name}</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>

                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>


                                        
                                    </div>
                                )
                            })}

                            
                        </div>
                    ) : null}
                </Container>
            </Box>
        )
    }
}

export default ReportsShow;