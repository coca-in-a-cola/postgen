import React from 'react';
import PropTypes from 'prop-types';
import {
    Box, Button, ButtonGroup, Drawer, CssBaseline,
    AppBar, Toolbar, List, Typography,
    Divider, ListItem, ListItemText,
    Fab, TextField,
    styled,
    Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default class InputText extends React.Component {
    propTypes = {
        onTextInput: PropTypes.func,
    }

    defaultProps = {
        onTextInput: () => {}
    }

    constructor(props) {
        super(props);
        this.textContent = {}
    }

    handleTextChange(event) {
        Object.assign(this.textContent, 
        {
            [event.target.name] : event.target.value,
        });

        this.props.onTextInput(this.textContent)
    }

    render() {
        return (
        <Box sx={{width: '100%'}}>
                <Typography variant={'h6'} color="secondary"
                >
                Подпись
                </Typography>

                <TextField
                name={"text"}
                multiline
                rows={2}
                maxRows={4}
                onChange={this.handleTextChange.bind(this)}
                sx={{width: '100%'}}
                id={'TextField'}
                label={"Введите текст"}
                variant="outlined"
                color="primary"
                margin="dense"/>
        </Box>
        )
    }
}