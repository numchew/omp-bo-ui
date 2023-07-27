import React from 'react';
import { useDrag } from 'react-dnd';
import { Grid, Paper } from '@mui/material';

interface GridItemData {
    id: string; // Unique identifier for each grid item
    content: string; // Content of the grid item
}

interface GridItemProps {
    data: GridItemData;
    index: number;
    onSwap: (dragIndex: number, dropIndex: number) => void;
}

const ItemTypes = {
    GRID_ITEM: 'gridItem',
};

const GridItem: React.FC<GridItemProps> = ({ data, index, onSwap }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.GRID_ITEM,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <Grid item ref={drag}>
            <Paper style={{ opacity: isDragging ? 0.4 : 1 }}>{data.content}</Paper>
        </Grid>
    );
};

export default GridItem;
