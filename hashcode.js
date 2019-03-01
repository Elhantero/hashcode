const fs = require("fs");
const { promisify } = require("util");
const _ = require("lodash");

const readdir = promisify(fs.readFile);

async function myF() {
  let data;
  try {
    data = await readdir("./b_lovely_landscapes.txt", "utf-8");
  } catch (e) {
    console.log("e", e);
  }
  const taskArr = data.split("\n");
  let [countFoto, ...allFotos] = taskArr;
  allFotos = _.compact(allFotos);
  const fotosObj = {};
  const HIds = [];
  const VIds = [];
  allFotos.forEach((elem, index) => {
    const [type, lngth, ...tags] = elem.split(" ");
    fotosObj[index] = {
      type: type,
      tags: tags
    };
    if (type === "H") {
      HIds.push(index);
    } else {
      VIds.push(index);
    }
  });

  const bubbleSort = arr => {
    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      let wasSwap = false;
      for (let j = 0, endJ = endI - i; j < endJ; j++) {
        if (
          _.difference(fotosObj[j].tags, fotosObj[j + 1].tags).length !==
          fotosObj[j].length
        ) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          wasSwap = true;
        }
      }
      if (!wasSwap) break;
    }
    return arr;
  };
  console.log(bubbleSort(HIds));
  /*
  function compareRandom(a, b) {
    return (
      _.difference(fotosObj[a].tags, fotosObj[b].tags).length <
      fotosObj[a].tags.length
    );
  }

  HIds.sort(compareRandom);
*/
  var file = fs.createWriteStream("array.txt");
  file.on("error", function(err) {
    /* error handling */
  });
  file.write(HIds.length.toString() + "\n");
  HIds.forEach(function(v) {
    file.write(v.toString() + "\n");
  });
  file.end();
}

myF();
