import React from 'react';
import PropTypes from 'prop-types';

import { imageLoadStatus } from '../../scripts/enums'

import {
    Typography,
    Box,
} from '@mui/material';

import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


export default class ImagePreviewError extends React.Component {
    static propTypes = {
        /**
         * Ошибка. Строка-константа, см. imageLoadStatus
         */
        status: PropTypes.string
    }

    render() {
        switch(this.props.status) {
            case(imageLoadStatus.ERROR):
                return <Box sx={{textAlign: 'center'}}>
                <ErrorOutlineIcon color={'error'} sx={{fontSize: '6rem'}}/>
                <Box>
                    <Typography variant={'h5'} color={'error'}>
                        Произошла ошибка при загрузке изображения
                    </Typography>
                </Box>
                </Box>
            case(imageLoadStatus.TIMEOUT):
                return <Box sx={{textAlign: 'center'}}>
                    <ErrorOutlineIcon color={'error'} sx={{fontSize: '6rem'}}/>
                    <Box>
                        <Typography variant={'h5'} color={'error'}>
                            Не удалось загрузить изображение
                        </Typography>
                    </Box>
                    </Box>
            case(imageLoadStatus.EMPTY):
                return <Box sx={{textAlign: 'center'}}>
                <CropOriginalIcon color={'secondary'} sx={{fontSize: '6rem'}}/>
                <Box>
                    <Typography variant={'h5'} color={'secondary'}>
                        Пожалуйста, загрузите изображение
                    </Typography>
                </Box>
                </Box>
        }
    }
}