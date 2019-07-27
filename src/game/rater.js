function Rater(twoStarsThreshold, oneStarThreshold) {
  if (twoStarsThreshold >= oneStarThreshold) {
    throw "2 stars threshold can not be higher than 1 star threshold. " +
      "Rating decreases as moves count increases";
  }

  this.rateMovesCount = count => {
    if (count < twoStarsThreshold) {
      return 3;
    } else if (count < oneStarThreshold) {
      return 2;
    } else {
      return 1;
    }
  };
}

module.exports = { Rater };
