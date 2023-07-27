import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PPagination } from '../../Common';
import Action from '../../../Libs/Redux/Actions/Action.action';
import ProductService from '../../../Libs/Services/Product.service';
import { IProduct, DProduct } from '../../../Libs/Models/IProduct.model';
import { TableList } from '.';

export function ProductList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [curPage, setCurPage] = useState(1);
    const [data, setData] = useState<IProduct[]>([]);

    useEffect(() => {
        ProductService.getContentAll().then(res => {
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

    /* const selectDetail = (id: number, row: ISituation) => {
        dispatch(StudentAction.setReport({ index: id, situlation: dataFocus }));
        navigate(location.pathname + "/report");
    }; */

    const onNewItem = () => {
        //location
        //var a: IProduct = DProduct();
        //dispatch(Action.getProductDetail(a));
        navigate(`/productlist/newproduct`);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//

    return (
        <Box id="detail" sx={{ px: 1, py: 1 }}>
            <Box sx={{ py: 1 }}>
                <Button variant="contained" color="secondary" onClick={onNewItem}
                    sx={{ px: 2 }} startIcon={<AddIcon />}
                >
                    {`NEW PRODUCT`}
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
