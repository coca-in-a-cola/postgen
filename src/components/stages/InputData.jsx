import React from 'react';
import {
    Box, Button, ButtonGroup, Drawer, CssBaseline,
    AppBar, Toolbar, List, Typography,
    Divider, ListItem, ListItemText,
    ToggleButton, TextField,
    styled
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import InputFile from '../inputs/InputFile';
import InputText from '../inputs/InputText';

import {stages} from '../../scripts/enums'

const drawerWidth = '36rem';


export default class InputData extends React.Component {

    componentWillMount() {
        document.tabIndex="-1"
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
    }
  
    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed.bind(this));
    }
    
    onKeyPressed(e) {
        if(e.keyCode == 32){
            this.props.handleStateSwitch(e, {stage: stages.SELECT_IMAGE})
        }
    }

    render() {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <Box sx={{width: '100%', position:'relative'}}>
                <InputFile/>
                <Box sx ={{marginTop: 2, width: '100%', textAlign: 'center'}}>
                    <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    margin="dense"
                    size="large"
                    sx={{textAlign: 'center', margin: '0 auto'}}
                    startIcon={<PlayCircleOutlineIcon />}
                    onClick={ (e) => this.props.handleStateSwitch(e, {stage: stages.SELECT_IMAGE})}
                    >
                    Запустить генератор
                    </Button>
                    <Typography variant='h6' color='textSecondary' sx ={{display: 'block'}}>
                        Или просто нажмите [space]
                    </Typography>
                </Box>
                </Box>
                
                
                
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                  },
                }}
                variant="permanent"
                anchor="right"
              >
                <Toolbar sx={{width: '100%'}}>
                </Toolbar>
                <InputText/>
              </Drawer>
            </Box>
          );
    }
}