import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";

import HTable, { IHeadTabel } from '../../Layout/HTable';
import { IOrder } from "../../../Libs/Models/IOrder.model";
import { day } from '../../../Libs/Extensions/Day.extension';
import { OrderType, stableSort } from '../../../Libs/Extensions/Number.extension';

const headerCells: IHeadTabel[] = [
  { id: "id", label: "ORDER ID", align: "left", sort: true, width: 115 },
  { id: "date_ordered", label: "DATE", align: "left", sort: true, width: 100 },/* 
  { id: "name", label: "ชื่อ-นามสกุล", align: "center", sort: false, width: 200 }, */
  { id: null, label: "ชื่อ-นามสกุล", align: "center", sort: true, width: 200 },
  { id: "shipping", label: "SHIP", align: "left", sort: true, width: 50 },
  { id: "total", label: "PRICE", align: "left", sort: true, width: 50 },
  { id: "status", label: "STATUS", align: "center", sort: true, width: 150 },
  { id: "tracking", label: "TRACKING NO.", align: "center", sort: true, width: 150 },
  { id: null, label: "", align: "center", sort: false },
];

const maxWidth = 715

interface IProps {
  data?: IOrder[];
  isCanSort: boolean;
  isCanView: boolean;
}

export const TableList = (props: IProps) => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("index");
  const [orderType, setOrderType] = useState(OrderType.Asc);


  const onClickView = (value: IOrder) => {
    //dispatch(Action.getOrderDetail(value));
    navigate(`/order/` + value._id);
  };
  //variant="dense"

  const sortHandler = (id: keyof IOrder) => {
    if (orderType === OrderType.Asc) {
      setOrderType(OrderType.Desc);
    } else {
      setOrderType(OrderType.Asc);
    }
    setOrderBy(id);
  }
  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small" sx={{ minWidth: maxWidth }} aria-label="customized table">
        <HTable cells={headerCells} sortHandler={sortHandler} isCanSort={props.isCanSort} />
        <TableBody>
          {props.data && stableSort(props.data, orderType, orderBy).map((row: IOrder) => (
            <TableRow key={row._id}>
              <TableCell align="left">{row._id}</TableCell>
              <TableCell align="left">{day(row.date_ordered)}</TableCell>
              <TableCell align="center">{row.customer.username}</TableCell>
              <TableCell align="left">{row.shipping}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.tracking}</TableCell>

              <TableCell align="left" colSpan={2}>
                {props.isCanView &&
                  <Button variant="contained" size="small" sx={{ px: 3 }} onClick={() => { onClickView(row); }}>
                    <Typography variant="body1">VIEW</Typography>
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
