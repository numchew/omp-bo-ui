import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
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
import { day } from '../../../Libs/Extensions/Day.extension';
import { OrderType, stableSort } from '../../../Libs/Extensions/Number.extension';
import Action from '../../../Libs/Redux/Actions/Action.action';
import { ICustomer } from '../../../Libs/Models/ICustomer.model';

const headerCells: IHeadTabel[] = [
  { id: "_id", label: "CUSTOMER ID", align: "left", sort: true, width: 150 },
  { id: "username", label: "NAME", align: "center", sort: true, width: 200 },
  { id: "phonenumber", label: "TEL", align: "center", sort: true, width: 200 },
  { id: null, label: "SHIP", align: "left", sort: true, width: 100 },
  { id: "status", label: "STATUS", align: "center", sort: true, width: 150 },
  { id: null, label: "", align: "left", sort: false },
];

const maxWidth = 700

interface IProps {
  data?: ICustomer[];
  isCanSort: boolean;
  isCanView: boolean;
}

export const TableList = (props: IProps) => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("index");
  const [orderType, setOrderType] = useState(OrderType.Asc);

  const dispatch = useDispatch();

  const onClickView = (value: ICustomer) => {
    dispatch(Action.getCustomerDetail(value));
    //navigate(`/customer/` + value._id);
    navigate(`/customer/` + value.email);
  };
  //variant="dense"

  const sortHandler = (id: keyof ICustomer) => {
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
          {props.data && stableSort(props.data, orderType, orderBy).map((row: ICustomer) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row._id}</TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="center">{row.phonenumber}</TableCell>
              <TableCell align="left">{row.orders && row.orders[row.orders.length - 1].shipping}</TableCell>
              <TableCell align="center">{row.orders && row.orders[row.orders.length - 1].status}</TableCell>
              {/*<TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.tracking}</TableCell> */}

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
