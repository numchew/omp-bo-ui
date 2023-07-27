import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import React from 'react'
import { primary } from '../../Styles/Theme'
import { IOrder, IOrderProduct } from '../../Libs/Models/IOrder.model';
import { ICustomer } from '../../Libs/Models/ICustomer.model';
import { IColor } from '../../Libs/Models/IColor.model';
import { IAvatar } from '../../Libs/Models/IAvatar.model';
import { IProduct } from '../../Libs/Models/IProduct.model';
import { ICollab } from '../../Libs/Models/ICollab.model';

export interface IHeadTabel {
  //id: keyof IStudent
  id: keyof IOrder | keyof IOrderProduct | keyof ICollab | keyof IProduct | keyof ICustomer | keyof IColor | keyof IAvatar | null
  label: string
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right'
  sort?: boolean
  minWidth?: any
  maxWidth?: any
  width?: any
  active?: boolean
  hidden?: boolean
}

interface IHeaderCell {
  cells: IHeadTabel[]
  //sortHandler?: React.MouseEventHandler<HTMLButtonElement> => (id: string)
  sortHandler?: any
  isCanSort?: boolean;
  headStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
}

export default function HTable(props: IHeaderCell) {
  //const [order, setOrder] = useState<OrderType>(OrderType.Asc)
  //const [orderBy, setOrderBy] = useState<keyof IStudent>('sid')

  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <TableHead style={{ ...props.headStyle, }}>
      <TableRow>
        {props.cells.map((cell, index) => (
          <TableCell
            key={index}
            align={cell.align}
            style={{
              minWidth: cell.minWidth ? cell.minWidth : 'auto',
              maxWidth: cell.maxWidth ? cell.maxWidth : 'auto',
              width: cell.width ? cell.width : 'auto',
              borderColor: primary,
              ...props.cellStyle,
            }}
            sx={{ backgroundColor: '#fff' }}
          //sortDirection={orderBy === cell.id ? order : false}
          >
            {cell.sort && props.isCanSort ? (
              <TableSortLabel
                //active={orderBy === headCell.id}
                hideSortIcon={cell.hidden !== null ? cell.hidden : true}
                //direction={orderBy === headCell.id ? order : 'asc'}
                //onClick={sortHandler(headCell.id)}
                onClick={() => props.sortHandler && props.sortHandler(cell.id)}
              >
                <Typography variant="h6" sx={{ lineHeight: 0.8 }}>
                  <b>{cell.label}</b>
                </Typography>
              </TableSortLabel>
            ) : (
              <Typography variant="h6" sx={{ lineHeight: 0.8 }}>
                <b>{cell.label}</b>
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
