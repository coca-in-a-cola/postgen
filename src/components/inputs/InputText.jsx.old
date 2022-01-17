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
    revesvedFields = [
        {
            name: 'header',
            label: 'Заголовок',
            multiline: false,
            rows: 1,
            maxRows: 1,
        },
        {
            name: 'subheader',
            label: 'Подзаголовок',
            multiline: false,
            rows: 1,
            maxRows: 1,
        },
        {
            name: 'text',
            label: 'Основной текст',
            multiline: true,
            rows: 2,
            maxRows: 4,
        },
    ];

    propTypes = {
        onTextInput: PropTypes.func,
    }

    defaultProps = {
        onTextInput: () => {}
    }

    constructor(props) {
        super(props);
        this.textContent = {}
        this.state = {textFields: [... this.revesvedFields]}
    }

    handleTextChange(event) {
        Object.assign(this.textContent, 
        {
            [event.target.name] : event.target.value,
        });

        this.props.onTextInput(this.textContent)
    }

    addTextField() {
        const n = this.state.textFields.length;
        this.state.textFields.push(
            {
                name: 'additionalText' + n,
                label: 'Дополнительный текст #' + n,
                multiline: true,
                rows: 2,
                maxRows: 4,
            },
        );
        this.setState(this.state)
    }

    render() {
        return (
        <Toolbar variant="dense" sx={{width: '100%'}}>
            <form>
            <Typography variant={'h6'} color="primary"
            >
            Текстовые поля
            </Typography>

            {
                this.state.textFields.map((field, index) => {
                    return (
                        <TextField
                        name={field.name}
                        multiline={field.multiline}
                        rows={field.rows}
                        maxRows={field.maxRows}
                        //value={value}
                        onChange={this.handleTextChange.bind(this)}
                        sx={{width: '100%'}}
                        id={'TextField'+ index}
                        label={field.label}
                        variant="outlined"
                        color="secondary"
                        margin="dense"/>
                    );
                })
            }

            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Fab color="secondary" aria-label="add" onClick={(e) => {
                this.addTextField.call(this)
            }}>
            <AddIcon/>
            </Fab>
            </Container>
            </form>
        </Toolbar>
        )
    }
}