import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2'
import Arweave from 'arweave';
import { interactWrite } from 'smartweave';
import { useState, useEffect } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
      width: 600,
      marginTop: 30
    },
    media: {
      width: 600,
      height: 500,
      objectFit: 'contain'
    },
    likeButton: {
      width: "48%",
      color: '#8A939B'
    },
    likeButtonGreen: {
      width: "48%",
      color: '#00BF13'
    },
    dislikeButtonRed: {
      width: "48%",
      color: '#BF0A0A'
    },
    caption: {
      color: '#8A939B',
      marginLeft: '1em',
      fontSize: '19px',
    },
    priceText: {
      color: '#8A939B',
      fontStyle: 'Raleway',
      fontSize: '24px'
    },
    bluePriceText: {
      color: '#2DABE2',
      fontSize: '24px'
    },
    buyButton: {
      backgroundColor: '#2DABE2',
      color: 'white',
      paddingTop: 8,
      paddingBottom: 8.5,
      paddingLeft: 50,
      paddingRight: 50,
      fontSize: '21px',
      textTransform: "none",
      marginLeft: 90,
      fontWeight: 700
    },
    likeButtonsDiv: {
      display: "flex",
      justifyContent: "space-between"
    }
  });

export default function NFT({author, imageUrl, owner, price, caption, id, contractId}) {
  const classes = useStyles();

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

const [nftLiked, setNftLiked] = useState(false);
const [nftDisliked, setNftDisliked] = useState(false);

async function purchaseNFT(owner, id, contractId) {
  console.log('Purchase NFT clicked!');
  const arweave = Arweave.init();
  const input = {
    id: id,
    function: 'buy',
  };
  console.log(id, "NFTID")
  const txid = await interactWrite(arweave, wallet, contractId, input);
  console.log('TX ID ', txid);
  
        Swal.fire(
        'Good job!',
        'You purchased NFT from ' + owner,
        'success'
      )

}

  function likeNft() {
    setNftLiked(true)
  }

  function dislikeNft() {
    setNftDisliked(true)
  }

  function removeLike () {
    setNftLiked(false)
  }

  function removeDislike() {
    setNftDisliked(false)
  }

// export default function NFT({imageUrl, ownedBy, id, price, caption}) {
//     const classes = useStyles();
//     const bull = <span className={classes.bullet}>•</span>;
//     const [contractId, setContractId] = useState(
//       'uOfZLIaT4qaLDXJau0twfkgqnPQhwm86Kjw02w1O3-g'
//   );

    return(
        <Card className={classes.root} disableRipple>

        
          <CardContent>
            <Box flexDirection="row" display='flex' justifyContent="space-between">
              <div>
                <Typography variant="overline" gutterBottom><strong>AUTHOR:</strong> <Typography variant="body1" component="span">{author}</Typography></Typography> 
                <br/>
                <Typography variant="overline" gutterBottom><strong>CURRENT OWNER:</strong> <Typography variant="body1" component="span">{owner}</Typography></Typography>
              </div>
              <div className={classes.likeButtonsDiv}>
                {nftLiked ? (
                  <Button size="small" className={classes.likeButtonGreen} onClick={() => {removeLike()}}>
                    <ThumbUpIcon/>
                  </Button>
                ) : (
                  <Button size="small" className={classes.likeButton} onClick={() => {likeNft()}}>
                    <ThumbUpIcon/>
                  </Button>
                )}
                {nftDisliked ? (
                  <Button size="small" className={classes.dislikeButtonRed} onClick={() => {removeDislike()}}>
                    <ThumbDownIcon/>
                  </Button>
                ) : (
                  <Button size="small" className={classes.likeButton} onClick={() => {dislikeNft()}}>
                    <ThumbDownIcon/>
                  </Button>
                )}
              </div>
            </Box>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={imageUrl}
          />
          <CardContent style={{paddingBottom: 12}}>
            <Typography variant="body2" color="textSecondary" component="p">
              <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.42553 0L3.8883 9.63636H6.05851V19H0V9.63636L2.26064 0H5.42553ZM16.367 0L14.8298 9.63636H17V19H10.9415V9.63636L13.2021 0H16.367Z" fill="#8A939B" fill-opacity="0.25"/>
              </svg>
              <em className={classes.caption}>{caption}</em>
            </Typography>
            <br></br>
            <Box flexDirection="row" display='flex' justifyContent="space-between" alignItems="center">
              <Box p={1}>
                <Typography variant="overline" gutterBottom><strong>CURRENT PRICE</strong></Typography>
                <Typography gutterBottom className={classes.priceText}><span className={classes.bluePriceText}>$78.00</span> / 10.2 ⓐ</Typography>
              </Box>
              <Box>
                <CardActions>
                <Button size="small" variant="contained" disableRipple className={classes.buyButton} onClick={() => purchaseNFT(owner, id, contractId)}>
                  Buy Now
                </Button>
                </CardActions>
              </Box>
            </Box>
          </CardContent>
        

      </Card>
    )
}
