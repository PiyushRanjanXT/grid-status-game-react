import { useState,useEffect } from 'react';

const useGame:
    (
        height: number,
        width: number,
        gridArray?: number[][]
    )
        =>
        {
            grid: number[][],
            nextTick: () => void;
            restartGame: () => void;
        }
    =
    ( height = 5,width = 5,gridArray ) =>
    {

        const [ grid,setGrid ] = useState<number[][]>( [] );

        /**
         * Count Neighbours which are +ve(1)
         */
        const neighboursCount:
            ( i: number,j: number,arr: number[][] ) => number
            = ( i,j,arr ) => (

                //top left
                getCurrentValueFromIndex( i - 1,j - 1 ) +
                //top
                getCurrentValueFromIndex( i - 1,j ) +
                //top right
                getCurrentValueFromIndex( i - 1,j + 1 ) +
                //left
                getCurrentValueFromIndex( i,j - 1 ) +
                //right
                getCurrentValueFromIndex( i,j + 1 ) +
                //bottom left
                getCurrentValueFromIndex( i + 1,j - 1 ) +
                //bottom
                getCurrentValueFromIndex( i + 1,j ) +
                //bottom right
                getCurrentValueFromIndex( i + 1,j + 1 )

            );

        /**
         * Grid generation logic with random 0,1
         */
        const generateInitialGrid:
            ( height: number,width: number ) => number[][]
            = ( height = 5,width = 5 ) =>
            {

                if ( gridArray )
                {
                    return gridArray;
                }
                return Array.from( { length: width },() =>
                {
                    return Array.from( { length: height },() => Math.round( Math.random() ) );
                } );
            };
        /**
         * Get current value from grid index return zero of wrong index
         */
        const getCurrentValueFromIndex:
            (
                i: number,
                j: number,
                arr?: number[][]
            ) => number
            = ( i,j,arr = grid ) => arr[ i ] ? arr[ i ][ j ] ? arr[ i ][ j ] : 0 : 0;


        const getNewValueForIndex:
            (
                i: number,
                j: number,
                arr: number[][]
            ) => number
            = ( i,j,arr ) =>
            {

                const currentValue = getCurrentValueFromIndex( i,j ),
                    neighbours = neighboursCount( i,j,arr );
                let newValue = 0;

                if ( currentValue && neighbours < 4 && neighbours >= 2 )
                {
                    newValue = 1;

                } else if ( !currentValue && neighbours === 3 )
                {
                    newValue = 1;
                }

                return newValue;

            };


        /**
         * Function to change the grid n next tick
         */
        const nextTick: () => void = () =>
        {
            let newArray = [];

            for ( let i = 0; i < width; i++ )
            {
                let tr = [];
                for ( let j = 0; j < height; j++ )
                {
                    tr.push( getNewValueForIndex( i,j,grid ) );
                }
                newArray.push( tr );
            }

            setGrid( newArray );

        };

        const restartGame: () => void = () =>
        {
            setGrid( generateInitialGrid( height,width ) );
        };


        /**
         * Lifecycle
         */
        useEffect( () =>
        {
            setGrid( generateInitialGrid( height,width ) );
        },[ height,width ] );

        return {
            grid,
            nextTick,
            restartGame
        };
    };

export default useGame;