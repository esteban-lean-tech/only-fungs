import React from "react";
import {
  createStyles,
  makeStyles,
  StylesProvider,
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Arweave from "arweave";
import { readContract, interactWrite } from "smartweave";
import { v4 as uuidv4 } from "uuid";
import logo from "./logo.png";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  logo: {
    height: 100,
  },
  nav: {
    background: "white",
  },
  addButton: {
    color: "white",
    backgroundColor: "#2DABE2",
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const [authed, setAuthed] = useState(true);
  const [caption, setCaption] = useState(null);
  const [postImageModalIsOpen, setPostImageModalIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [keys, setKeys] = useState(null);
  const [mime, setMime] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [contractId, setContractId] = useState(
    "uOfZLIaT4qaLDXJau0twfkgqnPQhwm86Kjw02w1O3-g"
  );

  useEffect(() => {
    console.log("THIS IS THE IMAGE ", image);
    // TODO: Set auth state here
    setAuthed(true);
  }, []);

  async function writeToFeed(keys, contractId, id) {
    console.log("write to feed clicked!");
    const arweave = Arweave.init();
    let url =
      "https://jri3bjkqioqidtpi3feozktl4y3tdoyzuxulr4a7wgvqle3m5c4q.arweave.net/" +
      id;
    const input = {
      caption,
      imageurl: url,
      id: uuidv4(),
      function: "post",
    };
    let jsonKeys = JSON.parse(keys);
    console.log("WRF ", keys);
    console.log("WRF ARWEAVE ", arweave);
    console.log("WRF ", contractId);
    console.log("WRF INPUT ", input);

    const txid = await interactWrite(arweave, jsonKeys, contractId, input);
    console.log("TX ID ", txid);
  }

  async function writeTransaction(buffer) {
    console.log("DATA IN WRITE ", buffer);
    console.log("KEYS IN WRITE ", keys);
    let jsonKeys = JSON.parse(keys);
    const arweave = Arweave.init();

    console.log("BUFFER IN WRITE ", buffer);
    let transactionA = await arweave.createTransaction(
      {
        data: buffer,
      },
      jsonKeys
    );

    transactionA.addTag("Content-Type", "image/png");

    console.log("BEFORE TRANSACTION ", transactionA);
    await arweave.transactions.sign(transactionA, jsonKeys);
    console.log("AFTER SIGNING ", transactionA);
    let uploader = await arweave.transactions.getUploader(transactionA);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }
    console.log("TRANSACTION ID ", transactionA.id);
    await writeToFeed(keys, contractId, transactionA.id);
  }

  //   TODO: Write the image to smart contract with image
  //   TODO: Get the private keys from the form
  //   TODO: Form validation button ci=lick

  const handleOpen = () => {
    setPostImageModalIsOpen(true);
  };

  const handleClose = () => {
    setPostImageModalIsOpen(false);
  };

  const submitImage = (event) => {
    console.log("IN METHOD");
    var reader = new FileReader();

    console.log("IMAGE SUBMITTED, heres the data ", imageData);

    reader.onload = function (e) {
      var arrayBuffer = reader.result;
      console.log("TYPE OF BUFFER", typeof arrayBuffer);
      writeTransaction(arrayBuffer);
    };
    reader.readAsArrayBuffer(imageData);
  };

  const uploadImage = (event) => {
    console.log("upload image");
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      //   TODO: Get MIME PROGRAMATICALLY
      setImage(URL.createObjectURL(img));
      setImageData(img);
      setMime(img.type);
      //   reader.readAsArrayBuffer(img);
    }
    // TODO: Upload image here
  };

  return (
    <div className={classes.root}>
      {authed ? (
        <AppBar className={classes.nav}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Toolbar className={classes.title}>
              <img
                src="https://arweave.net/913C9TEUYYimTCQZCkOM1Gwj3vaBngCBceRzjC7jW8k"
                className={classes.logo}
                alt="OnlyFung"
              />
            </Toolbar>
            <Fab
              className={classes.addButton}
              aria-label="add"
              onClick={(event) => handleOpen(event)}
            >
              <AddIcon />
            </Fab>
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
                <h2 id="transition-modal-title">
                  Upload your image. Remember to smile :)
                </h2>
                <TextField
                  id="outlined-basic"
                  label="Caption"
                  variant="outlined"
                  onChange={(e) => setCaption(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Private Key"
                  variant="outlined"
                  onChange={(e) => setKeys(e.target.value)}
                  inputProps={{ maxLength: 100000 }}
                />
                <br />
                <br />
                {/* <Button
                  variant="contained"
                  color="secondary"
                  onClick={uploadImage}
                >
                  Upload
                </Button> */}
                <input type="file" name="myImage" onChange={uploadImage} />

                <div>
                  <div>
                    <div>
                      <br />
                      <img src={image} alt="image uploaded" />
                    </div>
                  </div>
                </div>

                <br />
                <br />

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={submitImage}
                  disabled={!image || !keys}
                >
                  {" "}
                  Post Image
                </Button>
              </div>
            </Fade>
          </Modal>
        </AppBar>
      ) : (
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
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
};

export default Navbar;
