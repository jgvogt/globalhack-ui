import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FaceIcon from '@material-ui/icons/Face';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Search from "./search";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: "#078b75"
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    formControl: {
        width: "100%"
    }
});

class SignUp extends React.Component {
static propTypes = {
        classes: PropTypes.object.isRequired,
        onSearch: PropTypes.func
    };

static defaultProps = {
        onSearch: null
    };

    onTagSearch = (query, name) => {
        //set the array that returns to state
        //console.log(query);
        this.setState({[name]:query});
    };

    state = {
        firstName: "",
        lastName: "",
        zipCode: "",
        phone: "",
        email: "",
        gender: "UNSPECIFIED",
        language: [],
        skill: [],
        selectedSkills: [],
        selectedLanguages: []
    };

    search(searchType) {
        //Load search suggestions
        if(!searchType) return;
        fetch(`/api/tags/type?type=${searchType}`).then(response => response.json())
            .then(tags => {
                this.setState({[searchType] : tags});
            });
    }

    handleSkillChange = event => {
        this.setState({selectedSkills: event.target.value});
    };

    handleLanguageChange = event => {
        this.setState({selectedLanguages: event.target.value});
    };


    handleChange(e, name) {
        this.setState({[name]: e.target.value});
    }

    componentWillMount() {
        this.search('skill');
        this.search('language');
    }

    onFormSubmit(event) {
        event.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            postalCode: this.state.postalCode,
            phone: this.state.phone,
            email: this.state.email,
            gender: this.state.gender,
            tags: [...this.state.selectedSkills.map(i => {return{id:i.id}}), ...this.state.selectedLanguages.map(i => {return{id:i.id}})]
        }
        //console.log(data);
        fetch('/api/ambassadors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                data
            )
        });
        //console.log("submit");
    }
    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5" style={{textAlign: "center"}}>
                            Ambassador Application
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    autoComplete="firstName"
                                    autoFocus
                                    onChange={(e) => this.handleChange(e, "firstName")} value={this.state.firstName}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="lastName">
                                    Last Name
                                </InputLabel>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="lastName"
                                    autoFocus
                                    onChange={(e) => this.handleChange(e, "lastName")} value={this.state.lastName}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="Zip Code">
                                    Zip Code
                                </InputLabel>
                                <Input
                                    name="Zip Code"
                                    type="Zip Code"
                                    id="Zip Code"
                                    onChange={(e) => this.handleChange(e, "postalCode")} value={this.state.postalCode}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="Phone Number">
                                    Phone
                                </InputLabel>
                                <Input
                                    name="Phone Number"
                                    type="Phone Number"
                                    id="Phone Number"
                                    onChange={(e) => this.handleChange(e, "phone")} value={this.state.phone}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="Email">
                                    Email
                                </InputLabel>
                                <Input
                                    name="Email"
                                    type="Email"
                                    id="Email"
                                    onChange={(e) => this.handleChange(e, "email")} value={this.state.email}
                                />
                            </FormControl>
                            <div style={{paddingTop: "16px"}}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="Gender">Gender</InputLabel>
                                    <Select
                                        onChange={(e) => this.handleChange(e, "gender")} value={this.state.gender}
                                    >
                                        <MenuItem value={"MALE"}>Male</MenuItem>
                                        <MenuItem value={"FEMALE"}>Female</MenuItem>
                                        <MenuItem value={"UNSPECIFIED"}>Unspecified</MenuItem>
                                        <MenuItem value={"OTHER"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div></div>

    <div style={{paddingTop: "16px"}}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="skills">Skills</InputLabel>
          <Select
            multiple
            value={this.state.selectedSkills}
            onChange={this.handleSkillChange}
            input={<Input id="skills" />}
            renderValue={selected => (
              <div style={{display: "flex", flexWrap: "wrap"}}>
                {selected.map(value => (
                  <Chip
                    key={value.id}
                    value={value}
                    label={value.name}
                    style={{display: "flex", flexWrap: "wrap"}}
                  />
                ))}
              </div>
            )}
          >
            {this.state.skill.map(i => (
              <MenuItem
                key={i.id}
                value={i}
              >
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </div>
    <div style={{paddingTop: "16px"}}>
        <FormControl className={classes.formControl}>

          <InputLabel htmlFor="languages">Languages</InputLabel>
          <Select
            multiple
            value={this.state.selectedLanguages}
            onChange={this.handleLanguageChange}
            input={<Input id="languages" />}
            renderValue={selected => (
              <div style={{display: "flex", flexWrap: "wrap"}}>
                {selected.map(value => (
                  <Chip
                    key={value.id}
                    value={value}
                    label={value.name}
                    style={{display: "flex", flexWrap: "wrap"}}
                  />
                ))}
              </div>
            )}
          >
            {this.state.language.map(i => (
              <MenuItem
                key={i.id}
                value={i}
              >
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </div>

                            <Button
                                style={{color: "#fff", backgroundColor: "#078b75"}}
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                                onClick={(e) => this.onFormSubmit(e)}
                            >
                                Sign Up
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(SignUp);
