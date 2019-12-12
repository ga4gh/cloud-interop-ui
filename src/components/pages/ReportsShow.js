import Axios from 'axios';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    CardContent,
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography
} from '@material-ui/core';
import {
    ExpandMore,
    CheckCircle as CheckCircleIcon
} from '@material-ui/icons'
import SectionTitle from '../common/SectionTitle';
import Spacer from '../common/Spacer';
import Title from '../common/Title';
import {
    formatReportSummary,
    formatTimestamp,
    iconFromStatus,
    iconFromSummary
} from '../../functions/formatting';
import {withStyles} from '@material-ui/styles';
import styles from '../../assets/jss/components/pages/ReportsShowStyles';

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
        const { classes } = this.props;
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
                                                <div className={classes.groupSummaryIconColumn}>
                                                    {iconFromSummary(group.summary)}
                                                </div>
                                                <div className={classes.groupSummaryNameColumn}>
                                                    <Typography variant="h6">
                                                        {group.name}
                                                    </Typography>
                                                </div>
                                                <div className={classes.groupSummaryStatusColumn}>
                                                    <Typography variant="subtitle1">
                                                        {formatReportSummary(group.summary)}
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                {group.cases.map((testCase, caseIdx) => {
                                                    return (
                                                        <Card className={classes.caseCard}>
                                                            <CardContent>
                                                                <Typography variant="subtitle2">
                                                                    {iconFromStatus(testCase.status)}
                                                                    {testCase.name}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    )
                                                })}
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

ReportsShow.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReportsShow);