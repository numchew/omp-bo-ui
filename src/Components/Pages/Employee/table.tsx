import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
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
import { IProfile } from '../../../Libs/Models/IProfile.model';
import { Button } from '@mui/material';

const headerCells: IHeadTabel[] = [
  { id: "_id", label: "EMPLOYEE ID", align: "left", sort: true, width: 140 },
  { id: "email", label: "EMAIL", align: "left", sort: true, width: 180 },
  { id: null, label: "NAME", align: "left", sort: true, width: 180 },
  { id: "phonenumber", label: "TEL", align: "center", sort: true, width: 120 },
  { id: "roles", label: "ROLE", align: "center", sort: true, width: 120 },
  { id: null, label: "", align: "left", sort: false },
];

const maxWidth = 1000

interface IProps {
  data?: IProfile[];
  isCanSort: boolean;
  isCanView: boolean;
}

export const TableList = (props: IProps) => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("index");
  const [orderType, setOrderType] = useState(OrderType.Asc);

  const onClickView = (value: IProfile) => {
    navigate(`/employee/` + value._id);
  };

  const sortHandler = (id: keyof IProfile) => {
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
          {props.data && stableSort(props.data, orderType, orderBy).map((row: IProfile) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row._id}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{`${row.fname} ${row.lname}`}</TableCell>
              <TableCell align="left">{row.phonenumber}</TableCell>
              <TableCell align="left">{row.roles.toUpperCase()}</TableCell>
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
