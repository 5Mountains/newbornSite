const log = console.log();
const fs = require('fs');

readFile = (path) => {
    // if not mistake and everything is ok - resolve, else - reject
    return new Promise((resolve, reject) => {
      // path - путь, направление для чтения директории
      fs.readFile(path, 'utf-8', (err, names) => {
        if (err) reject(err);
        else resolve(names);
      });
    });
  };

//  ruString = change name in init func
convertorRu2En = (ruString, prefix='') =>{
  const ruMatrix = ['а','б','в','г','д','е','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ы','ь','э','ю','я'];
  const enMatrix = ['a','b','v','g','d','e','zh','z','i','i','k','l','m','n','o','p','r','s','t','u','f','kh','ts','ch','sh','shch','y', '', 'e','iu','ia'];
  const ruStringLow = ruString.toLowerCase();
  let enString = ruStringLow;
  ruMatrix.map((letter, i)=>{
    enString = enString.replace(new RegExp(ruMatrix[i], "g"),enMatrix[i]);
  });
  return enString + prefix;
};