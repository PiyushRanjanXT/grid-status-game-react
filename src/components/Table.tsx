import React from 'react';

const Table: React.FC<{ grid: number[][]; }> = ( { grid } ) =>
{
    return (
        <table>
            <tbody>
            {
                grid.map( (row,index) =>
                {
                    return (
                        <tr key={`row-${index}-${row}`}>
                            { row.map( (flag,indexColl) => ( 
                            <td 
                            className={ flag ? 'black' : 'white' }
                            key={`col-${index}-${indexColl}-${flag}`}
                            ></td> ) ) }
                        </tr>
                    );
                } )
            }
            </tbody>
        </table>
    );
};

export default Table;