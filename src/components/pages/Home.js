import React from 'react';
import { 
    Box,
    Container,
    Typography
} from '@material-ui/core';
import Spacer from '../common/Spacer';
import Title from '../common/Title';

const Home = () => {
    return (
        <Box>
            <Container >
                <Title title="Welcome to the GA4GH Test Orchestrator" />
                <Spacer />
                <Typography variant="body1">
                    The GA4GH Test Orchestrator is a common platform to configure,
                    schedule, and view tests for implementations of GA4GH standards.
                    The Orchestrator can run tests of varying scale, from simple 
                    API conformance tests (e.g. compliance to htsget, refget, 
                    RNAget), to complex tests that simulate end-to-end use cases,
                    drawing upon many GA4GH specifications at once
                    (data retrieval, analysis, auth, etc).
                </Typography>
                <Spacer />
                <Typography variant="h3">
                    How it works
                </Typography>
                <Spacer />

                <Typography variant="h4">
                    Plugins
                </Typography>
                <Spacer />
                <Typography variant="body1">
                    Tests are first created via <a href="/plugins">Plugins</a>, 
                    reusable modules/blueprints that can be executed on different
                    services using different input parameters. Each Plugin
                    defines a codebase: a library and method that will generate
                    a report when executed. Codebases can be hosted on various
                    platforms (e.g. Github, PyPI) and written in multiple
                    languages (e.g. Python, Java). Each Plugin also defines the
                    input parameters it needs to run. For example, a refget
                    compliance Plugin should define an input parameter "url",
                    which contains the base url to a refget service.
                </Typography>
                <Spacer />

                <Typography variant="h4">
                    Configurations
                </Typography>
                <Spacer />
                <Typography variant="body1">
                    <a href="/configurations">Configurations</a> represent the
                    instantiation of a Plugin. Each Configuration references a 
                    Plugin, and populates each of its input parameters with real
                    values. A Configuration is set to run on a specific schedule
                    (once per day, week, month, etc). Each time the Configuration
                    is run, its input values are supplied to the Plugin codebase,
                    generating a report. A single Plugin can be used on multiple
                    configurations. For example, the same refget compliance Plugin
                    can be configured to run on many services worldwide, each
                    configuration containing a different "url" value.
                </Typography>
                <Spacer />

                <Typography variant="h4">
                    Reports
                </Typography>
                <Spacer />
                <Typography variant="body1">
                    A single run of a Configuration produces one <a href="/reports">Report</a>, 
                    which contains the status
                    of all test cases executed by the Plugin codebase against
                    the implementation(s). The Report indicates which cases
                    passed, passed with warnings, failed, or were skipped.
                </Typography>
                <Spacer />
            </Container>
        </Box>
    )
}

export default Home;
