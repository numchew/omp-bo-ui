import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TableList } from '.';
import { PPagination } from '../../../Common';
import AvatarService from '../../../../Libs/Services/Avatar.service';
import Action from '../../../../Libs/Redux/Actions/Action.action';
import { IAvatar, DAvatar } from '../../../../Libs/Models/IAvatar.model';

export function AvatarList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { body } = useParams();
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [curPage, setCurPage] = useState(1);
    const [data, setData] = useState<IAvatar[]>([]);

    useEffect(() => {
        if (body) {
            AvatarService.getContentAllPart(body).then(res => {
                setData(res);
            }).catch((e) => { });
        }
    }, [body])

    //--------------------------------------------------//
    //--------------------------------------------------//
    const handleChangeRowsPerPage = (value: string) => {
        setRowsPerPage(Number(value));
        setCurPage(1);
    };

    const handleChangePage = (value: number) => {
        setCurPage(value);
    };

    const onNewItem = () => {
        var a: IAvatar = DAvatar();
        a.thumbnail = [];
        // a.thumbnail.push(DThumbnail())
        dispatch(Action.getAvatarDetail(a));
        navigate(`/avatar/${body?.toLowerCase()}/new${body?.toLowerCase()}`);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//

    return (
        <Box id="DETAIL" sx={{ px: 1, py: 1 }}>
            <Box sx={{ py: 1 }}>
                <Button variant="contained" color="secondary" onClick={onNewItem}
                    sx={{ px: 2 }} startIcon={<AddIcon />}
                >
                    {`NEW ${body}`}
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
    //--------------------------------------------------//
    //--------------------------------------------------//
}
