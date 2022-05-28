import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCarga, deleteTablero } from '../api/requests';
import { IdsContext } from "../App";
import { AvailableDataContext } from './Upload';

function BoardRow(props) {

	const { ids } = useContext(IdsContext);
	const { setCargas, listaTableros, setTableros } = useContext(AvailableDataContext);

	async function handleClickDelete(e) {
		e.preventDefault();
		if (props.type === "carga") {
			await deleteCarga(ids["usuario"], props.id);
			setCargas(undefined);
		}
		else if (props.type === "tablero") {
			await deleteTablero(ids["usuario"], props.id);
			setTableros(listaTableros.filter(tablero => tablero.id !== props.id));
		}
	}

	return (
		<li
			className="h6"
			style={ {
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'baseline',
				paddingRight: '10px'
			} }>
			{ props.name }
			<div>
				<Button
					size="sm"
					style={ {
						color: 'black',
						borderColor: 'transparent',
						backgroundColor: 'transparent'
					} }>
					<VisibilityIcon fontSize="small" />
				</Button>
				<Button
					size="sm"
					style={ {
						color: 'black',
						borderColor: 'transparent',
						backgroundColor: 'transparent'
					} }>
					<DownloadIcon fontSize="small" />
				</Button>
				<Button
					size="sm"
					style={ {
						color: 'black',
						borderColor: 'transparent',
						backgroundColor: 'transparent'
					} }
					onClick={ handleClickDelete }>
					<DeleteIcon fontSize="small" />
				</Button>
			</div>
		</li>
	);

}

export default BoardRow;