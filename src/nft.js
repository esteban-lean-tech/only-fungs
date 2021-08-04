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

const useStyles = makeStyles({
    root: {
      width: 600,
      height: 750,
      marginTop: 30
    },
    media: {
      width: 600,
      height: 600,
      objectFit: 'contain'
    },
  });



export default function NFT({author, imageUrl, owner, price, caption}) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    function purchaseNFT(owner) {
      Swal.fire(
        'Good job!',
        'You purchased NFT from ' + owner,
        'success'
      )
    }

    return(
        <Card className={classes.root}>

        <CardActionArea>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {author}
            </Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={imageUrl}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
               {owner && 
                 <p>Owned by <strong>{owner}</strong></p>
               }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {caption}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" variant="contained" color="primary" onClick={() => purchaseNFT(owner)}>
            Purchase Ξ {price}
          </Button>
        </CardActions>
      </Card>
    )
}
