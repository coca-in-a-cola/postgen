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
import ImageCard from './ImageCard.jsx.old'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoaderScreen from '../../LoaderScreen'
import { stages } from '../../../scripts/enums';
import Api, { getImages, getNextImage } from '../../../scripts/api';
import { base64ToUrl, base64ToUrlSync } from '../../../scripts/imageHelpers';
import ImageListModel from '../../../scripts/selectImage/imageListModel';
import Page from './Page'

class pageData {
    constructor(props) {
        this.props = {}
        Object.assign(this.props, props)
    }
}

export default class SelectImage extends React.Component {

    static propTypes = {
        loading: PropTypes.bool,

        handleStateSwitch: PropTypes.func,
        
        /**
         * imageListModel
         */
        imageListModel: PropTypes.object,

        /**
        * Передавайте, только если возвращаетесь к "готовой" странице
        */
        pages: PropTypes.arrayOf(pageData),

        /**
        * @default 12
        */
        imagesPerPage: PropTypes.number,
    }

    static defaultProps = {
        imagesPerPage: 12,
    }

    constructor(props) {
        super(props);
        this.state = {loading: true,
            pages: props.pages 
            ? [... props.pages] 
            : [this.getNewPage.call(this, props)]}

        // TODO: использовать imageListModel
    }

    getNewPage(props) {
        const imagesPerPage = props.imagesPerPage || SelectImage.defaultProps.imagesPerPage
        const offset = imagesPerPage * (this.state?.pages?.length || 0)

        props.imageListModel.requestTo(offset + imagesPerPage);

        return new pageData({
            listModel: props.imageListModel,
            itemsCount: imagesPerPage,
            offset: offset,
            onItemSelect: this.selectItem.bind(this),
        })
    }

    async componentDidMount() {
        this.props.imageListModel.onImageLoaded = () => {
            this.forceUpdate()
        }
    }

    selectItem(e, src) {
        this.props.handleStateSwitch(e,
            {stage: stages.DOWNLOAD_IMAGE,
            image: src,
            pages: this.state.pages}
        )
    }

    render() {
        
        return (
        <Container sx={{paddingBottom: 2}}>
            <Box sx = {{marginTop: 2, position: 'relative'}}>
            <Typography variant={'h2'} color={'primary'}
            sx={{
                fontSize: {xs: '2.5rem', lg: '3.75rem'},
            }}
            >
                Выберите вариант оформления
            </Typography>
            </Box>

            {
                //** Страницы рендерятся тут */
                // this.state.pages.map(pd => {<Page {...pd.props} />})
                (() => {
                    const result = [];
                    this.state.pages.forEach(page => {
                        result.push(<Page {... page.props} />);
                    })
                    return result;
                })()
            }

            <Box sx={{
                width: '100%', position: 'relative', display: 'flex', 
                marginTop: 2,
                alignItems: 'center',
                justifyContent:  {xs: 'flex-start', lg: 'center'},
                }}>
                <Button
                    variant="contained"
                    component="label"
                    color="error"
                    margin="dense"
                    size="large"
                    
                    sx={{position: {xs: 'block', lg: 'absolute'}, left: 0, marginRight: {xs: 1, lg: 0}, }}
                    startIcon={<ArrowBackIosIcon />}
                    onClick={(e) => this.props.handleStateSwitch(e, {stage: stages.INPUT_DATA})}
                    >
                    Назад
                </Button>

                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    margin="dense"
                    size="large"
                    //startIcon={<ArrowBackIosIcon />}
                    onClick={(e) => {
                        this.state.pages.push(this.getNewPage.call(this, this.props))
                        this.forceUpdate();
                    }}
                    >
                    Загрузить ещё
                </Button>
            </Box>
        </Container>
        );
    }
}