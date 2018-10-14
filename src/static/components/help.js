import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Card, CardContent, Typography} from "@material-ui/core";

class Help extends Component {
    render() {
        return (
                <Card style={{maxWidth: "1000px", margin: "auto", marginTop: "12px"}}>
                    <CardContent>
                        <Typography color="textSecondary" style={{fontSize: "18px"}}>
You're in an entirely new place and want to get settled but don't know where to begin.  Set up a meeting with a local organization serving Immigrants and Refugees. During your appointment, they will match you with a local, trusted Ambassador that can help navigate you through your transition.  These Ambassadors are individuals who are eager to help you become familiar with finding local resources, navigate the systems, and who are ready to show you the answers when you have questions. 
                        </Typography>
                    </CardContent>
                </Card>
        );
    }
}

export default Help;
