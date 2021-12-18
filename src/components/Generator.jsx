import React from 'react';
import {
    Box, Button, ButtonGroup, Drawer, CssBaseline,
    AppBar, Toolbar, List, Typography,
    Divider, ListItem, ListItemText,
    ToggleButton, TextField,
    styled
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import InputData from './stages/InputData';
import SelectImage from './stages/SelectImage/Main';
import {stages} from '../scripts/enums'

const drawerWidth = '36rem';

export default class Generator extends React.Component {

    handleStateSwitch = (event, data) => {
        this.setState({stage: data.stage})
    }

    constructor(props) {
        super(props);
        this.state = {stage: stages.INPUT_DATA }
    }

    render() {
        return (
            <div>
            {
                (() => {
                    switch (this.state.stage) {
                        case stages.INPUT_DATA:
                            return <InputData handleStateSwitch={this.handleStateSwitch.bind(this)} />
                        case stages.SELECT_IMAGE:
                            return <SelectImage imageWidth={1200} imageHeight={1200} handleStateSwitch={this.handleStateSwitch.bind(this)}/>
                        default:
                            return "error!"
                    }
                })()
            }
            </div>
        );
    }
}