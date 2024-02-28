const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log('Calculator listening at http://localhost:' + port);
})

function parseNumsParam(nums) {
    if (!nums) {
        throw new Error('nums are required');
}

const numberArray = nums.split(',').map((num) => {
    const parsedNum = parseFloat(num);
    if(isNaN(parsedNum)) {
        throw new Error(`${num} is not a valid number`);
    }
    return parsedNum;
})
return numberArray;
}


app.get('/mean', (req, res) => {
    try { 
        const nums = parseNumsParam(req.query.nums);
        const mean = nums.reduce((acc, cur) => cur, 0) / nums.length;

        res.json({
            operation: "mean",
            value: mean
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


app.get('/median', (req, res) => {
    try {
      const nums = parseNumsParam(req.query.nums).sort((a,b) => a - b);
      let median;
  
      if(nums.length % 2 === 0) {
  
        const midUpper = nums.length / 2;
        const midLower = midUpper - 1;
        median = (nums[midLower] + nums[midUpper]) / 2;
        
      } else {
        median = nums[Math.floor(nums.length / 2)];
      }
  
      res.json({
        operation: "median",
        value: median
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

app.get('/mode', (req, res) => {
    try {
    const nums = parseNumsParam(req.query.nums);
    const modes = [];
    const counts = {};

    nums.forEach(x => {
      counts[x] = (counts[x] || 0) + 1;
    });

    let maxCount = 0;
    for(let num in counts) {
      maxCount = Math.max(maxCount, counts[num]);
    }

    for(let num in counts) {
      if(counts[num] === maxCount) {
        modes.push(Number(num));
      }
    }

    res.json({
      operation: "mode",
      value: modes
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


