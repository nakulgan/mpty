pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

contract MPTY is ERC721, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() public ERC721("MPTY", "MPTY") {
    _setBaseURI("https://ipfs.io/ipfs/");
  }

  function mintItem(address to, string memory tokenURI)
      public
      onlyOwner
      returns (uint256)
  {
      _tokenIds.increment();

      uint256 id = _tokenIds.current();
      _mint(to, id);
      _setTokenURI(id, tokenURI);

      return id;
  }

  function unlockItem(uint256 tokenId, string memory tokenURI)
      public
      onlyOwner
      returns (uint256)
  {
      _setTokenURI(tokenId, tokenURI);
      return tokenId;
  }
}
