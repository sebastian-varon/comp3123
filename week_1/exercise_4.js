function angleType(angle) {
  if (angle < 90) {
    console.log('Acute angle');
  } else if (angle === 90) {
    console.log('Right angle');
  } else if (angle < 180) {
    console.log('Obtuse angle');
  } else if (angle === 180) {
    console.log('Straight angle');
  }
}

console.log(angleType(47)); // 'Acute angle'
console.log(angleType(90)); // 'Right angle'
console.log(angleType(145)); // 'Obtuse angle'
console.log(angleType(180)); // 'Straight angle'