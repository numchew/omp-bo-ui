import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";

import HTable, { IHeadTabel } from '../../Layout/HTable';
import { OrderType, stableSort } from '../../../Libs/Extensions/Number.extension';
import { IProduct } from '../../../Libs/Models/IProduct.model';
import { TypeIC } from '../../Common';
import env from '../../../Libs/Services/env';
import ColorService from '../../../Libs/Services/Color.service';
import { IColor } from '../../../Libs/Models/IColor.model';

const headerCells: IHeadTabel[] = [
  { id: "_id", label: "ID", align: "left", sort: true, width: 110 },
  { id: "name", label: "NAME", align: "left", sort: true, width: 150 },
  { id: "type", label: "TYPE", align: "left", sort: true, width: 50 },
  { id: "size", label: "SIZE", align: "left", sort: true, width: 80 },
  { id: null, label: "", align: "left", sort: true, width: 50 },
  { id: 'color', label: "COLOR", align: "left", sort: true, width: 100 },
  { id: "quantity", label: "QUANTITY", align: "center", sort: true, width: 80 },
  { id: "price", label: "PRICE", align: "center", sort: true, width: 80 },
  { id: null, label: "STOCK", align: "center", sort: true, width: 150 },
  { id: "activate", label: "ACTIVATE", align: "center", sort: true, width: 50 },
  { id: null, label: "", align: "left", sort: false },
];

const maxWidth = 1200

interface IProps {
  data?: IProduct[];
  isCanSort: boolean;
  isCanView: boolean;
}

export const TableList = (props: IProps) => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("index");
  const [orderType, setOrderType] = useState(OrderType.Asc);

  const [color, setColor] = useState<IColor[]>();

  useEffect(() => {
    ColorService.getContentAll().then(res => {
      setColor(res);
    })
  }, [])

  const onClickView = (value: IProduct) => {
    //dispatch(Action.getProductDetail(value));
    navigate(`/productlist/` + value._id);
  };

  const sortHandler = (id: keyof IProduct) => {
    if (orderType === OrderType.Asc) {
      setOrderType(OrderType.Desc);
    } else {
      setOrderType(OrderType.Asc);
    }
    setOrderBy(id);
  }

  const getColor = (c: String): string => {
    var res = color?.find(e => e._id === c);
    return res ? res.url : "";
  }
  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small" sx={{ minWidth: maxWidth }} aria-label="customized table">
        <HTable cells={headerCells} sortHandler={sortHandler} isCanSort={props.isCanSort} />
        <TableBody>
          {props.data && stableSort(props.data, orderType, orderBy).map((row: IProduct) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row._id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="center" >
                <TypeIC value={row.type} disabled={true} selected={true} size={40} />
              </TableCell>
              <TableCell align="center">{row.size}</TableCell>
              <TableCell align="center">
                <Paper className='flex-c-m' elevation={1} sx={{ width: 40 }} >
                  <img src={`${env.APP_API_HOST}/${getColor(row.color)}`} alt="Color"
                    style={{ width: 40, height: 'auto' }}
                  />
                </Paper>
              </TableCell>
              <TableCell align="left">{row.color}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              {row.quantity > 0 ?
                <TableCell align="center">IN STOCK</TableCell> :
                <TableCell align="center"
                  style={{ fontFamily: 'THSarabun', fontWeight: "900", color: '#E14745', fontSize: '1.25rem' }}>
                  OUT OF STOCK
                </TableCell>
              }
              <TableCell align="left">
                <Checkbox checked={row.activate} />
              </TableCell>
              <TableCell align="left" colSpan={2}>
                {props.isCanView &&
                  <Button variant="contained" size="small" sx={{ px: 3 }} onClick={() => { onClickView(row); }}>
                    <Typography variant="body1">EDIT</Typography>
                  </Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  //--------------------------------------------------//
  //--------------------------------------------------//
}
