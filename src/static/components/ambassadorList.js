import React, {PureComponent} from "react"
import PropTypes from "prop-types";
import {List, ListItem, ListSubheader, Divider} from "@material-ui/core";
import Ambassador from "./ambassador"

class AmbassadorList extends PureComponent {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        ambassadors: PropTypes.array
    };
    static defaultProps = {
        ambassadors: null
    };
    render() {
        const {ambassadors} = this.props;
        return (
            <div style={{margin: "20px"}}>
                    <div>
                        <List subheader={
                            <ListSubheader component="div" style={{display: "flex", backgroundColor: "white", zIndex: 0}}>
                                <ListItem>Name</ListItem>
                                <ListItem>Skills</ListItem>
                                <ListItem>Languages</ListItem>
                                <ListItem style={{flexBasis: "60%"}}>Zip Code</ListItem>
                            </ListSubheader>
                        }>
                            <Divider />
                            {
                                ambassadors === null &&
                                    <div style={{display: "flex", justifyContent: "center", alignContent: "center", marginTop: 50, color: "darkGray"}}>Search For Ambassadors</div>

                            }
                            {
                                ambassadors?.length === 0 &&
                                    <div style={{display: "flex", justifyContent: "center", alignContent: "center", marginTop: 50, color: "darkGray"}}>No Results Were Found, Search Again</div>

                            }
                            {
                                ambassadors?.length > 0 &&
                                    ambassadors?.map(currentAmbassador =>
                                    <ListItem xs={12} sm={6} lg={4} xl={3} key={currentAmbassador.id} >
                                        <Ambassador ambassador={currentAmbassador} />
                                    </ListItem>)
                            }
                        </List>
                    </div>
            </div>
        )
    }
}

export default AmbassadorList;
