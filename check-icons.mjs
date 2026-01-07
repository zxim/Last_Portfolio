import * as simpleIcons from 'simple-icons';

const iconsToCheck = [
  'siSuricata',
  'siModsecurity',
  'siFtk',
  'siAccessdata',
  'siGhidra',
  'siMitre'
];

console.log('Checking for icons in simple-icons package...');

iconsToCheck.forEach(iconName => {
  if (simpleIcons[iconName]) {
    console.log(`FOUND: ${iconName} (Hex: #${simpleIcons[iconName].hex})`);
  } else {
    console.log(`NOT FOUND: ${iconName}`);
  }
});
