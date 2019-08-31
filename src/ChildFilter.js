import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import MultiSelect from "@khanacademy/react-multi-select";


class ChildFilter extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            age_lower: '',
            age_upper: '',
            hasUmvelt: false,
            selected: [],
            filterChanged: false
         }
    }

    componentDidMount() {
        const { currentFilter } = this.props;

        this.setState({
            age_lower: currentFilter.hasOwnProperty('age_lower')? currentFilter.age_lower : '',
            age_upper: currentFilter.hasOwnProperty('age_upper')? currentFilter.age_upper : '',
            hasUmvelt: currentFilter.hasOwnProperty('hasUmvelt') ? currentFilter.hasUmvelt : false,
            selected: currentFilter.hasOwnProperty('childIds') ? currentFilter.childIds : []
        });

    }

    componentDidUpdate(prevProps){
        const { currentFilter } = this.props;

        if (prevProps.currentFilter != currentFilter) {
            this.setState({
                age_lower: currentFilter.hasOwnProperty('age_lower') ? currentFilter.age_lower : '',
                age_upper: currentFilter.hasOwnProperty('age_upper') ? currentFilter.age_upper : '',
                hasUmvelt: currentFilter.hasOwnProperty('hasUmvelt') ? currentFilter.hasUmvelt : false,
                selected: currentFilter.hasOwnProperty('childIds') ? currentFilter.childIds : [],
                filterChanged: false
            });       
        }
    }

    handleChildFilter = (selected) => {
        this.setState({
            selected,
            filterChanged: true
        })
    }

    handleAgeFilter = (e) => {
        const ageField = e.target.name,
            ageString = e.target.value;

        if (ageString.match(/^\d*$/)) {
            let currentState = this.state;

            currentState[ageField] = ageString;
            this.setState({ ...currentState, filterChanged: true });
        }
    }

    handleUmveltFilter = (e) => {
        this.setState({ 
            hasUmvelt: e.target.checked,
            filterChanged: true
        });
    }

    resetFilter = () => {
        const { currentFilter } = this.props;

        this.setState({
            age_lower: currentFilter.hasOwnProperty('age_lower') ? currentFilter.age_lower : '',
            age_upper: currentFilter.hasOwnProperty('age_upper') ? currentFilter.age_upper : '',
            hasUmvelt: currentFilter.hasOwnProperty('hasUmvelt') ? currentFilter.hasUmvelt : false,
            selected: currentFilter.hasOwnProperty('childIds') ? currentFilter.childIds : [],
            filterChanged: false    
        })
    }

    clearFilter = () => {
        this.props.filterHandler(this.buildQueryString({
            age_lower: '',
            age_upper: '',
            hasUmvelt: false,
            selected: []    
        }));
    }

    applyFilter = () => {
        this.props.filterHandler(this.buildQueryString(this.state));
    }

    buildQueryString = ({selected, age_lower, age_upper, hasUmvelt}) => {
        let queryString,
            childQuery = '',
            ageFilter = {},
            ageQuery = '',
            umveltQuery = '';

        if (selected) {
            childQuery = selected.map(param => (`id=${encodeURIComponent(param)}`)).join('&');
        }

        if (age_lower){
            ageFilter.age_lower = age_lower;
        }
        if (age_upper){
            ageFilter.age_upper = age_upper;
        }
        if (age_lower || age_upper) {
            ageQuery = new URLSearchParams(ageFilter).toString();
        }

        if (hasUmvelt) {
            umveltQuery = 'hasUmvelt=true';
        }

        // build up the query parameters
        queryString = childQuery;

        if (ageQuery) {
            queryString = queryString ? queryString.concat(`&${ageQuery}`) : ageQuery;
        }
        
        if (umveltQuery) {
            queryString = queryString ? queryString.concat(`&${umveltQuery}`) : umveltQuery;
        }

        return queryString;
    }
    
    render() {
        const { selected, age_lower, age_upper, hasUmvelt, filterChanged } = this.state,
            { childList } = this.props;

		return (
            <div>
                <Row>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Children:</Form.Label>
                            <MultiSelect
                                options={childList.map(child => ({label:`${child.firstname} ${child.lastname}`, value:child._id}))}
                                selected={selected}
                                onSelectedChanged={this.handleChildFilter}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Age between:</Form.Label>
                            <InputGroup>
                                <Form.Control type="input" name="age_lower" value={age_lower} onChange={this.handleAgeFilter}/>
                                <InputGroup.Text>-</InputGroup.Text>
                                <Form.Control type="input" name="age_upper" value={age_upper} onChange={this.handleAgeFilter}/>
                            </InputGroup>
                        </Form.Group>                    
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>&nbsp;</Form.Label>
                            <Form.Check 
                                type="checkbox"
                                id="child-is-umvelt"
                                label="Umvelt"
                                checked={hasUmvelt}
                                onClick={this.handleUmveltFilter}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>&nbsp;</Form.Label>
                            <ButtonToolbar>
                                <Button variant="secondary" size="sm" onClick={this.applyFilter}>Activate Filter</Button>
                                <Button variant="secondary" size="sm" onClick={this.clearFilter}>Clear Filter</Button>
                                <Button variant="secondary" size="sm" onClick={this.resetFilter} disabled={!filterChanged}>Reset</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Col>
                </Row>				
			</div>
		)
	}
}

export default ChildFilter