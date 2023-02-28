import { useState, useContext } from "react";
import InitialState from "./InitialState";
import LoadingState from "./LoadingState";
import FinishedState from "./FinishedState";
import { useRouter } from "next/router";
import { client } from "../../lib/client";
import { pinJSONToIPFS, pinFileToIPFS } from "../../lib/pinata";
import { TwitterContext } from "../../context/TwitterContext";
import { ethers } from "ethers";
// import { BrowserProvider } from "ethers";
//
import { contractABI, contractAddress } from "../../lib/constants";

let metamask;

if (typeof window !== "undefined") {
  metamask = window.ethereum;
}
// console.log("Console 1", ethers.providers.Web3Provider);

const getEthereumContract = async () => {
  // if (!metamask) return;
  // console.log(ethers.providers.Web3Provider);
  // if (ethers.providers.Web3Provider === undefined) return;
  // if (ethers.providers.Web3Provider !== undefined) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

const ProfileImageMinter = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("initial");
  const [profileImage, setProfileImage] = useState();
  //
  const { currentAccount, setAppStatus } = useContext(TwitterContext);

  const mint = async () => {
    if (!name || !description || !profileImage) return;
    setStatus("loading");

    const pinataMetaData = {
      name: `${name} - ${description}`,
    };

    const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetaData);

    await client
      .patch(currentAccount)
      .set({ profileImage: ipfsImageHash })
      .set({ isProfileImageNft: true })
      .commit();

    const imageMetaData = {
      name: name,
      description: description,
      image: `ipfs://${ipfsImageHash}`,
    };

    const ipfsJsonHash = await pinJSONToIPFS(imageMetaData, pinataMetaData);

    const contract = await getEthereumContract();

    const transactionParameters = {
      to: contractAddress,
      from: currentAccount,
      data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
    };

    // ignore my crazy vulnerability scanner.....
    // it goes nuts because metamask injects javascript to the apps code on the fly
    // an it's considered high risk. in reality, metamask doesn't inject any
    // malicious code.'
    try {
      await metamask.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      setStatus("finished");
    } catch (error) {
      console.log(error);
      setStatus("finished");
    }
  };

  const modalChildren = (modalStatus = status) => {
    switch (modalStatus) {
      case "initial":
        return (
          <InitialState
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            mint={mint}
          />
        );

      case "loading":
        return <LoadingState />;

      case "finished":
        return <FinishedState />;

      default:
        router.push("/");
        setAppStatus("error");
        break;
    }
  };

  return <>{modalChildren(status)}</>;
};

export default ProfileImageMinter;
