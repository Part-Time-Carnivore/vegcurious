var veg = [
    { id: 1, name: 'Broccoli', color: '58850b' },
    { id: 2, name: 'Cabbage', color: 'c4e587' },
    { id: 3, name: 'Kale / Cavolo nero', color: 'cbd978' },
    { id: 4, name: 'Onion / Shallot', color: 'fed3aa' },
    { id: 5, name: 'Peas', color: '86cf4a' },
    { id: 6, name: 'Carrot', color: 'fd9021' },
    { id: 7, name: 'Garlic', color: 'fff9d9' },
    { id: 8, name: 'Mushroom', color: 'd7a988' },
    { id: 9, name: 'Tomato', color: 'ed4322' },
    { id: 10, name: 'Sweet potato', color: 'ffa552' },
    { id: 11, name: 'Cauliflower', color: 'f0dfab' },
    { id: 12, name: 'Lettuce / Salad leaves', color: 'b9d331' },
    { id: 13, name: 'Ginger', color: 'f9ca86' },
    { id: 14, name: 'Turnip, Swede', color: 'c4abab' },
    { id: 15, name: 'Radish', color: 'c67588' },
    { id: 16, name: 'Parsnip', color: 'ede4bb' },
    { id: 17, name: 'Beetroot', color: '9b3656' },
    { id: 18, name: 'Green beans / Runner beans', color: '55843f' },
    { id: 19, name: 'Broad beans', color: '8ca574' },
    { id: 20, name: 'Aubergine / Eggplant', color: '42385b' },
    { id: 21, name: 'Cucumber', color: '26511c' },
    { id: 22, name: 'Squash / Pumpkin', color: 'ce862f' },
    { id: 23, name: 'Leek', color: 'ddf2b3' },
    { id: 24, name: 'Pepper', color: 'e0232d' },
    { id: 25, name: 'Spinnach', color: '275e2d' },
    { id: 26, name: 'Courgette / Zucchini / Marrow', color: '2f7728' },
    { id: 27, name: 'Brussels sprouts', color: '346023' },
    { id: 28, name: 'Kohlrabi', color: 'e6eac2' },
    { id: 29, name: 'Bock choy / Pak choy', color: '436633' },
    { id: 30, name: 'Asparagus', color: '788e50' },
    { id: 31, name: 'Spring greens / Collard greens', color: '557a44' },
    { id: 32, name: 'Avocado', color: 'a5c18d' },
    { id: 33, name: 'Fennel', color: '86c964' },
    { id: 34, name: 'Jerusalem artichoke', color: 'c1c195' },
    { id: 35, name: 'Globe artichoke', color: '9eb572' },
    { id: 36, name: 'Olives', color: '576837' },
    { id: 37, name: 'Rhubarb', color: 'f24158' },
    { id: 38, name: 'Vine leaves', color: '475635' },
    { id: 39, name: 'Watercress', color: '5f9643' },
    { id: 40, name: 'Yam', color: 'cecaa9' },
    { id: 41, name: 'Seaweed / Nori / Kombu / Kelp', color: '507741' },
    { id: 42, name: 'Rocket / Arugula', color: '528447' },
    { id: 43, name: 'Beansprouts', color: 'eae3ce' },
    { id: 44, name: 'Chard', color: '65842a' },
    { id: 45, name: 'Samphire', color: '3b7f3b' },
    { id: 46, name: 'Endive', color: '90af52' },
    { id: 47, name: 'Wheatgrass', color: '83ed5a' },
    { id: 48, name: 'Pulses / Beans / Lentils / Chickpeas', color: 'ed975a' },
    { id: 49, name: 'Celery', color: 'c5e59e' }
];

function compare(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

veg.sort(compare);