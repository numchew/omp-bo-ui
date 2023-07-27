import React, { useState } from 'react'
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

import HTable, { IHeadTabel } from '../../../Layout/HTable';
import { OrderType, stableSort } from '../../../../Libs/Extensions/Number.extension';
import { IColor } from '../../../../Libs/Models/IColor.model';
import env from '../../../../Libs/Services/env';


const headerCells: IHeadTabel[] = [
  { id: "_id", label: "ID", align: "left", sort: true, width: 95 },
  { id: null, label: "", align: "left", sort: false, width: 50 }, //thumbnail(image)
  { id: "name", label: "NAME", align: "left", sort: true, width: 150 },
  { id: "type", label: "TYPE", align: "center", sort: true, width: 100 },
  { id: "activate", label: "ACTIVATE", align: "center", sort: true, width: 50 },
  { id: null, label: "", align: "center", sort: false }, //column --> end
];

const maxWidth = 500

interface IProps {
  data: IColor[];
  isCanSort: boolean;
  isCanView: boolean;
}

export const TableList = (props: IProps) => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState(OrderType.Asc);

  const [data, setData] = useState<IColor[]>();

  React.useEffect(() => {
    setData(props.data);
  }, [props.data])
  //--------------------------------------------------//
  //--------------------------------------------------//
  const onClickView = (value: IColor) => {
    //dispatch(Action.getColorDetail(value));
    navigate(`/avatar/color/` + value._id);
  };

  const sortHandler = (id: keyof IColor) => {
    if (orderType === OrderType.Asc) {
      setOrderType(OrderType.Desc);
      setData(stableSort(props.data, OrderType.Desc, id));
    } else {
      setOrderType(OrderType.Asc);
      setData(stableSort(props.data, OrderType.Asc, id));
    }
  }
  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small" sx={{ minWidth: maxWidth }} aria-label="customized table">
        <HTable cells={headerCells} sortHandler={sortHandler} isCanSort={props.isCanSort} />
        <TableBody>
          {data && data.map((row: IColor, index: number) => (
            <TableRow key={index}>
              <TableCell align="left">{row._id}</TableCell>
              <TableCell align="left">
                <Paper className='flex-c-m' elevation={1} >
                  <img src={`${env.APP_API_HOST}/${row.url}`} alt="Color"
                    style={{ width: 40, height: 'auto' }}
                  />
                </Paper>
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.type.toUpperCase()}</TableCell>
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
    </TableContainer >
  );

  //--------------------------------------------------//
  //--------------------------------------------------//
}
