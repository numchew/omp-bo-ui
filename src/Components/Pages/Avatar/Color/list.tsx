import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TableList } from '.';
import { PPagination } from '../../../Common';
import ColorService from '../../../../Libs/Services/Color.service';
import { IColor } from '../../../../Libs/Models/IColor.model';

export function ColorList() {
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [curPage, setCurPage] = useState(1);
    const [data, setData] = useState<IColor[]>([]);

    useEffect(() => {
        ColorService.getContentAll().then(res => {
            setData(res);
        }).catch((e) => { });
    }, [])

    //--------------------------------------------------//
    //--------------------------------------------------//
    const handleChangeRowsPerPage = (value: string) => {
        setRowsPerPage(Number(value));
        setCurPage(1);
    };

    const handleChangePage = (value: number) => {
        setCurPage(value);
    };

    const onNewColor = () => {
        //var c = DColor();
        //dispatch(Action.getColorDetail(c));
        navigate(`/avatar/color/newcolor`);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//

    return (
        <Box id="detail" sx={{ px: 1, py: 1 }}>
            <Box sx={{ py: 1 }}>
                <Button variant="contained" color="secondary" onClick={onNewColor}
                    sx={{ px: 2 }} startIcon={<AddIcon />}
                >
                    NEW COLOR
                </Button>
            </Box>
            <TableList data={
                data.slice(
                    (curPage - 1) * rowsPerPage,
                    (curPage - 1) * rowsPerPage + rowsPerPage)}
                isCanSort={true}
                isCanView={true}
            />
            <div className="p-t-20">
                <PPagination
                    quantity={data.length}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    onChagePage={handleChangePage}
                />
            </div>
        </Box>
    )
}
