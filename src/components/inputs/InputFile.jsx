import React from 'react';
import {
    Box, Button, Card, TextField,
    ToggleButton, ToggleButtonGroup,
    styled, CardMedia, Skeleton, CircularProgress, Toolbar, Typography, Paper,
} from '@mui/material';

import { PhotoCamera } from '@mui/icons-material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { minWidth } from '@mui/system';

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

const LightboxPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: imageHeight + lightBoxPaddingY * 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.text.primary,
}));

function testImageURL(url, timeout = 5000) {
    return new Promise(function (resolve, reject) {
        var timer, img = new Image();
        img.onerror = img.onabort = function () {
            clearTimeout(timer);
            reject("error");
        };
        img.onload = function () {
            clearTimeout(timer);
            resolve("success");
        };
        timer = setTimeout(function () {
            // reset .src to invalid URL so it stops previous
            // loading, but doesn't trigger new load
            img.src = "//!!!!/test.jpg";
            reject("timeout");
        }, timeout);
        img.src = url;
    });
}

const imageHeight = 540;
const lightBoxPaddingY = 30;

export default class InputFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {fileType: "url", loading: true}
        this.renderCardComponent();
    }

    handleFileTypeChange (event, newFileType) {
        let fileType = newFileType ? newFileType : 'url'
        this.setState({fileType: fileType,}, () => this.renderCardComponent());
        
    };
    
    handleFileChange (event) {
        const file = event.target.files[0];
        this.setState({file: file}, () => this.renderCardComponent());
    }

    handleUrlChange (event) {
        const url = event.target.value;
        this.setState({url: url}, () => this.renderCardComponent());
    }

    async getImageURL() {
        let url;
        if (this.state.fileType === 'file' && this.state.file) {
            url = URL.createObjectURL(this.state.file);
        }
        else if (this.state.url) {
            url = this.state.url;
        }

        return url;
    }

    /**
     * TODO: При загрузке, в карточке с видом на картинку
     * должны запихиваться разные компоненты
     */
    async renderCardComponent() {
        this.setState({loading: true});

        const url = await this.getImageURL();
        testImageURL(url).then((resolve) => {
            console.log(url)
            let component = 
            <Card sx={{ maxWidth: '100%', boxShadow: 'none', textAlign: 'center', borderRadius: 0 }}>
            <CardMedia
            component="img"
            height={imageHeight}
            image={url} 
            alt="image input"
            /></Card>

            this.setState({loading: false, imageComponent:component,})
        })
        .catch((reject) => {
            let component = <Box sx={{textAlign: 'center'}}>
                <ErrorOutlineIcon color={'error'} sx={{fontSize: '6rem'}}/>
                <div>
                    <Typography variant={'h5'} color={'error'}>
                        {(() => {
                            if (reject === 'error')
                                return 'Произошла ошибка при загрузке изображения'
                            else if (reject === 'timeout')
                                return 'Не удалось загрузить изображение'
                            return reject
                        })()}
                    </Typography>
                </div>
                </Box>
            this.setState({loading: false, imageComponent:component});
        });
    }

    render() {
        return (
        <Box sx={{width:'100%'}}>
        <form>
        <Toolbar>
        <FileToggleButtonGroup
        value={this.state.fileType}
        exclusive
        
        onChange={this.handleFileTypeChange.bind(this)}
        aria-label="file input"
        sx={{
            
        }}
        >
        <ToggleButton value="file" aria-label="left aligned">
            Файл с устройства
        </ToggleButton>
        <ToggleButton value="url" aria-label="right aligned">
            URL
        </ToggleButton>
        </FileToggleButtonGroup>

        </Toolbar>
        <Toolbar>
        
        {(() => {
            if (this.state.fileType === 'url') {
                return <UrlInput 
                name="url" 
                id="standard-basic" 
                label="Вставьте сюда URL" 
                variant="filled" 
                color="primary"
                margin="dense"
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
                    if (this.state.file) {
                        return this.state.file.name
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

        <Toolbar>
        <LightboxPaper sx={{
            padding: 15
        }}>
            {( () => {
                if (this.state.loading) {
                    return <CircularProgress color="error" />
                }
                else {
                    return this.state.imageComponent
                }
            }
            )()}
        </LightboxPaper>
        </Toolbar>
        </Box>
        )
    }
}