import React from 'react';
import {
    Box, Button, ButtonGroup, Drawer, CssBaseline,
    AppBar, Toolbar, List, Typography,
    Divider, ListItem, ListItemText,
    ToggleButton, TextField,
    styled
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import InputFile from '../../inputs/InputFile';
import InputText from '../../inputs/InputText';

import {stages, imageLoadStatus} from '../../../scripts/enums'

const drawerWidth = '36rem';


export default class InputData extends React.Component {

    componentWillMount() {
        document.tabIndex="-1"
        document.addEventListener("keydown", this.onKeyPressed?.bind(this));
    }
  
    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed?.bind(this));
    }
    
    /*onKeyPressed(e) {
        if(e.keyCode == 32){
            this.props.handleStateSwitch(e, {stage: stages.SELECT_IMAGE})
        }
    }*/

    handleImageLoaded(event) {
      if (event.status === imageLoadStatus.SUCCESS) {
        this.setState({image: event.url})
      }
    }

    handleTextChanged(textContent) {
      this.setState({textContent: textContent})
    }

    render() {
        const launchButtonEnabled = this.state?.image && this.state?.textContent;

        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box sx={{width: '100%', position:'relative'}}>

                <Box sx = {{marginTop: 6, paddingBottom: 1, marginLeft: 3, position: 'relative'}}>
                <Typography color={'textSecondary'} variant={'h1'} sx = {{
                    opacity: .5, fontSize: 150, fontWeight: 900, position: 'absolute', zIndex: -1, right: 20, top: -30
                    }}>
                    01
                </Typography>
                <Typography variant={'h2'} color={'primary'}>
                    Введите данные
                </Typography>
                </Box>

                <InputFile onImageInput={this.handleImageLoaded.bind(this)} />
                <Box sx ={{marginTop: 2, width: '100%', textAlign: 'center'}}>
                    <Button
                    disabled={!launchButtonEnabled}
                    variant="contained"
                    component="label"
                    color="primary"
                    margin="dense"
                    size="large"
                    sx={{textAlign: 'center', margin: '0 auto'}}
                    startIcon={<PlayCircleOutlineIcon />}
                    onClick={(e) =>
                      this.props.handleStateSwitch(e,
                        {stage: stages.SELECT_IMAGE,
                        originalImage: this.state.image,
                        textContent: this.state.textContent}
                      )}
                    >
                    Запустить генератор
                    </Button>
                    {/*<Typography variant='h6' color='textSecondary' sx ={{display: 'block'}}>
                        Или просто нажмите [space]
                    </Typography>*/}
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
                <InputText onTextInput={this.handleTextChanged.bind(this)} />
              </Drawer>
            </Box>
          );
    }
}