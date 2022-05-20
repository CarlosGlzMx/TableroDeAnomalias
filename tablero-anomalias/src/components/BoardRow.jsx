import React from 'react';
import { Button } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

const BoardRow = (props) => {

    return (
        <li
            className="h6"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingRight: '10px'
            }}>
            {props.name}
            <div>
                <Button
                    size="sm"
                    style={{
                        color: 'black',
                        borderColor: 'transparent',
                        backgroundColor: 'transparent'
                    }}>
                    <VisibilityIcon fontSize="small" />
                </Button>
                <Button
                    size="sm"
                    style={{
                        color: 'black',
                        borderColor: 'transparent',
                        backgroundColor: 'transparent'
                    }}>
                    <DownloadIcon fontSize="small" />
                </Button>
                <Button
                    size="sm"
                    style={{
                        color: 'black',
                        borderColor: 'transparent',
                        backgroundColor: 'transparent'
                    }}>
                    <DeleteIcon fontSize="small" />
                </Button>
            </div>
        </li>
    );

}

export default BoardRow;