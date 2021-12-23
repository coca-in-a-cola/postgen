import React, { Profiler } from 'react';
import PropTypes from 'prop-types';

import {
    Grid, Skeleton, Paper, Container,
    Box, Toolbar, List, Typography,
    Divider, ListItem, ListItemText,
    Button, TextField, Pagination,
    styled
} from '@mui/material';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ImageCard from './ImageCard'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { stages } from '../../../scripts/enums';
import { getImages, getNextImage } from '../../../scripts/api';
import { base64ToUrl, base64ToUrlSync } from '../../../scripts/imageHelpers';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
}));

export default class SelectImage extends React.Component {

    static propTypes = {
        originalImage: PropTypes.string,
        textContent: PropTypes.object,
        handleStateSwitch: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {loading: true}
    }

    async componentDidMount() {
        const itemsPerLine = 3;
        const spacing = 2;
        const containerInnerWidth = 1200 - 24*2;

        // Жесткие хаки для высчитывания размеров картинки (хардкод)
        const image = new Image();
        image.src = this.props.originalImage


        image.onload = (() => {
            const newState = {
                itemsPerLine: itemsPerLine,
                spacing: spacing,
                containerInnerWidth: containerInnerWidth,
                itemHeight: (() => {
                    let imagePreviewWidth = (containerInnerWidth - (spacing * (itemsPerLine - 1) * 8)) / 3;
                    let scale = imagePreviewWidth / image.width;
                    return image.height * scale;
                })(),
                loading: false
            }

            if (this.state)
                this.setState(newState);
            else
                this.state = newState
        }).bind(this);

        /*getImages({
            image: this.props.image,
            textContent: this.props.textContent
        });*/
    }

    selectItem(e, src) {
        this.props.handleStateSwitch(e,
            {stage: stages.DOWNLOAD_IMAGE,
            image: src}
        )
    }

    render() {
        const getUrlPromise = (() => getNextImage({
            image: this.props.originalImage,
            textContent: this.props.textContent
        })).bind(this);

        return (
        <Container>
            <Box sx = {{marginTop: 8, paddingBottom: 1, position: 'relative'}}>
            <Typography color={'textSecondary'} variant={'h1'} sx = {{
                opacity: .5, fontSize: 150, fontWeight: 900, position: 'absolute', zIndex: -1, left: -140, top: -70
                }}>
                02
            </Typography>
            <Typography variant={'h2'} color={'primary'}>
                Выберите вариант оформления
            </Typography>
            </Box>

            <Grid container spacing={this.state.spacing}>
            {(() => {
                const items = [];
                for(let i = 0; i < this.state.itemsPerLine; ++i) {
                    // TODO: переписать так, чтобы в ImageCard находилось минимум логики
                    // Также, нужно убрать лаги с загрузкой
                    // Загрузку можно объявлять как проп
                    items.push(
                    <Grid item xs={12 / this.state.itemsPerLine}>
                        <Item>
                            <ImageCard height={this.state.itemHeight}
                            urlPromise={getUrlPromise()}
                            // Обрабатывается внутри ImageCard
                            // Да, не очень краивое решение, но пусть пока будет так
                            handleStateSwitch={this.props.handleStateSwitch}/>
                        </Item>
                    </Grid>
                    )
                }
                return items;
            })()}
            </Grid>
            

            <Box sx={{
                width: '100%', position: 'relative', display: 'flex', 
                marginTop: 2, alignItems: 'center', justifyContent: 'center',
                }}>
                <Button
                    variant="contained"
                    component="label"
                    color="error"
                    margin="dense"
                    size="large"
                    sx={{position: 'absolute', left: 0}}
                    startIcon={<ArrowBackIosIcon />}
                    onClick={(e) => this.props.handleStateSwitch(e, {stage: stages.INPUT_DATA})}
                    >
                    Назад
                </Button>

                <Pagination
                count={10}
                variant="outlined"
                color="secondary"
                size="large"
                shape="rounded" />
            </Box>

            <Box sx ={{marginLeft: 2}}>
                
            </Box>
        </Container>
        );
    }
}

// Specifies the default values for props:
SelectImage.defaultProps = {
    imageWidth: 400,
    imageHeight: 600,
};
  