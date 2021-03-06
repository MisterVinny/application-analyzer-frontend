export declare type ScrollContainOptionType = '' | 'trimSnaps' | 'keepSnaps';
export declare type ScrollContainType = {
    snapsContained: number[];
};
export declare function ScrollContain(viewSize: number, contentSize: number, snaps: number[], snapsAligned: number[], containScroll: ScrollContainOptionType): ScrollContainType;
