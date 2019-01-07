5
6
7
8
3
4
1
2
9
10
import React from "react";

import "./header.css";
A
B
R
L
import { connect } from "react-redux";
import symbol from "../../img/symbol.png";
import healthswim from "../../img/Logo.png";
import filter from "../../img/filter.svg";
import expand from "../../img/expand.svg";
import menu from "../../img/menu.svg";
import profile_icon from "../../img/profile_icon.jpeg";
import { Link } from 'react-router-dom';
import { getPersonalProfile } from '../../actions/personalProfile.actions';
import { Dropdown } from 'react-bootstrap';


const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      searchText: "",
      displayFullSearch: false
    };
  }

  componentWillMount() {

    if (this.props.isLoggedIn) {
      this.props.getPersonalProfile();
    }

  }

  componentDidMount() {
    window.addEventListener("keyup", event => {
      // Cancel the default action, if needed
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Trigger the button element with a click
        // this.search();
      }
    });
  }

  navigate = value => {
    switch (value) {
      case "dashboard":
        this.props.history.push({ pathname: "/home" });
        break;
      case "profile":
        this.props.history.push({ pathname: "/myProfile" });
        break;
      case "content":
        this.props.history.push({ pathname: "/myContent" });
        break;
      case "logout":
        localStorage.clear();
        this.props.logoutSuccess();
        this.props.history.push({ pathname: "/login" });
        break;
      case "myFeed":
        this.props.history.push({ pathname: "/myFeed" });
        break;
      case "admin":
        this.props.history.push({ pathname: "/organizationProfile" });
        break;
      default:
        this.props.history.push({ pathname: "/home" });
        break;
    }
    this.props.toggleFullSearch(false);
    this.handleClose();
  };

  toggleFullSearch = value => {
    this.setState({ displayFullSearch: value });
  };

  search = () => {
    if (this.state.searchText) {
      this.props.search(this.state.searchText);
      this.props.history.push({ pathname: "/search" });
    }
  };

  onSearchTextChanged = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  render() {
    return (
      <header>

        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand">
            <img src={symbol} alt="symbol" className="logo ml-lg-5" />
            <img src={healthswim} alt="healthswim" className="healthswimWord" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

            </ul>
            {
              this.props.isLoggedIn
                ? (this.props.profile
                  ? (<div className="profile-info-container">
                    <div className="profile-img-container" style={{ backgroundImage: 'url(' + this.props.profile.profileImg + ')' }}>

                    </div>
                    <Dropdown alignRight>
                      <Dropdown.Toggle variant="" id="dropdown-menu">
                        {this.props.profile.firstName + " " + this.props.profile.lastName}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Link className="dropdown-item" role="button" to={'/dashboard'}>Dashboard</Link>
                        <Link className="dropdown-item" role="button" to={'/channel-setup'}>My Channels</Link>
                        <Link className="dropdown-item" role="button" to={'/profile-edit'}>My Profile</Link>
                        {/* <Dropdown.Item href="/action-3">My Feed</Dropdown.Item>
                        <Dropdown.Item href="/action-3">My Providers</Dropdown.Item> */}
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">Sign Out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>)
                  : "")
                : (<div className="form-inline my-2 my-lg-0 sign-in-sign-up mr-lg-5 ">
                  <Link className="" to={'/login'}>Sign In</Link> /
                  <Link className="" to={'/register'}>Sign Up</Link>
                </div>)
            }

          </div>



        </nav>




        <div className="headerBorder"></div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn,
  profile: state.personalProfile.profile
});

const mapDispatchToProps = {
  getPersonalProfile
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);

export default Header;
C
D
B1
B2
