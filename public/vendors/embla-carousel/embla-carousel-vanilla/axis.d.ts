import { DirectionOptionType } from './direction';
export declare type AxisOptionType = 'x' | 'y';
declare type AxisEdgeType = 'top' | 'right' | 'bottom' | 'left';
export declare type AxisType = {
    scroll: AxisOptionType;
    cross: AxisOptionType;
    startEdge: AxisEdgeType;
    endEdge: AxisEdgeType;
    measureSize: (rect: DOMRect) => number;
};
export declare function Axis(axis: AxisOptionType, contentDirection: DirectionOptionType): AxisType;
export {};
