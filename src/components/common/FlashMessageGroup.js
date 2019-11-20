import React from 'react';
import {
    Container
} from '@material-ui/core';
import FlashMessage from './FlashMessage';

const FlashMessageGroup = props => {
    return (
        <Container>
            {props.flashSuccess.map(message => {
                return (
                    <FlashMessage
                        message={message}
                        variant="success"
                    />
                )
            })}

            {props.flashError.map(message => {
                return (
                    <FlashMessage
                        message={message}
                        variant="error"
                    />
                )
            })}
        </Container>
    )
}

export default FlashMessageGroup;
