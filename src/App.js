import styles from "./App.module.css";
import { useState, useEffect } from "react";
import NFT from "./nft";
import Navbar from "./Navbar";
import { readContract, interactWrite } from "smartweave";
import Arweave from "arweave";
import { write } from "ieee754";

async function getFeed(contractId) {
  const arweaveInstance = Arweave.init();
  const latestState = await readContract(arweaveInstance, contractId);
  console.log("FEED ", latestState);
  return latestState;
}

async function writeToFeed(keys, contractId) {
  console.log("write to feed clicked!");
  const arweave = Arweave.init();
  const input = {
    caption: "FIRST TEST",
    imageurl: "google.com",
    name: "varun",
    function: "post",
  };
  const wallet = {
    d: "IN7pf8Fyw11Qo6yCs7AGnZuSMK0wr9BfnZ2obOEHrysFzO_7mUSBMQ5NxaRwKwUuzMLAieO4Ilf8Xy4E8-0JNpQrKT0ikujl6vwIVSv1iuH3_5PXFKU3AvN5GpQm1LVLY9pHNNEviq95uhYfNbwKEZm6qDMdyQcfrp0qDyF33824SN1Jr7h9PzPOvBHBi_WYzHVYbfe282bzx5GmQZiFHHfJS4jxvJt1ZwEJm5U-c6LveZBVEpir81jea3i7rU-YrsolqnKD4dUppSMANvHmMIjxXCM6CWerwYVuFzH9qOq0leeco8F79rGMfgnz4Il9SlSc3YasHtf-gmZdy6PTx9eRTUeOq6LhFLMFqw3a14_bmzophg2pRP01w2po3yDQXWxRLrTSwrh4H-Y8RuG8wMB-Y9oAusavr7MIiXUih4vFNg8GBNzpvWdRxhqQiKQe1i_hq8D-Vv5NFJ_MAHg98-eeO5a2GDGrYqWrs4fSS1kyAIMJayIoHjCDMDsgX4KO0zmmMbbqzD2Hx8bjxPhxV7fAAu8zQQ2hsnFOHY4DCEg9EctoET7iq-r-wqxFXpRWnGezAeH4aNsGVoRrsaO4AlOjCWGlUHeRtQATzTi2FBEVwULRNM6i8LqTYbfZGcUh6V2G-TUOy8lqkYBCkpEZKiP2w40YAjHPdUStNdx2M2E",
    dp: "UHgOFemGcpcKUIhVg9dvGFGGXH914WshkPbtILgnszWKd-5LJsBK4UabgIdFa0CGHnfH_xgozq0bzEtW1vwoAD5RBvn9lQn-MqDBxbsBBcvYkw600vkoUAerrTNHOMJKiu0IFqWwpkRERyku-9e_qAQVQ5Cs0kR4MgfJCZLVVq8voDZ9VUy3SK3hvemdT54I8WZ1Q5sD1jx1nmZjaDDwUfFTBPC63wzchDPT7DndncWDJXX93Rt7XF52tcfph8ju5HHhHO6-PcRXtdCfR1pnjDw88DPowFByBKm4QA1_U4ReplY4hTiLTsTFH3yFET0jYf1hOPbo_7cv21eQXM9urQ",
    dq: "i_epIaXERLf_pr5wC8FL-DuHQOvteUCzqJlYKb1IPtGsVyX_o9bZ0tlE4hD4nZNtyXenWMqtYxTZQ2K2dyabe2YVQHtyyHjavu2G_jn1TbG_LxDylyaaUr4yZV8G7VZjlBid0OLKbd-RoTWOBtL771oL9WgTutVBssK_fnpNgRvD7HnGvf16v926EwFNGvXN9anp_Ej2BydgBmaFQHhrOogI1dFQLfBI6CzWgIzCp4CIt9CxDDunbnA6IfUEOT2HqIjgahp7QYoZTxsbYPCHAD-0TOKMR3SpHEpN6AwxCBYEVnfQUmMY2VdFKP9RkVbwUvXOlTpkxVurDcqjlZED_Q",
    e: "AQAB",
    ext: true,
    kty: "RSA",
    n: "lbm5zWEM0zw10orlUIrSw8HvkGTNM8J_pNp1VYBmxgtVVSbMI5ZI1cl2bTb5zGzsUgQUb_SmE8maWpJB8DxNNoqHUewj3uV32VFoJMzgc24CcoKlH79My7vkEQg1rYQF2zwNFEphJTRjhidPI5Jk4K5xet8nksUDKZQeHD8KDsK5TXYd-w6JNgmACIyXIBUmrp6DJ6T9R6GdC_toCahLh4ZCP2GrHw0zyOLm9YR7_pntAaIsUfK8h-EASm3fOg_oDtqSjOuvzBBuWuVoA70Mf4We3yE0QBVxZUvukwofFQB0KTYQSWocL8hCUtCQPE4_sb8UCXUayXxJof_cc1MwHIpvm4YFRExCftwA-tTLvwbH8QHQWZfdJQImOeO9iIoSOJVk-l3WAKQUUTo5vv_-j8awvOpK_cE0TlyO-SGJHgLaOOl1bz-sZ3sP95ReAEG5u1L2NDBEbveou2JMSixzTd36i0Ti4Zb83QPu8qH_pbkl3_VEy5aq2qYtZhoU66O3LrK8Yx-bsLzWtgIKaUJpgk55kdSq2rxaQk4tZuuz_xY1Jd8NRlPEZKXDkL2P2kOtr3I9oXiVGYqjIKO27eTPGocCD7vLkkCNJvLYF3MXFHouFNZpa53Isf-CX5QSoPD9stAr1zQf--KAc34IN7SD5zr9SWETEgg7uNPrykVYVLM",
    p: "_Ck1aueYvVsbC-fi96ncse_gDWOYHM1iibzAUe4JMniQ5dbDLU7TMbDJ0AB26WDwGW9MGSsovzjA1Me1BJ1aUOoOUBcqgxEzcU-LWl6hDBRyQ83cbMUQoyR_dbejgqy7GazymtdHdcpRwp53-HG7yt9h2NqSra98qhhfMxc4J2vRrJgMF1TJGxDlriCAZQBfw3mhepSxKU2tVmTvBGLpDCNpXtAJ_FMVe6inD3gzZ_YF3OhqlIT81xC1mscfKS7dhdkklbmuCwxVBnFP-tShXQzqfIWUxmkNjTqYPvAnLq6T2cVgxHNDlY6A-FuEfUXaPULlwqbWyAOFIqJCAYPsRw",
    q: "mAFG_Tmni4vNEnU40v4PZ8pGg7-qXWVCZAIf0hKDOgCZTBWHJkDeiFRvLMzwufVVI6CW4tXfREUHig03xU92SrpCAo6GKU7wQ9dirwalOsd6MIn-wNO0pgFe7KQE43OoO3m8cje_SOsDFltYyy98RCduk8328VJ5O1P_4uxuU6-KIzmz0ZvltFkKyEkRJMDinMwUPF6cACz2j2_z4VP2mFCdZBgAgYF8eGqF2F3q3ecMeBeftR7vu1gH6qZk6bcMMBupqOeB6Cxm2fQ-LEMTi_sMKilzWQz0IVuPDOrvFE2U-RlD55jG9Tijizl--4kBueL3A-ts93Q3CP8K-atGNQ",
    qi: "A4PAqTP3mmHq6epExJClx4CCuhWm8642xTuEg4gpx5aoBJ5_KwnbyQ_O4Vu0KYz1xHwGXrxH7vbcvq6QJ6la4vRyNstOZlVNJC18a-XbIYcjuil6s5Kjqck7Ra06TjJPe3VUdCH_jKVUVeIi1GFMfgLk2-8T6qmCJJTcyC75wvs-KkBO2QwBOqV5IWiACc59L3pdco21cbkKInaz7EDC70xZBaCbaW1jpmrpyuuNTwt3ol6jMIhMWLhcFyHEneQgju5HfVXAR8V5uETge5XU7V6Fk5go7obbIeWxN8toWB_vp_Gm9xMP3-Stq1wD3QzdyIJWmnBpgVk8mgNCzgdv2A",
  };
  const txid = await interactWrite(arweave, wallet, contractId, input);
  console.log("TX ID ", txid);
}
const mockedData = [
  {
    image:
      "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed00f17d4a99d0006d2e738%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D154%26cropX2%3D4820%26cropY1%3D651%26cropY2%3D5314",
    caption: "This is a succinct caption",
    owner: "Esteban",
    price: "0.5",
    uuid: "98fs080f9s8",
    userId: "1",
    author: "Kanye West",
  },
  {
    image:
      "https://static.theceomagazine.net/wp-content/uploads/2021/07/29092208/jay-z.jpg",
    caption:
      "On the other hand this is a very long caption, we want to see how this renders in the view you know? Hahahaha what a long caption dude.",
    owner: "",
    price: "0.8",
    uuid: "98fs080f9s8",
    userId: "1",
    author: "Jay Z",
  },
];

export default function App() {
  const [feed, setFeed] = useState([]);
  const [contractId, setContractId] = useState("pnTOOL1MebQ-c4Dw4zgMKvCdPbvsCC7JTTDmEjAr0qI")

  useEffect(() => {
    (async () => {
      const feed = await getFeed(contractId);
      console.log("THIS IS FEED ", feed.feed);
      setFeed(feed.feed);
    })();
  }, []);

  return (
    <div className={styles.container}>

      <Navbar />
      <br />

      <main className={styles.main}>
        {feed?.map((nft) => {
          return (
            <NFT
              key={Math.random() * 1000}
              author={nft.author}
              imageUrl={nft.image}
              owner={nft.owner}
              price={nft.price}
              caption={nft.caption}
            />
          );
        })}

        <button onClick={(e) => writeToFeed('add wallet above here', contractId)}>Write to Feed</button>
      </main>
    </div>
  );
}