import React from 'react';
import {
    Box, Button, Card, TextField,
    ToggleButton, ToggleButtonGroup,
    styled, CardMedia, Skeleton, CircularProgress, Toolbar, Typography, Paper,
} from '@mui/material';

import { PhotoCamera } from '@mui/icons-material';
import { minWidth } from '@mui/system';
import { getUrl } from '../../scripts/imageHelpers'
import { imageLoadStatus } from '../../scripts/enums'
import ImagePreview from '../stages/InputData/ImagePreview';

const FileToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& button': {
        backgroundColor: theme.palette.text.secondary,
        color: theme.palette.background.default,
    },

    '& button.Mui-selected': {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.background.default,
    },

    '& button:hover, button.Mui-selected:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }
}));

const UrlInput = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& input': {
        textDecoration: 'underline',
        color: theme.palette.info.main
    },
}));

export default class InputFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {fileType: "url", loading: true, url: ""}
    }

    handleFileTypeChange (event, newFileType) {
        let fileType = newFileType ? newFileType : 'url'
        this.setState({fileType: fileType, filename: "", url: ""});
    
    };
    
    handleFileChange (event) {
        const file = event.target.files[0];
        this.setState({url: getUrl(file), filename: file.name});
    }

    handleUrlChange (event) {
        const url = event.target.value;
        this.setState({url: getUrl(url)});
    }

    /**
     * Мы протягиваем эту функцию до родителя через пропы \
     * Чтобы передть текущие данные и статус \
     * При успешной загрузке картинки
     * @param {*} result 
     */
    onImageLoaded (result) {
        this.props.onImageInput({
            status: result,
            url: this.state.url,
        })
    }

    render() {
        return (
        <Box sx={{width:'100%'}}>
        <form>
        <Toolbar sx={{maxHeight: 'auto'}}>
        <FileToggleButtonGroup
        value={this.state.fileType}
        exclusive
        
        onChange={this.handleFileTypeChange.bind(this)}
        aria-label="file input"
        sx={{
            marginRight: 2,
            flexShrink: 0
        }}
        >
        <ToggleButton value="file" aria-label="left aligned">
            Файл с устройства
        </ToggleButton>
        <ToggleButton value="url" aria-label="right aligned">
            URL
        </ToggleButton>
        </FileToggleButtonGroup>
        
        {(() => {
            if (this.state.fileType === 'url') {
                return <UrlInput 
                name="url" 
                id="standard-basic" 
                label="Вставьте сюда URL" 
                variant="filled" 
                color="primary"
                margin="none"
                onChange={this.handleUrlChange.bind(this)}/>
            }

            return <Button
                variant="contained"
                component="label"
                color="primary"
                margin="dense"
                startIcon={<PhotoCamera />}
                >
                {(() => {
                    if (this.state.filename) {
                        return this.state.filename
                    }
                    return "Загрузить..."
                }
                )()}
                
                
                <input
                    onChange={this.handleFileChange.bind(this)}
                    type="file"
                    hidden
                    id="file"
                    name="file"
                    accept=".png, .jpg, .jpeg"
                />
            </Button>
            }
        )()}


        
        </Toolbar>
        </form>
            <ImagePreview
                src={this.state.url}
                onChecked={this.onImageLoaded.bind(this)}
            />
        </Box>
        )
    }
}