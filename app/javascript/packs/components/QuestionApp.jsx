import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'
import QuestionItems from './QuestionItems'
import ReactPaginate from 'react-paginate';

import Spinner from './Spinner'
class QuestionApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            isLoading: true,
            errorMessage: null,
            currentPage: 1,
            sort: "created_at",
            sort_dir: "asc"
        }
        this.fetchQuestions = this.fetchQuestions.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.handleSorting = this.handleSorting.bind(this)
    }
    componentDidMount() {
        this.fetchQuestions({})
    }
    fetchQuestions(args) {
        const params = {}
        if (args.page !== 'undefined' || typeof (args.page) !== 'undefined') {
            params["page"] = args.page
        }
        if (args.sort !== 'undefined' || typeof (args.sort) !== 'undefined') {
            params["sort"] = args.sort
        }
        if (args.sort_dir !== 'undefined' || typeof (args.sort_dir) !== 'undefined')   {
            params["sort_dir"] = args.sort_dir
        }
        axios
            .get('/api/v1/questions', { params })
            .then(response => {
                this.setState({ isLoading: true })
                const questions = response.data
                this.setState({ questions })
                this.setState({ isLoading: false })
            })
            .catch(error => {
                this.setState({ isLoading: true })
                this.setState({
                    errorMessage: {
                        message:
                            'There was an error loading your questions...',
                    },
                })
            })
    }
    

    handlePageClick(page) {
        const args = { page: page["selected"] };
        const { sort, sort_dir } = this.state;
        if(sort && sort_dir) {
          args["sort"] = sort
          args["sort_dir"] = sort_dir
        }
        this.fetchQuestions(args);
    }
    handleSorting() {
        const args = {};
        const { sort, sort_dir } = this.state;
        if(sort && sort_dir) {
          args["sort"] = sort
          args["sort_dir"] = sort_dir
        }
        this.fetchQuestions(args);
    }
    render() {
        return (
            <>
                {this.state.errorMessage && (
                    'Error'
                )}
                {!this.state.isLoading && (
                    <>
                        <hr />
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th 
                                            scope="col" 
                                            onClick={() => {
                                                this.setState({ sort: 'title' })
                                                this.handleSorting
                                            }}>
                                            Question
                                        </th>
                                        <th scope="col">Teaming Stages</th>
                                        <th scope="col">Appears (Day)</th>
                                        <th scope="col">Frequency</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Required?</th>
                                        <th scope="col">Conditions</th>
                                        <th scope="col">Mapping</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <QuestionItems questionItems={this.state.questions} />
                                </tbody>
                            </table>
                            <ReactPaginate
                                previousLabel={"← Previous"}
                                nextLabel={"Next →"}
                                pageCount={Math.ceil(this.state.questions.meta.total_count / this.state.questions.meta.per)}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                previousLinkClassName={"pagination__link"}
                                nextLinkClassName={"pagination__link"}
                                disabledClassName={"pagination__link--disabled"}
                                activeClassName={"pagination__link--active"}
                              />
                            <span className='paginationTotalCount'>Total {this.state.questions.meta.total_count}</span>
                        </div>
                    </>
                )}
                {this.state.isLoading && <Spinner />}
            </>
        )
    }
}

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('question-app')
    app && ReactDOM.render(<QuestionApp />, app)
})