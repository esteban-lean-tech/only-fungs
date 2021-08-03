import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState,useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));

export const Navbar = () => {
    const classes = useStyles();
    const [authed, setAuthed] = useState(true); 
    const [postImageModalIsOpen, setPostImageModalIsOpen] = useState(false);

    useEffect(() => {
        // TODO: Set auth state here
        setAuthed(true)
    },[])


    const handleOpen = () => {
        setPostImageModalIsOpen(true);
    };

    const handleClose = () => {
        setPostImageModalIsOpen(false);
    }
    
    const uploadImage = () => {
        console.log('upload image')
        // TODO: Upload image here
    }

    return (
        <div className={classes.root}>
            {authed ? (
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                        OnlyFungs
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={handleOpen}>Post a cool image</Button>
                    </Toolbar>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={postImageModalIsOpen}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={postImageModalIsOpen}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Upload your image. Remember to smile :)</h2>
                            <TextField id="outlined-basic" label="Caption" variant="outlined" />
                            <br/>
                            <br/>
                            <Button variant="contained" color="secondary" onClick={uploadImage}>Upload</Button>
                        </div>
                        </Fade>
                    </Modal>
                </AppBar>
            ) : (
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            OnlyFungs
                        </Typography>
                        <Button color="inherit">Login to post your NFT</Button>
                    </Toolbar>
                </AppBar>
            )}
        </div>

      );
  }

export default Navbar;