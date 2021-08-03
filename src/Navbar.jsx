import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Arweave from 'arweave';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
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
  const [image, setImage] = useState(null);
  const [base64img, setbase64img] = useState(null);

  useEffect(() => {
    // TODO: Set auth state here
    setAuthed(true);
  }, []);

  async function writeTransaction(buffer) {
    console.log('DATA IN WRITE ', buffer);
    const arweave = Arweave.init();
    const wallet = {
      d: 'IN7pf8Fyw11Qo6yCs7AGnZuSMK0wr9BfnZ2obOEHrysFzO_7mUSBMQ5NxaRwKwUuzMLAieO4Ilf8Xy4E8-0JNpQrKT0ikujl6vwIVSv1iuH3_5PXFKU3AvN5GpQm1LVLY9pHNNEviq95uhYfNbwKEZm6qDMdyQcfrp0qDyF33824SN1Jr7h9PzPOvBHBi_WYzHVYbfe282bzx5GmQZiFHHfJS4jxvJt1ZwEJm5U-c6LveZBVEpir81jea3i7rU-YrsolqnKD4dUppSMANvHmMIjxXCM6CWerwYVuFzH9qOq0leeco8F79rGMfgnz4Il9SlSc3YasHtf-gmZdy6PTx9eRTUeOq6LhFLMFqw3a14_bmzophg2pRP01w2po3yDQXWxRLrTSwrh4H-Y8RuG8wMB-Y9oAusavr7MIiXUih4vFNg8GBNzpvWdRxhqQiKQe1i_hq8D-Vv5NFJ_MAHg98-eeO5a2GDGrYqWrs4fSS1kyAIMJayIoHjCDMDsgX4KO0zmmMbbqzD2Hx8bjxPhxV7fAAu8zQQ2hsnFOHY4DCEg9EctoET7iq-r-wqxFXpRWnGezAeH4aNsGVoRrsaO4AlOjCWGlUHeRtQATzTi2FBEVwULRNM6i8LqTYbfZGcUh6V2G-TUOy8lqkYBCkpEZKiP2w40YAjHPdUStNdx2M2E',
      dp: 'UHgOFemGcpcKUIhVg9dvGFGGXH914WshkPbtILgnszWKd-5LJsBK4UabgIdFa0CGHnfH_xgozq0bzEtW1vwoAD5RBvn9lQn-MqDBxbsBBcvYkw600vkoUAerrTNHOMJKiu0IFqWwpkRERyku-9e_qAQVQ5Cs0kR4MgfJCZLVVq8voDZ9VUy3SK3hvemdT54I8WZ1Q5sD1jx1nmZjaDDwUfFTBPC63wzchDPT7DndncWDJXX93Rt7XF52tcfph8ju5HHhHO6-PcRXtdCfR1pnjDw88DPowFByBKm4QA1_U4ReplY4hTiLTsTFH3yFET0jYf1hOPbo_7cv21eQXM9urQ',
      dq: 'i_epIaXERLf_pr5wC8FL-DuHQOvteUCzqJlYKb1IPtGsVyX_o9bZ0tlE4hD4nZNtyXenWMqtYxTZQ2K2dyabe2YVQHtyyHjavu2G_jn1TbG_LxDylyaaUr4yZV8G7VZjlBid0OLKbd-RoTWOBtL771oL9WgTutVBssK_fnpNgRvD7HnGvf16v926EwFNGvXN9anp_Ej2BydgBmaFQHhrOogI1dFQLfBI6CzWgIzCp4CIt9CxDDunbnA6IfUEOT2HqIjgahp7QYoZTxsbYPCHAD-0TOKMR3SpHEpN6AwxCBYEVnfQUmMY2VdFKP9RkVbwUvXOlTpkxVurDcqjlZED_Q',
      e: 'AQAB',
      ext: true,
      kty: 'RSA',
      n: 'lbm5zWEM0zw10orlUIrSw8HvkGTNM8J_pNp1VYBmxgtVVSbMI5ZI1cl2bTb5zGzsUgQUb_SmE8maWpJB8DxNNoqHUewj3uV32VFoJMzgc24CcoKlH79My7vkEQg1rYQF2zwNFEphJTRjhidPI5Jk4K5xet8nksUDKZQeHD8KDsK5TXYd-w6JNgmACIyXIBUmrp6DJ6T9R6GdC_toCahLh4ZCP2GrHw0zyOLm9YR7_pntAaIsUfK8h-EASm3fOg_oDtqSjOuvzBBuWuVoA70Mf4We3yE0QBVxZUvukwofFQB0KTYQSWocL8hCUtCQPE4_sb8UCXUayXxJof_cc1MwHIpvm4YFRExCftwA-tTLvwbH8QHQWZfdJQImOeO9iIoSOJVk-l3WAKQUUTo5vv_-j8awvOpK_cE0TlyO-SGJHgLaOOl1bz-sZ3sP95ReAEG5u1L2NDBEbveou2JMSixzTd36i0Ti4Zb83QPu8qH_pbkl3_VEy5aq2qYtZhoU66O3LrK8Yx-bsLzWtgIKaUJpgk55kdSq2rxaQk4tZuuz_xY1Jd8NRlPEZKXDkL2P2kOtr3I9oXiVGYqjIKO27eTPGocCD7vLkkCNJvLYF3MXFHouFNZpa53Isf-CX5QSoPD9stAr1zQf--KAc34IN7SD5zr9SWETEgg7uNPrykVYVLM',
      p: '_Ck1aueYvVsbC-fi96ncse_gDWOYHM1iibzAUe4JMniQ5dbDLU7TMbDJ0AB26WDwGW9MGSsovzjA1Me1BJ1aUOoOUBcqgxEzcU-LWl6hDBRyQ83cbMUQoyR_dbejgqy7GazymtdHdcpRwp53-HG7yt9h2NqSra98qhhfMxc4J2vRrJgMF1TJGxDlriCAZQBfw3mhepSxKU2tVmTvBGLpDCNpXtAJ_FMVe6inD3gzZ_YF3OhqlIT81xC1mscfKS7dhdkklbmuCwxVBnFP-tShXQzqfIWUxmkNjTqYPvAnLq6T2cVgxHNDlY6A-FuEfUXaPULlwqbWyAOFIqJCAYPsRw',
      q: 'mAFG_Tmni4vNEnU40v4PZ8pGg7-qXWVCZAIf0hKDOgCZTBWHJkDeiFRvLMzwufVVI6CW4tXfREUHig03xU92SrpCAo6GKU7wQ9dirwalOsd6MIn-wNO0pgFe7KQE43OoO3m8cje_SOsDFltYyy98RCduk8328VJ5O1P_4uxuU6-KIzmz0ZvltFkKyEkRJMDinMwUPF6cACz2j2_z4VP2mFCdZBgAgYF8eGqF2F3q3ecMeBeftR7vu1gH6qZk6bcMMBupqOeB6Cxm2fQ-LEMTi_sMKilzWQz0IVuPDOrvFE2U-RlD55jG9Tijizl--4kBueL3A-ts93Q3CP8K-atGNQ',
      qi: 'A4PAqTP3mmHq6epExJClx4CCuhWm8642xTuEg4gpx5aoBJ5_KwnbyQ_O4Vu0KYz1xHwGXrxH7vbcvq6QJ6la4vRyNstOZlVNJC18a-XbIYcjuil6s5Kjqck7Ra06TjJPe3VUdCH_jKVUVeIi1GFMfgLk2-8T6qmCJJTcyC75wvs-KkBO2QwBOqV5IWiACc59L3pdco21cbkKInaz7EDC70xZBaCbaW1jpmrpyuuNTwt3ol6jMIhMWLhcFyHEneQgju5HfVXAR8V5uETge5XU7V6Fk5go7obbIeWxN8toWB_vp_Gm9xMP3-Stq1wD3QzdyIJWmnBpgVk8mgNCzgdv2A',
    };

    console.log('BUFFER IN WRITE ', buffer);
    let transactionA = await arweave.createTransaction(
      {
        data: buffer,
      },
      wallet
    );

    transactionA.addTag('Content-Type', 'image/png');

    console.log('BEFORE TRANSACTION ', transactionA);
    await arweave.transactions.sign(transactionA, wallet);
    console.log('AFTER SIGNING ', transactionA);
    let uploader = await arweave.transactions.getUploader(transactionA);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }
  }

  const handleOpen = () => {
    setPostImageModalIsOpen(true);
  };

  const handleClose = () => {
    setPostImageModalIsOpen(false);
  };

  //   async function base64ToFile(dataURL, fileName) {
  //     const arr = dataURL.split(',');
  //     const mime = arr[0].match(/:(.*?);/)[1];
  //     return fetch(dataURL).then(function (result) {
  //       return result.arrayBuffer();
  //     });
  //   }

  const uploadImage = (event) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      var arrayBuffer = reader.result;
      console.log('TYPE OF BUFFER', typeof arrayBuffer);
      writeTransaction(arrayBuffer);
    };

    console.log('upload image');
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log('IMG ', img);
      setImage(URL.createObjectURL(img));

      img.arrayBuffer((buffer) => {
        console.log('THIS IS THE BUFFER ', buffer);
        writeTransaction(buffer);
      });
      //   const buffer = reader.readAsArrayBuffer(img);

      //   reader.readAsArrayBuffer(img);
    }

    // TODO: Upload image here
  };

  return (
    <div className={classes.root}>
      {authed ? (
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
            <Button
              variant="contained"
              color="secondary"
              onClick={(event) => handleOpen(event)}
            >
              Post a cool image
            </Button>
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
                />

                <TextField
                  id="outlined-basic"
                  label="Private Key"
                  variant="outlined"
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
                      <img src={image} alt="image uploaded" />
                    </div>
                  </div>
                </div>
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
