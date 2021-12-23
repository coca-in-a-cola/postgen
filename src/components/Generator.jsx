import React from 'react';
import {
    Box, Button, ButtonGroup, Drawer, CssBaseline,
    AppBar, Toolbar, List, Typography,
    Divider, ListItem, ListItemText,
    ToggleButton, TextField,
    styled
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import InputData from './stages/InputData/index';
import SelectImage from './stages/SelectImage/index';
import DownloadImage from './stages/DownloadImage/index';
import {stages} from '../scripts/enums'

const drawerWidth = '36rem';

export default class Generator extends React.Component {

    handleStateSwitch = (event, data) => {
        this.setState(data)
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
                            return <SelectImage
                            originalImage={this.state.originalImage}
                            textContent={this.state.textContent}
                            handleStateSwitch={this.handleStateSwitch.bind(this)}/>
                        case stages.DOWNLOAD_IMAGE:
                            return <DownloadImage
                            url={this.state.image}
                            original={{textContent: this.state.textContent, image: this.state.originalImage}}
                            handleStateSwitch={this.handleStateSwitch.bind(this)}
                            />
                        default:
                            return "error! Wrong stage given"
                    }
                })()
            }
            </div>
        );
    }
}