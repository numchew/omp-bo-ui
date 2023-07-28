import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
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

import HTable, { IHeadTabel } from '../../../Layout/HTable';
import { OrderType, stableSort } from '../../../../Libs/Extensions/Number.extension';
import { IAvatar } from '../../../../Libs/Models/IAvatar.model';
import env from '../../../../Libs/Services/env';


const headerCells: IHeadTabel[] = [
  { id: null, label: "", align: "left", sort: true, width: 30 },
  { id: null, label: "", align: "left", sort: false, width: 50 },
  { id: null, label: "GRAPHIC", align: "center", sort: false, width: 50 },
  { id: "type", label: "TYPE", align: "center", sort: true, width: 100 },
  { id: "activate", label: "ACTIVATE", align: "center", sort: false, width: 50 },
  { id: null, label: "", align: "center", sort: false }, //column --> end
];

const maxWidth = 500

interface IProps {
  data: IAvatar[];
  isCanSort: boolean;
  isCanView: boolean;
}

export const TableList = (props: IProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  //const [orderBy, setOrderBy] = useState("index");
  const [orderType, setOrderType] = useState(OrderType.Asc);

  const [data, setData] = useState<IAvatar[]>();

  React.useEffect(() => {
    setData(props.data);
  }, [props.data])
  //--------------------------------------------------//
  //--------------------------------------------------//
  const onClickView = (value: IAvatar) => {
    navigate(`${location.pathname}/${value._id}`);
  };

  const sortHandler = (id: keyof IAvatar) => {
    if (orderType === OrderType.Asc) {
      setOrderType(OrderType.Desc);
      setData(stableSort(props.data, OrderType.Desc, id));
    } else {
      setOrderType(OrderType.Asc);
      setData(stableSort(props.data, OrderType.Asc, id));
    }
    //setOrderBy(id);
  }
  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small" sx={{ minWidth: maxWidth }} aria-label="customized table">
        <HTable cells={headerCells} sortHandler={sortHandler} isCanSort={props.isCanSort} />
        <TableBody>
          {data && data.map((row: IAvatar, index: number) => (
            <TableRow key={index}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">
                <Paper className='flex-c-m' elevation={1} >
                  <img src={`${env.APP_API_HOST}/${row.icon}`} alt="Avatar" width={40} height={40} />
                </Paper>
              </TableCell>
              <TableCell align="center">{row.thumbnail.length}</TableCell>
              <TableCell align="left">{row.type.toUpperCase()}</TableCell>
              <TableCell align="center">
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
