import React from 'react'
import IconButton from '../template/iconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(Todocadastro => (
            <tr key={Todocadastro._id}>
                <td >{Todocadastro.name}</td>
                <td >{Todocadastro.date}</td>
                <td >
                    <IconButton style='danger' icon='trash-o'
                        onClick={() => props.handleRemove(Todocadastro)} />
                </td>
            </tr>
        ))
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Nomes</th>
                    <th >Data / Hora</th>
                    <th className="tableActions" >Excluir</th>
                </tr>
            </thead>
            <tbody >
                {renderRows()}
            </tbody>
        </table>
    )
}