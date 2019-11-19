import React from 'react';
import Divider from '@material-ui/core/Divider';

const Spacer = () => {
    const styles = {
        "marginTop": "50px",
        "marginBottom": "50px"
    }

    return (
        <div style={styles}>
            <Divider />
        </div>
    )
}

export default Spacer;
