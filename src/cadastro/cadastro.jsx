import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/cadastros'

export default class Cadastro extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    refresh(name = '') {
        const search = name ? `&name__regex=/${name}/` : '';
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({ ...this.state, name, list: resp.data }))

    }

    handleClear() {
        this.refresh()
    }

    handleMarkAsDone(Todocadastro) {
        axios.put(`${URL}/${Todocadastro._id}`, { ...Todocadastro, done: false })
            .then(resp => this.refresh(this.state.name))
    }
    handleMarkAsPending(Todocadastro) {
        axios.put(`${URL}/${Todocadastro._id}`, { ...Todocadastro, done: false })
            .then(resp => this.refresh(this.state.name))
    }
    handleSearch() {
        this.refresh(this.state.name)
    }

    handleChange(e) {
        this.setState({ ...this.state, name: e.target.value })
    }

    handleAdd() {
        const name = this.state.name
        axios.post(URL, { name })
            .then(resp => this.refresh())
    }

    handleRemove(Todocadastro) {
        axios.delete(`${URL}/${Todocadastro._id}`)
            .then(resp => this.refresh(this.state.name))
    }

    render() {
        return (
            <div>
                <PageHeader name='Cadastro' small='Pessoas'></PageHeader>
                <TodoForm
                    name={this.state.name}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <TodoList
                    list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleRemove={this.handleRemove} />

            </div>
        )
    }
}