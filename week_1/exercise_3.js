function right(str) {
  if (str.length < 3) {
    console.log(str);
    }
    else {
        let lastThree = str.slice(-3);
        let newStr = lastThree + str.slice(0, -3);
        console.log(newStr);
        }
}

right('Python'); // 'honPyt'
right('JavaScript'); // 'iptJavaScr'
right('Hi'); // 'Hi'