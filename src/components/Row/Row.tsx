import React, { FC } from 'react';
import { Column } from '../../components';
import { ColumnProps } from '../../components/Column';

export type RowProps = ColumnProps;

const RowComponent: FC<RowProps> = props => <Column flexDirection='row' {...props} />;

export default RowComponent;
