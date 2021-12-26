import React from 'react';
import {
    Box, CircularProgress, Typography, 
} from '@mui/material';

export default class Generator extends React.Component {
    render() {
        return (
            <Box sx={{ position: 'fixed', top:0, left:0, right: 0, bottom: 0,
            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant='h2' color='primary'>
                        Идёт загрузка...
                    </Typography>
                    <Typography variant='h6' color='secondary'>
                        Нейросети обрабатывают изображение. Это займёт не более пяти минут
                    </Typography>
                    <Typography variant='h6' color='secondary' sx={{marginBottom: 4}}>
                        Если загрузка идёт более пяти минут, обновите страницу и попробуйте использовать другую картинку
                    </Typography>
                    <CircularProgress color="error" />
                </Box>
            </Box>
        )
    }
}
