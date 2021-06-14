import React from 'react'
import PropTypes from 'prop-types'

class QuestionItems extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { questionItems } = this.props;
        console.log(questionItems)
        return (
            questionItems.data.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.teaming_stage}</td>
                        <td>{item.appears_on_day}</td>
                        <td>{item.frequency}</td>
                        <td>{item.type}</td>
                        <td>{item.role_id}</td>
                        <td>{item.is_required}</td>
                        <td>{item.conditions}</td>
                        <td>{item.mapping_id}</td>
                    </tr>
                )
            })
        )
    }
}

export default QuestionItems

QuestionItems.propTypes = {
    questionItems: PropTypes.object.isRequired
}