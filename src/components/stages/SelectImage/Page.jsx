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
import LoaderScreen from '../../LoaderScreen'
import { stages } from '../../../scripts/enums';
import Api, { getImages, getNextImage } from '../../../scripts/api';
import { base64ToUrl, base64ToUrlSync } from '../../../scripts/imageHelpers';
import ImageListModel from '../../../scripts/selectImage/imageListModel';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
}));


export default class Page extends React.Component {

    static propTypes = {
        loading: PropTypes.bool,

        /**
         * Если loading = false, обязательно укажите остальные параметры
         */
        listModel: PropTypes.instanceOf(ImageListModel),
        itemsCount: PropTypes.number,
        offset: PropTypes.number,
        onItemSelect: PropTypes.func,
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        
    }

    renderItem(index) {
        const src = this.props.listModel?.getUrlByIndex(index + this.props.offset)
        return (
            <Grid item xs={4}>
                <Item>
                    <ImageCard loading = {
                            this.props.loading 
                            || !src
                        }
                        src = {src}
                        onClick = {(e) => this.props.onItemSelect(e, src)}
                    />
                </Item>
            </Grid>
        )
    }

    render() {
        return (
            <Grid container spacing={2} sx={{marginTop: 2,}}>
            {
                [...Array(this.props.itemsCount).keys()].map((index) => this.renderItem.call(this, index))
            }
            </Grid>
        )
    }
}