function capitalizeFirstLetter(str) {
  let words = str.split(' ');
  let result = words.map(word => {
    return word[0].toUpperCase() + word.slice(1);
  });
  console.log(result.join(' '));
}

capitalizeFirstLetter('the quick brown fox'); // 'The Quick Brown Fox'