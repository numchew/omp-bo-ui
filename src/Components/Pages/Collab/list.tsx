import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TableList } from '.';
import { PPagination } from '../../Common';
import CollabService from '../../../Libs/Services/Collab.service';
import { ICollab, DCollab } from '../../../Libs/Models/ICollab.model';
import Action from '../../../Libs/Redux/Actions/Action.action';

export function CollabList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [curPage, setCurPage] = useState(1);
    //const [dataServ, setDataServ] = useState<ICollab[]>([]);
    const [data, setData] = useState<ICollab[]>([]);

    useEffect(() => {
        CollabService.getContentAll().then(res => {
            //setDataServ(res);
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

    const onNewCollab = () => {
        var c = DCollab();
        dispatch(Action.getCollabDetail(c));
        navigate(`/character/newcolor`);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//

    return (
        <Box id="detail" sx={{ px: 1, py: 1 }}>
            <Box sx={{ py: 1 }}>
                <Button variant="contained" color="secondary" onClick={onNewCollab}
                    sx={{ px: 2 }} startIcon={<AddIcon />}
                >
                    NEW CHARACTER
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
