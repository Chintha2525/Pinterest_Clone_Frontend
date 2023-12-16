import React, { useState, useContext } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/LoginForm';
import Register from '../Register/Register';
import axios from 'axios';
import { Config } from '../../config/config';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        className: 'f-family',
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

const Header = (props) => {

  const { user, logout } = useContext(AuthContext);

  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate()

  const show = () => {
    setModalShow(true);
  };
  const hide = () => {
    setModalShow(false);
  };

  const [rshow, setrModalShow] = useState(false);
  const sshow = () => {
    setrModalShow(true);
  };
  const rhide = () => {
    setrModalShow(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    borderRadius: '50px',
    lineHeight: 1.5,
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#ffffff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#000000',
      borderRadius: '50px',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#000000',
      color: '#ffffff',
      borderRadius: '50px',
      borderColor: '#000000',
    },
  });

  // Delete Account
  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) {
      return
    }
    else {
      const res = await axios.delete(`${Config.api}/user/${user.ID}`)
      alert("User account deleted")
      logout()
      window.location.reload()

    }
  }

  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = () => {
    navigate(`/search/${searchInput}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };


  const userHome = () => {
    setAnchorEl(null);
    navigate("/")
  }

  const userExplore = () => {
    setAnchorEl(null);
    navigate("/explore")
  }

  const userPinCreation = () => {
    setAnchorEl(null);
    navigate("/pinCreation")
  }

  const userSaved = () => {
    navigate("/saved")
  }

  const userUpdate = () => {
    navigate("/update")
  }
  // Logout user
  const userLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className='header'>
      <div className='header-inner'>
        <Link to='/' className='header-logo'>
          <img
            src='https://www.pngmart.com/files/22/Pinterest-Logo-Transparent-Images-PNG.png'
            alt=''
          />
        </Link>
        <div className='menu-items'>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Home
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={userHome} className='header-create-link' disableRipple>
              <BootstrapButton variant="contained" disableRipple>
                Home
              </BootstrapButton>
            </MenuItem>
            <MenuItem onClick={userExplore} className='header-create-link' disableRipple>
              <BootstrapButton variant="contained" disableRipple>
                Explore
              </BootstrapButton>
            </MenuItem>
            <MenuItem onClick={userPinCreation} className='header-create-link' disableRipple>
              <BootstrapButton variant="contained" disableRipple>
                Create
              </BootstrapButton>
            </MenuItem>
          </StyledMenu>
        </div>
        <div className='header-opt1'>
          <div className='header-home'>
            <Link to='/' className='header-create-link'>
              <BootstrapButton variant="contained" disableRipple>
                Home
              </BootstrapButton>
            </Link>
          </div>
          <Login show={modalShow} onHide={hide}></Login>
          <Register show={rshow} onHide={rhide}></Register>
          {user && (
            <div className='header-explore'>
              <Link to='/explore' className='header-create-link'>
                <BootstrapButton variant="contained" disableRipple>
                  Explore
                </BootstrapButton>
              </Link>
            </div>
          )}

          {user && (
            <div className='header-create'>
              <Link to='/pinCreation' className='header-create-link'>
                <BootstrapButton variant="contained" disableRipple>
                  Create
                </BootstrapButton>
              </Link>
            </div>
          )}
        </div>



        {user && (
          <div className='header-search'>
            <div className='header-search-icon' onClick={handleSubmit}>
              <SearchIcon />
            </div>
            <div className="header-search-input">
              <StyledInputBase
                placeholder="Search"
                className='header-search-input-style'
                inputProps={{ 'aria-label': 'search' }}
                value={searchInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        )}


        {user && (
          <div className='header-opt2'>
            {user && (
              <div className='header-notification'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>
              </div>
            )}
            {user && (
              <div className='header-message'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                  <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </div>
            )}
            {user && (
              <div className='header-profile'>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar style={{ background: 'gray', fontSize: '18px', fontWeight: '500' }}>{user.Name.charAt(0).toUpperCase()}</Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={userSaved}>Saved Pins</MenuItem>
                    <MenuItem onClick={userUpdate}>Profile Update</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete Account</MenuItem>
                    <MenuItem onClick={userLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              </div>
            )}
          </div>
        )}
        <div className='header-search header-search-hide'>
          {user && (
            <div className='header-search-icon'>
              <SearchIcon />
            </div>
          )}
          {user && (
            <div className="header-search-input">
              <StyledInputBase
                placeholder="Search"
                className='header-search-input-style'
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          )}
        </div>

        {user == null && (
          <div className="cx-7">
            <button onClick={show} className="header-ua-login" >Login</button>
            <button onClick={sshow} className="header-ua-signin">Sign Up</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header;

