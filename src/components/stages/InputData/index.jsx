import React from 'react';
import {
    Box, Button, ButtonGroup, Drawer, CssBaseline,
    AppBar, Toolbar, List, Typography,
    Divider, ListItem, ListItemText,
    ToggleButton, TextField,
    styled,
    Container
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import InputFile from '../../inputs/InputFile';
import InputText from '../../inputs/InputText';

import {stages, imageLoadStatus} from '../../../scripts/enums'

const isValidTextContent = (content) => {
  try {
    return Object.values(content).join("") != ""
  }
  catch {
    return false;
  }
}

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
        const launchButtonEnabled = this.state?.image
        && this.state?.textContent
        && isValidTextContent(this.state?.textContent);

        return (
            <Container sx={{paddingBottom: 2}}>
                <CssBaseline />

                <Box sx = {{marginTop: 6, paddingBottom: 1, position: 'relative'}}>
                <Typography variant={'h2'} color={'primary'}>
                    Введите данные
                </Typography>
                </Box>

                <Box sx = {{marginTop: 0}}>
                  <InputFile onImageInput={this.handleImageLoaded.bind(this)} />
                </Box>

                <Box sx = {{marginTop: 2}}>
                  <InputText onTextInput={this.handleTextChanged.bind(this)} />
                </Box>

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
                    onClick={(e) => {
                      this.props.handleStateSwitch(e,
                        {stage: stages.SELECT_IMAGE,
                        image: this.state.image,
                        textContent: this.state.textContent}
                      )
                    }}
                    >
                    Запустить генератор
                    </Button>
                    {/*<Typography variant='h6' color='textSecondary' sx ={{display: 'block'}}>
                        Или просто нажмите [space]
                    </Typography>*/}
                </Box>
            </Container>
          );
    }
}